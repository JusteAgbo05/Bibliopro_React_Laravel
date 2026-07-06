#!/bin/sh

# Exécuter les migrations automatiquement
php artisan migrate --force --seed

# Lancer le serveur Apache en arrière-plan (commande par défaut de l'image PHP)
apache2-foreground
