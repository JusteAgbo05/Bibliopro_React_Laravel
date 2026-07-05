<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\Categorie;
use App\Models\Auteur;
use App\Models\Livre;
use App\Models\Exemplaire;
use App\Models\Adherent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class BiblioProSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Bibliothécaire',
            'email' => 'biblio@bibliopro.local',
            'password' => Hash::make('password'),
            'role' => 'bibliothecaire',
        ]);

        Categorie::factory(5)->create();
        $auteurs = Auteur::factory(8)->create();

        Livre::factory(15)->create()->each(function ($livre) use ($auteurs) {
            $livre->auteurs()->attach($auteurs->random(rand(1, 2))->pluck('id'));
            Exemplaire::factory(rand(1, 3))->create(['livre_id' => $livre->id]);
        });

        Adherent::factory(10)->create();
    }
}
