<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Populate comics
        factory(App\Models\Comic::class, 20)->create();

        // Populate characters
        factory(App\Models\Character::class, 20)->create();

        // Get all the comics attaching up to 2 random characters to each character
        $comics = App\Models\Comic::all();

        // Populate the pivot table
        App\Models\Character::all()->each(function ($character) use ($comics) {
            $character->comics()->attach(
                $comics->random(rand(1, 2))->pluck('id')->toArray()
            );
        });
    }
}
