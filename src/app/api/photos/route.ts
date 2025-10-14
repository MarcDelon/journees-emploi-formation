import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';
import { PhotoEdition } from '@/lib/types';

export async function GET() {
  try {
    const photos = dataManager.getPhotos();
    return NextResponse.json({ success: true, data: photos });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération des photos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const photo = dataManager.addPhoto(body);
    return NextResponse.json({ success: true, data: photo });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la création de la photo' }, { status: 500 });
  }
}






















