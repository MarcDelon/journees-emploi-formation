# Site Vitrine - Association Égalité Pour Tous

Site vitrine pour les "Journées de l'Emploi et de la Formation" organisé par l'Association Égalité Pour Tous.

## Fonctionnalités

- Page d'accueil présentant l'événement avec statistiques
- Page détaillant les objectifs et le programme de l'événement
- Galerie d'images de l'événement
- Formulaire d'inscription à l'événement
- Section des offres d'emploi et de stage
- Message de la promotrice de l'événement
- Page de contact avec formulaire et liens vers les réseaux sociaux
- **Système de gestion de contenu (CMS) intégré** pour gérer les offres d'emploi et les activités

## Technologies

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Hook Form + Zod (formulaires et validation)
- Supabase (backend)
- Sanity.io (CMS headless - optionnel)

## Prérequis

- Node.js 18+
- npm ou yarn

## Installation

```bash
npm install
```

## Variables d'environnement

Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role_supabase

# Optionnel - pour Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=votre_dataset
```

## Scripts disponibles

```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Build l'application pour la production
npm run start        # Démarre le serveur de production
npm run lint         # Exécute ESLint
```

## Structure du projet

```
src/
├── app/             # Pages Next.js (App Router)
├── components/      # Composants React
├── lib/             # Fonctions utilitaires
└── styles/          # Styles globaux
```

## Documentation

- [Configuration du CMS](docs/CMS_SETUP.md) - Guide pour configurer et utiliser le système de gestion de contenu

## Déploiement

Le site peut être déployé sur Vercel, Netlify, ou tout autre service supportant Next.js.