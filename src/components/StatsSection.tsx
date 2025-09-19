'use client'

import { motion, useInView } from 'framer-motion'
import { Users, Building, Briefcase, Award, TrendingUp, Clock, Target, Star, Trophy, Heart } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [counts, setCounts] = useState([0, 0, 0, 0])

  const stats = [
    {
      icon: Users,
      number: 3550,
      label: 'Participants 2020-2025',
      color: 'text-event-blue',
      suffix: '',
      description: 'Total sur 5 éditions'
    },
    {
      icon: Trophy,
      number: 306,
      label: 'Contrats signés',
      color: 'text-event-orange',
      suffix: '+',
      description: 'Succès concrets'
    },
    {
      icon: Briefcase,
      number: 400,
      label: 'Offres d\'emploi 2025',
      color: 'text-event-blue',
      suffix: '+',
      description: 'Opportunités disponibles'
    },
    {
      icon: Heart,
      number: 13,
      label: 'Candidats handicapés',
      color: 'text-event-orange',
      suffix: '%',
      description: 'Inclusion et diversité'
    }
  ]

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      const intervals = stats.map((stat, index) => {
        return setInterval(() => {
          setCounts(prev => {
            const newCounts = [...prev]
            const target = stat.number
            const current = newCounts[index]
            const increment = target / steps

            if (current < target) {
              newCounts[index] = Math.min(current + increment, target)
            }
            return newCounts
          })
        }, stepDuration)
      })

      return () => intervals.forEach(interval => clearInterval(interval))
    }
  }, [isInView])

  return (
    <section ref={ref} id="stats-section" className="section-padding bg-gradient-to-r from-blue-50/50 to-purple-50/50 relative overflow-hidden">
      {/* Motif SVG en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/images/svg/stats-pattern.svg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-purple-400/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-egalite-blue to-egalite-yellow text-white px-6 py-2 rounded-full mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Impact 2020-2025</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-egalite-dark mb-6">
            Impact entre 2020 et 2025
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les résultats concrets de 5 éditions des Journées de l'Emploi et de la Formation
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.95)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-${stat.color.split('-')[1]}/20 to-${stat.color.split('-')[1]}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  />
                  <stat.icon className={`w-8 h-8 ${stat.color} relative z-10`} />
                </motion.div>
                
                <motion.div 
                  className={`text-4xl font-bold ${stat.color} mb-2`}
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {Math.round(counts[index])}{stat.suffix}
                </motion.div>
                
                <div className="text-gray-600 font-medium mb-2">
                  {stat.label}
                </div>
                
                <motion.div 
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {stat.description}
                </motion.div>

                {/* Effet de brillance au hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Section bonus avec métriques supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-event-blue/10 to-event-orange/10 rounded-2xl p-8 border border-event-blue/20">
            <h3 className="text-2xl font-display font-bold text-egalite-dark mb-8 text-center">
              Satisfaction des exposants
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <motion.div 
                className="text-center bg-white/50 rounded-xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-event-orange mb-2">88%</div>
                <div className="text-sm text-gray-700">Recommandent le salon</div>
              </motion.div>
              <motion.div 
                className="text-center bg-white/50 rounded-xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-event-blue mb-2">95%</div>
                <div className="text-sm text-gray-700">Prêts à renouveler</div>
              </motion.div>
              <motion.div 
                className="text-center bg-white/50 rounded-xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-event-orange mb-2">73%</div>
                <div className="text-sm text-gray-700">Satisfaits de l'organisation</div>
              </motion.div>
              <motion.div 
                className="text-center bg-white/50 rounded-xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-event-blue mb-2">51%</div>
                <div className="text-sm text-gray-700">Adéquation candidature/profil</div>
              </motion.div>
              <motion.div 
                className="text-center bg-white/50 rounded-xl p-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-event-orange mb-2">57%</div>
                <div className="text-sm text-gray-700">Satisfaits qualité CV</div>
              </motion.div>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-bold text-egalite-dark mb-4">
                Évolution des participants par année
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-event-orange">225</div>
                  <div className="text-sm text-gray-600">2020</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-event-blue">408</div>
                  <div className="text-sm text-gray-600">2021</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-event-orange">766</div>
                  <div className="text-sm text-gray-600">2022</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-event-blue">939</div>
                  <div className="text-sm text-gray-600">2023</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-event-orange">1212</div>
                  <div className="text-sm text-gray-600">2024</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection
