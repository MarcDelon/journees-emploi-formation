-- Création des tables pour le système de gestion de contenu

-- Table des offres d'emploi
CREATE TABLE job_offers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('Stage', 'CDD', 'Formation', 'Bénévolat')),
  domain VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  salary VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'draft', 'expired')) DEFAULT 'draft',
  deadline DATE,
  requirements TEXT,
  benefits TEXT
);

-- Table des activités des chercheurs d'emploi
CREATE TABLE job_seeker_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  skills TEXT[] NOT NULL,
  availability VARCHAR(100) NOT NULL,
  experience_level VARCHAR(20) NOT NULL CHECK (experience_level IN ('Débutant', 'Intermédiaire', 'Expérimenté')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active'
);

-- Table des activités des entreprises
CREATE TABLE company_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  sector VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'inactive')) DEFAULT 'active'
);

-- Table des candidatures
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_offer_id UUID REFERENCES job_offers(id) ON DELETE CASCADE,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  cover_letter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending'
);

-- Index pour améliorer les performances
CREATE INDEX idx_job_offers_status ON job_offers(status);
CREATE INDEX idx_job_offers_type ON job_offers(type);
CREATE INDEX idx_job_offers_created_at ON job_offers(created_at);
CREATE INDEX idx_job_seeker_activities_status ON job_seeker_activities(status);
CREATE INDEX idx_job_seeker_activities_experience ON job_seeker_activities(experience_level);
CREATE INDEX idx_company_activities_status ON company_activities(status);
CREATE INDEX idx_applications_job_offer_id ON applications(job_offer_id);
CREATE INDEX idx_applications_status ON applications(status);

-- Table des partenaires
CREATE TABLE partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  secteur VARCHAR(150) NOT NULL,
  logo_url TEXT,
  site_web TEXT,
  description TEXT,
  statut VARCHAR(20) NOT NULL CHECK (statut IN ('actif','inactif')) DEFAULT 'actif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index partenaires
CREATE INDEX idx_partners_statut ON partners(statut);
CREATE INDEX idx_partners_nom ON partners(nom);