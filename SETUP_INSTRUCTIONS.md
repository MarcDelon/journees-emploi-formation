# Setup Instructions for CMS

## Step 1: Environment Configuration

The `.env.local` file has already been created with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://djapwzwglnsesokcsdle.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYXB3endnbG5zZXNva2NzZGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTQ5MjEsImV4cCI6MjA3MzM3MDkyMX0.Wxx3qRAKRlmIINOdWH_lQ8_8vJbvu-QN8yW0Cjzw-Bc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYXB3endnbG5zZXNva2NzZGxlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc5NDkyMSwiZXhwIjoyMDczMzcwOTIxfQ.say7tKnynY5bToPKlyZQq6KbP7BpSzMfuN4gljnjfbs
```

## Step 2: Database Setup

1. Go to your Supabase project dashboard: https://app.supabase.com/project/djapwzwglnsesokcsdle
2. Navigate to the SQL editor
3. Copy the contents of `supabase/setup-database.sql` and paste it into the SQL editor
4. Click "Run" to execute the script

This will create all necessary tables and insert some sample data for testing.

## Step 3: Test the Connection

Run the following command to verify that your Supabase connection is working:

```bash
npm run test:supabase
```

## Step 4: Start the Development Server

```bash
npm run dev
```

## Step 5: Access the CMS

1. Open your browser and go to http://localhost:3000/admin
2. Use the demo credentials to log in:
   - Email: admin@egalitepourstous.com
   - Password: admin2024

## Step 6: Use the CMS Features

The CMS now includes sections for:

1. **Job Offers Management** (`/admin/offres`)
   - Create, edit, and delete job offers
   - Filter by type and status

2. **Job Seeker Activities** (`/admin/activites/chercheurs`)
   - Manage profiles of job seekers
   - Track their skills and availability

3. **Company Activities** (`/admin/activites/entreprises`)
   - Manage participating companies
   - Track company contacts and sectors

## Troubleshooting

If you encounter any issues:

1. **Connection errors**: Verify your Supabase credentials in `.env.local`
2. **Table not found errors**: Make sure you've run the database setup script
3. **Permission errors**: Ensure you're using the service role key for admin operations

For additional help, check the documentation in `docs/CMS_SETUP.md`.