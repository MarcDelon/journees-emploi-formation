"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Users, Calendar, Briefcase, Star, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { usePageTracking } from '@/hooks/usePageTracking'

export default function WelcomePage() {
  const router = useRouter()
  const [form, setForm] = useState({ nom: '', prenom: '', telephone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Tracker les vues de page
  usePageTracking()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.nom || !form.prenom || !form.telephone) {
      toast.error('❌ Veuillez renseigner tous les champs obligatoires.', {
        duration: 4000,
        style: {
          background: '#dc2626',
          color: '#fff',
          fontWeight: 'bold'
        }
      })
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/inscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        console.error('Erreur API:', data)
        
        // Gestion spéciale pour les inscriptions multiples
        if (res.status === 409) {
          toast.error('🚫 Numéro déjà utilisé ! Vous êtes déjà inscrit avec ce numéro de téléphone.', {
            duration: 8000,
            style: {
              background: '#dc2626',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)',
            },
            icon: '🚫',
          })
          return
        }
        
        throw new Error(data.error || 'Enregistrement impossible')
      }
      
      toast.success('✅ Inscription réussie ! Redirection vers le site...', {
        duration: 3000,
        style: {
          background: '#059669',
          color: '#fff',
          fontWeight: 'bold'
        }
      })
      
      // Le comptage des candidatures se fait maintenant via la base de données
      setSuccess(true)
      setTimeout(() => router.push('/home'), 2000)
    } catch (err: any) {
      console.error('Erreur:', err)
      toast.error(`❌ Erreur : ${err.message || 'Problème de connexion. Veuillez réessayer.'}`, {
        duration: 6000,
        style: {
          background: '#dc2626',
          color: '#fff',
          fontWeight: 'bold'
        }
      })
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    { icon: Users, text: "Rencontrez des recruteurs" },
    { icon: Briefcase, text: "Découvrez des offres d'emploi" },
    { icon: Calendar, text: "Participez aux ateliers" },
    { icon: Star, text: "Développez votre réseau" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              {/* Logo */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Image src="/images/logo-evenement.jpg.jpeg" alt="Logo" width={48} height={48} className="rounded-lg object-cover" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Journées de l'Emploi</h1>
                  <p className="text-white/80">6ème Édition 2025</p>
                </div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Bienvenue aux
                <span className="block text-orange-300">Journées de l'Emploi</span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Rejoignez l'événement emploi de référence. Inscrivez-vous pour accéder à toutes les opportunités et rester informé des dernières actualités.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <feature.icon className="w-5 h-5 text-orange-300" />
                    <span className="text-white/90">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Bouton d'action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-start"
              >
                <Link
                  href="/home"
                  className="bg-white/20 hover:bg-white/30 border-2 border-white/50 hover:border-white/70 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-white/25 flex items-center justify-center space-x-2 backdrop-blur-sm"
                >
                  <span>Accéder au site</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

        </motion.div>
        
            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-4 sm:p-6 md:p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
                
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 relative z-10"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Inscription réussie !</h3>
                    <p className="text-gray-600 mb-4">Redirection vers le site en cours...</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Accéder au site</h3>
                      <p className="text-sm sm:text-base text-white/90">Renseignez vos informations pour continuer</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="block text-sm font-semibold text-white mb-2">
                            <span className="flex items-center space-x-2">
                              <span>Nom de famille</span>
                              <span className="text-red-300">*</span>
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              name="nom"
                              value={form.nom}
                              onChange={handleChange}
                              className="w-full px-4 py-4 rounded-xl border-2 border-white/30 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/20 backdrop-blur-sm focus:bg-white/30 text-white placeholder-white/70"
                              placeholder="Votre nom de famille"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <Users className="w-5 h-5 text-white/60" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label className="block text-sm font-semibold text-white mb-2">
                            <span className="flex items-center space-x-2">
                              <span>Prénom</span>
                              <span className="text-red-300">*</span>
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              name="prenom"
                              value={form.prenom}
                              onChange={handleChange}
                              className="w-full px-4 py-4 rounded-xl border-2 border-white/30 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/20 backdrop-blur-sm focus:bg-white/30 text-white placeholder-white/70"
                              placeholder="Votre prénom"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <Users className="w-5 h-5 text-white/60" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <label className="block text-sm font-semibold text-white mb-2">
                            <span className="flex items-center space-x-2">
                              <span>Numéro de téléphone</span>
                              <span className="text-red-300">*</span>
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              name="telephone"
                              type="tel"
                              value={form.telephone}
                              onChange={handleChange}
                              className="w-full px-4 py-4 rounded-xl border-2 border-white/30 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/20 backdrop-blur-sm focus:bg-white/30 text-white placeholder-white/70"
                              placeholder="Ex. 07 00 00 00 00"
                              required
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                              <Calendar className="w-5 h-5 text-white/60" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-500/20 border-2 border-red-400/50 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center space-x-2 backdrop-blur-sm"
                        >
                          <div className="w-4 h-4 bg-red-400 rounded-full flex-shrink-0"></div>
                          <span>{error}</span>
                        </motion.div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Enregistrement...</span>
                          </>
                        ) : (
                          <>
                            <span>S'inscrire</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-white/80">
                        En continuant, vous acceptez nos{' '}
                        <Link href="/legal" className="text-blue-300 hover:underline font-medium">
                          conditions d'utilisation
                        </Link>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

