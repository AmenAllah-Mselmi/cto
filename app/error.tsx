/* eslint-disable react/no-unescaped-entities */
// app/error.tsx
'use client'

import { AlertTriangle, RefreshCw, Home, Activity, Shield } from 'lucide-react'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to analytics
    console.error('Application error:', error)
  }, [error])

  const errorTypes = {
    posture: {
      title: "Oups ! Une erreur de posture technique",
      message: "Notre système a détecté une mauvaise position dans le code. Ne vous inquiétez pas, nos coachs techniques sont là pour vous aider.",
      icon: Activity,
      color: "from-orange-500 to-amber-500"
    },
    connection: {
      title: "Connexion perdue",
      message: "La connexion avec notre serveur sportif a été interrompue. Vérifiez votre réseau et réessayez.",
      icon: Shield,
      color: "from-blue-500 to-cyan-500"
    },
    default: {
      title: "Erreur inattendue",
      message: "Une erreur s'est produite pendant l'exécution de votre programme sportif.",
      icon: AlertTriangle,
      color: "from-red-500 to-rose-500"
    }
  }

  const getErrorType = () => {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return errorTypes.connection
    }
    if (error.message.includes('posture') || error.message.includes('exercise')) {
      return errorTypes.posture
    }
    return errorTypes.default
  }

  const errorType = getErrorType()
  const Icon = errorType.icon

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Error Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`bg-linear-to-r ${errorType.color} p-8 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32" />
            
            <div className="relative z-10 flex flex-col items-center text-center text-white">
              <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Icon className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{errorType.title}</h1>
              <p className="text-white/90 text-lg">Code d&apos;erreur: #{error.digest?.substring(0, 8) || 'UNKNOWN'}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-start gap-4 p-6 bg-linear-to-r from-gray-50 to-white rounded-2xl border border-gray-200">
                <AlertTriangle className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Détails techniques</h3>
                  <p className="text-gray-600">{errorType.message}</p>
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg font-mono text-sm text-gray-700 overflow-x-auto">
                    {error.message.substring(0, 200)}...
                  </div>
                </div>
              </div>
            </div>

            {/* Recovery Steps */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Réessayer</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Parfois, une simple reprise suffit à corriger le mouvement.
                </p>
                <Button
                  onClick={reset}
                  className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
                >
                  Réinitialiser l'exercice
                </Button>
              </div>

              <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Home className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Retour au programme</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Revenez à votre tableau de bord pour continuer votre entraînement.
                </p>
                <Link href="/dashboard" className="block">
                  <Button
                    className="w-full bg-linear-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white"
                  >
                    Tableau de bord
                  </Button>
                </Link>
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                Besoin d'aide supplémentaire ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/faq"
                  className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="text-blue-600 font-medium mb-1 group-hover:text-blue-700">
                    FAQ Technique
                  </div>
                  <div className="text-sm text-gray-600">
                    Réponses aux questions fréquentes
                  </div>
                </a>
                <a
                  href="/contact"
                  className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                >
                  <div className="text-green-600 font-medium mb-1 group-hover:text-green-700">
                    Support Coach
                  </div>
                  <div className="text-sm text-gray-600">
                    Contactez nos experts
                  </div>
                </a>
                <a
                  href="/status"
                  className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                >
                  <div className="text-purple-600 font-medium mb-1 group-hover:text-purple-700">
                    État du service
                  </div>
                  <div className="text-sm text-gray-600">
                    Vérifiez nos serveurs
                  </div>
                </a>
              </div>
            </div>

            {/* Error ID for support */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Référence d'erreur: <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">{error.digest || 'N/A'}</code>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Si le problème persiste, veuillez fournir ce code à notre équipe de support.
              </p>
            </div>
          </div>
        </div>

        {/* Decathlon Branding */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-6 h-6 bg-linear-to-r from-blue-600 to-cyan-500 rounded flex items-center justify-center">
              <Activity className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm">Une application</span>
            <span className="font-bold text-blue-600">Decathlon</span>
            <span className="text-sm">pour votre santé sportive</span>
          </div>
        </div>
      </div>
    </div>
  )
}