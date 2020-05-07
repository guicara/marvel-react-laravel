<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Cache;

class CharacterController extends Controller
{
    /**
     * Display a listing of the characters.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $items = Cache::remember('character_index', now()->addHour(), function () {
            return Character::all('id', 'name', 'description', 'thumbnail');
        });

        return response()->json([
            'items' => $items
        ]);
    }

    /**
     * Display the specified character.
     *
     * @param Character $character
     * @return JsonResponse
     */
    public function show(Character $character)
    {
        return response()->json([
            'item' => $character->load('comics')
        ]);
    }
}
