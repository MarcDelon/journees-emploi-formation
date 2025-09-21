'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Star, Zap, Award, Users, Briefcase, Heart, Trophy, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const ScrollingNews = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const news = [
    {
      id: 1,
      icon: <Trophy className="w-4 h-4" />,
      text: "Journées de l'Emploi et de la Formation – Plus de 306 contrats signés",
      color: "from-orange-500 to-yellow-500",
      featured: true
    },
    {
      id: 2,
      icon: <Calendar className="w-4 h-4" />,
      text: "6e édition : 12-14 novembre 2025 – Geneva Hotel",
      color: "from-blue-600 to-cyan-500"
    },
    {
      id: 3,
      icon: <CheckCircle className="w-4 h-4" />,
      text: "Journées de l'Emploi et de la Formation 2025 : Plus de 400 offres d'emploi disponibles",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      icon: <Users className="w-4 h-4" />,
      text: "Total participants 2020-2025 : 3 550 personnes",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      icon: <Award className="w-4 h-4" />,
      text: "88% des exposants recommandent le salon aux employeurs",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      icon: <Briefcase className="w-4 h-4" />,
      text: "95% des exposants prêts à renouveler leur participation",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 7,
      icon: <Heart className="w-4 h-4" />,
      text: "13% des candidats sont en situation de handicap",
      color: "from-rose-500 to-red-500"
    },
    {
      id: 8,
      icon: <Star className="w-4 h-4" />,
      text: "Impact entre 2020 et 2025 : transformation du marché de l'emploi",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  return (
    <div className="relative bg-white border-b border-gray-200 overflow-hidden shadow-sm">
                 {/* Fond animé */}
           <div className="absolute inset-0">
             <motion.div
               className="absolute inset-0 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50"
                     animate={{
             background: [
               "linear-gradient(90deg, rgba(249, 250, 251, 0.5), rgba(255, 255, 255, 0.5), rgba(249, 250, 251, 0.5))",
               "linear-gradient(90deg, rgba(249, 250, 251, 0.5), rgba(255, 255, 255, 0.5), rgba(249, 250, 251, 0.5))",
               "linear-gradient(90deg, rgba(249, 250, 251, 0.5), rgba(255, 255, 255, 0.5), rgba(249, 250, 251, 0.5))",
             ],
           }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

             {/* Particules flottantes */}
       {[...Array(15)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-1 h-1 bg-gray-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 py-3">
        <div className="flex items-center justify-center space-x-8">
                     {/* Badge "Actualités" */}
          <motion.div
            className="hidden sm:flex items-center space-x-2 bg-white text-black border-2 border-black px-4 py-1 rounded-full shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-sm font-semibold">ACTUALITÉS</span>
          </motion.div>

          {/* Rubriques défilantes */}
          <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              className="flex space-x-6 sm:space-x-8 whitespace-nowrap px-2"
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                duration: isMobile ? 15 : 25, // Encore plus rapide sur mobile
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...news, ...news].map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 text-gray-700 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-black transition-all duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`p-1 rounded-full bg-gradient-to-r ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-medium group-hover:text-black transition-colors duration-300">
                     {item.text}
                   </span>
                   <motion.div
                     className="w-1 h-1 bg-gray-600 rounded-full"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

                     {/* Bouton "Voir plus" */}
          <motion.button
            className="hidden sm:flex items-center space-x-2 bg-white text-black border-2 border-black px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-300 shadow-sm"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-semibold">Voir plus</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ScrollingNews
