import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const usePageTracking = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Éviter de tracker les pages admin
    if (pathname.startsWith('/admin')) {
      return
    }

    // Fonction pour tracker la vue
    const trackView = async () => {
      try {
        await fetch('/api/analytics/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pagePath: pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer
          })
        })
      } catch (error) {
        console.error('Error tracking page view:', error)
      }
    }

    // Délai pour éviter de tracker trop souvent
    const timeoutId = setTimeout(trackView, 1000)

    return () => clearTimeout(timeoutId)
  }, [pathname])
}
