'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { X, MapPin, Building, Calendar, Clock, Users, DollarSign } from 'lucide-react'

interface OffreDetailsModalProps {
  offre: {
    id: string
    title: string
    company: string
    description?: string
    type: string
    domain: string
    location: string
    deadline?: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function OffreDetailsModal({ offre, isOpen, onClose }: OffreDetailsModalProps) {
  if (!isOpen) return null

  // Auto-scroll pour ramener le modal au centre de l'écran
  React.useEffect(() => {
    if (isOpen) {
      // Scroll automatiquement vers le centre de l'écran pour que le modal soit bien visible
      setTimeout(() => {
        // Calculer la position pour centrer le modal
        const viewportHeight = window.innerHeight
        const scrollPosition = window.scrollY + (viewportHeight / 2)
        
        // Scroll fluide vers cette position
        window.scrollTo({
          top: scrollPosition - (viewportHeight / 2),
          behavior: 'smooth'
        })
        
        // Forcer le centrage du modal dans la zone visible
        const modal = document.querySelector('[data-modal="offre-details"]')
        if (modal) {
          modal.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center', 
            inline: 'center' 
          })
        }
      }, 100)
    }
  }, [isOpen])

  const getTypeColor = (type: string) => {
    const colors = {
      'CDI': 'bg-green-100 text-green-800',
      'CDD': 'bg-blue-100 text-blue-800',
      'Stage': 'bg-purple-100 text-purple-800',
      'Freelance': 'bg-orange-100 text-orange-800',
      'Temps partiel': 'bg-gray-100 text-gray-800',
      'Bénévolat': 'bg-pink-100 text-pink-800',
      'Formation': 'bg-indigo-100 text-indigo-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Rendre le modal directement dans le body pour éviter les problèmes de positionnement
  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-modal="offre-details"
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {offre.title}
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(offre.type)}`}>
                  {offre.type}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{offre.domain}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Company Info */}
          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{offre.company}</h3>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{offre.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {offre.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description du poste</h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {offre.description}
                </p>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date limite</p>
                <p className="font-medium text-gray-900">
                  {offre.deadline ? new Date(offre.deadline).toLocaleDateString('fr-FR') : 'Non spécifiée'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Type de contrat</p>
                <p className="font-medium text-gray-900">{offre.type}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-3 sm:pt-4 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  )
}
