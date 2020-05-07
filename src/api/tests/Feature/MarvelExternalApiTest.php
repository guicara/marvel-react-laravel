<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class MarvelExternalApiTest extends TestCase
{
    /**
     * Check if the Marvel API is reachable.
     *
     * @return void
     */
    public function testRemote()
    {
        $gateway = env('MARVEL_API_GATEWAY', 'https://gateway.marvel.com/v1/public');
        $response = Http::get($gateway);

        $this->assertEquals(404, $response->status());
    }

    /**
     * Check if the authentication to the Marvel API is OK.
     *
     * @return void
     */
    public function testAuthentication()
    {
        $gateway = env('MARVEL_API_GATEWAY', 'https://gateway.marvel.com/v1/public/');
        $privateKey = env('MARVEL_API_PRIVATE_KEY', '');
        $publicKey = env('MARVEL_API_PUBLIC_KEY', '');

        $timestamp = time();

        $hash = md5($timestamp . $privateKey . $publicKey);

        $queryString = [
            'ts' => $timestamp,
            'apikey' => $publicKey,
            'hash' => $hash,
            'limit' => 1
        ];

        $url = $gateway . 'characters?' . http_build_query($queryString);

        $response = Http::get($url);

        $this->assertEquals(200, $response->status());
    }
}
