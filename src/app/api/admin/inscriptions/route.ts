import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return NextResponse.json({ items: data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const action = searchParams.get('action')

    if (action === 'clear-all') {
      // Vider toute la liste
      const { error } = await supabase.from('registrations').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      if (error) throw error
      return NextResponse.json({ success: true, message: 'Toutes les inscriptions ont été supprimées' })
    } else if (id) {
      // Supprimer une inscription spécifique
      const { error } = await supabase.from('registrations').delete().eq('id', id)
      if (error) throw error
      return NextResponse.json({ success: true, message: 'Inscription supprimée avec succès' })
    } else {
      return NextResponse.json({ error: 'ID requis pour la suppression' }, { status: 400 })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur lors de la suppression' }, { status: 500 })
  }
}










