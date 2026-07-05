<?php
namespace App\Http\Controllers;

use App\Models\Auteur;
use Illuminate\Http\Request;

class AuteurController extends Controller
{
    public function index() { return Auteur::all(); }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'nationalite' => 'nullable|string|max:255',
        ]);
        return response()->json(Auteur::create($data), 201);
    }
}
