import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface UseFileUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: string) => void;
  maxSize?: number; // en MB
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    
    try {
      // Vérifier la taille du fichier
      const maxSize = (options.maxSize || 100) * 1024 * 1024; // Convertir en bytes
      if (file.size > maxSize) {
        const error = `Fichier trop volumineux. Taille maximale: ${options.maxSize || 100}MB`;
        toast.error(error);
        options.onError?.(error);
        return null;
      }

      // Créer FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload du fichier
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Erreur lors de l\'upload');
      }

      const url = result.url;
      setUploadedUrl(url);
      options.onSuccess?.(url);
      toast.success('Fichier uploadé avec succès');
      
      return url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload';
      toast.error(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setUploadedUrl(null);
    setUploading(false);
  };

  return {
    uploadFile,
    uploading,
    uploadedUrl,
    reset
  };
}















