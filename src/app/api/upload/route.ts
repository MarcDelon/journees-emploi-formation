import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Type de fichier non supporté. Types autorisés: ' + allowedTypes.join(', ') 
      }, { status: 400 });
    }

    // Vérifier la taille (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        success: false, 
        error: 'Fichier trop volumineux. Taille maximale: 100MB' 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Créer des sous-dossiers par type
    const fileType = file.type.startsWith('image/') ? 'images' : 'videos';
    const typeDir = join(uploadsDir, fileType);
    if (!existsSync(typeDir)) {
      await mkdir(typeDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}-${randomString}.${extension}`;
    
    const filepath = join(typeDir, filename);
    await writeFile(filepath, buffer);

    // Retourner l'URL publique du fichier
    const publicUrl = `/uploads/${fileType}/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur lors de l\'upload du fichier' 
    }, { status: 500 });
  }
}













