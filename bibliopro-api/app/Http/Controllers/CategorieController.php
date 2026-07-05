<?php
namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    public function index() { return Categorie::all(); }

    public function store(Request $request)
    {
        $data = $request->validate(['libelle' => 'required|string|unique:categories']);
        return response()->json(Categorie::create($data), 201);
    }
}
