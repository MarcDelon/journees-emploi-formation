import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nom, prenom, telephone, message } = body || {}
    if (!nom || !prenom || !telephone) {
      return NextResponse.json({ error: 'Nom, prénom et téléphone sont requis' }, { status: 400 })
    }
    
    // Message par défaut si non fourni
    const messageValue = message || 'Inscription via le formulaire principal'

    // Vérifier si une inscription existe déjà avec ce numéro de téléphone
    const { data: existingRegistration, error: checkError } = await supabase
      .from('registrations')
      .select('id, nom, prenom, telephone, created_at')
      .eq('telephone', telephone)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = "not found", ce qui est normal si pas d'inscription existante
      throw checkError
    }

    if (existingRegistration) {
      return NextResponse.json({ 
        error: 'Une inscription avec ce numéro de téléphone existe déjà. Vous ne pouvez vous inscrire qu\'une seule fois.' 
      }, { status: 409 })
    }

    // Créer la nouvelle inscription
    const { data, error } = await supabase.from('registrations').insert({ nom, prenom, telephone, message: messageValue }).select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur serveur' }, { status: 500 })
  }
}



