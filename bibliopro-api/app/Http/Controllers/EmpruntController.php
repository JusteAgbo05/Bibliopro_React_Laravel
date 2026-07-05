<?php
namespace App\Http\Controllers;

use App\Models\Emprunt;
use App\Models\Exemplaire;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EmpruntController extends Controller
{
    const DUREE_JOURS = 14;
    const PENALITE_PAR_JOUR = 100;

    public function index(Request $request)
    {
        $query = Emprunt::with(['adherent', 'exemplaire.livre']);

        if ($request->statut === 'en_cours') {
            $query->whereNull('date_retour_effective');
        } elseif ($request->statut === 'retard') {
            $query->whereNull('date_retour_effective')->where('date_retour_prevue', '<', now());
        }

        return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'exemplaire_id' => 'required|exists:exemplaires,id',
            'adherent_id' => 'required|exists:adherents,id',
        ]);

        $exemplaire = Exemplaire::findOrFail($data['exemplaire_id']);
        if (!$exemplaire->disponible) {
            return response()->json(['message' => 'Exemplaire indisponible.'], 409);
        }

        $emprunt = Emprunt::create([
            'exemplaire_id' => $exemplaire->id,
            'adherent_id' => $data['adherent_id'],
            'date_emprunt' => now(),
            'date_retour_prevue' => now()->addDays(self::DUREE_JOURS),
        ]);

        $exemplaire->update(['disponible' => false]);

        return response()->json($emprunt->load(['adherent', 'exemplaire']), 201);
    }

    public function retour(Request $request, Emprunt $emprunt)
    {
        $dateRetour = Carbon::parse($request->input('date_retour_effective', now()));
        $joursRetard = max(0, $dateRetour->diffInDays(Carbon::parse($emprunt->date_retour_prevue), false) * -1);
        $penalite = $joursRetard * self::PENALITE_PAR_JOUR;

        $emprunt->update([
            'date_retour_effective' => $dateRetour,
            'penalite' => $penalite,
        ]);

        $emprunt->exemplaire->update(['disponible' => true]);

        return $emprunt->load(['adherent', 'exemplaire']);
    }
}
