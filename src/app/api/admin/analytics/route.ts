import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // Compter le nombre total de vues
    const { count: totalViews, error: viewsError } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })

    if (viewsError) {
      console.error('Error counting page views:', viewsError)
      return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 })
    }

    // Compter les vues uniques (par IP) - approximation
    const { data: uniqueViews, error: uniqueError } = await supabase
      .from('page_views')
      .select('ip_address')
      .not('ip_address', 'is', null)

    if (uniqueError) {
      console.error('Error counting unique views:', uniqueError)
    }

    // Calculer les vues uniques (approximation basée sur les IPs uniques)
    const uniqueIPs = new Set(uniqueViews?.map(view => view.ip_address) || [])
    const uniqueViewsCount = uniqueIPs.size

    // Statistiques par page
    const { data: pageStats, error: pageStatsError } = await supabase
      .from('page_views')
      .select('page_path')
      .order('created_at', { ascending: false })

    if (pageStatsError) {
      console.error('Error getting page stats:', pageStatsError)
    }

    // Compter les vues par page
    const pageViewsMap = new Map<string, number>()
    pageStats?.forEach(view => {
      const count = pageViewsMap.get(view.page_path) || 0
      pageViewsMap.set(view.page_path, count + 1)
    })

    const pageViewsArray = Array.from(pageViewsMap.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)

    return NextResponse.json({
      totalViews: totalViews || 0,
      uniqueViews: uniqueViewsCount,
      pageViews: pageViewsArray,
      lastUpdated: new Date().toISOString()
    })
  } catch (e: any) {
    console.error('Error in analytics API:', e)
    return NextResponse.json({ error: e.message || 'Server error' }, { status: 500 })
  }
}
