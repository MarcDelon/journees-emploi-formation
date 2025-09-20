'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Users, Sparkles, Target, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
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
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden layout-stable"
      style={{
        contain: 'layout style',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      {/* Background avec gradient statique optimisé */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 stable-width stable-height" 
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Logo en arrière-plan avec effet subtil - FULL VERTICAL */}
      <div className="absolute inset-0 flex items-center justify-center no-layout-shift" style={{ width: '100%', height: '100%' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
          style={{ 
            willChange: 'transform, opacity',
            width: '100%',
            height: '100%'
          }}
        >
          <Image 
            src="/images/logo-evenement.jpg.jpeg" 
            alt="Journées de l'Emploi et de la Formation - Background" 
            width={1200} 
            height={800}
            className="w-full h-full object-cover filter blur-[1px]"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>
      
      {/* Overlay noir au-dessus du logo background */}
      <div 
        className="absolute inset-0 bg-black/25 stable-width stable-height" 
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Motif SVG animé en arrière-plan */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/images/svg/hero-pattern.svg" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Éléments décoratifs statiques optimisés */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-16 sm:w-20 h-16 sm:h-20 bg-egalite-blue/20 rounded-full opacity-60" />
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-24 sm:w-32 h-24 sm:h-32 bg-egalite-yellow/20 rounded-full opacity-40" />
      <div className="absolute top-1/2 left-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-egalite-blue/15 rounded-full opacity-50" />
      
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
        className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 stable-dimensions"
        style={{ 
          y, 
          opacity, 
          willChange: "transform, opacity",
          width: '100%',
          contain: 'layout'
        }}
      >
        <div className="text-center max-w-4xl mx-auto stable-dimensions mobile-px" style={{ width: '100%' }}>
          {/* Titre principal avec effet de typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mobile-text-3xl font-display font-bold text-egalite-dark mobile-mb stable-dimensions"
            style={{ lineHeight: '1.1' }}
          >
            <span className="text-gradient block">
              Journées de l'Emploi
            </span>
            <motion.span 
              className="mobile-text-2xl text-gray-700 block stable-dimensions -mt-1 sm:-mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              style={{ lineHeight: '1.1' }}
            >
              et de la Formation
            </motion.span>
          </motion.h1>

          {/* Sous-titre avec effet de fade */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="mobile-text-sm text-gray-600 mobile-mb max-w-2xl mx-auto leading-relaxed stable-dimensions"
            style={{ lineHeight: '1.5' }}
          >
            Un événement majeur qui rassemble jeunes talents, écoles de formation et entreprises. Découvrez des opportunités d'emploi, participez aux ateliers de formation et développez votre réseau professionnel lors de cette 6e édition des Journées de l'Emploi et de la Formation.
          </motion.p>

          {/* Informations clés avec hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            className="mobile-flex-col mobile-gap mobile-mb justify-center"
          >
            <motion.div 
              className="flex items-center justify-center space-x-2 text-gray-600 bg-white/50 backdrop-blur-sm mobile-px py-2 rounded-lg border border-gray-200/50 mobile-text-sm"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(135, 206, 235, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-egalite-blue flex-shrink-0" />
              <span className="text-center">12-14 novembre 2025</span>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center space-x-2 text-gray-600 bg-white/50 backdrop-blur-sm mobile-px py-2 rounded-lg border border-gray-200/50 mobile-text-sm"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-egalite-yellow flex-shrink-0" />
              <span className="text-center">Douala, Cameroun</span>
            </motion.div>
            <motion.div 
              className="flex items-center justify-center space-x-2 text-gray-600 bg-white/50 backdrop-blur-sm mobile-px py-2 rounded-lg border border-gray-200/50 mobile-text-sm"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(135, 206, 235, 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-egalite-blue flex-shrink-0" />
              <span className="text-center">50+ Entreprises</span>
            </motion.div>
          </motion.div>

          {/* Boutons d'action avec effets améliorés */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            className="mobile-flex-col mobile-gap justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/home"
                className="btn-primary group flex items-center justify-center space-x-2 relative overflow-hidden w-full sm:w-auto"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-egalite-blue to-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
                <span className="relative z-10">Accéder au site</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-all duration-200 ease-out relative z-10" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/journees-emploi?scroll=form"
                className="btn-secondary group flex items-center justify-center space-x-2 relative overflow-hidden w-full sm:w-auto"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-egalite-yellow to-yellow-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
                <span className="relative z-10">S'inscrire</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-all duration-200 ease-out relative z-10" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Statistiques rapides avec compteurs animés */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="mobile-grid-1 mobile-gap mobile-mt max-w-3xl mx-auto"
          >
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm mobile-p rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="mobile-text-xl font-bold text-egalite-blue mobile-mb"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.7 }}
              >
                500+
              </motion.div>
              <div className="mobile-text-sm text-gray-600">Offres d'emploi</div>
            </motion.div>
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm mobile-p rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="mobile-text-xl font-bold text-egalite-yellow mobile-mb"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.8 }}
              >
                50+
              </motion.div>
              <div className="mobile-text-sm text-gray-600">Entreprises</div>
            </motion.div>
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm mobile-p rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="mobile-text-xl font-bold text-egalite-blue mobile-mb"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.9 }}
              >
                2000+
              </motion.div>
              <div className="mobile-text-sm text-gray-600">Visiteurs attendus</div>
            </motion.div>
            <motion.div 
              className="text-center bg-white/60 backdrop-blur-sm mobile-p rounded-xl border border-gray-200/50"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div 
                className="mobile-text-xl font-bold text-egalite-yellow mobile-mb"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.0 }}
              >
                100%
              </motion.div>
              <div className="mobile-text-sm text-gray-600">Gratuit</div>
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
