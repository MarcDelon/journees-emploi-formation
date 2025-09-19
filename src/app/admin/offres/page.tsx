'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  Building2
} from 'lucide-react'

interface JobOffer {
  id: string
  title: string
  company: string
  type: 'Stage' | 'CDD' | 'Formation' | 'Bénévolat'
  location: string
  createdAt: string
  status: 'active' | 'draft' | 'expired'
  applicants: number
  deadline?: string
}

export default function AdminOffres() {
  const [offers, setOffers] = useState<JobOffer[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      const adminToken = localStorage.getItem('admin_token')
      if (!adminToken) {
        router.push('/admin')
        return
      }
      setIsLoading(true)
      try {
        const res = await fetch('/api/offres', { cache: 'no-store' })
        const json = await res.json()
        const rows = (json.data || []) as Array<any>
        const mapped: JobOffer[] = rows.map((r: any) => ({
          id: r.id,
          title: r.title,
          company: r.company,
          type: r.type,
          location: r.location,
          createdAt: r.created_at,
          status: r.status,
          applicants: 0,
          deadline: r.deadline || undefined
        }))
        setOffers(mapped)
      } catch (e) {
        console.error('Erreur chargement offres', e)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [router])

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || offer.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Stage': return 'bg-blue-100 text-blue-800'
      case 'CDD': return 'bg-purple-100 text-purple-800'
      case 'Formation': return 'bg-green-100 text-green-800'
      case 'Bénévolat': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Retour au dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gestion des Offres d'Emploi</h1>
                <p className="text-sm text-gray-500">{filteredOffers.length} offres trouvées</p>
              </div>
            </div>
            <Link
              href="/admin/offres/new"
              className="bg-gradient-to-r from-event-blue to-event-orange text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle Offre</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres et Recherche */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par titre ou entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-event-blue focus:border-transparent"
              />
            </div>
            
            {/* Filtre par type */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-event-blue focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Tous les types</option>
                <option value="Stage">Stage</option>
                <option value="CDD">CDD</option>
                <option value="Formation">Formation</option>
                <option value="Bénévolat">Bénévolat</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des Offres */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des offres...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(offer.type)}`}>
                          {offer.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(offer.status)}`}>
                          {offer.status === 'active' ? 'Actif' : offer.status === 'draft' ? 'Brouillon' : 'Expiré'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Building2 className="w-4 h-4" />
                          <span>{offer.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{offer.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{offer.deadline ? new Date(offer.deadline).toLocaleDateString('fr-FR') : new Date(offer.createdAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{offer.applicants}</span> candidature(s) reçue(s)
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/admin/offres/${offer.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/offres/${offer.id}/edit`}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={async () => {
                          if (!confirm('Supprimer cette offre ?')) return;
                          try {
                            await fetch(`/api/offres/${offer.id}`, { method: 'DELETE' });
                            setOffers(prev => prev.filter(o => o.id !== offer.id));
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredOffers.length === 0 && !isLoading && (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <p className="text-gray-600 mb-4">Aucune offre trouvée</p>
            <Link
              href="/admin/offres/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-event-blue to-event-orange text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Créer la première offre</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}