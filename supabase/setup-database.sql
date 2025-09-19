-- SQL script to set up the CMS database tables
-- Copy and paste this into your Supabase SQL editor at: https://app.supabase.com/project/djapwzwglnsesokcsdle/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des offres d'emploi
CREATE TABLE IF NOT EXISTS job_offers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS job_seeker_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS company_activities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_offer_id UUID REFERENCES job_offers(id) ON DELETE CASCADE,
  applicant_name VARCHAR(255) NOT NULL,
  applicant_email VARCHAR(255) NOT NULL,
  cover_letter TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')) DEFAULT 'pending'
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_job_offers_status ON job_offers(status);
CREATE INDEX IF NOT EXISTS idx_job_offers_type ON job_offers(type);
CREATE INDEX IF NOT EXISTS idx_job_offers_created_at ON job_offers(created_at);
CREATE INDEX IF NOT EXISTS idx_job_seeker_activities_status ON job_seeker_activities(status);
CREATE INDEX IF NOT EXISTS idx_job_seeker_activities_experience ON job_seeker_activities(experience_level);
CREATE INDEX IF NOT EXISTS idx_company_activities_status ON company_activities(status);
CREATE INDEX IF NOT EXISTS idx_applications_job_offer_id ON applications(job_offer_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);

-- Insert sample data for testing
INSERT INTO job_offers (title, company, description, type, domain, location, salary, status, requirements, benefits) 
VALUES 
  ('Développeur Web Junior', 'TechStart SARL', 'Rejoignez notre équipe dynamique pour développer des applications web innovantes', 'CDD', 'Informatique', 'Douala, Cameroun', '150000 FCFA', 'active', 'JavaScript, HTML, CSS', 'Formation continue, Tickets restaurant'),
  ('Stage en Marketing Digital', 'DigiCom Agency', 'Opportunité de stage pour apprendre les techniques modernes de marketing digital', 'Stage', 'Marketing', 'Yaoundé, Cameroun', '', 'active', 'Créativité, Maîtrise des réseaux sociaux', 'Mentorat, Certificat de stage');

INSERT INTO job_seeker_activities (name, email, phone, skills, availability, experience_level, status)
VALUES 
  ('Jean Dupont', 'jean.dupont@example.com', '699123456', ARRAY['JavaScript', 'React', 'Node.js'], 'Immédiate', 'Intermédiaire', 'active'),
  ('Marie Nguema', 'marie.nguema@example.com', '677987654', ARRAY['Marketing', 'Communication', 'SEO'], '2 semaines', 'Débutant', 'active');

INSERT INTO company_activities (company_name, contact_person, email, phone, sector, description, status)
VALUES 
  ('TechInnov Solutions', 'Pierre Mbarga', 'p.mbarga@techinnov.com', '698765432', 'Technologie', 'Entreprise spécialisée dans le développement logiciel et les solutions digitales', 'active'),
  ('GreenEco Cameroun', 'Amina Njike', 'a.njike@greeneco.cm', '676543210', 'Environnement', 'Organisme dédié aux solutions écologiques durables au Cameroun', 'active');