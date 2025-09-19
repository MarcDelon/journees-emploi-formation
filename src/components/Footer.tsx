'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    pages: [
      { name: 'Accueil', href: '/' },
      { name: 'Journées de l\'Emploi', href: '/journees-emploi' },
      { name: 'Offres d\'emploi', href: '/offres-emploi' },
      { name: 'Typologie de candidats', href: '/typologie-candidats' },
      { name: 'Mot de la promotrice', href: '/promotrice' },
      { name: 'Contact', href: '/contact' },
    ],
    activites: [
      { name: 'Activités pour chercheurs d\'emploi', href: '/activites-chercheurs' },
      { name: 'Activités pour entreprises', href: '/activites-entreprises' },
    ],
    legal: [
      { name: 'Mentions légales', href: '/mentions-legales' },
      { name: 'Politique de confidentialité', href: '/confidentialite' },
      { name: 'CGV', href: '/cgv' },
    ]
  }

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/share/1JCmM9jcdj/', 
      label: 'Facebook',
      color: 'hover:bg-blue-600'
    },
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/asso_egalite_pour_tous/', 
      label: 'Instagram',
      color: 'hover:bg-pink-600'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/company/les-journees-de-l%C2%B4emploi-et-de-la-formation/', 
      label: 'LinkedIn',
      color: 'hover:bg-blue-700'
    },
  ]

  return (
    <footer className="bg-egalite-dark text-white layout-stable">
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="relative no-layout-shift">
                <Image 
                  src="/images/logo-evenement.jpg.jpeg" 
                  alt="Journées de l'Emploi et de la Formation" 
                  width={80} 
                  height={30}
                  className="h-6 sm:h-8 w-auto transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-event-orange bg-event-orange/20 px-2 py-1 rounded">
                  6e ÉDITION 2025
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Les Journées de l'Emploi et de la Formation connectent jeunes talents, établissements de formation et entreprises. 
              Un événement dédié à l'insertion professionnelle, au développement des compétences et au networking 
              pour construire ensemble un avenir inclusif et performant.
            </p>

            {/* Contact info */}
            <div className="space-y-2 sm:space-y-3">
              <motion.div 
                className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-gray-300 text-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-event-orange prevent-shrink" />
                <span className="break-all">journeemploiformation@gmail.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-gray-300 text-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-event-blue prevent-shrink" />
                <span>698-704-167 / 653-164-623</span>
              </motion.div>
              <motion.div 
                className="flex items-start justify-center sm:justify-start space-x-2 sm:space-x-3 text-gray-300 text-sm"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-event-orange prevent-shrink mt-0.5" />
                <span className="leading-relaxed">Douala, Cameroun - Geneva Hotel - 12-14 novembre 2025</span>
              </motion.div>
            </div>
          </div>

          {/* Pages */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Pages</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.pages.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-egalite-blue transition-all duration-200 text-sm sm:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Activités */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Activités</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.activites.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="text-gray-400 text-sm sm:text-base block py-1 cursor-not-allowed">
                    {link.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Légal et réseaux sociaux */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Légal</h3>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {footerLinks.legal.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-egalite-blue transition-all duration-200 text-sm sm:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Suivez-nous</h3>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 ${social.color} rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110`}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
              {/* TikTok avec icône personnalisée */}
              <motion.a
                href="https://www.tiktok.com/@asso_egalite_pour_tous?_t=ZM-8zNCQ3nbeM9&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-black rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="TikTok"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: socialLinks.length * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <motion.p 
              className="text-gray-300 text-xs sm:text-sm text-center sm:text-left"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              © {currentYear} Journées de l'Emploi et de la Formation - 6e édition. Tous droits réservés.
            </motion.p>
            <motion.p 
              className="text-gray-300 text-xs sm:text-sm text-center sm:text-right"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Organisé par l'Association Égalité Pour Tous avec ❤️
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
export { Footer }

