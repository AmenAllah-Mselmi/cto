/* eslint-disable react/no-unescaped-entities */
// components/login/login.tsx
'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  LogOut,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AuthComponent() {
  const { data: session, status } = useSession()
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
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleGoogleAuth = async (mode: 'signin' | 'signup') => {
    try {
      setIsLoading(true)
      setError('')
      
      const callbackUrl = mode === 'signup' ? '/onboarding' : '/user' // Changé de /dashboard à /user
      
      await signIn('google', { 
        callbackUrl,
        redirect: true 
      })
      
    } catch (err) {
      setError(`Erreur de ${mode === 'signup' ? 'création de compte' : 'connexion'} avec Google`)
      console.error('Google auth error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation de base
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs obligatoires')
      return
    }
    
    if (authMode === 'signup') {
      if (!formData.name) {
        setError('Le nom est requis')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas')
        return
      }
      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères')
        return
      }
      if (!acceptTerms) {
        setError('Veuillez accepter les conditions d\'utilisation')
        return
      }
    }

    try {
      setIsLoading(true)
      setError('')

      if (authMode === 'signin') {
        // Connexion avec credentials - redirection vers /user
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
          callbackUrl: '/user' // Changé de /dashboard à /user
        })

        if (result?.error) {
          setError('Email ou mot de passe incorrect')
        } else if (result?.ok) {
          // Rediriger directement vers /user
          router.push('/user')
        }
      } else {
        // Inscription
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Erreur lors de l\'inscription')
        } else {
          // Auto-login après inscription - redirection vers /onboarding pour signup
          const loginResult = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
            callbackUrl: '/onboarding'
          })

          if (loginResult?.ok) {
            router.push('/onboarding')
          }
        }
      }
    } catch (err) {
      setError(`Erreur lors de ${authMode === 'signup' ? 'l\'inscription' : 'la connexion'}`)
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
      await signOut({ callbackUrl: '/' })
    } catch (err) {
      setError('Erreur de déconnexion')
      console.error('Sign out error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    )
  }

  // When user is authenticated show a compact profile + sign out
  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-white shadow-md">
            <AvatarImage src={session.user?.image || ''} />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              {session.user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
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
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
          <span className="hidden sm:inline">Se déconnecter</span>
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
                <p className="text-sm font-medium">Analyse avancée</p>
                <p className="text-xs opacity-90">Technologie IA pour votre posture</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Recommandations</p>
                <p className="text-xs opacity-90">Exercices personnalisés</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Sécurisé et confidentiel</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-2">
              <CheckCircle className="w-4 h-4" />
              <span>Gratuit pour commencer</span>
            </div>
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
                ? 'Commencez votre parcours sportif personnalisé' 
                : 'Accédez à votre profil'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Google Auth Button */}
          <div className="mb-8">
            <Button
              type="button"
              onClick={() => handleGoogleAuth(authMode)}
              disabled={isLoading}
              variant="outline"
              className="w-full flex items-center justify-center gap-3 py-6 text-base border-gray-300 hover:bg-gray-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-medium">
                    {authMode === 'signup' ? 'S\'inscrire avec Google' : 'Continuer avec Google'}
                  </span>
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Ou continuez avec</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

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
                    placeholder="Jean Dupont"
                    className="pl-10 py-6"
                    required={authMode === 'signup'}
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
                  placeholder="vous@exemple.com"
                  className="pl-10 py-6"
                  required
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
                  placeholder="••••••••"
                  className="pl-10 py-6 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {authMode === 'signup' && (
                <p className="text-xs text-gray-500">Minimum 6 caractères</p>
              )}
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
                    placeholder="••••••••"
                    className="pl-10 py-6"
                    required={authMode === 'signup'}
                  />
                </div>
              </div>
            )}

            {authMode === 'signin' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                    Se souvenir de moi
                  </Label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Mot de passe oublié ?
                </a>
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
                  required
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
              disabled={isLoading}
              className="w-full py-6 text-base bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {authMode === 'signup' ? 'Création du compte...' : 'Connexion...'}
                </>
              ) : (
                authMode === 'signup' ? 'Créer mon compte' : 'Accéder à mon profil'
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
              En continuant, vous acceptez nos conditions d'utilisation.
              <br />
              <a href="/help" className="text-blue-600 hover:underline">Besoin d'aide ?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}