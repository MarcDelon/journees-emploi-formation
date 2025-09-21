import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { pagePath, userAgent, referrer } = body || {}
    
    if (!pagePath) {
      return NextResponse.json({ error: 'Page path is required' }, { status: 400 })
    }

    // Obtenir l'IP du client
    const ip = req.headers.get('x-forwarded-for') || 
               req.headers.get('x-real-ip') || 
               'unknown'

    // Enregistrer la vue dans la base de données
    const { data, error } = await supabase
      .from('page_views')
      .insert({
        page_path: pagePath,
        user_agent: userAgent || 'unknown',
        ip_address: ip,
        referrer: referrer || null
      })
      .select()
      .single()

    if (error) {
      console.error('Error tracking page view:', error)
      return NextResponse.json({ error: 'Failed to track view' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    console.error('Error in track-view API:', e)
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 })
  }
}
