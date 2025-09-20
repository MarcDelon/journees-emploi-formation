'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Sector } from 'recharts'

// Données pour le graphique en secteurs - Âges
const ageData = [
  { name: '18 à 24 ans', value: 3, color: '#FF8C00' },
  { name: '25 à 34 ans', value: 54, color: '#4682B4' },
  { name: '35 à 44 ans', value: 42, color: '#1E3A8A' },
  { name: '45 ans et plus', value: 1, color: '#93C5FD' }
]

// Données pour le graphique en secteurs - Typologie des candidats
const typologieData = [
  { name: 'En recherche active d\'emploi', value: 57, color: '#FF8C00' },
  { name: 'Étudiant en recherche de stage', value: 31, color: '#4682B4' },
  { name: 'En recherche du premier emploi', value: 9, color: '#00CED1' },
  { name: 'En recherche d\'une formation', value: 3, color: '#90EE90' }
]

// Données pour le graphique en barres - Niveau d'étude
const niveauEtudeData = [
  { niveau: 'Bac', value: 15 },
  { niveau: 'Bac+2', value: 25 },
  { niveau: 'Bac+3', value: 35 },
  { niveau: 'Bac+4', value: 20 },
  { niveau: 'Bac+5', value: 40 },
  { niveau: 'Doctorat', value: 10 },
  { niveau: 'Autres', value: 8 }
]

