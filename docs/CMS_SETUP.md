# Configuration du Système de Gestion de Contenu (CMS)

## Introduction

Ce document explique comment configurer et utiliser le système de gestion de contenu (CMS) intégré à l'application pour gérer les offres d'emploi et les activités liées à l'événement.

## Structure du CMS

Le CMS est intégré directement dans le tableau de bord d'administration et permet de gérer :

1. **Les offres d'emploi** (Stages, CDD, Formations, Bénévolat)
2. **Les activités des chercheurs d'emploi**
3. **Les activités des entreprises participantes**

## Configuration requise

1. Un projet Supabase configuré
2. Les variables d'environnement suivantes dans `.env.local` :
   ```
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anonyme_supabase
   SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role_supabase
   ```

## Mise en place de la base de données

1. Exécutez le script de migration :
   ```sql
   -- Exécutez le contenu de supabase/migrations/001_create_tables.sql
   ```

2. Ou créez les tables manuellement via l'interface Supabase :
   - job_offers
   - job_seeker_activities
   - company_activities
   - applications

## Accès au CMS

1. Accédez à l'interface d'administration : `/admin`
2. Connectez-vous avec les identifiants de démonstration :
   - Email : admin@egalitepourstous.com
   - Mot de passe : admin2024

## Fonctionnalités du CMS

### Gestion des offres d'emploi

- **Création** : Ajout de nouvelles offres avec tous les détails
- **Édition** : Modification des offres existantes
- **Suppression** : Suppression des offres
- **Filtrage** : Recherche et filtrage par type, statut, etc.

### Gestion des activités des chercheurs d'emploi

- **Création** : Enregistrement des profils de chercheurs d'emploi
- **Édition** : Mise à jour des profils
- **Suppression** : Suppression des profils
- **Filtrage** : Recherche par nom, email, niveau d'expérience

### Gestion des activités des entreprises

- **Création** : Enregistrement des entreprises participantes
- **Édition** : Mise à jour des informations des entreprises
- **Suppression** : Suppression des entreprises
- **Filtrage** : Recherche par nom d'entreprise, secteur d'activité

## Sécurité

- Toutes les opérations CRUD sont protégées par l'authentification admin
- Les données sont stockées de manière sécurisée dans Supabase
- Les clés d'API sont gérées via les variables d'environnement

## Maintenance

- Les données sont automatiquement horodatées lors de la création/modification
- Les suppressions sont définitives (pas de corbeille)
- Les statistiques sont mises à jour en temps réel

## Support

Pour toute question sur l'utilisation du CMS, contactez l'administrateur du système.