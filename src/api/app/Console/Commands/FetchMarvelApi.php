<?php

namespace App\Console\Commands;

use App\Exceptions\MarvelRequestException;
use App\Services\MarvelApi;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class FetchMarvelApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marvel:fetch {entities?*}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Query the Marvel API to fetch Marvel\'s characters and/or comics';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @param MarvelApi $api
     * @return mixed
     */
    public function handle(MarvelApi $api)
    {
        Log::info(sprintf('Start of command marvel:fetch at %s', date('Y-m-d H:i:s')));

        $entities = $this->argument('entities');

        try {
            if (empty($entities)) {
                list($totalCharacters, $totalComics) = $api->fetchAll();

                $this->info(sprintf('%d characters inserted in database', $totalCharacters));
                $this->info(sprintf('%d comics inserted in database', $totalComics));
                return;
            }

            if (in_array('character', $entities)) {
                $total = $api->fetchCharacters();
                $this->info(sprintf('%d characters inserted in database', $total));
            }

            if (in_array('comic', $entities)) {
                $total = $api->fetchComics();
                $this->info(sprintf('%d comics inserted in database', $total));
            }

        } catch (MarvelRequestException $e) {
            $this->error('Something went wrong!');
            $this->error('Message: ' . $e->getMessage());
            $this->error('Code: ' . $e->getCode());
        } finally {
            Log::info(sprintf('End of command marvel:fetch at %s', date('Y-m-d H:i:s')));
        }

        return;
    }
}
