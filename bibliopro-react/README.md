# 📚 BiblioPro

Système de gestion d'une bibliothèque municipale — Projet final de la Semaine 6 du cours Développement Web Avancé (Programme **OIF DCLIC**).

---

## 📖 Description

**BiblioPro** est une application web permettant à une bibliothèque municipale de gérer efficacement :

- le catalogue de livres ;
- les auteurs ;
- les catégories ;
- les exemplaires ;
- les adhérents ;
- les emprunts et les retours.

L'application intègre également le calcul automatique des pénalités en cas de retard de restitution des ouvrages.

---

## 🛠️ Technologies utilisées

### Front-end
- React (Vite)
- React Router DOM
- Axios
- Bootstrap 5

### Back-end
- Laravel 12
- Laravel Sanctum (authentification et gestion des rôles)
- MySQL

---

## 📂 Structure du projet

```text
Bibliopro_React_Laravel/
├── bibliopro-react/     # Application Front-end React
├── bibliopro-api/       # API Back-end Laravel
└── wireframes/          # Maquettes UX/UI (SVG)
```
---

## ✨ Fonctionnalités principales

- Gestion complète du catalogue (CRUD des livres, auteurs, catégories et exemplaires)
- Gestion des adhérents et de leur historique d'emprunts
- Gestion des emprunts et des retours
- Calcul automatique des pénalités de retard
- Recherche multicritère (titre, auteur, catégorie, disponibilité)
- Authentification avec gestion des rôles (bibliothécaire et adhérent)

---

## 🚀 Installation du front-end

```bash
cd bibliopro-react
npm install
npm run dev
```
---

## 📌 État d'avancement

- ✅ Cahier des charges
- ✅ Dossier de conception
- ✅ Wireframes
- ✅ Développement du front-end React
- ⏳ Développement du back-end Laravel
- ⏳ Tests PHPUnit
- ⏳ Rapport final

---

## 👨‍💻 Auteur

Projet réalisé par **Juste Vivien AGBO** dans le cadre de la formation **Développement Web Avancé** du programme **OIF DCLIC**.

---

## 📄 Licence

Projet réalisé à des fins pédagogiques dans le cadre de la formation OIF DCLIC.
