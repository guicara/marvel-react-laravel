<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comic extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['pivot', 'external_id', 'created_at', 'updated_at'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'price' => 'float'
    ];

    /**
     * The characters that belong to the comic.
     */
    public function characters()
    {
        return $this->belongsToMany('App\Models\Character', 'character_comic', 'comic_id', 'character_id');
    }
}
