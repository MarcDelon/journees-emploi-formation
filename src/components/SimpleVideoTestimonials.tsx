'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useState, useRef } from 'react'

const SimpleVideoTestimonials = () => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const videoTestimonials = [
    {
      id: 1,
      title: "Témoignage T1 - Parcours de Réussite",
      description: "Découvrez comment notre accompagnement a transformé une carrière",
      videoUrl: "/images/T1.mp4",
      person: {
        name: "AMANDA BAKANG",
        role: "Sales Manager",
        company: "Association"
      }
    },
    {
      id: 2,
      title: "Témoignage T2 - Reconversion Professionnelle", 
      description: "Un parcours inspirant de reconversion et de réussite",
      videoUrl: "/images/T2.MP4",
      person: {
        name: "Angela Payoug",
        role: "Étudiante",
        company: "Association"
      }
    },
    {
      id: 3,
      title: "Témoignage T3 - Succès Entrepreneurial",
      description: "Comment l'accompagnement a mené à la création d'entreprise",
      videoUrl: "/images/T3.MP4",
      person: {
        name: "Sih Melissa Cindy",
        role: "Ambassadeur Junior du Cameroun",
        company: "Association"
      }
    }
  ]

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (playingVideo === index) {
      video.pause()
      setPlayingVideo(null)
    } else {
      // Pause toutes les autres vidéos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause()
        }
      })
      video.play()
      setPlayingVideo(index)
    }
  }

  const toggleMute = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    video.muted = !video.muted
    setIsMuted(!video.muted)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full mb-6"
          >
            <Play className="w-4 h-4" />
            <span className="text-sm font-semibold">Témoignages Vidéo</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Nos Témoignages
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Découvrez les témoignages authentiques de nos participants
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Lecteur vidéo */}
              <div className="relative aspect-video bg-gray-900">
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={video.videoUrl}
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: 'center top' }}
                  onPlay={() => setPlayingVideo(index)}
                  onPause={() => setPlayingVideo(null)}
                  onEnded={() => setPlayingVideo(null)}
                  muted={isMuted}
                  loop={false}
                />
                
                {/* Overlay de contrôles */}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <motion.button
                    onClick={() => togglePlay(index)}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {playingVideo === index ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </motion.button>
                </div>

                {/* Contrôles audio */}
                <div className="absolute top-4 right-4">
                  <motion.button
                    onClick={() => toggleMute(index)}
                    className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {video.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {video.description}
                </p>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {video.person.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{video.person.name}</div>
                    <div className="text-sm text-gray-500">{video.person.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SimpleVideoTestimonials
