import { NextRequest, NextResponse } from 'next/server'
import { getPartnerById, updatePartner, deletePartner } from '@/lib/supabase.queries'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const partenaire = await getPartnerById(params.id)
    return NextResponse.json({ success: true, data: partenaire })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération du partenaire' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const partenaire = await updatePartner(params.id, body)
    return NextResponse.json({ success: true, data: partenaire })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour du partenaire' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deletePartner(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la suppression du partenaire' }, { status: 500 })
  }
}




