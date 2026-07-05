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

Projet réalisé à des fins pédagogiques dans le cadre de la formation OIF DCLIC.# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
