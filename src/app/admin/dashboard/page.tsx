'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Users, 
  Briefcase, 
  Video, 
  Image, 
  Settings, 
  BarChart3,
  Building2,
  FileText,
  Shield,
  Eye,
  Edit,
  Plus,
  LogOut
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { createAdminSupabaseClient, createFrontendSupabaseClient } from '@/lib/supabaseClient'

interface DashboardStats {
  offres: number
  videos: number
  images: number
  partenaires: number
  vues: number
  candidatures: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    offres: 0,
    videos: 0,
    images: 0,
    partenaires: 0,
    vues: 0,
    candidatures: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = () => {
      const adminToken = localStorage.getItem('admin_token')
      const adminUser = localStorage.getItem('admin_user')
      
      if (!adminToken) {
        router.push('/admin')
        return
      }
      
      if (adminUser) {
        setUser(JSON.parse(adminUser))
      }
    }
    
    checkAuth()
    
    // Charger les statistiques depuis Supabase
    const loadStats = async () => {
      try {
        const supabase = createAdminSupabaseClient() || createFrontendSupabaseClient()
        if (!supabase) throw new Error('Supabase non initialisé (vérifiez les variables NEXT_PUBLIC_SUPABASE_URL et clé)')

        const [offers, partners, applications] = await Promise.all([
          supabase.from('job_offers').select('*', { count: 'exact', head: true }),
          supabase.from('partners').select('*', { count: 'exact', head: true }),
          supabase.from('applications').select('*', { count: 'exact', head: true })
        ])

        setStats(prev => ({
          offres: offers.count || 0,
          videos: prev.videos, // TODO: connecter à table vidéos si dispo
          images: prev.images, // TODO: connecter à table images si dispo
          partenaires: partners.count || 0,
          vues: prev.vues, // TODO: connecter à analytics si dispo
          candidatures: applications.count || 0
        }))
      } catch (e) {
        // Éviter d'afficher un toast global si l'appel échoue
        console.error('Erreur chargement stats admin:', e)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    toast.success('Déconnexion réussie')
    router.push('/admin')
  }

  const adminModules = [
    {
      title: 'Offres d\'Emploi',
      description: 'Gérer les offres de stage, CDD, formation et bénévolat',
      icon: Briefcase,
      href: '/admin/offres',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      count: stats.offres
    },
    {
      title: 'Témoignages Vidéo',
      description: 'Upload et gestion des vidéos de témoignages',
      icon: Video,
      href: '/admin/videos',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      count: stats.videos
    },
    {
      title: 'Galerie d\'Images',
      description: 'Organisation et édition de la galerie photo',
      icon: Image,
      href: '/admin/galerie',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      count: stats.images
    },
    {
      title: 'Partenaires',
      description: 'Gestion des entreprises et partenaires',
      icon: Building2,
      href: '/admin/partenaires',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      count: stats.partenaires
    },
    {
      title: 'Contenus Pages',
      description: 'Édition des textes et sections du site',
      icon: FileText,
      href: '/admin/contenus',
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
      count: 8
    },
    {
      title: 'Statistiques',
      description: 'Analytics et rapports de performance',
      icon: BarChart3,
      href: '/admin/stats',
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      count: stats.vues
    }
  ]

  const quickStats = [
    { label: 'Vues Totales', value: stats.vues, icon: Eye, color: 'text-blue-600' },
    { label: 'Candidatures', value: stats.candidatures, icon: FileText, color: 'text-green-600' },
    { label: 'Offres Actives', value: stats.offres, icon: Briefcase, color: 'text-purple-600' },
    { label: 'Partenaires', value: stats.partenaires, icon: Building2, color: 'text-orange-600' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification des permissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Admin */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-event-blue" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Admin</h1>
                <p className="text-sm text-gray-500">Journées de l'Emploi et Formation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Voir le site</span>
              </Link>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Bonjour, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques Rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? '...' : stat.value.toLocaleString()}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        

        {/* Modules d'Administration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={module.href}
                className="block bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <div className={`${module.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <module.icon className="w-8 h-8" />
                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      {module.count}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Gérer
                    </span>
                    <Edit className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}