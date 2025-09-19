const { createClient } = require('@supabase/supabase-js')

// Manually set the environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://djapwzwglnsesokcsdle.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqYXB3endnbG5zZXNva2NzZGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTQ5MjEsImV4cCI6MjA3MzM3MDkyMX0.Wxx3qRAKRlmIINOdWH_lQ8_8vJbvu-QN8yW0Cjzw-Bc'

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...')
  
  try {
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET')
    
    // Create Supabase client with the credentials
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    
    console.log('Supabase client created successfully')
    
    // Test connection by getting schema information
    const { data, error } = await supabase
      .from('job_offers')
      .select('id')
      .limit(1)
    
    if (error) {
      if (error.message.includes('job_offers') || error.message.includes('relation') || error.message.includes('not found')) {
        console.log('✓ Connection successful! (job_offers table does not exist yet, which is expected)')
        console.log('Next step: Run the database setup SQL script in your Supabase SQL editor')
      } else {
        console.error('✗ Error:', error.message)
      }
    } else {
      console.log('✓ Connection successful! job_offers table exists')
      console.log('You can now use the CMS to manage your job offers')
    }
  } catch (error) {
    console.error('✗ Failed to connect to Supabase:', error.message)
  }
}

testSupabaseConnection()