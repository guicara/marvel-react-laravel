<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiRouteTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the API routes for the characters.
     *
     * @return void
     */
    public function testCharacter()
    {
        // Seed the database to have test data
        $this->seed();

        $response = $this->get('/api/v1/character');
        $response->assertStatus(200);

        $response = $this->get('/api/v1/character/1');
        $response->assertStatus(200);

        $response = $this->get('/api/v1/character/9999');
        $response->assertStatus(404);
    }

    /**
     * Test the API routes for the comics.
     *
     * @return void
     */
    public function testComics()
    {
        // Seed the database to have test data
        $this->seed();

        $response = $this->get('/api/v1/comic');
        $response->assertStatus(200);

        $response = $this->get('/api/v1/comic/1');
        $response->assertStatus(200);

        $response = $this->get('/api/v1/comic/9999');
        $response->assertStatus(404);
    }
}
