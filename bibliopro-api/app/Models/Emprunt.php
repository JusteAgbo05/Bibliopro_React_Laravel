<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Emprunt extends Model
{
    protected $fillable = ['exemplaire_id', 'adherent_id', 'date_emprunt', 'date_retour_prevue', 'date_retour_effective', 'penalite'];
    public function exemplaire() { return $this->belongsTo(Exemplaire::class); }
    public function adherent() { return $this->belongsTo(Adherent::class); }
}
