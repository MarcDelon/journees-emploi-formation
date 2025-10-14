'use client'

import { motion } from 'framer-motion'

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
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
            animate={{ width: ['0%', '70%', '100%'] }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
        <p className="text-sm text-gray-600">Chargement…</p>
      </motion.div>
    </div>
  )
}


