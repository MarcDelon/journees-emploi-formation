'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Building, Users, TrendingUp, Target, Award, CheckCircle, ArrowRight, Briefcase, Heart } from 'lucide-react'

export default function ActivitesEntreprises() {
  const conferences = [
    "L'accès aux financements des PME",
    "Digitalisation des PME",
  ]

  const masterclass = [
    "Redresser les ventes et les finances de son entreprise en difficulté",
    "Obtenir des financements adaptés à votre entreprise",
    "Optimiser, anticiper et structurer une équipe RH selon la taille de l’entreprise",
    "Recruter de bons commerciaux",
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

        {/* Conférences Entreprises */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Conférences Entreprises</h2>
            <ul className="space-y-3">
              {conferences.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800"><strong>Conférence {i + 1}:</strong> {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Masterclass pour Entreprises */}
        <section className="py-6">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Masterclass pour Entreprises</h2>
            <ul className="space-y-3">
              {masterclass.map((item, i) => (
                <li key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800"><strong>Masterclass {i + 1}:</strong> {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}