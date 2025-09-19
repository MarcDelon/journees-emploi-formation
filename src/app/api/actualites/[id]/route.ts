import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const actualites = dataManager.getActualites();
    const actualite = actualites.find(a => a.id === params.id);
    if (!actualite) {
      return NextResponse.json({ success: false, error: 'Actualité non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: actualite });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération de l\'actualité' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const actualite = dataManager.updateActualite(params.id, body);
    if (!actualite) {
      return NextResponse.json({ success: false, error: 'Actualité non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: actualite });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour de l\'actualité' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = dataManager.deleteActualite(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Actualité non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la suppression de l\'actualité' }, { status: 500 });
  }
}









