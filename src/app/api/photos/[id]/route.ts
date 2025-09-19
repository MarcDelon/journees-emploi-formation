import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const photos = dataManager.getPhotos();
    const photo = photos.find(p => p.id === id);
    if (!photo) {
      return NextResponse.json({ success: false, error: 'Photo non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: photo });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération de la photo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const photo = dataManager.updatePhoto(id, body);
    if (!photo) {
      return NextResponse.json({ success: false, error: 'Photo non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: photo });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour de la photo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = dataManager.deletePhoto(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Photo non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la suppression de la photo' }, { status: 500 });
  }
}










