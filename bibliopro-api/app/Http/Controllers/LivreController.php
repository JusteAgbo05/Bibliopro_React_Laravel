<?php
namespace App\Http\Controllers;

use App\Models\Livre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LivreController extends Controller
{
    public function index(Request $request)
    {
        $query = Livre::with(['auteurs', 'categorie', 'exemplaires']);

        if ($request->titre) {
            $query->where('titre', 'like', '%'.$request->titre.'%');
        }
        if ($request->categorie) {
            $query->where('categorie_id', $request->categorie);
        }
        if ($request->has('disponibilite')) {
            $query->whereHas('exemplaires', fn($q) => $q->where('disponible', $request->disponibilite));
        }

        return $query->paginate(10);
    }

    public function show(Livre $livre)
    {
        return $livre->load(['auteurs', 'categorie', 'exemplaires']);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titre' => 'required|string|max:255',
            'isbn' => 'required|string|unique:livres',
            'annee_publication' => 'required|integer',
            'categorie_id' => 'required|exists:categories,id',
            'couverture' => 'nullable|image|max:2048',
            'auteurs' => 'array',
            'auteurs.*' => 'exists:auteurs,id',
        ]);

        if ($request->hasFile('couverture')) {
            $data['couverture_url'] = Storage::url($request->file('couverture')->store('couvertures', 'public'));
        }
        unset($data['couverture']);

        $livre = Livre::create($data);
        if (!empty($data['auteurs'])) $livre->auteurs()->sync($data['auteurs']);

        return response()->json($livre->load(['auteurs', 'categorie']), 201);
    }

    public function update(Request $request, Livre $livre)
    {
        $data = $request->validate([
            'titre' => 'sometimes|string|max:255',
            'isbn' => 'sometimes|string|unique:livres,isbn,'.$livre->id,
            'annee_publication' => 'sometimes|integer',
            'categorie_id' => 'sometimes|exists:categories,id',
            'couverture' => 'nullable|image|max:2048',
            'auteurs' => 'array',
            'auteurs.*' => 'exists:auteurs,id',
        ]);

        if ($request->hasFile('couverture')) {
            $data['couverture_url'] = Storage::url($request->file('couverture')->store('couvertures', 'public'));
        }
        unset($data['couverture']);

        $livre->update($data);
        if (isset($data['auteurs'])) $livre->auteurs()->sync($data['auteurs']);

        return $livre->load(['auteurs', 'categorie']);
    }

    public function destroy(Livre $livre)
    {
        if ($livre->exemplaires()->whereHas('emprunts', fn($q) => $q->whereNull('date_retour_effective'))->exists()) {
            return response()->json(['message' => 'Livre lié à un emprunt en cours.'], 409);
        }
        $livre->delete();
        return response()->json(null, 204);
    }
}
