'use client'

import { motion, useInView, PanInfo } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Award, FileText, Image as ImageIcon, Video, Sparkles, Star, Zap, Target, TrendingUp, Eye } from 'lucide-react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParticipationForm from '@/components/ParticipationForm'
import { useRef, useEffect, useState, Suspense } from 'react'

// Composant carousel des éditions
const EditionsCarousel = () => {
  const [currentEdition, setCurrentEdition] = useState(0)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const editions = [
    { 
      id: 1, 
      edition: "1ère édition", 
      year: "2020",
      photos: [
        "/images/1.jpeg",
        "/images/1 (2).jpeg", 
        "/images/1 (3).jpeg",
        "/images/1 (4).jpeg"
      ]
    },
    { 
      id: 2, 
      edition: "2ème édition", 
      year: "2021",
      photos: [
        "/images/2.jpeg",
        "/images/2 (2).jpeg",
        "/images/2 (3).jpeg", 
        "/images/2 (4).jpeg"
      ]
    },
    { 
      id: 3, 
      edition: "3ème édition", 
      year: "2022",
      photos: [] // Vidéo - pas de photos
    },
    { 
      id: 4, 
      edition: "4ème édition", 
      year: "2023",
      photos: [
        "/images/4.jpeg",
        "/images/4 (2).jpeg",
        "/images/4 (3).jpeg"
      ]
    },
    { 
      id: 5, 
      edition: "5ème édition", 
      year: "2024",
      photos: [
        "/images/5.jpeg",
        "/images/5 (2).jpeg",
        "/images/5 (3).jpeg",
        "/images/5 (4).jpeg"
      ]
    }
  ]

  // Auto-play le carousel toutes les 3 secondes si pas en hover
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        const currentEditionData = editions[currentEdition]
        
        // Si l'édition a plusieurs photos
        if (currentEditionData.photos.length > 1) {
          // Si on n'est pas à la dernière photo, passer à la suivante
          if (currentPhoto < currentEditionData.photos.length - 1) {
            setCurrentPhoto(prev => prev + 1)
          } else {
            // Si on est à la dernière photo, passer à la première photo de l'édition suivante
            const nextEdition = (currentEdition + 1) % editions.length
            setCurrentEdition(nextEdition)
            setCurrentPhoto(0)
          }
        } else {
          // Si l'édition n'a pas de photos (vidéo), passer à l'édition suivante
          setCurrentEdition((prev) => (prev + 1) % editions.length)
          setCurrentPhoto(0)
        }
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isHovering, currentEdition, currentPhoto, editions])

  const goToEdition = (index: number) => {
    setCurrentEdition(index)
    setCurrentPhoto(0) // Reset à la première photo
  }

  // Gestion du slide tactile
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50 // Distance minimale pour déclencher le changement
    const velocity = info.velocity.x
    const currentEditionData = editions[currentEdition]
    
    if (Math.abs(info.offset.x) > threshold || Math.abs(velocity) > 500) {
      if (info.offset.x > 0 || velocity > 0) {
        // Slide vers la droite - photo précédente ou édition précédente
        if (currentEditionData.photos.length > 1 && currentPhoto > 0) {
          // Si on a plusieurs photos et qu'on n'est pas à la première, aller à la photo précédente
          setCurrentPhoto(prev => prev - 1)
        } else {
          // Sinon, aller à la dernière photo de l'édition précédente
          const prevEdition = (currentEdition - 1 + editions.length) % editions.length
          const prevEditionData = editions[prevEdition]
          setCurrentEdition(prevEdition)
          setCurrentPhoto(prevEditionData.photos.length > 0 ? prevEditionData.photos.length - 1 : 0)
        }
      } else {
        // Slide vers la gauche - photo suivante ou édition suivante
        if (currentEditionData.photos.length > 1 && currentPhoto < currentEditionData.photos.length - 1) {
          // Si on a plusieurs photos et qu'on n'est pas à la dernière, aller à la photo suivante
          setCurrentPhoto(prev => prev + 1)
        } else {
          // Sinon, aller à la première photo de l'édition suivante
          const nextEdition = (currentEdition + 1) % editions.length
          setCurrentEdition(nextEdition)
          setCurrentPhoto(0)
        }
      }
    }
  }

  return (
    <motion.div
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-2xl overflow-hidden bg-gradient-to-br from-egalite-blue/10 to-egalite-yellow/10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-r from-egalite-blue/5 via-transparent to-egalite-yellow/5"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-4 left-4 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6 text-egalite-blue" />
        </motion.div>
      </div>
      <div className="absolute bottom-4 right-4 opacity-20">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-4 h-4 text-egalite-yellow" />
        </motion.div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
        <div className="text-center w-full max-w-7xl mx-auto">
          {/* En-tête */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-egalite-dark px-6 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ImageIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">Galerie des éditions</span>
          </motion.div>

          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-egalite-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Nos éditions précédentes
          </motion.h3>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Découvrez les moments forts de nos éditions passées
          </motion.p>

          {/* Grand cadre avec photo principale */}
          <div className="relative w-full mx-auto mb-8">
            <motion.div
              className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-200/50 overflow-hidden cursor-grab active:cursor-grabbing"
              key={currentEdition}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              dragElastic={0.1}
            >
              {/* Image principale */}
              <div className="relative h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden mb-6">
                {editions[currentEdition].photos.length > 0 ? (
                  <Image 
                    src={editions[currentEdition].photos[currentPhoto]} 
                    alt={`${editions[currentEdition].edition} - Photo ${currentPhoto + 1}`}
                    fill
                    className="object-cover object-top select-none"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-egalite-blue/20 to-egalite-yellow/20 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Video className="w-20 h-20 text-egalite-blue" />
                    </motion.div>
                  </div>
                )}
                
                {/* Overlay avec informations */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h4 className="text-2xl font-bold mb-2">{editions[currentEdition].edition}</h4>
                    <p className="text-lg opacity-90">Édition {editions[currentEdition].year}</p>
                    {editions[currentEdition].photos.length > 1 && (
                      <p className="text-sm opacity-75 mt-1">
                        Photo {currentPhoto + 1} sur {editions[currentEdition].photos.length}
                      </p>
                    )}
                  </div>
                </div>

                {/* Indicateurs de photos pour l'édition actuelle */}
                {editions[currentEdition].photos.length > 1 && (
                  <div className="absolute top-4 left-4 flex space-x-1">
                    {editions[currentEdition].photos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentPhoto ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="text-center">
                <p className="text-gray-600 text-lg">
                  Moment fort de l'édition précédente
                </p>
              </div>
            </motion.div>
          </div>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center space-x-2 mb-6">
            {editions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToEdition(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentEdition 
                    ? 'bg-egalite-blue scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Bouton d'action */}
          <motion.button
            className="bg-white/20 backdrop-blur-sm text-egalite-dark border-2 border-egalite-blue/30 hover:border-egalite-blue/50 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-white/30 flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-4 h-4" />
            <span>Voir toutes les photos</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function ScrollToForm({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) {
  const { useSearchParams } = require('next/navigation') as typeof import('next/navigation')
  const searchParams = useSearchParams()

  useEffect(() => {
    const shouldScrollToForm = searchParams.get('scroll') === 'form'
    if (shouldScrollToForm && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 500)
    }
  }, [searchParams, formRef])

  return null
}

export default function JourneesEmploiPage() {
  const ref = useRef(null)
  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  // Auto-scroll délégué au composant Suspense-safe ScrollToForm

  const eventDetails = {
    date: '12-14 novembre 2025',
    location: 'Geneva Hotel - Douala',
    attendees: '2500+ visiteurs attendus',
    duration: '3 jours',
    companies: '80+ entreprises participantes'
  }

  const objectives = [
    'Valoriser les actions du salon',
    'Faciliter l\'accès à l\'information pour les chercheurs d\'emploi',
    'Renforcer la visibilité des entreprises participantes',
    'Promouvoir l\'insertion professionnelle',
    'Créer des opportunités de networking'
  ]

  const program = [
    {
      day: 'Jour 1 - 12 Novembre',
      events: [
        { time: '09:00', title: 'Ouverture officielle', description: 'Discours d\'ouverture et présentation des objectifs' },
        { time: '10:00', title: 'Conférences plénières', description: 'Interventions sur l\'insertion professionnelle' },
        { time: '14:00', title: 'Salon des entreprises', description: 'Rencontres avec les recruteurs' },
        { time: '17:00', title: 'Networking', description: 'Cocktail de networking' }
      ]
    },
    {
      day: 'Jour 2 - 13 Novembre',
      events: [
        { time: '09:00', title: 'Ateliers de formation', description: 'Sessions de formation et de coaching' },
        { time: '11:00', title: 'Simulations d\'entretien', description: 'Entraînement aux entretiens d\'embauche' },
        { time: '14:00', title: 'Salon des entreprises', description: 'Suite des rencontres avec les recruteurs' },
        { time: '16:00', title: 'Tables rondes', description: 'Discussions thématiques sectorielles' }
      ]
    },
    {
      day: 'Jour 3 - 14 Novembre',
      events: [
        { time: '09:00', title: 'Ateliers spécialisés', description: 'Formations techniques et certifiantes' },
        { time: '11:00', title: 'Forum de l\'innovation', description: 'Présentation des nouvelles tendances' },
        { time: '14:00', title: 'Rencontres finales', description: 'Dernières opportunités de recrutement' },
        { time: '16:00', title: 'Clôture', description: 'Remise des prix et clôture officielle' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={null}>
        <ScrollToForm formRef={formRef} />
      </Suspense>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section ref={ref} className="relative py-20 bg-gradient-to-br from-egalite-blue/10 to-egalite-yellow/10 overflow-hidden">
          {/* Éléments décoratifs animés */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-egalite-blue/10 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-24 h-24 bg-egalite-yellow/10 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.25, 0.1],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/3 w-16 h-16 bg-egalite-blue/8 rounded-full"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            />
          </div>

          {/* Particules flottantes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-egalite-blue/30 rounded-full"
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Badge animé */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-egalite-blue to-egalite-yellow text-white px-6 py-2 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Journées de l'Emploi et de la Formation 2025</span>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-6xl font-display font-bold text-egalite-dark mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Journées de l'Emploi
                <motion.span 
                  className="text-gradient block -mt-2"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  et de la Formation
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                L'événement phare de l'insertion professionnelle organisé par l'Association Égalité Pour Tous
              </motion.p>

              {/* Informations clés animées */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {[
                  { icon: Calendar, text: eventDetails.date, color: 'text-egalite-blue' },
                  { icon: MapPin, text: eventDetails.location, color: 'text-egalite-yellow' },
                  { icon: Users, text: eventDetails.attendees, color: 'text-egalite-blue' },
                  { icon: Clock, text: eventDetails.duration, color: 'text-egalite-yellow' },
                  { icon: Award, text: eventDetails.companies, color: 'text-egalite-blue' }
                ].map((item, index) => (
                                     <motion.div 
                     key={index}
                     className="flex flex-col items-center space-y-3 bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200/50"
                     whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                   >
                    <motion.div
                      className={`w-8 h-8 ${item.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <item.icon className="w-6 h-6" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-600 text-center">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Présentation de l'événement */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-egalite-dark mb-6">
                  Présentation de l'événement
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Les Journées de l'Emploi et de la Formation représentent l'événement phare de notre association 
                  dédié à l'insertion professionnelle. Cet événement unique rassemble entreprises, chercheurs d'emploi, 
                  formateurs et experts pour créer des opportunités de rencontres et d'échanges.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Pendant trois jours, les participants auront l'opportunité de découvrir des offres d'emploi, 
                  de participer à des ateliers de formation, de s'entraîner aux entretiens d'embauche et de 
                  développer leur réseau professionnel.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-egalite-blue/20 to-egalite-yellow/20 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-egalite-dark mb-6">Objectifs de l'événement</h3>
                <ul className="space-y-4">
                  {objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-egalite-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programme */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Éléments décoratifs de fond */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 right-20 w-40 h-40 bg-egalite-blue/5 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-32 h-32 bg-egalite-yellow/5 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
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
                <span className="text-sm font-semibold">Programme Détaillé</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-egalite-dark mb-6">
                Programme de l'événement
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Découvrez le programme détaillé des trois jours d'événement
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {program.map((day, dayIndex) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: dayIndex * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <motion.div 
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: "rgba(255, 255, 255, 0.95)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Effet de brillance au hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <motion.h3 
                      className="text-2xl font-bold text-egalite-dark mb-6 group-hover:text-egalite-blue transition-colors duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {day.day}
                    </motion.h3>
                    
                    <div className="space-y-6">
                      {day.events.map((event, eventIndex) => (
                        <motion.div 
                          key={eventIndex} 
                          className="flex space-x-4 group/item"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div 
                            className="flex-shrink-0 w-16 text-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="text-sm font-bold text-egalite-blue bg-egalite-blue/10 px-3 py-1 rounded-lg">
                              {event.time}
                            </div>
                          </motion.div>
                          <motion.div 
                            className="flex-1 group-hover/item:translate-x-2 transition-transform duration-300"
                          >
                            <h4 className="font-semibold text-egalite-dark mb-1 group-hover/item:text-egalite-blue transition-colors duration-300">
                              {event.title}
                            </h4>
                            <p className="text-gray-600 text-sm">{event.description}</p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Particules décoratives */}
                    <div className="absolute top-2 right-2 opacity-20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="w-3 h-3 text-egalite-blue" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Affiche officielle */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-egalite-dark mb-6">
                Affiche officielle
              </h2>
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-egalite-blue/10 to-egalite-yellow/10 rounded-2xl p-8 border-2 border-dashed border-egalite-blue/30">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 text-egalite-blue" />
                  <p className="text-gray-600 mb-4">
                    L'affiche officielle de l'événement sera disponible ici
                  </p>
                  <button className="btn-primary">
                    Télécharger l'affiche
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Galerie photos/vidéos */}
        <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Éléments décoratifs de fond */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-40 h-40 bg-egalite-blue/5 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-32 h-32 bg-egalite-yellow/5 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, delay: 2 }}
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
                className="inline-flex items-center space-x-2 bg-white text-black border-2 border-black px-6 py-2 rounded-full mb-6"
              >
                <ImageIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">Galerie Multimédia</span>
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-display font-bold text-egalite-dark mb-6">
                Galerie des éditions précédentes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Revivez les moments forts des éditions précédentes
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              {/* Carousel automatique des éditions précédentes */}
              <EditionsCarousel />
            </div>
          </div>
        </section>

        {/* Formulaire de participation */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-egalite-dark mb-6">
                Participer à l'événement
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Inscrivez-vous dès maintenant pour participer aux Journées de l'Emploi et de la Formation
              </p>
            </motion.div>

            <div ref={formRef}>
              <ParticipationForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
