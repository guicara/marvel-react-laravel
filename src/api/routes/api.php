<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

Route::prefix('v1')->group(function () {
    Route::resource('character', 'CharacterController',  ['only' => ['index', 'show']]);
    Route::resource('comic', 'ComicController',  ['only' => ['index', 'show']]);
});

Route::fallback(function(){
    return response()->json(['message' => 'Resource not found'], 404);
});
