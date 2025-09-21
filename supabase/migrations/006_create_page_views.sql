-- Création de la table pour tracker les vues de pages
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL,
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);

-- Activer RLS (Row Level Security)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre l'insertion anonyme (pour tracker les vues)
CREATE POLICY "Allow anonymous insert" ON page_views 
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre la lecture (pour l'admin)
CREATE POLICY "Allow read for admin" ON page_views 
  FOR SELECT USING (true);
