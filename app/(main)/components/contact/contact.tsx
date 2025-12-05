/* eslint-disable react/no-unescaped-entities */
// app/contact/page.tsx
'use client'

import { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "contact@sportposture.fr",
      description: "Réponse sous 24h"
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: "01 23 45 67 89",
      description: "Lun-Ven: 9h-18h"
    },
    {
      icon: MapPin,
      title: "Bureau",
      details: "Decathlon Digital",
      description: "4 Bd de Mons, 59650 Villeneuve-d'Ascq"
    },
    {
      icon: Clock,
      title: "Horaires",
      details: "Support technique",
      description: "9h-19h, 7j/7"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Ici, vous enverriez les données à votre API
      console.log('Formulaire envoyé:', formData)
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Réinitialiser le statut après 5 secondes
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Erreur:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-blue-600 to-cyan-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contactez-nous
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Nous sommes là pour répondre à vos questions sur la santé posturale.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="w-14 h-14 bg-linear-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-gray-900 font-semibold mb-2">{info.details}</p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Envoyez-nous un message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                  </p>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-800 mb-1">
                          Message envoyé !
                        </h3>
                        <p className="text-green-700 text-sm">
                          Nous vous répondrons dans les plus brefs délais.
                        </p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-red-800 mb-1">
                          Erreur d'envoi
                        </h3>
                        <p className="text-red-700 text-sm">
                          Veuillez réessayer ou nous contacter par email.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="question">Question technique</option>
                        <option value="partnership">Partenariat</option>
                        <option value="feedback">Retour d'expérience</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Décrivez votre question ou votre demande..."
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                        J'accepte la{' '}
                        <a href="/privacy" className="text-blue-600 hover:text-blue-700">
                          politique de confidentialité
                        </a>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 h-12"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Envoyer le message
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Map & FAQ */}
              <div className="space-y-8">
                {/* Map */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">
                      Notre localisation
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Decathlon Digital, Villeneuve-d'Ascq
                    </p>
                  </div>
                  <div className="h-64 bg-linear-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-700 font-semibold">
                        Decathlon Digital Headquarters
                      </p>
                      <p className="text-gray-600 text-sm">
                        4 Boulevard de Mons<br />
                        59650 Villeneuve-d'Ascq, France
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Questions fréquentes
                  </h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Combien de temps pour une réponse ?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Nous répondons généralement dans les 24 heures ouvrables.
                      </p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Offrez-vous des consultations ?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Oui, nous proposons des consultations gratuites de 30 minutes.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Puis-je devenir partenaire ?
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Contactez-nous pour discuter des opportunités de partenariat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Support urgent ?
                  </h3>
                  <p className="opacity-90 mb-4">
                    Pour une assistance immédiate, contactez notre support technique.
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">01 23 45 67 89</p>
                      <p className="text-sm opacity-80">Disponible 7j/7</p>
                    </div>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      Appeler maintenant
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Restez informé
              </h2>
              <p className="text-gray-600 mb-6">
                Recevez nos conseils posturaux et les dernières actualités.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                  S'abonner
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-3">
                Pas de spam. Désinscription à tout moment.
              </p>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}