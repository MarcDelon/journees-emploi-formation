'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowRight, Calendar, Users, Sparkles, Star, Zap, Target } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

const CTASection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="section-padding bg-gradient-to-br from-event-blue to-event-orange relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.25, 0.1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/15 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">6e édition - Journées de l'Emploi et de la Formation 2025</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Rejoignez-nous aux Journées de <span className="text-yellow-300 font-bold">l'Emploi et de la Formation</span> !
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Participez à la 6e édition des Journées de l'Emploi et de la Formation à Douala, 
            Cameroun. Plus de <span className="bg-yellow-300 text-black px-2 py-1 rounded font-bold">306 contrats</span> signés lors des précédentes éditions !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <motion.div 
              className="flex items-center space-x-3 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              transition={{ duration: 0.2 }}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-lg">12-14 novembre 2025</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-3 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              transition={{ duration: 0.2 }}
            >
              <Users className="w-6 h-6" />
              <span className="text-lg">Douala</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-white text-event-blue hover:bg-gray-100 font-semibold py-4 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 group flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-event-blue to-event-orange"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <ArrowRight className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform relative z-10 rotate-180" />
              </button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/journees-emploi?scroll=form"
                className="border-2 border-white text-white hover:bg-white hover:text-event-blue font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 group flex items-center space-x-2 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">S'inscrire</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Statistiques rapides */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-white/80">Offres disponibles</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/80">Gratuit</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl font-bold text-white mb-1">3 jours</div>
              <div className="text-sm text-white/80">D'événement</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-white/80"
          >
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Inscription gratuite</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Accès libre</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Networking garanti</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
