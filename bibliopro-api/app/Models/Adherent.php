<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adherent extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'nom', 'prenom', 'email', 'date_inscription'];
    public function user() { return $this->belongsTo(User::class); }
    public function emprunts() { return $this->hasMany(Emprunt::class); }
}
