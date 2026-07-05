# 📚 BiblioPro API

> API REST développée avec **Laravel 12** pour le projet **BiblioPro**, réalisée dans le cadre du **Projet final de la Semaine 6** de la formation **Développement Web Avancé** du programme **OIF DCLIC**.

---

## 📖 Description

**BiblioPro API** constitue le back-end de l'application BiblioPro. Elle fournit l'ensemble des services nécessaires à la gestion d'une bibliothèque municipale, notamment :

- l'authentification et l'autorisation des utilisateurs ;
- la gestion des livres, auteurs, catégories et exemplaires ;
- la gestion des adhérents ;
- la gestion des emprunts et des retours ;
- le calcul automatique des pénalités de retard.

L'API suit une architecture REST et communique avec le front-end React via des requêtes HTTP sécurisées.

---

## 🛠️ Technologies utilisées

- Laravel 12
- PHP 8.2
- Laravel Sanctum (authentification par jetons et gestion des rôles)
- MySQL
- PHPUnit (tests unitaires et fonctionnels)

---

## 🚀 Installation

### Cloner le dépôt

```bash
git clone https://github.com/<votre-utilisateur>/Bibliopro_React_Laravel.git
cd Bibliopro_React_Laravel/bibliopro-api
```
### Installer les dépendances

```bash
composer install
```
### Configurer l'environnement

```bash
cp .env.example .env
php artisan key:generate
```
### Configurer la base de données

Modifiez les paramètres de connexion à la base de données dans le fichier `.env`, puis exécutez :

```bash
php artisan migrate --seed
```
### Créer le lien de stockage

```bash
php artisan storage:link
```
### Démarrer le serveur

```bash
php artisan serve
```
L'API sera accessible à l'adresse :

```text
http://127.0.0.1:8000
```
---

## 🔑 Compte de démonstration

| Rôle | Adresse e-mail | Mot de passe |
|------|----------------|--------------|
| Bibliothécaire | `biblio@bibliopro.local` | `password` |

---

## 📡 Principaux endpoints

| Méthode | Endpoint | Description | Authentification |
|----------|----------|-------------|------------------|
| POST | /`api/register` | Inscription d'un adhérent | ❌ |
| POST | /`api/login` | Connexion | ❌ |
| GET | /`api/me` | Profil de l'utilisateur connecté | ✅ |
| GET | /`api/livres` | Consultation du catalogue | ❌ |
| POST | /`api/livres` | Création d'un livre | Bibliothécaire |
| POST | /`api/emprunts` | Création d'un emprunt | Bibliothécaire |
| PUT | /`api/emprunts/{id}/retour` | Retour d'un ouvrage et calcul des pénalités | Bibliothécaire |

---

## 🧪 Exécution des tests

```bash
php artisan test
```
---

## 📌 État d'avancement

| Fonctionnalité | État |
|----------------|------|
| Migrations, modèles et relations | ✅ Terminé |
| Authentification avec Laravel Sanctum | ✅ Terminé |
| Gestion des rôles | ✅ Terminé |
| CRUD des livres, auteurs, catégories et exemplaires | ✅ Terminé |
| Gestion des adhérents | ✅ Terminé |
| Gestion des emprunts et des retours | ✅ Terminé |
| Calcul automatique des pénalités de retard | ✅ Terminé |
| Téléversement des couvertures de livres | ✅ Terminé |
| Tests PHPUnit | ✅ Terminé |
| Scénarios Selenium IDE | ✅ Terminé |
| Rapport de sécurité et de performance | ⏳ À réaliser |

---

## 👨‍💻 Auteur

**Juste Vivien AGBO**

Étudiant en **Hydrologie quantitative** et développeur web en formation dans le cadre du programme **OIF DCLIC – Développement Web Avancé**.

---

## 📄 Licence

Ce projet a été réalisé à des fins pédagogiques dans le cadre de la formation **OIF DCLIC**.

Il peut être librement consulté, étudié et utilisé à des fins d'apprentissage.
