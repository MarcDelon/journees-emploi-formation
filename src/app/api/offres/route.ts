import { NextRequest, NextResponse } from 'next/server';
import { getJobOffers, createJobOffer } from '@/lib/supabase.queries';

export async function GET() {
  try {
    const offres = await getJobOffers();
    return NextResponse.json({ success: true, data: offres });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération des offres' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const offre = await createJobOffer(body);
    return NextResponse.json({ success: true, data: offre });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la création de l\'offre' }, { status: 500 });
  }
}

