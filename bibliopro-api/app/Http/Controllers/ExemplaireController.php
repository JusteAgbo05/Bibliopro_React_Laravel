<?php
namespace App\Http\Controllers;

use App\Models\Exemplaire;
use Illuminate\Http\Request;

class ExemplaireController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'livre_id' => 'required|exists:livres,id',
            'etat' => 'required|string',
        ]);
        $data['disponible'] = true;
        return response()->json(Exemplaire::create($data), 201);
    }

    public function update(Request $request, Exemplaire $exemplaire)
    {
        $data = $request->validate([
            'etat' => 'sometimes|string',
            'disponible' => 'sometimes|boolean',
        ]);
        $exemplaire->update($data);
        return $exemplaire;
    }
}
