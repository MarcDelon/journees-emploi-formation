import { NextRequest, NextResponse } from 'next/server';
import { getPartners, createPartner } from '@/lib/supabase.queries';

export async function GET() {
  try {
    const partenaires = await getPartners();
    return NextResponse.json({ success: true, data: partenaires });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Erreur lors de la récupération des partenaires' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const partenaire = await createPartner(body);
    return NextResponse.json({ success: true, data: partenaire });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Erreur lors de la création du partenaire' }, { status: 500 });
  }
}




