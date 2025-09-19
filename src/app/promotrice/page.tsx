'use client'

import { motion } from 'framer-motion'
import { Quote, Heart, Users } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PromotricePage() {

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-egalite-blue/10 to-egalite-yellow/10">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-display font-bold text-egalite-dark mb-6">
                  Mot de la
                  <br />
                  <span className="text-gradient">Promotrice</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Découvrez la vision et l'engagement de notre promotrice pour l'insertion professionnelle 
                  et l'égalité des chances dans l'emploi.
                </p>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-egalite-blue to-egalite-yellow rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-egalite-dark">Jessica Mambo</h3>
                    <p className="text-gray-600">Promotrice & Présidente</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-egalite-blue/20 to-egalite-yellow/20 rounded-2xl p-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-32 h-32 bg-gradient-to-br from-egalite-blue to-egalite-yellow rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-center text-egalite-dark mb-4">
                      Portrait de la Promotrice
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      Passionnée par l'humain et l'insertion professionnelle, Jessica Mambo consacre sa carrière à aider les personnes en difficulté à saisir les opportunités professionnelles.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>



        {/* Message de motivation */}
        <section className="section-padding bg-gradient-to-br from-egalite-blue to-egalite-yellow">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <Quote className="w-16 h-16 text-white mx-auto mb-8" />
              
              <blockquote className="text-xl md:text-2xl font-display font-medium text-white mb-8 leading-relaxed text-left">
                <p className="mb-6">"Chers participants, partenaires et visiteurs,</p>
                <p className="mb-6">C'est avec une immense joie que je vous souhaite la bienvenue à la 6ᵉ édition des Journées de l'Emploi et de la Formation. Cet événement est né d'une conviction profonde : chaque talent mérite une chance, chaque rêve mérite un accompagnement, et chaque entreprise mérite de trouver les compétences qui feront sa force.</p>
                <p className="mb-6">À travers ce salon, nous créons une véritable passerelle entre les chercheurs d'emploi, les jeunes entrepreneurs, les écoles de formation et les entreprises. Notre objectif est clair : favoriser l'insertion professionnelle, l'autonomie économique et l'épanouissement des talents au Cameroun.</p>
                <p className="mb-6">Cette 6ᵉ édition est une nouvelle étape dans ce rêve collectif. Elle est le fruit d'un travail passionné, porté par une équipe engagée et soutenue par des partenaires visionnaires. Ensemble, nous croyons en un avenir où chaque compétence trouve sa place et contribue au développement de notre pays.</p>
                <p className="mb-6">Je vous invite à explorer, échanger, apprendre et surtout, oser !</p>
                <p className="mb-6">Que ces journées soient pour vous une source d'inspiration et d'opportunités."</p>
              </blockquote>
              
              <div className="text-white/90 text-lg text-right">
                <p className="font-semibold mb-2">Jessica Mambo,</p>
                <p>Promotrice des Journées de l'Emploi et de la Formation</p>
                <p>Présidente de l'Association Égalité Pour Tous</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Message aux jeunes et partenaires */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-egalite-dark mb-6">
                  Message aux jeunes
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Chers jeunes, ne laissez jamais personne vous dire que vous ne pouvez pas réussir. 
                    Votre potentiel est illimité, et votre parcours unique est votre force.
                  </p>
                  <p>
                    L'insertion professionnelle peut parfois sembler être difficile, mais avec de la persévérance, 
                    du travail et le bon accompagnement, vous pouvez atteindre vos objectifs.
                  </p>
                  <p>
                    Nous sommes là pour vous accompagner, vous former et vous donner les outils nécessaires 
                    pour réussir. Votre réussite est notre mission.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-egalite-dark mb-6">
                  Message aux partenaires
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Chers partenaires, votre engagement à nos côtés est essentiel pour créer 
                    un monde du travail plus inclusif et équitable.
                  </p>
                  <p>
                    En participant à nos événements et en ouvrant vos portes aux talents que nous formons, 
                    vous contribuez activement à l'égalité des chances et à la diversité dans l'emploi.
                  </p>
                  <p>
                    Ensemble, nous pouvons créer un impact durable et transformer la société 
                    pour le mieux. Merci de votre confiance et de votre engagement.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}

