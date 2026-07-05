<?php

namespace Tests\Feature;

use App\Models\Categorie;
use App\Models\Livre;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LivreApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_liste_des_livres_accessible_sans_authentification(): void
    {
        Livre::factory()->count(3)->create();

        $response = $this->getJson('/api/livres');

        $response->assertStatus(200)->assertJsonCount(3, 'data');
    }

    public function test_bibliothecaire_peut_creer_un_livre(): void
    {
        $bib = User::factory()->create(['role' => 'bibliothecaire']);
        $categorie = Categorie::factory()->create();

        $response = $this->actingAs($bib, 'sanctum')->postJson('/api/livres', [
            'titre' => 'Livre Test',
            'isbn' => '1234567890123',
            'annee_publication' => 2020,
            'categorie_id' => $categorie->id,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('livres', ['titre' => 'Livre Test']);
    }

    public function test_adherent_ne_peut_pas_creer_un_livre(): void
    {
        $adherent = User::factory()->create(['role' => 'adherent']);
        $categorie = Categorie::factory()->create();

        $response = $this->actingAs($adherent, 'sanctum')->postJson('/api/livres', [
            'titre' => 'Livre Interdit',
            'isbn' => '9999999999999',
            'annee_publication' => 2020,
            'categorie_id' => $categorie->id,
        ]);

        $response->assertStatus(403);
    }

    public function test_creation_livre_refusee_sans_titre(): void
    {
        $bib = User::factory()->create(['role' => 'bibliothecaire']);
        $categorie = Categorie::factory()->create();

        $response = $this->actingAs($bib, 'sanctum')->postJson('/api/livres', [
            'isbn' => '1111111111111',
            'annee_publication' => 2020,
            'categorie_id' => $categorie->id,
        ]);

        $response->assertStatus(422);
    }
}
