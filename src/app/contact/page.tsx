'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, MessageSquare, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/lib/emailjs-config'
import { incrementApplications } from '@/lib/analytics'
import AnalyticsWidget from '@/components/AnalyticsWidget'

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  sujet: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  accepteNewsletter: z.boolean().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      accepteNewsletter: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Vérifier si EmailJS est configuré
      if (EMAILJS_CONFIG.publicKey === 'your_public_key') {
        // Fallback vers mailto si EmailJS n'est pas configuré
        const subject = encodeURIComponent(data.sujet)
        const body = encodeURIComponent(
          `Nom: ${data.nom}\n` +
          `Email: ${data.email}\n` +
          `Sujet: ${data.sujet}\n\n` +
          `Message:\n${data.message}\n\n` +
          `Newsletter: ${data.accepteNewsletter ? 'Oui' : 'Non'}`
        )
        
        const mailtoLink = `mailto:marcnzenang@gmail.com?subject=${subject}&body=${body}`
        window.location.href = mailtoLink
        
        toast.success('Votre client email va s\'ouvrir. Veuillez envoyer le message.')
        reset()
      } else {
        // Utiliser EmailJS si configuré
        const templateParams = {
          from_name: data.nom,
          from_email: data.email,
          subject: data.sujet,
          message: data.message,
          newsletter: data.accepteNewsletter ? 'Oui' : 'Non',
          to_email: EMAILJS_CONFIG.toEmail
        }
        
        await emailjs.send(
          EMAILJS_CONFIG.serviceId, 
          EMAILJS_CONFIG.templateId, 
          templateParams, 
          EMAILJS_CONFIG.publicKey
        )
        
        toast.success('Message envoyé avec succès ! Vous devriez recevoir une réponse dans les plus brefs délais.')
        reset()
      }
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'journeemploiformation@gmail.com',
      link: 'mailto:journeemploiformation@gmail.com',
      color: 'text-egalite-blue'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '698-704-167 / 653-164-623',
      link: 'tel:+237698704167',
      color: 'text-egalite-yellow'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      value: 'Geneva Hotel - Douala, Cameroun',
      link: 'https://maps.google.com',
      color: 'text-egalite-blue'
    }
  ]

  // Composant TikTok personnalisé
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
    </svg>
  )

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1JCmM9jcdj/', label: 'Facebook', color: 'text-blue-600' },
    { icon: Instagram, href: 'https://www.instagram.com/asso_egalite_pour_tous/', label: 'Instagram', color: 'text-pink-600' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/les-journees-de-l%C2%B4emploi-et-de-la-formation/', label: 'LinkedIn', color: 'text-blue-700' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@asso_egalite_pour_tous?_t=ZM-8zNCQ3nbeM9&_r=1', label: 'TikTok', color: 'text-black' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-egalite-blue/10 to-egalite-yellow/10">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-egalite-dark mb-6">
                Contactez-nous
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Nous sommes là pour vous accompagner. N'hésitez pas à nous contacter 
                pour toute question concernant nos services ou nos événements.
              </p>

              {/* Informations de contact rapides */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-${info.color.split('-')[1]}/20 to-${info.color.split('-')[1]}/10 flex items-center justify-center`}>
                      <info.icon className={`w-8 h-8 ${info.color}`} />
                    </div>
                    <h3 className="font-bold text-egalite-dark mb-3 text-lg">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-600 hover:text-egalite-blue transition-colors text-base break-words leading-relaxed"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-base break-words leading-relaxed">{info.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Formulaire de contact et informations */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-bold text-egalite-dark mb-8">
                  Envoyez-nous un message
                </h2>
                
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Nom */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          {...register('nom')}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                            errors.nom ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Votre nom complet"
                        />
                        {errors.nom && (
                          <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="votre@email.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Sujet */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        {...register('sujet')}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                          errors.sujet ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Sujet de votre message"
                      />
                      {errors.sujet && (
                        <p className="mt-1 text-sm text-red-600">{errors.sujet.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register('message')}
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-egalite-blue focus:border-transparent ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Décrivez votre demande ou question..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newsletter"
                        {...register('accepteNewsletter')}
                        className="w-4 h-4 text-egalite-blue border-gray-300 rounded focus:ring-egalite-blue"
                      />
                      <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                        J'accepte de recevoir la newsletter avec nos actualités
                      </label>
                    </div>

                    {/* Bouton d'envoi */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-egalite-blue to-egalite-yellow text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Envoyer le message</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              {/* Informations de contact détaillées */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-bold text-egalite-dark mb-8">
                  Nos coordonnées
                </h2>

                <div className="space-y-8">
                  {/* Informations principales */}
                  <div className="bg-gradient-to-br from-egalite-blue/10 to-egalite-yellow/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-egalite-dark mb-6">
                      Association Égalité Pour Tous
                    </h3>
                    
                    <div className="space-y-4">
                      {contactInfo.map((info) => (
                        <div key={info.title} className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${info.color.split('-')[1]}/20 to-${info.color.split('-')[1]}/10 flex items-center justify-center flex-shrink-0`}>
                            <info.icon className={`w-5 h-5 ${info.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-egalite-dark">{info.title}</h4>
                            {info.link ? (
                              <a
                                href={info.link}
                                className="text-gray-600 hover:text-egalite-blue transition-colors"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-gray-600">{info.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-bold text-egalite-dark mb-6">
                      Suivez-nous
                    </h3>
                    
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className={`w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors ${social.color}`}
                          aria-label={social.label}
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-egalite-dark">WhatsApp</h3>
                        <p className="text-gray-600">Contact rapide</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      Pour un contact rapide, vous pouvez également nous joindre via WhatsApp.
                    </p>
                    
                    <a
                      href="https://wa.me/237698704167"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Ouvrir WhatsApp</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <AnalyticsWidget />
    </div>
  )
}


