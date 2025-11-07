'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Users, Sparkles, Target, Award } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Optimized parallax for smooth scroll performance
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background avec gradient statique optimisé */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      
      {/* Motif SVG animé en arrière-plan */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="/images/svg/hero-pattern.svg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Éléments décoratifs statiques optimisés */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-egalite-blue/20 rounded-full opacity-60" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-egalite-yellow/20 rounded-full opacity-40" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-egalite-blue/15 rounded-full opacity-50" />
      
      {/* Particules flottantes réduites pour la performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-egalite-blue/40 rounded-full"
            style={{
              left: `${25 + i * 25}%`,
              top: `${20 + i * 30}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="container-custom relative z-10"
        style={{ y, opacity, willChange: "transform, opacity" }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-egalite-blue to-egalite-yellow text-white px-6 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Événement 2024</span>
          </motion.div>

          {/* Titre principal avec effet de typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-display font-bold text-egalite-dark mb-6"
          >
            <span className="text-gradient">
              Journées de l'Emploi
            </span>
            <motion.span 
              className="text-4xl md:text-6xl text-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              et de la Formation
            </motion.span>
          </motion.h1>

          {/* Sous-titre avec effet de fade */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Égalité Pour Tous relie jeunes, écoles et entreprises pour l’insertion professionnelle et l’appui RH des TPE/PME. Programmes, coaching, recrutement et événements (Journées de l’Emploi & de la Formation) au service d’un avenir inclusif et performant.
          </motion.p>

          {/* Informations clés avec hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            <motion.div 
              className="flex items-center space-x-2 text-gray-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(135, 206, 235, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Calendar className="w-5 h-5 text-egalite-blue" />
              <span>15-16 Décembre 2024</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-gray-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <MapPin className="w-5 h-5 text-egalite-yellow" />
              <span>Paris, France</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-gray-600 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(135, 206, 235, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Users className="w-5 h-5 text-egalite-blue" />
              <span>50+ Entreprises</span>
            </motion.div>
          </motion.div>

          {/* Boutons d'action avec effets améliorés */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/offres-emploi"
                className="btn-primary group flex items-center space-x-2 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-egalite-blue to-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
                <span className="relative z-10">Voir les offres d'emploi</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-200 ease-out relative z-10" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/journees-emploi"
                className="btn-secondary group flex items-center space-x-2 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-egalite-yellow to-yellow-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
                <span className="relative z-10">Participer à l'événement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-200 ease-out relative z-10" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Statistiques rapides avec compteurs animés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto"
          >
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="text-3xl font-bold text-egalite-blue mb-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.7 }}
              >
                500+
              </motion.div>
              <div className="text-sm text-gray-600">Offres d'emploi</div>
            </motion.div>
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="text-3xl font-bold text-egalite-yellow mb-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.8 }}
              >
                50+
              </motion.div>
              <div className="text-sm text-gray-600">Entreprises</div>
            </motion.div>
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="text-3xl font-bold text-egalite-blue mb-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.9 }}
              >
                2000+
              </motion.div>
              <div className="text-sm text-gray-600">Visiteurs attendus</div>
            </motion.div>
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="text-3xl font-bold text-egalite-yellow mb-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.0 }}
              >
                100%
              </motion.div>
              <div className="text-sm text-gray-600">Gratuit</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator amélioré */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div 
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => {
            document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-gradient-to-b from-egalite-blue to-egalite-yellow rounded-full mt-2"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, ease: "easeOut" }}
          className="text-xs text-gray-500 mt-2 text-center"
        >
          Scroll pour découvrir
        </motion.p>
      </motion.div>
    </section>
  )
}

export default HeroSection
