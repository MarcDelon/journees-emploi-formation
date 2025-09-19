import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';
import { TemoignageVideo } from '@/lib/types';

export async function GET() {
  try {
    const temoignages = dataManager.getTemoignages();
    return NextResponse.json({ success: true, data: temoignages });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération des témoignages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const temoignage = dataManager.addTemoignage(body);
    return NextResponse.json({ success: true, data: temoignage });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la création du témoignage' }, { status: 500 });
  }
}

