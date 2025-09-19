'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Building, BookOpen, Target, Award, CheckCircle, TrendingUp, Heart, ArrowRight, X } from 'lucide-react'

const ActivitiesSection = () => {
  const [activeModal, setActiveModal] = useState<'chercheurs' | 'entreprises' | null>(null)

  const chercheursActivities = [
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
      ]
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
      ]
    }
  ]

  const entreprisesActivities = [
    {
      icon: Users,
      title: "Recrutement et Sourcing",
      description: "Solutions complètes pour vos besoins de recrutement",
      details: [
        "Présélection de candidats qualifiés",
        "Organisation d'entretiens",
        "Évaluation des compétences",
        "Accompagnement dans le processus de sélection"
      ]
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
      ]
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
      ]
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
      ]
    }
  ]

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
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            Nos Activités
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Notre engagement pour faciliter l'accès à l'emploi et renforcer la visibilité des entreprises
          </p>
        </motion.div>

        {/* Deux conteneurs principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Conteneur Chercheurs d'emploi */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden h-full"
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient de fond */}
              <div className="absolute inset-0 bg-gradient-to-br from-event-blue/5 to-event-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icône et badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-event-blue to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="bg-event-blue/10 text-event-blue px-4 py-2 rounded-full text-sm font-semibold">
                    Chercheurs d'emploi
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-event-blue transition-colors duration-300">
                  Ateliers & Tables Rondes
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Découvrez notre programme d'ateliers pratiques et de tables rondes animées par des experts pour développer vos compétences et élargir votre réseau professionnel.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-event-blue rounded-full"></div>
                    <span>Ateliers</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-event-blue rounded-full"></div>
                    <span>Tables Rondes</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setActiveModal('chercheurs')}
                  className="inline-flex items-center space-x-2 bg-event-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 group/link"
                >
                  <span>Découvrir nos activités</span>
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Conteneur Entreprises */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden h-full"
              whileHover={{ scale: 1.02 }}
            >
              {/* Gradient de fond */}
              <div className="absolute inset-0 bg-gradient-to-br from-event-orange/5 to-event-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icône et badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-event-orange to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-10 h-10 text-white" />
                  </div>
                  <div className="bg-event-orange/10 text-event-orange px-4 py-2 rounded-full text-sm font-semibold">
                    Entreprises
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-event-orange transition-colors duration-300">
                  Activités pour Entreprises
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Solutions RH complètes pour accompagner votre croissance et optimiser vos recrutements. 
                  Conseil, formation et partenariats pour développer vos ressources humaines.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-event-orange rounded-full"></div>
                    <span>Recrutement et sourcing</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-event-orange rounded-full"></div>
                    <span>Conseil RH pour TPE/PME</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-event-orange rounded-full"></div>
                    <span>Formation en entreprise</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-event-orange rounded-full"></div>
                    <span>Partenariats RSE</span>
                  </div>
                </div>
                
                <Link
                  href="/activites-entreprises"
                  className="inline-flex items-center space-x-2 bg-event-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 group/link"
                >
                  <span>Découvrir nos services</span>
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal pour afficher les activités détaillées */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Contenu du modal */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold mb-4 ${
                    activeModal === 'chercheurs' ? 'text-event-blue' : 'text-event-orange'
                  }`}>
                    {activeModal === 'chercheurs' 
                      ? 'Ateliers & Tables Rondes'
                      : 'Activités pour Entreprises'
                    }
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {activeModal === 'chercheurs'
                      ? 'Découvrez notre programme d\'ateliers pratiques et de tables rondes animées par des experts pour développer vos compétences et élargir votre réseau professionnel'
                      : 'Solutions RH sur mesure pour optimiser vos recrutements et développer vos équipes'
                    }
                  </p>
                </div>

                {/* Grille des activités détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(activeModal === 'chercheurs' ? chercheursActivities : entreprisesActivities).map((activity, index) => (
                    <motion.div
                      key={activity.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        activeModal === 'chercheurs' 
                          ? 'bg-gradient-to-r from-event-blue to-blue-600'
                          : 'bg-gradient-to-r from-event-orange to-orange-600'
                      }`}>
                        <activity.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{activity.title}</h3>
                      <p className="text-gray-600 mb-4">{activity.description}</p>
                      
                      {activity.details.length > 0 && (
                        <ul className="space-y-2">
                          {activity.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center space-x-3">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Bouton d'action */}
                <div className="text-center mt-8">
                  <button
                    onClick={() => setActiveModal(null)}
                    className={`inline-flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-colors text-white ${
                      activeModal === 'chercheurs'
                        ? 'bg-event-blue hover:bg-blue-600'
                        : 'bg-event-orange hover:bg-orange-600'
                    }`}
                  >
                    <span>Nous contacter pour plus d'informations</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ActivitiesSection