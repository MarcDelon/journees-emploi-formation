'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Eye, Heart, Share2, Download } from 'lucide-react'

const ImageGallery = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  const images = [
    {
      id: 1,
      title: "Journées Emploi 2023",
      description: "Plus de 1500 participants",
      category: "Événements",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Formation Professionnelle",
      description: "Accompagnement personnalisé",
      category: "Formation",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Partenariats Entreprises",
      description: "Réseau de 200+ entreprises",
      category: "Partenariats",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Innovation Sociale",
      description: "Prix de l'excellence 2024",
      category: "Récompenses",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      title: "Mentorat Jeunes",
      description: "Programme de développement",
      category: "Accompagnement",
      color: "from-red-500 to-rose-500"
    },
    {
      id: 6,
      title: "Égalité des Chances",
      description: "Impact mesurable",
      category: "Impact",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
             {/* Fond animé */}
       <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
      
             {/* Particules de fond */}
       {[...Array(30)].map((_, i) => (
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-white text-black border-2 border-black px-6 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Eye className="w-4 h-4" />
            <span className="text-sm font-semibold">Galerie Photos</span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Nos Moments Forts
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Découvrez les moments marquants de notre engagement pour l'égalité des chances
          </motion.p>
        </motion.div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Image de fond avec gradient */}
              <div className={`w-full h-64 bg-gradient-to-br ${image.color} relative overflow-hidden`}>
                {/* Motif SVG animé */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <pattern id={`pattern-${image.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3">
                          <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite"/>
                        </circle>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill={`url(#pattern-${image.id})`} />
                  </svg>
                </div>
                
                {/* Overlay avec contenu */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                
                {/* Badge de catégorie */}
                <motion.div
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {image.category}
                </motion.div>
                
                {/* Actions */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.button
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-purple-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
                
                {/* Contenu principal */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <motion.h3
                    className="text-xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {image.title}
                  </motion.h3>
                  <motion.p
                    className="text-white/90 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {image.description}
                  </motion.p>
                </div>
                
                {/* Effet de brillance au survol */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-to-action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
                     <motion.button
             className="bg-white text-black border-2 border-black font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-gray-50 flex items-center space-x-2 mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span>Voir toutes les photos</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ImageGallery
