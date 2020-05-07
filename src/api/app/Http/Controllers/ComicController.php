<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ComicController extends Controller
{
    /**
     * Display a listing of the comics.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $items = Cache::remember('comic_index', now()->addHour(), function () {
            return Comic::all('id', 'title', 'description', 'thumbnail', 'pageCount', 'price');
        });

        return response()->json([
            'items' => $items
        ]);
    }

    /**
     * Display the specified comic.
     *
     * @param Comic $comic
     * @return JsonResponse
     */
    public function show(Comic $comic)
    {
        return response()->json([
            'item' => $comic->load('characters')
        ]);
    }
}
