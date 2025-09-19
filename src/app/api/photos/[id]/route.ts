import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const photos = dataManager.getPhotos();
    const photo = photos.find(p => p.id === params.id);
    if (!photo) {
      return NextResponse.json({ success: false, error: 'Photo non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: photo });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération de la photo' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const photo = dataManager.updatePhoto(params.id, body);
    if (!photo) {
      return NextResponse.json({ success: false, error: 'Photo non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: photo });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour de la photo' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = dataManager.deletePhoto(params.id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Photo non trouvée' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la suppression de la photo' }, { status: 500 });
  }
}









