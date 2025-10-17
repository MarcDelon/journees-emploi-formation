import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';
import { Actualite } from '@/lib/types';

export async function GET() {
  try {
    const actualites = dataManager.getActualites();
    return NextResponse.json({ success: true, data: actualites });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération des actualités' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const actualite = dataManager.addActualite(body);
    return NextResponse.json({ success: true, data: actualite });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la création de l\'actualité' }, { status: 500 });
  }
}


























