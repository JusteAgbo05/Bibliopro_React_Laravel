<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_un_adherent_peut_s_inscrire(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Jean Test',
            'email' => 'jean@test.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'jean@test.com', 'role' => 'adherent']);
    }

    public function test_connexion_avec_bons_identifiants(): void
    {
        $user = User::factory()->create(['password' => bcrypt('password123')]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)->assertJsonStructure(['access_token']);
    }

    public function test_connexion_refusee_avec_mauvais_mot_de_passe(): void
    {
        $user = User::factory()->create(['password' => bcrypt('password123')]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'mauvais',
        ]);

        $response->assertStatus(422);
    }
}
