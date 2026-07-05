<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\AuteurController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ExemplaireController;
use App\Http\Controllers\AdherentController;
use App\Http\Controllers\EmpruntController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::get('/livres', [LivreController::class, 'index']);
Route::get('/livres/{livre}', [LivreController::class, 'show']);
Route::get('/auteurs', [AuteurController::class, 'index']);
Route::get('/categories', [CategorieController::class, 'index']);

Route::middleware(['auth:sanctum', 'role:bibliothecaire'])->group(function () {
    Route::post('/livres', [LivreController::class, 'store']);
    Route::put('/livres/{livre}', [LivreController::class, 'update']);
    Route::delete('/livres/{livre}', [LivreController::class, 'destroy']);
    Route::post('/auteurs', [AuteurController::class, 'store']);
    Route::post('/categories', [CategorieController::class, 'store']);
    Route::post('/exemplaires', [ExemplaireController::class, 'store']);
    Route::put('/exemplaires/{exemplaire}', [ExemplaireController::class, 'update']);
    Route::apiResource('adherents', AdherentController::class);
    Route::apiResource('emprunts', EmpruntController::class)->except(['update', 'destroy']);
    Route::put('/emprunts/{emprunt}/retour', [EmpruntController::class, 'retour']);
});
