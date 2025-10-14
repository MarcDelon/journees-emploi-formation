import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import GlobalLoader from '@/components/GlobalLoader'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://site-vitrine-egalite.vercel.app'),
  title: 'Égalité Pour Tous - Journées de l\'Emploi et de la Formation',
  description: 'Site vitrine des Journées de l\'Emploi et de la Formation organisées par l\'Association Égalité Pour Tous. Découvrez nos offres d\'emploi et de stage.',
  keywords: 'emploi, formation, stage, association, égalité, insertion professionnelle',
  authors: [{ name: 'Association Égalité Pour Tous' }],
  openGraph: {
    title: 'Égalité Pour Tous - Journées de l\'Emploi et de la Formation',
    description: 'Site vitrine des Journées de l\'Emploi et de la Formation',
    type: 'website',
    url: 'https://site-vitrine-egalite.vercel.app',
    siteName: 'Égalité Pour Tous',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Égalité Pour Tous - Journées de l\'Emploi et de la Formation',
    description: 'Site vitrine des Journées de l\'Emploi et de la Formation',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <GlobalLoader />
        {children}
        <Toaster 
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{
            bottom: '20px',
            right: '20px',
          }}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
            success: {
              duration: 5000,
              style: {
                background: '#059669',
                color: '#fff',
                fontWeight: 'bold',
              },
            },
            error: {
              duration: 6000,
              style: {
                background: '#dc2626',
                color: '#fff',
                fontWeight: 'bold',
              },
            },
          }}
        />
      </body>
    </html>
  )
}

