<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8',
    ]);

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
        'password' => Hash::make($data['password']),
        'role' => 'adherent',
    ]);

    $parts = explode(' ', $data['name'], 2);

    \App\Models\Adherent::create([
        'user_id' => $user->id,
        'prenom' => $parts[0],
        'nom' => $parts[1] ?? '',
        'email' => $data['email'],
        'date_inscription' => now(),
    ]);

    return response()->json(['user' => $user], 201);
}

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['user' => $user, 'access_token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté.']);
    }

    public function me(Request $request)
{
    $user = $request->user();
    $data = ['user' => $user];

    if ($user->role === 'adherent') {
        $data['adherent'] = \App\Models\Adherent::where('user_id', $user->id)
            ->with('emprunts.exemplaire.livre')
            ->first();
    }

    return response()->json($data);
}
}
