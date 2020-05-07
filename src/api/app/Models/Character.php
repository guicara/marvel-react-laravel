<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['pivot', 'external_id', 'created_at', 'updated_at'];

    /**
     * The comics that belong to the character.
     */
    public function comics()
    {
        return $this->belongsToMany('App\Models\Comic', 'character_comic', 'character_id', 'comic_id');
    }
}
