'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function ApiLoadingBar({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const apis = [
      '/api/configuration',
      '/api/inscriptions', 
      '/api/offres',
      '/api/partenaires',
      '/api/actualites',
      '/api/temoignages',
      '/api/photos',
      '/api/analytics/track-view',
      '/api/debug'
    ]

    let completedApis = 0
    const totalApis = apis.length

    const checkApi = async (endpoint: string) => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 secondes timeout

        const response = await fetch(endpoint, {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        clearTimeout(timeoutId)
        return response.ok
      } catch (error) {
        console.warn(`API ${endpoint} failed:`, error)
        return false
      }
    }

    const checkAllApis = async () => {
      for (let i = 0; i < apis.length; i++) {
        await checkApi(apis[i])
        completedApis++
        
        const newProgress = Math.round((completedApis / totalApis) * 100)
        setProgress(newProgress)
        
        // Petit délai entre chaque vérification
        await new Promise(resolve => setTimeout(resolve, 300))
      }
      
      // Attendre un peu avant de terminer
      setTimeout(() => {
        setIsLoading(false)
        onComplete()
      }, 500)
    }

    checkAllApis()
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </motion.div>
            <h2 className="text-xl font-bold text-white mb-2">Initialisation du site</h2>
            <p className="text-white/80 text-sm">Vérification des services en cours...</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-medium text-sm">Progression</span>
              <span className="text-white/80 text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-400 to-green-400"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Loading Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-white/70 text-sm">
              {isLoading ? 'Veuillez patienter...' : 'Chargement terminé !'}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
