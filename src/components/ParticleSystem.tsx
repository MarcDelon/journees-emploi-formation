'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface ParticleSystemProps {
  particleCount?: number
  colors?: string[]
  mouseInteraction?: boolean
  type?: 'floating' | 'explosion' | 'trail' | 'magic'
}

export default function ParticleSystem({ 
  particleCount = 50, 
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
  mouseInteraction = true,
  type = 'floating'
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight - 80 // Hauteur moins le header
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    // Add new particles continuously
    const addNewParticle = () => {
      particlesRef.current.push(createParticle())
    }

    const createParticle = (): Particle => {
      const size = Math.random() * 3 + 2 // Plus grandes
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      return {
        x: Math.random() * canvas.width,
        y: -50, // Commence plus haut au-dessus de l'écran
        vx: (Math.random() - 0.5) * 0.2, // Mouvement horizontal léger
        vy: Math.random() * 0.8 + 0.5, // Vitesse de chute visible
        size,
        opacity: Math.random() * 0.4 + 0.8, // Plus opaque
        color,
        life: 0,
        maxLife: Math.random() * 200 + 300
      }
    }

    const updateParticle = (particle: Particle) => {
      // Mouse interaction
      if (mouseInteraction) {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }
      }

      // Update position based on type
      switch (type) {
        case 'floating':
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= 0.99
          particle.vy *= 0.99
          break
        case 'explosion':
          particle.x += particle.vx
          particle.y += particle.vy
          particle.vx *= 0.98
          particle.vy *= 0.98
          particle.size *= 0.995
          break
        case 'trail':
          particle.x += particle.vx
          particle.y += particle.vy
          particle.opacity *= 0.98
          break
        case 'magic':
          // Flocons qui tombent de façon continue et fluide
          particle.x += particle.vx + Math.sin(particle.life * 0.01) * 0.3
          particle.y += particle.vy + 0.8 // Force de gravité visible
          particle.vx *= 0.998 // Résistance de l'air très faible
          particle.vy *= 0.998
          break
      }

      particle.life++

      // Reset particle if it's out of bounds - flux continu infini
      if (particle.y > canvas.height + 100) {
        // Réapparaît en haut avec de nouveaux paramètres
        particle.x = Math.random() * canvas.width
        particle.y = -50 // Commence plus haut
        particle.vx = (Math.random() - 0.5) * 0.2
        particle.vy = Math.random() * 0.8 + 0.5
        particle.life = 0
        particle.maxLife = Math.random() * 200 + 300
        particle.opacity = Math.random() * 0.4 + 0.8
        particle.size = Math.random() * 3 + 2
      }
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      
      // Create gradient for particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      )
      gradient.addColorStop(0, particle.color)
      gradient.addColorStop(1, 'transparent')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      
      // Add glow effect
      ctx.shadowBlur = particle.size * 3
      ctx.shadowColor = particle.color
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    const drawConnections = () => {
      const particles = particlesRef.current
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.globalAlpha = (100 - distance) / 100 * 0.3
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Debug: dessiner un rectangle pour vérifier que le canvas fonctionne
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach(particle => {
        updateParticle(particle)
        drawParticle(particle)
      })
      
      drawConnections()
      
      // Add new particles continuously - flux infini
      if (Math.random() < 0.15) { // 15% chance each frame pour un flux plus dense
        addNewParticle()
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (canvas) {
      observer.observe(canvas)
    }

    // Initialize and start animation
    initParticles()
    if (isVisible) {
      animate()
    }

    // Add particles continuously - flux infini simple
    const particleTimer = setInterval(() => {
      if (isVisible) {
        addNewParticle()
      }
    }, 150) // Nouvelle particule toutes les 150ms pour un flux plus dense

    // Event listeners
    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearInterval(particleTimer)
      window.removeEventListener('resize', resizeCanvas)
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      observer.disconnect()
    }
  }, [particleCount, colors, mouseInteraction, type, isVisible])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ 
        background: 'transparent',
        top: '80px' // Commence sous le header
      }}
    />
  )
}
