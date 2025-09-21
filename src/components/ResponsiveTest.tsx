'use client'

import { useState, useEffect } from 'react'

const ResponsiveTest = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const getBreakpoint = () => {
    if (screenSize.width < 475) return 'xs'
    if (screenSize.width < 640) return 'sm'
    if (screenSize.width < 768) return 'md'
    if (screenSize.width < 1024) return 'lg'
    if (screenSize.width < 1280) return 'xl'
    return '2xl'
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      <div>Screen: {screenSize.width}x{screenSize.height}</div>
      <div>Breakpoint: {getBreakpoint()}</div>
    </div>
  )
}

export default ResponsiveTest
