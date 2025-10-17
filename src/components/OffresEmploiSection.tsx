'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building, Eye } from 'lucide-react';
import { OffreEmploi } from '@/lib/types';
import OffreDetailsModal from './OffreDetailsModal';

export default function OffresEmploiSection() {
  const [offres, setOffres] = useState<OffreEmploi[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOffre, setSelectedOffre] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOffres();
  }, []);

  const loadOffres = async (retryCount = 0) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/api/offres', {
        signal: controller.signal,
        cache: 'no-store'
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success) {
        setOffres(data.data.slice(0, 6)); // Afficher seulement les 6 premières
      }
    } catch (error) {
      console.error('Erreur lors du chargement des offres:', error);
      
      // Retry automatique jusqu'à 2 fois
      if (retryCount < 2) {
        console.log(`Tentative ${retryCount + 1}/2...`);
        setTimeout(() => {
          loadOffres(retryCount + 1);
        }, 2000 * (retryCount + 1));
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (offre: OffreEmploi) => {
    // Convertir OffreEmploi vers le format attendu par OffreDetailsModal
    const offreForModal = {
      id: offre.id,
      title: offre.titre,
      company: offre.entreprise,
      description: offre.description,
      type: offre.typeContrat,
      domain: offre.competences.join(', '), // Utiliser les compétences comme domaine
      location: offre.lieu,
      deadline: offre.dateExpiration
    };
    setSelectedOffre(offreForModal as any);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffre(null);
  };

  const getTypeContratColor = (type: string) => {
    const colors = {
      'CDI': 'bg-green-100 text-green-800',
      'CDD': 'bg-blue-100 text-blue-800',
      'Stage': 'bg-purple-100 text-purple-800',
      'Freelance': 'bg-orange-100 text-orange-800',
      'Temps partiel': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des offres d'emploi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (offres.length === 0) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Offres d'emploi</h2>
            <p className="text-gray-600">Aucune offre d'emploi disponible pour le moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Offres d'emploi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les opportunités d'emploi et de formation disponibles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offres.map((offre, index) => (
            <motion.div
              key={offre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {offre.titre}
                  </h3>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getTypeContratColor(offre.typeContrat)}`}>
                    {offre.typeContrat}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="text-sm">{offre.entreprise}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{offre.lieu}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Publié le {new Date(offre.datePublication).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {offre.description}
                </p>

                {offre.salaire && (
                  <p className="text-sm font-medium text-green-600 mb-4">
                    {offre.salaire}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {offre.competences.slice(0, 3).map((competence, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {competence}
                      </span>
                    ))}
                    {offre.competences.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{offre.competences.length - 3}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => handleViewDetails(offre)}
                    className="text-event-blue hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                    title="Voir les détails de l'offre"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Voir détails</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/offres-emploi"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-event-blue hover:bg-blue-700 transition-colors"
          >
            Voir toutes les offres
          </a>
        </div>
      </div>
      
      {/* Modal des détails */}
      {selectedOffre && (
        <OffreDetailsModal
          offre={selectedOffre}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}




























