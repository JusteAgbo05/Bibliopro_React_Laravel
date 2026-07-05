<?php
namespace Database\Factories;
use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class LivreFactory extends Factory
{
    protected static array $titres = [
        "Le pouvoir du moment présent",
        "Oser être soi-même",
        "Apprendre à s'aimer",
        "Changer sa vie en 30 jours",
        "La confiance en soi expliquée",
        "Se reconstruire après l'échec",
        "L'art de lâcher prise",
        "Vivre selon ses valeurs",
        "Sortir de sa zone de confort",
        "Le chemin vers l'accomplissement",
        "Comprendre ses émotions",
        "Se libérer du regard des autres",
        "Retrouver le sens de sa vie",
        "La discipline positive",
        "Guérir ses blessures intérieures",
    ];

    public function definition(): array
    {
        return [
            'titre' => fake('fr_FR')->unique()->randomElement(self::$titres),
            'isbn' => fake()->unique()->isbn13(),
            'annee_publication' => fake()->numberBetween(1980, 2025),
            'categorie_id' => Categorie::inRandomOrder()->first()?->id ?? Categorie::factory(),
            'couverture_url' => null,
        ];
    }
}
