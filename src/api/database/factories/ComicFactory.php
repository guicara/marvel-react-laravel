<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Comic;
use Faker\Generator as Faker;

$factory->define(Comic::class, function (Faker $faker) {
    return [
        'title' => $faker->name,
        'description' => $faker->text,
        'pageCount' => $faker->randomDigitNotNull,
        'price' => $faker->randomFloat(2, 1, 50)
    ];
});
