'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Building, Users, TrendingUp, Target, Award, CheckCircle, ArrowRight, Briefcase, Heart } from 'lucide-react'

export default function ActivitesEntreprises() {
  const services = [
    {
      icon: Users,
      title: "Recrutement et Sourcing",
      description: "Solutions complètes pour vos besoins de recrutement",
      details: [
        "Présélection de candidats qualifiés",
        "Organisation d'entretiens",
        "Évaluation des compétences",
        "Accompagnement dans le processus de sélection"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Conseil RH pour TPE/PME",
      description: "Expertise RH adaptée aux petites et moyennes entreprises",
      details: [
        "Définition des profils de poste",
        "Optimisation des processus RH",
        "Stratégies de rétention des talents",
        "Gestion de la diversité et inclusion"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Target,
      title: "Formation en entreprise",
      description: "Programmes de formation sur mesure pour vos équipes",
      details: [
        "Formation des managers au recrutement inclusif",
        "Sensibilisation à la diversité",
        "Développement des compétences",
        "Team building et cohésion d'équipe"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Partenariats RSE",
      description: "Engagement sociétal et responsabilité d'entreprise",
      details: [
        "Programmes d'insertion professionnelle",
        "Mécénat de compétences",
        "Stages et alternances solidaires",
        "Actions de sensibilisation"
      ],
      color: "from-orange-500 to-red-500"
    }
  ]

  const avantages = [
    {
      title: "Accès à des talents diversifiés",
      description: "Élargissez votre vivier de candidats avec des profils variés et motivés",
      icon: "🎯"
    },
    {
      title: "Réduction des coûts de recrutement",
      description: "Optimisez vos processus RH et réduisez vos coûts de sourcing",
      icon: "💰"
    },
    {
      title: "Amélioration de votre image employeur",
      description: "Renforcez votre réputation en tant qu'employeur inclusif et responsable",
      icon: "⭐"
    },
    {
      title: "Accompagnement personnalisé",
      description: "Bénéficiez d'un suivi sur mesure adapté à vos besoins spécifiques",
      icon: "🤝"
    }
  ]

  const temoignagesEntreprises = [
    {
      entreprise: "TechCorp SARL",
      secteur: "Informatique",
      message: "Grâce à ce partenariat, nous avons recruté des talents exceptionnels et diversifié nos équipes. Un vrai plus pour notre entreprise !",
      dirigeant: "Marie Dupont, DRH"
    },
    {
      entreprise: "Innovation Plus",
      secteur: "Conseil",
      message: "L'accompagnement RH nous a permis d'optimiser nos processus de recrutement. Nous recommandons vivement leurs services.",
      dirigeant: "Ahmed Benali, PDG"
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
              className="bg-event-orange text-white px-8 py-4 rounded-lg inline-block mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                Activités pour Entreprises
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto mb-12"
            >
              Solutions RH complètes pour accompagner votre croissance et optimiser vos recrutements
            </motion.p>
          </div>
        </section>

        {/* Section Services */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-3">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Avantages */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Pourquoi nous choisir ?</h2>
              <p className="text-xl text-gray-600">Les avantages d'un partenariat avec nous</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {avantages.map((avantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="text-4xl mb-4">{avantage.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{avantage.title}</h3>
                  <p className="text-gray-600 text-sm">{avantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Témoignages Entreprises */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Ils nous font confiance</h2>
              <p className="text-xl text-gray-600">Témoignages de nos partenaires entreprises</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {temoignagesEntreprises.map((temoignage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white rounded-2xl p-8 shadow-xl"
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-800">{temoignage.entreprise}</h4>
                    <p className="text-gray-600">{temoignage.secteur}</p>
                  </div>
                  <p className="text-gray-700 italic mb-4">"{temoignage.message}"</p>
                  <p className="text-sm text-gray-600 font-semibold">— {temoignage.dirigeant}</p>
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
              <h2 className="text-3xl font-bold mb-4">Développons ensemble vos ressources humaines</h2>
              <p className="text-xl mb-8">Contactez-nous pour discuter de vos besoins et découvrir nos solutions</p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-white text-event-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Demander un devis</span>
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