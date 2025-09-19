export interface JobOffer {
  id: string
  title: string
  company: string
  description: string
  type: 'Stage' | 'CDD' | 'Formation' | 'Bénévolat'
  domain: string
  location: string
  salary?: string
  created_at: string
  updated_at: string
  status: 'active' | 'draft' | 'expired'
  deadline?: string
  requirements?: string
  benefits?: string
}

export interface JobSeekerActivity {
  id: string
  name: string
  email: string
  phone?: string
  skills: string[]
  availability: string
  experience_level: 'Débutant' | 'Intermédiaire' | 'Expérimenté'
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
}

export interface CompanyActivity {
  id: string
  company_name: string
  contact_person: string
  email: string
  phone?: string
  sector: string
  description: string
  created_at: string
  updated_at: string
  status: 'active' | 'inactive'
}

export interface Application {
  id: string
  job_offer_id: string
  applicant_name: string
  applicant_email: string
  cover_letter?: string
  created_at: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
}

export interface Partner {
  id: string
  nom: string
  secteur: string
  logo_url?: string
  site_web?: string
  description?: string
  statut: 'actif' | 'inactif'
  created_at: string
  updated_at: string
}