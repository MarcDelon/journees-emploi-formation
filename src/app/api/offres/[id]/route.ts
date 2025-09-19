import { NextRequest, NextResponse } from 'next/server';
import { getJobOfferById, updateJobOffer, deleteJobOffer } from '@/lib/supabase.queries';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const offre = await getJobOfferById(params.id);
    if (!offre) {
      return NextResponse.json({ success: false, error: 'Offre non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: offre });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération de l\'offre' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const offre = await updateJobOffer(params.id, body);
    return NextResponse.json({ success: true, data: offre });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour de l\'offre' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteJobOffer(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la suppression de l\'offre' }, { status: 500 });
  }
}

