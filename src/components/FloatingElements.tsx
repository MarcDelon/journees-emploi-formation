'use client'

import { motion } from 'framer-motion'
import { Star, Heart, Zap, Award, Users, Briefcase, TrendingUp, Calendar } from 'lucide-react'

const FloatingElements = () => {
  const elements = [
    { icon: Star, color: "text-yellow-400", delay: 0 },
    { icon: Heart, color: "text-red-400", delay: 1 },
    { icon: Zap, color: "text-blue-400", delay: 2 },
    { icon: Award, color: "text-purple-400", delay: 3 },
    { icon: Users, color: "text-green-400", delay: 4 },
    { icon: Briefcase, color: "text-indigo-400", delay: 5 },
    { icon: TrendingUp, color: "text-emerald-400", delay: 6 },
    { icon: Calendar, color: "text-pink-400", delay: 7 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => {
        const Icon = element.icon
        return (
          <motion.div
            key={index}
            className={`absolute ${element.color} opacity-20`}
            style={{
              left: `${10 + (index * 10) % 80}%`,
              top: `${20 + (index * 15) % 60}%`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        )
      })}

      {/* Bulles flottantes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -100, 0],
            x: [0, Math.random() * 30 - 15, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Formes géométriques flottantes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-8 h-8 border border-blue-300/20 rounded-lg"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-6 h-6 border border-purple-300/20 rounded-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-4 h-4 border border-pink-300/20 transform rotate-45"
        animate={{
          rotate: [45, 405],
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Ondes de particules */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 5}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Étoiles scintillantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-yellow-300/40"
          style={{
            left: `${15 + i * 12}%`,
            top: `${25 + i * 8}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        >
          <Star className="w-3 h-3" />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements

