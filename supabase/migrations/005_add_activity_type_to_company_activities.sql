-- Add activity_type to company_activities to distinguish Conférence vs Masterclass

-- Create enum type if not exists (Postgres doesn't support IF NOT EXISTS for type creation safely in all versions)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'company_activity_type') THEN
    CREATE TYPE company_activity_type AS ENUM ('conference', 'masterclass');
  END IF;
END $$;

-- Add column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'company_activities' AND column_name = 'activity_type'
  ) THEN
    ALTER TABLE company_activities 
      ADD COLUMN activity_type company_activity_type NOT NULL DEFAULT 'conference';
  END IF;
END $$;

-- Index for filtering by type
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE schemaname = current_schema() AND indexname = 'idx_company_activities_activity_type'
  ) THEN
    CREATE INDEX idx_company_activities_activity_type ON company_activities(activity_type);
  END IF;
END $$;


