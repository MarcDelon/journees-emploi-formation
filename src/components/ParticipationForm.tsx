'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send } from 'lucide-react'

const participationSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  telephone: z.string()
    .min(8, 'Numéro de téléphone trop court')
    .max(15, 'Numéro de téléphone trop long')
    .regex(/^[+]?[0-9\s\-\(\)]+$/, 'Format de numéro de téléphone invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type ParticipationFormData = z.infer<typeof participationSchema>

const ParticipationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null, text: string }>({ type: null, text: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ParticipationFormData>({
    resolver: zodResolver(participationSchema),
  })

  const onSubmit = async (data: ParticipationFormData) => {
    console.log('Début de l\'inscription avec les données:', data)
    setIsSubmitting(true)
    setMessage({ type: null, text: '' }) // Reset message
    
    try {
      console.log('Envoi de la requête à /api/inscriptions')
      const response = await fetch('/api/inscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('Réponse reçue, statut:', response.status)
      const result = await response.json()
      console.log('Résultat de la réponse:', result)

      if (!response.ok) {
        // Gestion spéciale pour les inscriptions multiples
        if (response.status === 409) {
          setMessage({ 
            type: 'error', 
            text: '🚫 Numéro déjà utilisé ! Vous êtes déjà inscrit avec ce numéro de téléphone.' 
          })
          return
        }
        throw new Error(result.error || 'Erreur lors de l\'envoi')
      }
      
      console.log('Inscription réussie !')
      setMessage({ 
        type: 'success', 
        text: '🎉 Inscription réussie ! Nous vous contacterons bientôt.' 
      })
      reset()
    } catch (error: any) {
      console.error('Erreur lors de l\'inscription:', error)
      setMessage({ 
        type: 'error', 
        text: `⚠️ Erreur : ${error.message || 'Problème de connexion. Veuillez réessayer.'}` 
      })
    } finally {
      setIsSubmitting(false)
    }
  }



  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">


        {/* Formulaire */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                {...register('nom')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                  errors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre nom"
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
              )}
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                {...register('prenom')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                  errors.prenom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Votre prénom"
              />
              {errors.prenom && (
                <p className="mt-1 text-sm text-red-600">{errors.prenom.message}</p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                {...register('telephone')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                  errors.telephone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="652 360 895 ou +237 652 360 895"
              />
              {errors.telephone && (
                <p className="mt-1 text-sm text-red-600">{errors.telephone.message}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              {...register('message')}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Décrivez votre motivation pour participer à l'événement..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          {/* Bouton d'envoi */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-egalite-blue to-egalite-yellow text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Envoyer l'inscription</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Message de statut */}
        {message.type && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg text-center font-medium ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Informations supplémentaires */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-egalite-dark mb-3">
            Informations importantes
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• L'inscription est gratuite et ouverte à tous</li>
            <li>• Une seule inscription par numéro de téléphone autorisée</li>
            <li>• Pour toute question, contactez-nous</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ParticipationForm


