'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function waitForImagesAndFonts(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(), timeoutMs)

    const onReady = () => {
      clearTimeout(timeout)
      resolve()
    }

    const images = Array.from(document.images)
    const pendingImages = images.filter((img) => !img.complete)

    let remaining = pendingImages.length

    if (remaining === 0) {
      // Fonts may still be loading
      if ((document as any).fonts && (document as any).fonts.ready) {
        ;(document as any).fonts.ready.then(onReady).catch(onReady)
      } else {
        onReady()
      }
      return
    }

    const onImgDone = () => {
      remaining -= 1
      if (remaining <= 0) {
        if ((document as any).fonts && (document as any).fonts.ready) {
          ;(document as any).fonts.ready.then(onReady).catch(onReady)
        } else {
          onReady()
        }
      }
    }

    pendingImages.forEach((img) => {
      img.addEventListener('load', onImgDone, { once: true })
      img.addEventListener('error', onImgDone, { once: true })
    })
  })
}

async function waitForApiHealth(timeoutMs: number): Promise<void> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch('/api/debug', {
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'x-health-check': '1' },
    })
    if (!res.ok) throw new Error('API not OK')
  } catch (_) {
    // Swallow error; we only gate for a short while
  } finally {
    clearTimeout(timer)
  }
}

async function warmUpEndpoint(path: string, timeoutMs: number): Promise<void> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    await fetch(path, { cache: 'no-store', signal: controller.signal })
  } catch (_) {
    // ignore
  } finally {
    clearTimeout(timer)
  }
}

export default function GlobalLoader() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    let mounted = true

    const gate = async () => {
      // Add a minimum display to avoid flash
      const minDisplay = new Promise((r) => setTimeout(r, 600))
      const isOffresRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/offres-emploi')

      const common = [
        waitForApiHealth(3000),
        waitForImagesAndFonts(5000),
        minDisplay,
      ]

      if (isOffresRoute) {
        // Wait until offres page signals readiness
        const offresReady = new Promise<void>((resolve) => {
          const handler = () => {
            window.removeEventListener('offres-ready', handler as any)
            resolve()
          }
          window.addEventListener('offres-ready', handler as any, { once: true })
        })
        await Promise.all([...common, warmUpEndpoint('/api/offres', 4000), offresReady])
      } else {
        await Promise.all([...common])
      }
      if (mounted) setShow(false)
    }

    gate()

    return () => {
      mounted = false
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center w-64"
      >
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-black"
            initial={{ width: '0%' }}
            animate={{ width: ['0%', '60%', '85%', '100%'] }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
        <p className="text-sm text-gray-600">Veuillez patienter…</p>
      </motion.div>
    </div>
  )
}


