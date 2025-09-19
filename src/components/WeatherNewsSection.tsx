'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Thermometer, Calendar, TrendingUp } from 'lucide-react'

const WeatherNewsSection = () => {
  const [weather, setWeather] = useState<any>(null)
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Simuler la récupération de données météo
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Simulation de données météo
        // Dans une implémentation réelle, vous utiliseriez une API comme OpenWeatherMap
        const mockWeather = {
          location: 'Genève',
          temperature: 18,
          condition: 'Partiellement nuageux',
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          icon: 'partly-cloudy'
        }
        setWeather(mockWeather)
      } catch (error) {
        console.error('Erreur lors de la récupération des données météo:', error)
      }
    }

    // Simuler la récupération d'actualités
    const fetchNewsData = async () => {
      try {
        // Simulation de données d'actualités
        // Dans une implémentation réelle, vous utiliseriez une API comme NewsAPI
        const mockNews = [
          {
            id: 1,
            title: "Nouvelles offres d'emploi publiées",
            time: "Il y a 5 min",
            category: "Emploi"
          },
          {
            id: 2,
            title: "Météo: Conditions favorables pour les événements en plein air",
            time: "Il y a 15 min",
            category: "Météo"
          },
          {
            id: 3,
            title: "Inscriptions record pour la prochaine édition",
            time: "Il y a 30 min",
            category: "Événement"
          },
          {
            id: 4,
            title: "Nouveau partenaire rejoint l'initiative",
            time: "Il y a 1 heure",
            category: "Partenariat"
          }
        ]
        setNews(mockNews)
      } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
    fetchNewsData()

    // Mettre à jour les données toutes les 5 minutes
    const interval = setInterval(() => {
      fetchWeatherData()
      fetchNewsData()
    }, 300000) // 5 minutes

    return () => clearInterval(interval)
  }, [])

  // Fonction pour obtenir l'icône météo appropriée
  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />
      case 'snowy':
        return <CloudSnow className="w-8 h-8 text-gray-300" />
      case 'windy':
        return <Wind className="w-8 h-8 text-gray-500" />
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-event-blue"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Météo */}
        <div className="p-6 border-r border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Météo en temps réel</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
          </div>
          
          {weather && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getWeatherIcon(weather.icon)}
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{weather.temperature}°C</p>
                    <p className="text-gray-600">{weather.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{weather.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Humidité</p>
                    <p className="font-medium">{weather.humidity}%</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Vent</p>
                    <p className="font-medium">{weather.windSpeed} km/h</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Visibilité</p>
                    <p className="font-medium">{weather.visibility} km</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Section Actualités */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Actualités récentes</h3>
            <TrendingUp className="w-5 h-5 text-event-blue" />
          </div>
          
          <div className="space-y-4">
            {news.map((item) => (
              <motion.div
                key={item.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-event-blue rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{item.time}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="pt-4 border-t border-gray-100">
              <button className="text-sm text-event-blue hover:text-event-orange font-medium flex items-center space-x-1">
                <span>Voir toutes les actualités</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherNewsSection