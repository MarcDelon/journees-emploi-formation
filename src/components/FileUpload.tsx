'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, File, Image, Video, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  acceptedTypes?: string[];
  maxSize?: number; // en MB
  preview?: boolean;
  className?: string;
  disabled?: boolean;
  fileType?: 'image' | 'video' | 'any';
}

export default function FileUpload({
  onFileSelect,
  onFileRemove,
  acceptedTypes = ['image/*', 'video/*'],
  maxSize = 50, // 50MB par défaut
  preview = true,
  className = '',
  disabled = false,
  fileType = 'any'
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Vérifier la taille du fichier
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Le fichier est trop volumineux. Taille maximale: ${maxSize}MB`);
      return;
    }

    // Vérifier le type de fichier
    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isValidType) {
      toast.error('Type de fichier non supporté');
      return;
    }

    setUploading(true);
    setSelectedFile(file);

    try {
      // Créer une URL de prévisualisation
      if (preview) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      // Appeler la fonction de callback
      await onFileSelect(file);
      toast.success('Fichier sélectionné avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sélection du fichier');
      console.error('Erreur:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileRemove?.();
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const getFileIcon = () => {
    if (fileType === 'image') return <Image className="w-8 h-8 text-blue-500" />;
    if (fileType === 'video') return <Video className="w-8 h-8 text-purple-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const getFileTypeLabel = () => {
    if (fileType === 'image') return 'Image';
    if (fileType === 'video') return 'Vidéo';
    return 'Fichier';
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive
            ? 'border-event-blue bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />

        {previewUrl && preview ? (
          <div className="relative">
            {fileType === 'image' ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : fileType === 'video' ? (
              <video
                src={previewUrl}
                className="w-full h-48 object-cover rounded-lg"
                controls
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                {getFileIcon()}
                <span className="ml-2 text-gray-600">{selectedFile?.name}</span>
              </div>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-event-blue animate-spin mb-2" />
                <p className="text-sm text-gray-600">Upload en cours...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">
                  Glissez-déposez votre {getFileTypeLabel().toLowerCase()} ici
                </p>
                <p className="text-xs text-gray-500">
                  ou cliquez pour sélectionner
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Taille max: {maxSize}MB
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="mt-2 text-xs text-gray-500">
          <p>Fichier sélectionné: {selectedFile.name}</p>
          <p>Taille: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
}



















