<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auteur extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'prenom', 'nationalite'];
    public function livres() { return $this->belongsToMany(Livre::class, 'auteur_livre'); }
}
