'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, User, Building } from 'lucide-react';
import { TemoignageVideo } from '@/lib/types';

export default function TemoignagesVideoSection() {
  const [temoignages, setTemoignages] = useState<TemoignageVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    loadTemoignages();
  }, []);

  const loadTemoignages = async () => {
    try {
      const response = await fetch('/api/temoignages');
      const data = await response.json();
      if (data.success) {
        setTemoignages(data.data.slice(0, 3)); // Afficher seulement les 3 premiers
      }
    } catch (error) {
      console.error('Erreur lors du chargement des témoignages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getVideoEmbedUrl = (url: string) => {
    // Si c'est une URL YouTube
    const youtubeId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId[1]}`;
    }
    
    // Si c'est une URL de fichier uploadé, retourner directement l'URL
    if (url.startsWith('/uploads/')) {
      return url;
    }
    
    // Pour les autres URLs, essayer de les utiliser directement
    return url;
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des témoignages...</p>
          </div>
        </div>
      </div>
    );
  }

  if (temoignages.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Témoignages vidéo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos participants et partenaires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {temoignages.map((temoignage, index) => (
            <motion.div
              key={temoignage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Thumbnail vidéo */}
              <div className="relative h-48 bg-gray-200 group cursor-pointer">
                {temoignage.thumbnailUrl ? (
                  <img
                    src={temoignage.thumbnailUrl}
                    alt={temoignage.titre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                  <button
                    onClick={() => setSelectedVideo(temoignage.videoUrl)}
                    className="bg-white bg-opacity-20 rounded-full p-4 hover:bg-opacity-30 transition-all transform hover:scale-110"
                  >
                    <Play className="w-8 h-8 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {temoignage.titre}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">{temoignage.nom}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="text-sm">{temoignage.entreprise}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-2">
                  {temoignage.poste}
                </p>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {temoignage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal vidéo */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
            <div className="relative w-full h-0 pb-[56.25%]">
              {isYouTubeUrl(selectedVideo) ? (
                <iframe
                  src={getVideoEmbedUrl(selectedVideo)}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={getVideoEmbedUrl(selectedVideo)}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  controls
                  autoPlay
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
