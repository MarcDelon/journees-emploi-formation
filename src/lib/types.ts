// Types pour la gestion de contenu du site

export interface OffreEmploi {
  id: string;
  titre: string;
  entreprise: string;
  lieu: string;
  typeContrat: 'CDI' | 'CDD' | 'Stage' | 'Freelance' | 'Temps partiel';
  description: string;
  competences: string[];
  salaire?: string;
  datePublication: string;
  dateExpiration: string;
  contact: {
    email: string;
    telephone?: string;
    nom: string;
  };
  active: boolean;
  imageUrl?: string;
}

export interface TemoignageVideo {
  id: string;
  titre: string;
  nom: string;
  poste: string;
  entreprise: string;
  videoUrl: string;
  thumbnailUrl?: string;
  description: string;
  datePublication: string;
  active: boolean;
  ordre: number;
}

export interface PhotoEdition {
  id: string;
  titre: string;
  description: string;
  imageUrl: string;
  edition: string; // ex: "6e Édition 2024"
  categorie: 'general' | 'conferences' | 'networking' | 'stands' | 'remise_prix';
  datePublication: string;
  active: boolean;
  ordre: number;
}

export interface Partenaire {
  id: string;
  nom: string;
  logoUrl: string;
  description: string;
  siteWeb?: string;
  type: 'platine' | 'or' | 'argent' | 'bronze' | 'media' | 'institutionnel';
  active: boolean;
  ordre: number;
}

export interface Actualite {
  id: string;
  titre: string;
  contenu: string;
  imageUrl?: string;
  datePublication: string;
  active: boolean;
  ordre: number;
}

export interface Configuration {
  id: string;
  titreSite: string;
  descriptionSite: string;
  emailContact: string;
  telephoneContact: string;
  adresse: string;
  reseauxSociaux: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  editionActuelle: string;
  dateEvenement: string;
  lieuEvenement: string;
}

