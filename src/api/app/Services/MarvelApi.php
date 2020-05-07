<?php

namespace App\Services;

use App\Exceptions\MarvelRequestException;
use App\Models\Character;
use App\Models\Comic;
use Illuminate\Support\Facades\Http;

class MarvelApi
{
    /**
     * Get the URL to fetch.
     *
     * @param string $endpoint Resource endpoint
     * @param array $params Endpoint optionals parameters
     * @return string The final URL to fetch
     */
    private function getUrl(string $endpoint, array $params = [])
    {
        $timestamp = time();

        $gateway = env('MARVEL_API_GATEWAY', 'https://gateway.marvel.com/v1/public/');
        $hash = $this->getAuthenticationHash($timestamp);

        $queryString = [
            'ts' => $timestamp,
            'apikey' => env('MARVEL_API_PUBLIC_KEY', ''),
            'hash' => $hash
        ];

        return $gateway . $endpoint . '?' . http_build_query(array_merge($queryString, $params));
    }

    /**
     * In order to access the Marvel Comics API a authentication hash should be generated
     * based on the current timestamp, the public key and the private key,
     *
     * @param string $timestamp UNIX timestamp
     * @return string The unique md5 hash
     */
    private function getAuthenticationHash(string $timestamp): string
    {
        $privateKey = env('MARVEL_API_PRIVATE_KEY', '');
        $publicKey = env('MARVEL_API_PUBLIC_KEY', '');

        return md5($timestamp . $privateKey . $publicKey);
    }

    /**
     * Fetch the URL and return data.
     *
     * @param string $url
     * @return mixed|null
     * @throws MarvelRequestException
     */
    private function fetch(string $url)
    {
        $response = Http::retry(2, 500)->get($url);

        // Throw an exception if a server error occurred
        if ($response->serverError()) {
            throw new MarvelRequestException('Server error', $response->status());
        }

        // Throw an exception if a client error occurred
        if ($response->clientError()) {
            switch ($response->status()) {
                case 401: $error = 'Invalid hash or referer'; break;
                case 403: $error = 'Forbidden'; break;
                case 405: $error = 'Method not allowed'; break;
                case 409: $error = 'Invalid parameters'; break;
                default: $error = 'An error occurred'; break;
            }

            throw new MarvelRequestException($error, $response->status());
        }

        return $response['data'] ?? null;
    }


    /**
     * Fetch all resources from the Marvel Comics API.
     */
    public function fetchAll()
    {
        $totalCharacters = $this->fetchCharacters();
        $totalComics = $this->fetchComics();

        return [$totalCharacters, $totalComics];
    }

    private function fetchTotalEntities(string $endpoint): int
    {
        $url = $this->getUrl($endpoint, ['limit' => 1]);
        $data = $this->fetch($url);

        return is_array($data) && isset($data['total']) && is_numeric($data['total']) ? $data['total'] : 0;
    }

    /**
     * Fetch comic characters from the Marvel Comics API.
     *
     * @param array $params Request params
     * @return int Returns the number of inserted characters
     * @throws MarvelRequestException
     */
    public function fetchCharacters($params = []): int
    {
        $total = $this->fetchTotalEntities('characters');

        if ($total === 0) {
            return 0;
        }

        $limit = 100;
        $i = 0;

        // Bulk insert with a batch size equal to $limit
        while($i < $total) {
            $url = $this->getUrl('characters', array_merge($params, ['limit' => $limit, 'offset' => $i]));
            $data = $this->fetch($url);

            if (!is_array($data) || !isset($data['results'])) {
                break;
            }

            $items = $data['results'];

            foreach ($items as $item) {
                // Check if a character with this external ID does not already exist in database
                if (Character::where('external_id', $item['id'])->count() > 0) {
                    continue;
                }

                // Insert the new character

                $character = new Character;

                $character->external_id = $item['id'];
                $character->name = $item['name'];
                $character->description = trim($item['description']);
                if (isset($item['thumbnail']) && is_array($item['thumbnail'])) {
                    $character->thumbnail = $item['thumbnail']['path'] . '.' . $item['thumbnail']['extension'];
                }

                $result = $character->save();

                if ($result) {
                    // The entity has been successfully created in database.
                    // Check now if the character have attached comics and if so:
                    // - check if the comic already exist in database
                    // - attach the comic to the character

                    if (isset($item['comics']) && is_array($item['comics'])) {
                        $comics = $item['comics']['items'];

                        foreach ($comics as $comic) {
                            $exp = explode('/', $comic['resourceURI']);
                            $idComic = end($exp);

                            if (!is_numeric($idComic)) {
                                continue;
                            }

                            $dbComic = Comic::where('external_id', $idComic)->first();

                            if ($dbComic) {
                                $character->comics()->attach($dbComic->id);
                            }
                        }
                    }

                    $i++;
                }
            }
        }

        return $i;
    }

    /**
     * Fetch comics from the Marvel Comics API.
     *
     * @param array $params Request params
     * @return int Returns the number of inserted comics
     * @throws MarvelRequestException
     */
    public function fetchComics($params = []): int
    {
        $total = $this->fetchTotalEntities('comics');

        if ($total === 0) {
            return 0;
        }

        $limit = 100;
        $i = 0;

        // Bulk insert with a batch size equal to $limit
        while($i < $total) {
            $url = $this->getUrl('comics', array_merge($params, ['limit' => $limit, 'offset' => $i]));
            $data = $this->fetch($url);

            if (!is_array($data) || !isset($data['results'])) {
                break;
            }

            $items = $data['results'];

            foreach ($items as $item) {
                // Check if a comic with this external ID does not already exist in database
                if (Comic::where('external_id', $item['id'])->count() > 0) {
                    continue;
                }

                // Insert the new comic

                $comic = new Comic;

                $comic->external_id = $item['id'];
                $comic->title = $item['title'];
                $comic->description = trim($item['description']);
                $comic->pageCount = $item['pageCount'];
                if (isset($item['thumbnail']) && is_array($item['thumbnail'])) {
                    $comic->thumbnail = $item['thumbnail']['path'] . '.' . $item['thumbnail']['extension'];
                }
                if (isset($item['prices']) && is_array($item['prices']) && $item['prices'][0]['type'] === 'printPrice') {
                    $comic->price = $item['prices'][0]['price'];
                }

                $result = $comic->save();

                if ($result) {
                    // The entity has been successfully created in database.
                    // Check now if the comic have attached characters and if so:
                    // - check if the character already exist in database
                    // - attach the character to the comic

                    if (isset($item['characters']) && is_array($item['characters'])) {
                        $characters = $item['characters']['items'];

                        foreach ($characters as $character) {
                            $exp = explode('/', $character['resourceURI']);
                            $idCharacter = end($exp);

                            if (!is_numeric($idCharacter)) {
                                continue;
                            }

                            $dbCharacter = Character::where('external_id', $idCharacter)->first();

                            if ($dbCharacter) {
                                $comic->characters()->attach($dbCharacter->id);
                            }
                        }
                    }

                    $i++;
                }
            }
        }

        return $i;
    }
}
