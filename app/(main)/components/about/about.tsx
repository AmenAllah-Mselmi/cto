/* eslint-disable react/no-unescaped-entities */

import { 
  Target, 
  Users, 
  Shield, 
  Award,
  Heart,
  Globe,
  Dumbbell,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion Sportive",
      description: "Nous croyons que le sport doit être accessible et sécuritaire pour tous."
    },
    {
      icon: Shield,
      title: "Expertise Technique",
      description: "Nos conseils sont basés sur la science du mouvement et la biomécanique."
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Nous créons un espace d'échange et de soutien entre sportifs."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "Nous utilisons la technologie pour améliorer l'expérience sportive."
    }
  ]

  const milestones = [
    {
      year: "2024",
      title: "Lancement SportPosture",
      description: "Début du projet pour le challenge Decathlon"
    },
    {
      year: "2023",
      title: "Recherche & Développement",
      description: "Étude des besoins en santé posturale des sportifs"
    },
    {
      year: "2022",
      title: "Conceptualisation",
      description: "Idée originale de la plateforme de santé posturale"
    }
  ]

  const team = [
    {
      name: "Alex Martin",
      role: "Expert Biomécanique",
      bio: "Spécialiste en prévention des blessures sportives"
    },
    {
      name: "Sarah Chen",
      role: "Coach Sportive",
      bio: "Ancienne athlète professionnelle de fitness"
    },
    {
      name: "Thomas Dubois",
      role: "Développeur Full-Stack",
      bio: "Passionné par la tech au service du sport"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-blue-600 to-cyan-500 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Target className="w-5 h-5" />
              <span>Notre Mission</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rendre le sport plus sûr et accessible
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              SportPosture est une initiative Decathlon qui vise à prévenir les blessures 
              sportives grâce à l'analyse posturale et aux conseils personnalisés.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Notre mission : protéger les sportifs
                </h2>
                <p className="text-gray-600 mb-6">
                  Chaque année, des millions de sportifs se blessent à cause de mauvaises 
                  postures ou de techniques incorrectes. Notre objectif est de réduire ce 
                  nombre en offrant des outils accessibles pour améliorer la technique 
                  sportive.
                </p>
                <p className="text-gray-600 mb-8">
                  En combinant l'expertise Decathlon en matière d'équipement sportif avec 
                  des technologies innovantes, nous créons une plateforme complète pour 
                  la santé posturale.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button className="bg-linear-to-r from-blue-600 to-cyan-500">
                      Nous contacter
                    </Button>
                  </Link>
                  <Link href="/exercices">
                    <Button variant="outline">
                      Voir les exercices
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Dumbbell className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">100+ Exercices</h3>
                    <p className="text-sm text-gray-600">Analysés et validés</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Expertise Collective</h3>
                    <p className="text-sm text-gray-600">Équipe pluridisciplinaire</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Innovation Continue</h3>
                    <p className="text-sm text-gray-600">Technologies émergentes</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Challenge Decathlon</h3>
                    <p className="text-sm text-gray-600">Projet primé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos valeurs fondamentales
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ces principes guident chaque décision que nous prenons.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                    <div className="w-14 h-14 bg-linear-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Notre parcours
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-linear-to-b from-blue-500 to-cyan-500 hidden lg:block" />
              
              <div className="space-y-12 lg:space-y-0">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`flex flex-col lg:flex-row items-center ${
                      index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Year */}
                    <div className="lg:w-1/2 lg:px-8 mb-6 lg:mb-0">
                      <div className={`text-right ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <span className="font-bold">{milestone.year}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden lg:block">
                      <div className="w-4 h-4 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full border-4 border-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="lg:w-1/2 lg:px-8">
                      <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${
                        index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                      }`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-linear-to-br from-gray-900 to-blue-950 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Rencontrez notre équipe
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Des passionnés de sport et de technologie unis par une mission commune.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full mb-4">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{member.role}</span>
                  </div>
                  <p className="text-gray-300">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Prêt à améliorer votre posture sportive ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté et découvrez comment optimiser vos performances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/exercices">
                <Button className="bg-linear-to-r from-blue-600 to-cyan-500 px-8 py-6 text-lg">
                  Commencer maintenant
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}