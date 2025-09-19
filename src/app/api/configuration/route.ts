import { NextRequest, NextResponse } from 'next/server';
import { dataManager } from '@/lib/data-manager';

export async function GET() {
  try {
    const configuration = dataManager.getConfiguration();
    return NextResponse.json({ success: true, data: configuration });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la récupération de la configuration' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const configuration = dataManager.updateConfiguration(body);
    return NextResponse.json({ success: true, data: configuration });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erreur lors de la mise à jour de la configuration' }, { status: 500 });
  }
}









