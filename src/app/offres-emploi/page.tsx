'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, MapPin, Building, Calendar, Download, Send, Sparkles } from 'lucide-react'
import { getOffresEmploi } from '@/lib/data'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Offre = {
  id: string
  title: string
  company: string
  description?: string
  type: 'Stage' | 'CDD' | 'Formation' | 'Bénévolat'
  domain: string
  location: string
  deadline?: string
}

export default function OffresEmploiPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [offers, setOffers] = useState<Offre[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        // Timeout sécurisé (6s) + AbortController
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 6000)

        const res = await fetch('/api/offres', { cache: 'no-store', signal: controller.signal })
        clearTimeout(timeoutId)

        // Vérifier statut HTTP
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        // Essayer de parser le JSON en sécurité
        let json: any = null
        try {
          json = await res.json()
        } catch {
          json = { data: [] }
        }

        const rows = (json && Array.isArray(json.data) ? json.data : []) as Array<any>

        const mappedFromApi: Offre[] = rows.map((r: any) => ({
          id: r.id ?? String(r.id),
          title: r.title ?? r.titre ?? '',
          company: r.company ?? r.entreprise ?? '',
          description: r.description ?? r.descriptif ?? '',
          type: r.type ?? r.typeContrat ?? 'Stage',
          domain: r.domain ?? r.domaine ?? '',
          location: r.location ?? r.lieu ?? '',
          deadline: r.deadline ?? r.dateLimite ?? undefined
        }))

        if (mappedFromApi.length > 0) {
          setOffers(mappedFromApi)
        } else {
          const seeds = await getOffresEmploi()
          const mappedFromSeeds: Offre[] = seeds.map((s: any) => ({
            id: String(s.id),
            title: s.titre,
            company: s.entreprise,
            description: s.description,
            type: (s.type as any) ?? 'Stage',
            domain: '',
            location: s.lieu,
            deadline: s.datePublication
          }))
          setOffers(mappedFromSeeds)
        }
      } catch (e) {
        // En cas d'erreur réseau/timeout/API -> fallback immédiat
        console.error('Erreur chargement offres, fallback local:', e)
        try {
          const seeds = await getOffresEmploi()
          const mappedFromSeeds: Offre[] = seeds.map((s: any) => ({
            id: String(s.id),
            title: s.titre,
            company: s.entreprise,
            description: s.description,
            type: (s.type as any) ?? 'Stage',
            domain: '',
            location: s.lieu,
            deadline: s.datePublication
          }))
          setOffers(mappedFromSeeds)
        } catch (seedErr) {
          console.error('Erreur fallback seed:', seedErr)
          setOffers([])
        }
      } finally {
        setLoading(false)
        // Signal global loader that offres page is ready for interaction
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('offres-ready'))
        }
      }
    }
    load()
  }, [])

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (offer.company || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || offer.type === selectedType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Stage':
        return 'bg-blue-100 text-blue-800'
      case 'CDD':
        return 'bg-purple-100 text-purple-800'
      case 'Formation':
        return 'bg-green-100 text-green-800'
      case 'Bénévolat':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center w-64">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-black"
              initial={{ width: '0%' }}
              animate={{ width: ['0%', '70%', '100%'] }}
              transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>
          <p className="text-sm text-gray-600">Chargement des offres d'emploi…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
                 <section className="relative py-20 bg-gradient-to-br from-gray-100 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                                 className="inline-flex items-center space-x-2 bg-white text-black border-2 border-black px-6 py-2 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Journées de l'Emploi et de la Formation 2025</span>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Offres d'emploi
                <br />
                                 <span className="text-black">
                   et de stage
                 </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Découvrez nos offres d'emploi et de stage actualisées. 
                Trouvez l'opportunité qui vous correspond !
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filtres et recherche */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* Barre de recherche */}
              <div className="relative mb-6">
                                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un poste, une entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                                     className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Bouton filtres */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                                     className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                                     <Filter className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Filtres avancés</span>
                </button>
              </div>

              {/* Panneau de filtres */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="">Tous les types</option>
                      <option value="Stage">Stage</option>
                      <option value="Bénévolat">Bénévolat</option>
                      <option value="CDD">CDD</option>
                      <option value="Formation">Formation</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Résultats */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {loading ? 'Chargement…' : `${filteredOffers.length} offre${filteredOffers.length > 1 ? 's' : ''} trouvée${filteredOffers.length > 1 ? 's' : ''}`}
              </h2>

              {/* Liste des offres */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {!loading && filteredOffers.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {offer.title}
                        </h3>
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getTypeColor(offer.type)}`}>
                          {offer.type}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-gray-600">
                                                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                             <Building className="w-4 h-4 text-gray-600" />
                          </div>
                          <span className="font-medium">{offer.company}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-600">
                                                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                             <MapPin className="w-4 h-4 text-gray-600" />
                          </div>
                          <span>{offer.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                                                     <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{offer.deadline ? new Date(offer.deadline).toLocaleDateString('fr-FR') : ''}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-6 py-3 border-2 border-black text-black hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-lg">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredOffers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Aucune offre trouvée
                  </h3>
                  <p className="text-gray-500">
                    Essayez de modifier vos critères de recherche
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
