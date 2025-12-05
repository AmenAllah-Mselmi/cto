/* eslint-disable react/no-unescaped-entities */
// components/login/login.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle
} from 'lucide-react'

export default function AuthComponent() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(true) // Pré-coché pour faciliter

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation minimale pour le nom lors de l'inscription
    if (authMode === 'signup' && !formData.name) {
      setError('Veuillez saisir votre nom')
      return
    }

    try {
      setIsLoading(true)
      setError('')

      // Redirection immédiate selon le mode
      if (authMode === 'signin') {
        // Simuler une connexion réussie
        setTimeout(() => {
          // Stocker les infos dans localStorage (simulé)
          localStorage.setItem('auth_token', 'simulated_token_' + Date.now())
          localStorage.setItem('user_name', formData.name || 'Utilisateur')
          localStorage.setItem('user_email', formData.email || 'utilisateur@exemple.com')
          
          // Rediriger vers la page utilisateur
          router.push('/user')
        }, 500)
      } else {
        // Simuler une inscription réussie
        setTimeout(() => {
          // Stocker les infos dans localStorage (simulé)
          localStorage.setItem('auth_token', 'simulated_token_' + Date.now())
          localStorage.setItem('user_name', formData.name)
          localStorage.setItem('user_email', formData.email || 'utilisateur@exemple.com')
          
          // Rediriger vers onboarding
          router.push('/onboarding')
        }, 500)
      }
    } catch (err) {
      setError(`Une erreur est survenue`)
      console.error('Auth error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSignOut = async () => {
    try {
      setIsLoading(true)
      // Supprimer les infos de localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_name')
      localStorage.removeItem('user_email')
      // Rediriger vers l'accueil
      router.push('/')
    } catch (err) {
      setError('Erreur de déconnexion')
      console.error('Sign out error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Vérifier si l'utilisateur est connecté (via localStorage)
  const isLoggedIn = () => {
    return localStorage.getItem('auth_token') !== null
  }

  const getUserName = () => {
    return localStorage.getItem('user_name') || 'Utilisateur'
  }

  const getUserEmail = () => {
    return localStorage.getItem('user_email') || ''
  }

  // Option de connexion rapide - Se connecter directement sans formulaire
  const quickLogin = () => {
    setIsLoading(true)
    
    // Générer un email aléatoire
    const randomEmail = `utilisateur${Math.floor(Math.random() * 10000)}@exemple.com`
    
    // Stocker les infos dans localStorage
    localStorage.setItem('auth_token', 'quick_token_' + Date.now())
    localStorage.setItem('user_name', 'Utilisateur Test')
    localStorage.setItem('user_email', randomEmail)
    
    // Rediriger immédiatement
    setTimeout(() => {
      router.push('/user')
      setIsLoading(false)
    }, 300)
  }

  // Afficher le profil si connecté
  if (isLoggedIn()) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
            {getUserName().charAt(0).toUpperCase()}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900 truncate">{getUserName()}</p>
            <p className="text-xs text-gray-500 truncate">{getUserEmail()}</p>
          </div>
        </div>
        <Button 
          onClick={() => router.push('/user')} 
          variant="outline" 
          className="hidden sm:inline-flex"
        >
          Mon profil
        </Button>
        <Button onClick={handleSignOut} disabled={isLoading} variant="ghost" className="flex items-center gap-2">
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Se déconnecter'}
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel - Visual */}
        <div className="hidden lg:flex flex-col justify-center items-start p-10 gap-6 bg-gradient-to-br from-blue-600 to-cyan-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold">SportPosture</h2>
            <p className="text-sm opacity-90 mt-2">
              {authMode === 'signup' 
                ? "Rejoignez notre communauté sportive" 
                : "Bienvenue de retour"}
            </p>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Accès immédiat</p>
                <p className="text-xs opacity-90">Aucune vérification requise</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Mode démo</p>
                <p className="text-xs opacity-90">Toutes les fonctionnalités disponibles</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-6">
            <Button 
              onClick={quickLogin}
              disabled={isLoading}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 py-3"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Accès instantané sans inscription'
              )}
            </Button>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="p-8 md:p-10">
          {/* Mode Toggle */}
          <div className="flex mb-6">
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 mx-auto">
              <button
                onClick={() => {
                  setAuthMode('signin')
                  setError('')
                }}
                className={`flex-1 rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup')
                  setError('')
                }}
                className={`flex-1 rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Inscription
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {authMode === 'signup' ? 'Créer un compte' : 'Connectez-vous'}
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              {authMode === 'signup' 
                ? 'Saisissez simplement un nom pour commencer' 
                : 'Entrez n\'importe quel email et mot de passe'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-5">
            {authMode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">
                  Nom complet
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom (obligatoire)"
                    className="pl-10 py-6"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Adresse email
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@exemple.com (optionnel)"
                  className="pl-10 py-6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Mot de passe
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="•••••••• (optionnel)"
                  className="pl-10 py-6 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authMode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirmer le mot de passe
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="•••••••• (optionnel)"
                    className="pl-10 py-6"
                  />
                </div>
              </div>
            )}

            {authMode === 'signup' && (
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  J'accepte les{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">conditions d'utilisation</a>{' '}
                  et la{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline">politique de confidentialité</a>
                </Label>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || (authMode === 'signup' && !formData.name)}
              className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {authMode === 'signup' ? 'Redirection...' : 'Connexion...'}
                </>
              ) : (
                authMode === 'signup' ? 'Commencer maintenant' : 'Accéder à mon profil'
              )}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {authMode === 'signin' ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
                  setError('')
                }}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                {authMode === 'signin' ? 'S\'inscrire' : 'Se connecter'}
              </button>
            </p>
          </div>

          {/* Additional Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Mode démo - Aucune vérification d'identité n'est effectuée.
              <br />
              <a href="/help" className="text-blue-600 hover:underline">Mode test uniquement</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}