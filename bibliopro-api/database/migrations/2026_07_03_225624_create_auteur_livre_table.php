<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auteur_livre', function (Blueprint $table) {
            $table->id();
            $table->foreignId('livre_id')->constrained('livres')->cascadeOnDelete();
            $table->foreignId('auteur_id')->constrained('auteurs')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('auteur_livre');
    }
};
