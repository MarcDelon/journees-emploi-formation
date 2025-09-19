'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { User, BookOpen, Users, Target, Award, CheckCircle, ArrowRight, Briefcase, Heart, Zap, Star } from 'lucide-react'

export default function ActivitesChercheurs() {
  const activites = [
    {
      icon: BookOpen,
      title: "Ateliers",
      description: "Sessions pratiques pour développer vos compétences professionnelles",
      details: [
        "Atelier CV et lettre de motivation : Comment captiver le recruteur",
        "Atelier Projet professionnel : Trouver sa vocation",
        "Atelier LinkedIn : Comment saisir les opportunités à l'international et attirer les recruteurs",
        "Atelier Entretien d'embauche : Comment bien se vendre",
        "Atelier Droit : Comment bien négocier son contrat de travail"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Tables Rondes",
      description: "Échanges avec des professionnels et experts du secteur",
      details: [
        "Table ronde 1: Formation continue: Outil d'adaptation permanent aux évolutions des métiers",
        "Table ronde 2: L'autoemploi, Le sous-emploi: des réponses efficaces au chômage des jeunes?",
        "Table ronde 3: Rapport de stage, mémoires, thèses: un appui pour valoriser les projets et favoriser l'autoemploi ?",
        "Table ronde 4: Mobilité internationale: bien choisir son école et réussir son intégration à l'étranger"
      ],
      color: "from-green-500 to-emerald-500"
    }
  ]

  const temoignages = [
    {
      nom: "Sophie M.",
      poste: "Développeuse Web",
      message: "L'atelier CV et les tables rondes m'ont donné les clés pour décrocher mon premier emploi dans le web. Les conseils des experts étaient précieux !",
      avatar: "👩‍💻"
    },
    {
      nom: "Ahmed K.",
      poste: "Chef de Projet",
      message: "Les sessions de networking et les ateliers spécialisés m'ont permis de développer mon réseau et de comprendre les enjeux du secteur.",
      avatar: "👨‍💼"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-orange-500/10"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-event-blue text-white px-8 py-4 rounded-lg inline-block mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                Ateliers & Tables Rondes
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto mb-12"
            >
              Découvrez notre programme d'ateliers pratiques et de tables rondes animées par des experts pour développer vos compétences et élargir votre réseau professionnel
            </motion.p>
          </div>
        </section>

        {/* Section Activités */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {activites.map((activite, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${activite.color} flex items-center justify-center mb-6`}>
                    <activite.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{activite.title}</h3>
                  <p className="text-gray-600 mb-6">{activite.description}</p>
                  
                  {activite.details.length > 0 && (
                    <ul className="space-y-3">
                      {activite.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Témoignages */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Témoignages des Participants</h2>
              <p className="text-xl text-gray-600">Découvrez l'impact de nos ateliers et tables rondes sur leur parcours professionnel</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {temoignages.map((temoignage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{temoignage.avatar}</div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{temoignage.nom}</h4>
                      <p className="text-gray-600">{temoignage.poste}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{temoignage.message}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-event-blue to-event-orange">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h2 className="text-3xl font-bold mb-4">Prêt à participer aux ateliers ?</h2>
              <p className="text-xl mb-8">Inscrivez-vous dès maintenant pour réserver votre place aux ateliers et tables rondes</p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-white text-event-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Nous contacter</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}