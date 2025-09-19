'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const VideoTestimonialsSection = () => {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Données des vidéos de témoignages avec les vraies vidéos T1, T2, T3
  const videoTestimonials = [
    {
      id: 1,
      title: "Témoignage T1 - Parcours de Réussite",
      description: "Découvrez comment notre accompagnement a transformé une carrière",
      videoUrl: "/images/T1.mp4",
      thumbnail: null, // Pas de miniature pour l'instant
      person: {
        name: "AMANDA BAKANG",
        role: "Sales Manager",
        company: "Association"
      },
      duration: "2:30"
    },
    {
      id: 2,
      title: "Témoignage T2 - Reconversion Professionnelle",
      description: "Un parcours inspirant de reconversion et de réussite",
      videoUrl: "/images/T2.MP4",
      thumbnail: null,
      person: {
        name: "Angela Payoug",
        role: "Étudiante",
        company: "Association"
      },
      duration: "3:15"
    },
    {
      id: 3,
      title: "Témoignage T3 - Succès Entrepreneurial",
      description: "Comment l'accompagnement a mené à la création d'entreprise",
      videoUrl: "/images/T3.MP4",
      thumbnail: null,
      person: {
        name: "Sih Melissa Cindy",
        role: "Ambassadeur Junior du Cameroun",
        company: "Association"
      },
      duration: "2:45"
    }
  ]

  useEffect(() => {
    // Auto-play le carousel toutes les 10 secondes si aucune vidéo n'est en cours
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % videoTestimonials.length)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, videoTestimonials.length])

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videoTestimonials.length)
    setIsPlaying(false)
  }

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Éléments décoratifs de fond */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-event-blue/5 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-event-orange/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* En-tête de section */}
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
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-event-blue to-event-orange text-white px-6 py-2 rounded-full mb-6"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-semibold">Témoignages Vidéo</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            Nos Moments Forts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Découvrez les témoignages authentiques de nos participants et partenaires qui racontent leur expérience aux Journées de l'Emploi et de la Formation
          </p>
        </motion.div>

        {/* Lecteur vidéo principal */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative bg-black rounded-3xl overflow-hidden shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video"
              >
                {/* Lecteur vidéo réel */}
                <video
                  ref={videoRef}
                  src={videoTestimonials[currentVideo].videoUrl}
                  className="w-full h-full object-cover"
                  poster={videoTestimonials[currentVideo].thumbnail || undefined}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  muted={isMuted}
                  loop={false}
                />
                
                {/* Overlay de lecture si la vidéo n'est pas en cours */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <motion.button
                      onClick={togglePlay}
                      className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-10 h-10 ml-2" />
                    </motion.button>
                  </div>
                )}

                {/* Contrôles vidéo */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={togglePlay}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </motion.button>

                      <motion.button
                        onClick={toggleMute}
                        className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </motion.button>
                    </div>

                    <div className="text-white text-right">
                      <div className="font-semibold">{videoTestimonials[currentVideo].person.name}</div>
                      <div className="text-sm text-gray-300">
                        {videoTestimonials[currentVideo].person.role} - {videoTestimonials[currentVideo].person.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Contrôles de navigation */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={prevVideo}
              className="flex items-center space-x-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full hover:border-event-blue hover:text-event-blue transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Précédent</span>
            </motion.button>

            {/* Indicateurs de pagination */}
            <div className="flex space-x-3">
              {videoTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCurrentVideo(index)
                    setIsPlaying(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentVideo 
                      ? 'bg-event-blue scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextVideo}
              className="flex items-center space-x-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-full hover:border-event-orange hover:text-event-orange transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-semibold">Suivant</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Grille des miniatures */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {videoTestimonials.map((video, index) => (
              <motion.div
                key={video.id}
                onClick={() => {
                  setCurrentVideo(index)
                  setIsPlaying(false)
                }}
                className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentVideo 
                    ? 'ring-4 ring-event-blue shadow-lg scale-105' 
                    : 'hover:scale-105 hover:shadow-md'
                }`}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center relative overflow-hidden">
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white opacity-80" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="text-white text-xs font-semibold line-clamp-2">
                    {video.person.name}
                  </div>
                  <div className="text-gray-300 text-xs">
                    {video.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </div>
    </section>
  )
}

export default VideoTestimonialsSection