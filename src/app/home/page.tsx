'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import ActivitiesSection from '@/components/ActivitiesSection'
import CTASection from '@/components/CTASection'
import DynamicBackground from '@/components/DynamicBackground'
import ScrollingNews from '@/components/ScrollingNews'
import FloatingElements from '@/components/FloatingElements'
import VideoTestimonialsSection from '@/components/VideoTestimonialsSection'
import PartenairesSection from '@/components/PartenairesSection'
import { usePageTracking } from '@/hooks/usePageTracking'
import ResponsiveTest from '@/components/ResponsiveTest'

export default function HomePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    mass: 0.3
  })
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.92, 0.8])

  // Tracker les vues de page
  usePageTracking()

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      <DynamicBackground />
      <FloatingElements />
      <Header />
      <main className="relative z-10 pt-16">
        <ScrollingNews />
        <motion.div style={{ y: backgroundY, opacity }}>
          <HeroSection />
        </motion.div>
        <PartenairesSection />
        <VideoTestimonialsSection />
        <ActivitiesSection />
        <CTASection />
      </main>
      <Footer />
      <ResponsiveTest />
    </div>
  )
}









