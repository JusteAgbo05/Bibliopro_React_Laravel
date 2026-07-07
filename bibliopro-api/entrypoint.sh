#!/bin/sh

# Exécuter les migrations automatiquement
php artisan migrate: --seed --force
php artisan storage:link

# Lancer le serveur Apache en arrière-plan (commande par défaut de l'image PHP)
apache2-foreground
