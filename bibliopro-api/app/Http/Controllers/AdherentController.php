<?php
namespace App\Http\Controllers;

use App\Models\Adherent;
use Illuminate\Http\Request;

class AdherentController extends Controller
{
    public function index() { return Adherent::paginate(10); }

    public function show(Adherent $adherent)
    {
        return $adherent->load('emprunts.exemplaire.livre');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:adherents',
        ]);
        $data['date_inscription'] = now();
        return response()->json(Adherent::create($data), 201);
    }

    public function update(Request $request, Adherent $adherent)
    {
        $data = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:adherents,email,'.$adherent->id,
        ]);
        $adherent->update($data);
        return $adherent;
    }
}
