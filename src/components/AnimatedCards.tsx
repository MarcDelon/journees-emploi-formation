'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, TrendingUp, Award, Heart, Zap, Star, Briefcase, Calendar } from 'lucide-react'

const AnimatedCards = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const cards = [
    {
      icon: Users,
      title: "Personnes accompagnées",
      value: "2,847",
      change: "+12%",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      description: "Cette année"
    },
    {
      icon: TrendingUp,
      title: "Taux de réussite",
      value: "94%",
      change: "+5%",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      description: "Emploi durable"
    },
    {
      icon: Award,
      title: "Prix remportés",
      value: "15",
      change: "+3",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      description: "Innovation sociale"
    },
    {
      icon: Heart,
      title: "Partenaires",
      value: "127",
      change: "+18",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      description: "Entreprises engagées"
    },
    {
      icon: Zap,
      title: "Formations dispensées",
      value: "89",
      change: "+23",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      description: "Programmes actifs"
    },
    {
      icon: Star,
      title: "Satisfaction",
      value: "98%",
      change: "+2%",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      description: "Bénéficiaires"
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
             {/* Fond animé pour la section */}
       <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/50" />
      
             {/* Particules de fond */}
       {[...Array(20)].map((_, i) => (
         <motion.div
           key={i}
           className="absolute w-1 h-1 bg-gray-300/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="container-custom relative z-10">
        {/* Titre de section */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white text-black border-2 border-black px-6 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Nos Réalisations</span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-egalite-dark mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Impact Mesurable
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Découvrez les chiffres qui témoignent de notre engagement pour l'égalité des chances
          </motion.p>
        </motion.div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={index}
                className={`${card.bgColor} rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Fond animé de la carte */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  animate={{
                    background: [
                      `linear-gradient(45deg, var(--tw-gradient-stops))`,
                      `linear-gradient(225deg, var(--tw-gradient-stops))`,
                      `linear-gradient(45deg, var(--tw-gradient-stops))`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Particules de la carte */}
                <div className="absolute inset-0 overflow-hidden">
                                     {[...Array(5)].map((_, i) => (
                     <motion.div
                       key={i}
                       className="absolute w-1 h-1 bg-gray-400/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
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
                </div>

                <div className="relative z-10">
                  {/* Icône */}
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Contenu */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {card.title}
                    </h3>
                    
                    <div className="flex items-baseline space-x-2">
                      <motion.span
                        className="text-4xl font-bold text-gray-900"
                        initial={{ scale: 0.8 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      >
                        {card.value}
                      </motion.span>
                      <motion.span
                        className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        {card.change}
                      </motion.span>
                    </div>
                    
                    <p className="text-gray-600 text-sm">
                      {card.description}
                    </p>
                  </div>

                  {/* Indicateur de progression animé */}
                  <motion.div
                    className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                  >
                    <motion.div
                      className={`h-full bg-gradient-to-r ${card.color}`}
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1.5, delay: 0.6 + index * 0.1 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Call-to-action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
                     <motion.button
             className="bg-white text-black border-2 border-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-50"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir tous nos résultats
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default AnimatedCards
