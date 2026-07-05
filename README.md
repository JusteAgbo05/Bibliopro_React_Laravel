# BiblioPro

Système de gestion de bibliothèque municipale — Projet Final Semaine 6, cours Développement Web Avancé (OIF DCLIC).

## Description

BiblioPro permet à une bibliothèque municipale de gérer son catalogue (livres, auteurs, catégories, exemplaires), ses adhérents et ses emprunts, avec calcul automatique des pénalités de retard.

## Technologies

- **Front-end** : React (Vite), React Router DOM, Axios, Bootstrap 5
- **Back-end** : Laravel 12, Sanctum (authentification par rôles), MySQL

## Structure du dépôt

Bibliopro_React_Laravel/
├── bibliopro-react/   # Application front-end React
├── bibliopro-api/      # API back-end Laravel (à venir)
└── wireframes/          # Wireframes UX/UI (SVG)

## Fonctionnalités principales

- Gestion du catalogue (CRUD livres, auteurs, catégories, exemplaires)
- Gestion des adhérents et de leur historique d'emprunts
- Gestion des emprunts avec calcul automatique des pénalités de retard
- Recherche multicritère (titre, auteur, catégorie, disponibilité)
- Authentification par rôles (bibliothécaire / adhérent)

## Installation front-end

```bash
cd bibliopro-react
npm install
npm run dev
```

## État d'avancement

- [x] Conception (cahier des charges, dossier de conception, wireframes)
- [x] Front-end React (auth, catalogue, adhérents, emprunts, profil)
- [ ] Back-end Laravel (dépôt à venir)
- [ ] Tests PHPUnit
- [ ] Rapport final

## Auteur

Projet réalisé par Juste Vivien AGBO dans le cadre du cours OIF DCLIC — Développement Web Niveau Approfondi.