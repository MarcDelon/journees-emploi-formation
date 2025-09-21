'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Theme = 'day' | 'night' | 'spring' | 'summer' | 'autumn' | 'winter'

interface ThemeSelectorProps {
  onThemeChange?: (theme: Theme) => void
}

export default function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('day')
  const [isOpen, setIsOpen] = useState(false)

  const themes: { key: Theme; name: string; icon: string }[] = [
    { key: 'day', name: 'Jour', icon: '☀️' },
    { key: 'night', name: 'Nuit', icon: '🌙' },
    { key: 'spring', name: 'Printemps', icon: '🌸' },
    { key: 'summer', name: 'Été', icon: '☀️' },
    { key: 'autumn', name: 'Automne', icon: '🍂' },
    { key: 'winter', name: 'Hiver', icon: '❄️' }
  ]

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setCurrentTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Auto-detect time-based theme
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 18) {
        setCurrentTheme('day')
        applyTheme('day')
      } else {
        setCurrentTheme('night')
        applyTheme('night')
      }
    }
  }, [])

  const applyTheme = (theme: Theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      'theme-day', 'theme-night', 'theme-spring', 
      'theme-summer', 'theme-autumn', 'theme-winter'
    )
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${theme}`)
    
    // Save to localStorage
    localStorage.setItem('theme', theme)
    
    // Notify parent component
    onThemeChange?.(theme)
  }

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme)
    applyTheme(theme)
    setIsOpen(false)
  }

  return (
    <div className="theme-toggle">
      <motion.div
        className="theme-selector"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {themes.map((theme) => (
              <motion.button
                key={theme.key}
                className={`theme-option ${theme.key} ${
                  currentTheme === theme.key ? 'active' : ''
                }`}
                onClick={() => handleThemeChange(theme.key)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={theme.name}
              >
                <span className="text-sm">{theme.icon}</span>
              </motion.button>
            ))}
            <motion.button
              className="theme-option"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Fermer"
            >
              <span className="text-sm">✕</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.button
            className={`theme-option ${currentTheme} active`}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Changer de thème"
          >
            <span className="text-sm">
              {themes.find(t => t.key === currentTheme)?.icon}
            </span>
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

