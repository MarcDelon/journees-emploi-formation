'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight, User, Building, Award } from 'lucide-react'

const TestimonialsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Développeuse Full Stack",
      company: "TechCorp",
      avatar: "👩‍💻",
      rating: 5,
      content: "Grâce à l'accompagnement de l'association, j'ai pu trouver un emploi dans le développement web. Le mentorat et les formations m'ont donné confiance en mes compétences.",
      category: "Formation"
    },
    {
      id: 2,
      name: "Ahmed Benali",
      role: "Chef de Projet",
      company: "InnovationPlus",
      avatar: "👨‍💼",
      rating: 5,
      content: "L'égalité des chances n'est pas un concept abstrait ici. J'ai été accompagné de A à Z dans ma reconversion professionnelle. Un vrai tremplin vers le succès.",
      category: "Reconversion"
    },
    {
      id: 3,
      name: "Sophie Martin",
      role: "Designer UX/UI",
      company: "CreativeStudio",
      avatar: "👩‍🎨",
      rating: 5,
      content: "Les journées emploi m'ont permis de rencontrer des entreprises qui partagent mes valeurs. Aujourd'hui, je travaille dans une équipe qui valorise la diversité.",
      category: "Emploi"
    },
    {
      id: 4,
      name: "Lucas Rodriguez",
      role: "Commercial B2B",
      company: "SalesForce",
      avatar: "👨‍💼",
      rating: 5,
      content: "Le programme de mentorat m'a ouvert les portes du monde professionnel. Mon mentor m'a guidé dans mes choix de carrière et m'a aidé à développer mon réseau.",
      category: "Mentorat"
    },
    {
      id: 5,
      name: "Emma Thompson",
      role: "Responsable Marketing",
      company: "GrowthAgency",
      avatar: "👩‍💼",
      rating: 5,
      content: "Après une période de chômage, cette association m'a redonné espoir. Les formations sont de qualité et l'accompagnement personnalisé fait toute la différence.",
      category: "Accompagnement"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      
      {/* Particules de fond */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-300/20 rounded-full"
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
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Quote className="w-4 h-4" />
            <span className="text-sm font-semibold">Témoignages</span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Ils ont Réussi
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Découvrez les parcours inspirants de nos bénéficiaires qui ont transformé leur vie professionnelle
          </motion.p>
        </motion.div>

        {/* Carrousel de témoignages */}
        <div className="relative max-w-4xl mx-auto">
          {/* Témoignage principal */}
          <motion.div
            key={currentIndex}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Fond décoratif */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full translate-y-12 -translate-x-12 opacity-50" />
            
            {/* Quote icon */}
            <motion.div
              className="absolute top-6 left-6 text-purple-200"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Quote className="w-12 h-12" />
            </motion.div>

            <div className="relative z-10">
              {/* Contenu du témoignage */}
              <motion.p
                className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                "{testimonials[currentIndex].content}"
              </motion.p>

              {/* Informations de l'utilisateur */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {testimonials[currentIndex].avatar}
                  </motion.div>
                  
                  <div>
                    <motion.h4
                      className="text-lg font-semibold text-gray-900"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      {testimonials[currentIndex].name}
                    </motion.h4>
                    <motion.p
                      className="text-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {testimonials[currentIndex].role} chez {testimonials[currentIndex].company}
                    </motion.p>
                  </div>
                </div>

                {/* Note et catégorie */}
                <div className="text-right">
                  <motion.div
                    className="flex items-center space-x-1 mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </motion.div>
                  
                  <motion.div
                    className="inline-flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Award className="w-3 h-3" />
                    <span>{testimonials[currentIndex].category}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contrôles de navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors duration-200 border border-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors duration-200 border border-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Indicateurs */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Statistiques de satisfaction */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-purple-600 mb-2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              98%
            </motion.div>
            <p className="text-gray-600">Satisfaction client</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-purple-600 mb-2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              1500+
            </motion.div>
            <p className="text-gray-600">Personnes accompagnées</p>
          </div>
          
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold text-purple-600 mb-2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              4.9/5
            </motion.div>
            <p className="text-gray-600">Note moyenne</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection

