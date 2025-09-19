import { NextRequest, NextResponse } from 'next/server';
import { getJobOfferById, updateJobOffer, deleteJobOffer } from '@/lib/supabase.queries';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const offre = await getJobOfferById(id);
    if (!offre) {
      return NextResponse.json({ success: false, error: 'Offre non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: offre });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération de l\'offre' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const offre = await updateJobOffer(id, body);
    return NextResponse.json({ success: true, data: offre });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour de l\'offre' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await deleteJobOffer(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la suppression de l\'offre' }, { status: 500 });
  }
}

