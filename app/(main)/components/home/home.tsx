/* eslint-disable react/no-unescaped-entities */
// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  Dumbbell, 
  Target, 
  Users, 
  Award,
  PlayCircle,
  ArrowRight,
  Shield,
  TrendingUp,
  CheckCircle,
  Star,
  Clock,
  Heart,
  ChevronRight,
  BarChart3,
  Video,
  Download,
  Calendar,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState({
    users: 0,
    exercises: 0,
    successRate: 0,
    hours: 0
  })

  const testimonials = [
    {
      name: "Marie L.",
      role: "Coureuse amateur",
      text: "Grâce aux conseils de SportPosture, j'ai corrigé ma foulée et mes douleurs au genou ont disparu !",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
    },
    {
      name: "Thomas D.",
      role: "Coach sportif",
      text: "Je recommande cette plateforme à tous mes clients. Les vidéos explicatives sont exceptionnelles.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
    },
    {
      name: "Sophie M.",
      role: "Yogini débutante",
      text: "Les guides PDF m'ont beaucoup aidée à comprendre les postures de base. Très pédagogique !",
      rating: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop"
    }
  ]

  const features = [
    {
      icon: Dumbbell,
      title: "Exercices Personnalisés",
      description: "Des programmes adaptés à votre niveau et objectifs",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Target,
      title: "Correction Posturale",
      description: "Détection et correction des mauvaises postures",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Échangez avec des milliers de sportifs passionnés",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: Award,
      title: "Certification Experts",
      description: "Contenu validé par des professionnels du sport",
      color: "from-orange-500 to-red-400"
    }
  ]

  const exercises = [
    {
      name: "Squat Parfait",
      category: "Musculation",
      difficulty: "Débutant",
      duration: "15 min",
      views: "12.5K",
      image: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=400&h=300&fit=crop"
    },
    {
      name: "Posture Yoga",
      category: "Yoga",
      difficulty: "Intermédiaire",
      duration: "10 min",
      views: "8.7K",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
    },
    {
      name: "Renforcement Dos",
      category: "Rééducation",
      difficulty: "Tous niveaux",
      duration: "20 min",
      views: "15.2K",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    }
  ]

  const resources = [
    {
      icon: Video,
      title: "Vidéos Tutoriels",
      count: "50+",
      description: "Démonstrations détaillées de chaque mouvement"
    },
    {
      icon: Download,
      title: "Guides PDF",
      count: "12",
      description: "Programmes complets à télécharger"
    },
    {
      icon: Calendar,
      title: "Sessions Live",
      count: "3/semaine",
      description: "Coaching en direct avec nos experts"
    },
    {
      icon: BarChart3,
      title: "Suivi Progrès",
      count: "100%",
      description: "Tableau de bord personnalisé"
    }
  ]

  // Animated stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    // Animate stats
    const animateStats = () => {
      let count = 0
      const duration = 2000
      const steps = 60
      const increment = {
        users: 12500 / steps,
        exercises: 50 / steps,
        successRate: 94 / steps,
        hours: 1500 / steps
      }

      const timer = setInterval(() => {
        count++
        setStats({
          users: Math.min(Math.floor(count * increment.users), 12500),
          exercises: Math.min(Math.floor(count * increment.exercises), 50),
          successRate: Math.min(Math.floor(count * increment.successRate), 94),
          hours: Math.min(Math.floor(count * increment.hours), 1500)
        })

        if (count >= steps) {
          clearInterval(timer)
        }
      }, duration / steps)
    }

    setTimeout(animateStats, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
  
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Challenge Decathlon 2024</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Devenez le CTO de
                <span className="block text-cyan-300">Votre Santé Posturale</span>
              </h1>
              
              <p className="text-xl opacity-90 mb-10 max-w-2xl">
                Une plateforme innovante qui combine technologie et expertise sportive 
                pour prévenir les blessures et optimiser vos performances.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/exercices" className="flex-1">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg group">
                    <PlayCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Découvrir les exercices
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/about" className="flex-1">
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white/10 px-8 py-6 text-lg">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{stats.users.toLocaleString()}+</div>
                <div className="text-blue-200">Sportifs actifs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{stats.exercises}+</div>
                <div className="text-blue-200">Exercices détaillés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{stats.successRate}%</div>
                <div className="text-blue-200">Taux de réussite</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{stats.hours}+</div>
                <div className="text-blue-200">Heures de contenu</div>
              </div>
            </div>
          </div>
          
          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" fill="white"></path>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Pourquoi choisir SportPosture ?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous rendons la santé posturale accessible à tous grâce à une approche 
                innovante et scientifiquement validée.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Découvrir</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Innovation Technologique</span>
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Analyse posturale avancée
                </h2>
                
                <p className="text-lg text-gray-600 mb-8">
                  Notre système utilise l'intelligence artificielle pour analyser 
                  votre posture en temps réel et vous fournir des corrections 
                  personnalisées.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    "Détection des points clés du corps",
                    "Analyse biomécanique précise",
                    "Feedback en temps réel",
                    "Historique de progression"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/exercices">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8 py-6 text-lg">
                    Essayer la démo
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-400 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                          <PlayCircle className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-white font-medium">Démonstration en vidéo</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">Analyse Squat</h3>
                        <p className="text-sm text-gray-600">Correction en temps réel</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">3:45</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-3/4"></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Exercises */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Exercices populaires
                </h2>
                <p className="text-gray-600">
                  Découvrez nos exercices les plus consultés
                </p>
              </div>
              <Link href="/exercices">
                <Button variant="outline" className="group">
                  Voir tous
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {exercises.map((exercise, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={exercise.image} 
                      alt={exercise.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                        {exercise.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        exercise.difficulty === 'Débutant' ? 'bg-green-100 text-green-800' :
                        exercise.difficulty === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {exercise.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exercise.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {exercise.views} vues
                          </span>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                    
                    <Link href={`/exercices#${exercise.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button className="w-full group">
                        <PlayCircle className="w-5 h-5 mr-2" />
                        Voir le tutoriel
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-blue-950 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Ressources complètes
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tout ce dont vous avez besoin pour améliorer votre posture sportive
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {resources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-cyan-300" />
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <div className="text-3xl font-bold">{resource.count}</div>
                      <h3 className="text-lg font-bold">{resource.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {resource.description}
                    </p>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center">
              <Link href="/exercices">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 px-8 py-6 text-lg">
                  <Download className="w-6 h-6 mr-3" />
                  Accéder à toutes les ressources
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ce que disent nos sportifs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Rejoignez notre communauté de sportifs satisfaits
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonials[currentTestimonial].rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-xl text-gray-700 mb-6 italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-blue-600">
                        {testimonials[currentTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Testimonial navigation */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentTestimonial 
                          ? 'bg-blue-600 w-8' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Aller au témoignage ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8">
                <Award className="w-6 h-6" />
                <span className="font-medium">Challenge Decathlon</span>
              </div>
              
              <h2 className="text-5xl font-bold mb-6">
                Prêt à révolutionner votre pratique sportive ?
              </h2>
              
              <p className="text-xl mb-10 opacity-90">
                Rejoignez notre plateforme innovante et bénéficiez de conseils 
                personnalisés pour préserver votre santé posturale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/exercices">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-7 text-lg">
                    Commencer gratuitement
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button variant="outline" className="text-white border-white hover:bg-white/10 px-10 py-7 text-lg">
                    Demander une démo
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 text-sm text-white/80">
                <p>Aucune carte de crédit requise • Accès immédiat</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}