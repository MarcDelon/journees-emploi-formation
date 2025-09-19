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
  Building2,
  Users
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { getJobSeekerActivities, deleteJobSeekerActivity } from '../../../../lib/supabase.queries'

interface JobSeekerActivity {
  id: string
  name: string
  email: string
  phone?: string
  skills: string[]
  availability: string
  experience_level: 'Débutant' | 'Intermédiaire' | 'Expérimenté'
  created_at: string
  status: 'active' | 'inactive'
}

export default function AdminJobSeekerActivities() {
  const [activities, setActivities] = useState<JobSeekerActivity[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const adminToken = localStorage.getItem('admin_token')
    if (!adminToken) {
      router.push('/admin')
      return
    }

    // Charger les activités depuis Supabase
    const loadActivities = async () => {
      try {
        setIsLoading(true)
        const activitiesData = await getJobSeekerActivities()
        setActivities(activitiesData)
      } catch (error) {
        console.error('Erreur lors du chargement des activités:', error)
        toast.error('Erreur lors du chargement des activités')
      } finally {
        setIsLoading(false)
      }
    }

    loadActivities()
  }, [router])

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || activity.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'bg-blue-100 text-blue-800'
      case 'Intermédiaire': return 'bg-purple-100 text-purple-800'
      case 'Expérimenté': return 'bg-green-100 text-green-800'
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
                <h1 className="text-xl font-bold text-gray-900">Activités des Chercheurs d'Emploi</h1>
                <p className="text-sm text-gray-500">{filteredActivities.length} activités trouvées</p>
              </div>
            </div>
            <Link
              href="/admin/activites/chercheurs/new"
              className="bg-gradient-to-r from-event-blue to-event-orange text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle Activité</span>
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
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-event-blue focus:border-transparent"
              />
            </div>
            
            {/* Filtre par statut */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-event-blue focus:border-transparent appearance-none bg-white"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des Activités */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des activités...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{activity.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getExperienceColor(activity.experience_level)}`}>
                          {activity.experience_level}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                          {activity.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{activity.email}</span>
                        </div>
                        {activity.phone && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(activity.created_at).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Compétences:</span> {activity.skills.join(', ')}
                      </p>
                      
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Disponibilité:</span> {activity.availability}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        href={`/admin/activites/chercheurs/${activity.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/activites/chercheurs/${activity.id}/edit`}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
                            try {
                              await deleteJobSeekerActivity(activity.id)
                              // Recharger les activités
                              const activitiesData = await getJobSeekerActivities()
                              setActivities(activitiesData)
                              toast.success('Activité supprimée avec succès')
                            } catch (error) {
                              console.error('Erreur lors de la suppression:', error)
                              toast.error('Erreur lors de la suppression de l\'activité')
                            }
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

        {filteredActivities.length === 0 && !isLoading && (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <p className="text-gray-600 mb-4">Aucune activité trouvée</p>
            <Link
              href="/admin/activites/chercheurs/new"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-event-blue to-event-orange text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Créer la première activité</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}