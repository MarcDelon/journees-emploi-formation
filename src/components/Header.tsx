'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Accueil', href: '/home' },
    { name: 'Journées de l\'Emploi', href: '/journees-emploi' },
    { name: 'Offres d\'emploi', href: '/offres-emploi' },
    { name: 'Typologie de candidats', href: '/typologie-candidats' },
    { name: 'Mot de la promotrice', href: '/promotrice' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 layout-stable no-layout-shift ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
      style={{ 
        willChange: 'transform, background-color',
        contain: 'layout style',
        minHeight: '4rem'
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20 stable-width no-layout-shift" style={{ minHeight: '4rem' }}>
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2 sm:space-x-3 prevent-shrink no-layout-shift">
            <div className="relative no-layout-shift" style={{ width: '120px', height: '45px' }}>
              <Image 
                src="/images/logo-evenement.jpg.jpeg" 
                alt="Journées de l'Emploi et de la Formation" 
                width={120} 
                height={45}
                className="h-10 sm:h-12 w-auto transition-all duration-300"
                style={{ 
                  maxWidth: '120px',
                  maxHeight: '45px',
                  objectFit: 'contain'
                }}
                priority
              />
            </div>
            <div className="hidden xs:flex flex-col stable-dimensions">
              <span className="text-xs sm:text-sm font-semibold text-event-orange bg-event-orange/10 px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap">
                6e ÉDITION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-nowrap whitespace-nowrap space-x-10 xl:space-x-14">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-900 hover:text-event-blue transition-all duration-200 font-medium relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-event-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button removed as requested */}

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-900 hover:text-event-blue transition-all duration-200 rounded-lg hover:bg-gray-100/80 backdrop-blur-sm"
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 shadow-lg"
          >
            <div className="container-custom py-6">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-900 hover:text-event-blue hover:bg-gray-50 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                >
                  <Link
                    href="/journees-emploi?scroll=form"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary w-full text-center block py-3"
                  >
                    Participer
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header

