'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    // Vérifier le statut initial
    setIsOnline(navigator.onLine)

    // Écouter les changements de statut
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showStatus) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg ${
        isOnline 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        {isOnline ? (
          <Wifi className="w-5 h-5" />
        ) : (
          <WifiOff className="w-5 h-5" />
        )}
        <span className="font-medium">
          {isOnline ? 'Connexion rétablie' : 'Connexion perdue'}
        </span>
        {!isOnline && (
          <RefreshCw className="w-4 h-4 animate-spin" />
        )}
      </div>
    </motion.div>
  )
}