export default function TypologieCandidatsPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [activeSection, setActiveSection] = useState<'ages' | 'typologie' | 'etudes' | 'accessibilite'>('ages')
  const [introVisible, setIntroVisible] = useState(true)
  const agesRef = useRef<HTMLElement | null>(null)
  const typologieRef = useRef<HTMLElement | null>(null)
  const etudesRef = useRef<HTMLElement | null>(null)
  const accessRef = useRef<HTMLElement | null>(null)
  const [ageActiveIndex, setAgeActiveIndex] = useState<number | null>(null)
  const [typeActiveIndex, setTypeActiveIndex] = useState<number | null>(null)
  const [barActiveIndex, setBarActiveIndex] = useState<number>(0)

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delayChildren: 0, staggerChildren: 0.08 },
    },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const renderActiveSlice = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props
    return (
      <g>
        <text x={cx} y={cy} dy={4} textAnchor="middle" fill="#111827" fontSize={12}>
          {payload.name}
        </text>
        <text x={cx} y={cy} dy={22} textAnchor="middle" fill="#374151" fontSize={12}>
          {value}%
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }
  const symbolItems: { char: string; left: string; top: string; size: string; delay: number; duration: number }[] = [
    { char: '+', left: '8%', top: '22%', size: 'text-5xl', delay: 0, duration: 12 },
    { char: '−', left: '18%', top: '68%', size: 'text-6xl', delay: 1.2, duration: 14 },
    { char: '×', left: '30%', top: '18%', size: 'text-7xl', delay: 0.6, duration: 11 },
    { char: '÷', left: '44%', top: '72%', size: 'text-5xl', delay: 1.8, duration: 13 },
    { char: '%', left: '58%', top: '28%', size: 'text-6xl', delay: 0.9, duration: 12 },
    { char: '∞', left: '68%', top: '64%', size: 'text-7xl', delay: 0.3, duration: 15 },
    { char: 'π', left: '78%', top: '22%', size: 'text-6xl', delay: 1.1, duration: 12 },
    { char: 'Σ', left: '88%', top: '58%', size: 'text-7xl', delay: 0.4, duration: 13 },
    { char: '3', left: '12%', top: '44%', size: 'text-5xl', delay: 0.7, duration: 10 },
    { char: '7', left: '86%', top: '36%', size: 'text-6xl', delay: 1.5, duration: 14 },
  ]
  const chars = ['+','−','×','÷','%','∞','π','Σ','√','≈','≠','≥','≤','∆','∑','∏','∫','θ','λ','β']
  const sizes = ['text-3xl','text-4xl','text-5xl']
  const presetPositions = [
    { left: '6%', top: '18%' }, { left: '14%', top: '72%' }, { left: '22%', top: '34%' },
    { left: '28%', top: '58%' }, { left: '36%', top: '26%' }, { left: '44%', top: '66%' },
    { left: '52%', top: '32%' }, { left: '60%', top: '74%' }, { left: '68%', top: '22%' },
    { left: '76%', top: '68%' }, { left: '84%', top: '30%' }, { left: '90%', top: '62%' },
    { left: '12%', top: '50%' }, { left: '20%', top: '40%' }, { left: '34%', top: '76%' },
    { left: '48%', top: '20%' }, { left: '56%', top: '52%' }, { left: '64%', top: '44%' },
    { left: '72%', top: '36%' }, { left: '88%', top: '48%' }, { left: '26%', top: '62%' },
    { left: '42%', top: '28%' }, { left: '54%', top: '70%' }, { left: '80%', top: '54%' },
  ]
  const extraSymbols = presetPositions.map((pos, i) => ({
    char: chars[i % chars.length],
    left: pos.left,
    top: pos.top,
    size: sizes[i % sizes.length],
    delay: (i % 6) * 0.25,
    duration: 10 + (i % 8),
  }))

  useEffect(() => {
    // Page intro transition
    const t = setTimeout(() => setIntroVisible(false), 450)
    agesRef.current = document.getElementById('ages') as HTMLElement
    typologieRef.current = document.getElementById('typologie') as HTMLElement
    etudesRef.current = document.getElementById('etudes') as HTMLElement
    accessRef.current = document.getElementById('accessibilite') as HTMLElement
    const entriesToWatch = [
      { id: 'ages', el: agesRef.current },
      { id: 'typologie', el: typologieRef.current },
      { id: 'etudes', el: etudesRef.current },
      { id: 'accessibilite', el: accessRef.current },
    ].filter((e) => e.el)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible && visible.target.id) {
          setActiveSection(visible.target.id as any)
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    entriesToWatch.forEach((e) => e.el && observer.observe(e.el))
    // Autoplay: cycle active slices/bars to make charts feel alive
    const ageTimer = setInterval(() => {
      setAgeActiveIndex((prev) => typeof prev === 'number' ? (prev + 1) % ageData.length : 0)
    }, 1600)
    const typeTimer = setInterval(() => {
      setTypeActiveIndex((prev) => typeof prev === 'number' ? (prev + 1) % typologieData.length : 0)
    }, 1700)
    const barTimer = setInterval(() => {
      setBarActiveIndex((prev) => (prev + 1) % niveauEtudeData.length)
    }, 1400)
    return () => { observer.disconnect(); clearTimeout(t) }
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 relative overflow-hidden scroll-smooth">
      {/* Intro overlay transition */}
      {introVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-white"
          aria-hidden="true"
        />
      )}
      <motion.div style={{ scaleX }} className="fixed left-0 top-0 right-0 h-1 origin-left z-50 bg-gradient-to-r from-blue-500 to-orange-500" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Floating Elements - deterministic to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: '8%', top: '22%', duration: 4.6, delay: 0.2 },
          { left: '16%', top: '64%', duration: 5.2, delay: 0.4 },
          { left: '28%', top: '18%', duration: 4.8, delay: 0.1 },
          { left: '42%', top: '70%', duration: 5.6, delay: 0.3 },
          { left: '58%', top: '26%', duration: 5.0, delay: 0.5 },
          { left: '68%', top: '62%', duration: 5.4, delay: 0.7 },
          { left: '82%', top: '28%', duration: 4.9, delay: 0.6 },
          { left: '92%', top: '58%', duration: 5.1, delay: 0.8 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-120px)] overflow-hidden flex items-center">
          {/* Background Image avec overlay amélioré */}
          <div className="absolute inset-0">
            <Image
              src="/images/logo-evenement.jpg.jpeg"
              alt="Typologie des candidats"
              fill
              className="object-cover opacity-15"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-orange-600/50"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          {/* Motif SVG en arrière-plan */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/images/svg/hero-pattern.svg" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dynamic floating shapes améliorés */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute -left-10 top-24 w-64 h-64 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-600/20 blur-3xl"
              animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-10 bottom-24 w-72 h-72 rounded-full bg-gradient-to-r from-orange-400/20 to-orange-600/20 blur-3xl"
              animate={{ y: [0, 25, 0], x: [0, -20, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-10 w-40 h-40 rounded-full bg-white/15 ring-2 ring-white/30 backdrop-blur-sm"
              animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />

            {/* Particules flottantes améliorées */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}

            {symbolItems.map((s, i) => (
              <motion.span
                key={i}
                className={`absolute ${s.size} font-bold text-white/50 select-none drop-shadow-lg`}
                style={{ left: s.left, top: s.top }}
                initial={{ opacity: 0.2 }}
                animate={{
                  y: [0, -18, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.15, 0.5, 0.15],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
              >
                {s.char}
              </motion.span>
            ))}
            {extraSymbols.map((s, i) => (
              <motion.span
                key={`e-${i}`}
                className={`absolute ${s.size} font-semibold text-white/30 select-none drop-shadow-md`}
                style={{ left: s.left, top: s.top }}
                initial={{ opacity: 0.15 }}
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, -8, 8, 0],
                  opacity: [0.12, 0.4, 0.12],
                  scale: [0.8, 1.05, 0.8]
                }}
                transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
              >
                {s.char}
              </motion.span>
            ))}
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Badge avec effet de brillance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full mb-8 shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <span className="text-sm font-semibold relative z-10">Analyse des participants</span>
              </motion.div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-8 rounded-3xl inline-block mb-8 shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <h1 className="text-4xl md:text-6xl font-bold text-center relative z-10">
                  TYPOLOGIE DE CANDIDATS
                </h1>
                <div className="w-full h-1 bg-white/40 rounded-full mt-4 relative z-10"></div>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white max-w-3xl mx-auto relative z-10 font-medium drop-shadow-lg mb-8"
            >
              Découvrez le profil détaillé des participants aux Journées de l'Emploi et de la Formation
            </motion.p>

            {/* Statistiques rapides dans le hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mobile-grid-1 mobile-gap max-w-4xl mx-auto"
            >
              {[
                { number: "100", label: "Candidats analysés", color: "text-blue-300" },
                { number: "4", label: "Tranches d'âge", color: "text-orange-300" },
                { number: "7", label: "Niveaux d'étude", color: "text-purple-300" },
                { number: "13%", label: "Handicapés", color: "text-green-300" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl mobile-p border border-white/20"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className={`mobile-text-xl font-bold ${stat.color} mobile-mb`}>{stat.number}</div>
                  <div className="text-white/80 mobile-text-sm text-center">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Wave separator amélioré */}
          <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
            <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-24 text-white">
              <path fill="currentColor" d="M0,64L60,69.3C120,75,240,85,360,96C480,107,600,117,720,106.7C840,96,960,64,1080,53.3C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
            </svg>
          </div>
        </section>

        {/* Sticky Subnavigation */}
        <div className="sticky top-16 z-40 bg-white/50 backdrop-blur-md border-b border-white/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 sm:gap-6 py-3">
              <a href="#ages" className={`px-3 py-1.5 rounded-full shadow text-sm font-medium transition ${activeSection==='ages' ? 'bg-blue-600 text-white' : 'bg-white/70 hover:bg-white text-gray-700'}`}>Âges</a>
              <a href="#typologie" className={`px-3 py-1.5 rounded-full shadow text-sm font-medium transition ${activeSection==='typologie' ? 'bg-blue-600 text-white' : 'bg-white/70 hover:bg-white text-gray-700'}`}>Typologie</a>
              <a href="#etudes" className={`px-3 py-1.5 rounded-full shadow text-sm font-medium transition ${activeSection==='etudes' ? 'bg-blue-600 text-white' : 'bg-white/70 hover:bg-white text-gray-700'}`}>Études</a>
              <a href="#accessibilite" className={`px-3 py-1.5 rounded-full shadow text-sm font-medium transition ${activeSection==='accessibilite' ? 'bg-blue-600 text-white' : 'bg-white/70 hover:bg-white text-gray-700'}`}>Accessibilité</a>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Répartition par âges */}
            <motion.div
              id="ages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              {/* En-tête de section amélioré */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg"
                >
                  <span className="text-sm font-semibold">Analyse démographique</span>
                </motion.div>
                <h2 className="mobile-text-3xl font-display font-bold text-gray-800 mobile-mb">
                  Répartition par Âges
                </h2>
                <p className="mobile-text-lg text-gray-600 max-w-2xl mx-auto">
                  Découvrez la distribution des participants selon leur tranche d'âge
                </p>
              </motion.div>

              <div className="mobile-flex-col mobile-gap items-start">
                {/* Carte de statistiques améliorée */}
                <div className="w-full lg:w-1/3">
                  <motion.div 
                    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl mobile-p border border-white/20 relative overflow-hidden group"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Background Pattern amélioré */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-100 to-transparent rounded-full translate-y-10 -translate-x-10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-50 to-blue-50 rounded-full opacity-30"></div>
                    
                    {/* Effet de brillance au hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="relative z-10">
                      {/* Icône et titre */}
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Distribution par âge</h3>
                      </div>

                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={containerVariants}
                      >
                        <motion.div variants={itemVariants}>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={ageData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                                isAnimationActive
                                animationDuration={1000}
                              >
                                {ageData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={`url(#gradient-${index})`}
                                    stroke="rgba(255,255,255,0.8)"
                                    strokeWidth={2}
                                  />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value) => [`${value}%`, 'Pourcentage']}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '12px',
                                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                                }}
                              />
                              <defs>
                                {ageData.map((entry, index) => (
                                  <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={entry.color} />
                                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.8} />
                                  </linearGradient>
                                ))}
                              </defs>
                            </PieChart>
                          </ResponsiveContainer>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div className="space-y-3 mt-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={containerVariants}>
                        {ageData.map((item, index) => (
                          <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/item"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-4 h-4 rounded-full shadow-sm group-hover/item:scale-110 transition-transform duration-200"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-full">{item.value}%</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Contenu textuel amélioré */}
                <div className="w-full lg:w-2/3">
                  <motion.div 
                    className="relative rounded-3xl overflow-hidden min-h-[500px] group" 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.35 }} 
                    variants={containerVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image src="/images/group/age-group.svg" alt="" fill className="object-cover opacity-15 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-orange-50/80"></div>
                    <div className="relative z-10 space-y-8 p-8 md:p-10">
                      <motion.div className="text-gray-700 leading-relaxed text-lg" variants={itemVariants}>
                        <p className="mb-6 text-xl">
                          Les <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">25–44 ans</span> constituent l'essentiel des participants, profils au cœur de l'activité professionnelle.
                        </p>
                        <p className="mb-8 text-lg">
                          Les <span className="font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">18–24 ans</span> sont moins nombreux mais restent clés pour les stages et premiers emplois.
                        </p>
                      </motion.div>
                  
                      <motion.div 
                        className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 border border-blue-200 shadow-lg relative overflow-hidden" 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>Analyse des tendances</span>
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">Concentration forte sur la tranche la plus active: un ciblage pertinent pour les besoins des entreprises.</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Typologie des candidats */}
            <motion.div
              id="typologie"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              {/* En-tête de section amélioré */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg"
                >
                  <span className="text-sm font-semibold">Profil des participants</span>
                </motion.div>
                <h2 className="mobile-text-3xl font-display font-bold text-gray-800 mobile-mb">
                  Typologie des Candidats
                </h2>
                <p className="mobile-text-lg text-gray-600 max-w-2xl mx-auto">
                  Comprenez les motivations et le statut des participants
                </p>
              </motion.div>

              <div className="mobile-flex-col mobile-gap items-start">
                {/* Carte de statistiques améliorée */}
                <div className="w-full lg:w-1/3">
                  <motion.div 
                    className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl mobile-p border border-white/20 relative overflow-hidden group"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Background Pattern amélioré */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-12 -translate-x-12"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tr from-green-100 to-transparent rounded-full translate-y-10 translate-x-10"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-50 to-green-50 rounded-full opacity-30"></div>
                    
                    {/* Effet de brillance au hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <div className="relative z-10">
                      {/* Icône et titre */}
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Types de candidats</h3>
                      </div>

                      <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={containerVariants}
                      >
                        <motion.div variants={itemVariants}>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={typologieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                                isAnimationActive
                                animationDuration={1000}
                              >
                                {typologieData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={`url(#gradient-type-${index})`}
                                    stroke="rgba(255,255,255,0.8)"
                                    strokeWidth={2}
                                  />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value) => [`${value}%`, 'Pourcentage']}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '12px',
                                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                                }}
                              />
                              <defs>
                                {typologieData.map((entry, index) => (
                                  <linearGradient key={`gradient-type-${index}`} id={`gradient-type-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={entry.color} />
                                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.8} />
                                  </linearGradient>
                                ))}
                              </defs>
                            </PieChart>
                          </ResponsiveContainer>
                        </motion.div>
                      </motion.div>
                      
                      <motion.div className="space-y-3 mt-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={containerVariants}>
                        {typologieData.map((item, index) => (
                          <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group/item"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-4 h-4 rounded-full shadow-sm group-hover/item:scale-110 transition-transform duration-200"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded-full">{item.value}%</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Contenu textuel amélioré */}
                <div className="w-full lg:w-2/3">
                  <motion.div 
                    className="relative rounded-3xl overflow-hidden min-h-[500px] group" 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.35 }} 
                    variants={containerVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Image src="/images/group/typologie-group.svg" alt="" fill className="object-cover opacity-15 group-hover:opacity-20 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-white/60 to-green-50/80"></div>
                    <div className="relative z-10 space-y-8 p-8 md:p-10">
                      <motion.div className="text-gray-700 leading-relaxed text-lg" variants={itemVariants}>
                        <p className="mb-6 text-xl">
                          Majorité <span className="font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">en recherche d'emploi</span>, avec un vivier important d'<span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">étudiants</span> et de <span className="font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-lg">premiers emplois</span>.
                        </p>
                        <p className="mb-8 text-lg">
                          Une part s'oriente vers la <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">formation</span> pour renforcer l'employabilité.
                        </p>
                      </motion.div>
                  
                      <motion.div 
                        className="bg-gradient-to-r from-purple-50 to-green-50 rounded-2xl p-8 border border-purple-200 shadow-lg relative overflow-hidden" 
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span>Stratégie de ciblage</span>
                        </h3>
                        <p className="text-gray-700 text-lg leading-relaxed">Diversité utile: recrutement direct, stages et alternance sont facilités.</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Niveau d'étude */}
            <motion.div
              id="etudes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-16"
            >
              {/* En-tête de section amélioré */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg"
                >
                  <span className="text-sm font-semibold">Formation et qualification</span>
                </motion.div>
                <h2 className="mobile-text-3xl font-display font-bold text-gray-800 mobile-mb">
                  Répartition par Niveau d'Étude
                </h2>
                <p className="mobile-text-lg text-gray-600 max-w-2xl mx-auto">
                  Explorez la diversité des formations et qualifications des participants
                </p>
              </motion.div>
              <div className="mobile-flex-col mobile-gap items-start">
                {/* Petit bloc à gauche avec les statistiques */}
                <div className="w-full lg:w-1/3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/20 relative overflow-hidden transform-gpu" style={{ transform: 'perspective(1000px) rotateX(5deg) rotateY(-1deg)' }}>
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-100 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
                    
                    <div className="relative z-10">
                      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={containerVariants} className="transform-gpu" style={{ transform: 'perspective(800px) rotateX(3deg)' }}>
                        <motion.div variants={itemVariants}>
                        <ResponsiveContainer width="100%" height={300}>
                <BarChart data={niveauEtudeData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="niveau" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip 
                              formatter={(value) => [`${value}%`, 'Pourcentage']}
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                              }}
                            />
                          <Bar 
                            dataKey="value" 
                            fill="url(#gradient)" 
                            radius={[4, 4, 0, 0]} 
                            isAnimationActive 
                            animationDuration={900}
                            onMouseEnter={(_, index) => setBarActiveIndex(index)}
                          >
                            {niveauEtudeData.map((entry, index) => (
                              <Cell key={`bar-${index}`} fill={index === barActiveIndex ? 'url(#gradient)' : 'url(#gradient)'} opacity={index === barActiveIndex ? 1 : 0.6} />
                            ))}
                          </Bar>
                            <defs>
                              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FF8C00" />
                                <stop offset="50%" stopColor="#FF6B00" />
                                <stop offset="100%" stopColor="#E55A00" />
                              </linearGradient>
                              <filter id="barShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.2)"/>
                              </filter>
                            </defs>
                </BarChart>
              </ResponsiveContainer>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
                
                {/* Texte à droite */}
                <div className="w-full lg:w-2/3">
                  <motion.div className="relative rounded-3xl overflow-hidden min-h-[80vh]" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={containerVariants}>
                    <Image src="/images/group/education-group.svg" alt="" fill className="object-cover opacity-20" />
                    <div className="relative z-10 space-y-6 p-6 md:p-8">
                      <motion.div className="text-gray-600 leading-relaxed text-lg" variants={itemVariants}>
                      <p className="mb-4">
                        Forte présence des niveaux <span className="font-semibold text-orange-600">Bac+3 à Bac+5</span>, profils prêts à l’emploi.
                      </p>
                      <p className="mb-6">
                        Une base solide pour des recrutements ciblés et des parcours de montée en compétences.
                      </p>
                      </motion.div>
                  
                      <motion.div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-6 border border-indigo-200" variants={itemVariants}>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Qualification des profils</h3>
                        <p className="text-gray-700">Signal fort pour les recruteurs: profils qualifiés et immédiatement opérationnels.</p>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Section Accessibilité améliorée */}
            <motion.div
              id="accessibilite"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="relative"
            >
              {/* En-tête de section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg"
                >
                  <span className="text-sm font-semibold">Inclusion et diversité</span>
                </motion.div>
                <h2 className="mobile-text-3xl font-display font-bold text-gray-800 mobile-mb">
                  Engagement pour l'Accessibilité
                </h2>
                <p className="mobile-text-lg text-gray-600 max-w-2xl mx-auto">
                  Notre engagement en faveur de l'inclusion et de l'accessibilité
                </p>
              </motion.div>

              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl shadow-2xl p-12 text-white text-center relative overflow-hidden group">
                {/* Background Pattern amélioré */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }} />
                </div>

                {/* Éléments décoratifs */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                {/* Effet de brillance */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center justify-center mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white rounded-full p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                      <svg className="w-20 h-20 text-green-600 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  <h3 className="text-4xl font-bold mb-6">Inclusion et Accessibilité</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="text-3xl font-bold text-white mb-2">13%</div>
                      <div className="text-white/90">Candidats en situation de handicap</div>
                    </motion.div>
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="text-3xl font-bold text-white mb-2">100%</div>
                      <div className="text-white/90">Accessibilité garantie</div>
                    </motion.div>
                    <motion.div 
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="text-3xl font-bold text-white mb-2">24/7</div>
                      <div className="text-white/90">Support inclusif</div>
                    </motion.div>
                  </div>
                  
                  <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                    Nous nous engageons à créer un environnement inclusif et accessible pour tous les participants, 
                    en garantissant l'égalité des chances et l'accès à toutes les opportunités.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>

      {/* Back to top button */}
      <a href="#" className="fixed bottom-6 right-6 z-40 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition" aria-label="Revenir en haut">
        ↑
      </a>

      <Footer />
    </div>
  )
}