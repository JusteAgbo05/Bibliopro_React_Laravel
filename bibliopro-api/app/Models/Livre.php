<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    use HasFactory;
    protected $fillable = ['titre', 'isbn', 'annee_publication', 'categorie_id', 'couverture_url'];
    public function categorie() { return $this->belongsTo(Categorie::class); }
    public function auteurs() { return $this->belongsToMany(Auteur::class, 'auteur_livre'); }
    public function exemplaires() { return $this->hasMany(Exemplaire::class); }
}
