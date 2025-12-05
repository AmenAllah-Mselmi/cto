/* eslint-disable react/no-unescaped-entities */
// app/not-found.tsx - Version minimaliste
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        
        <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Page non trouvée
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link 
              href="/contact" 
              className="text-blue-600 hover:text-blue-700"
            >
              Besoin d'aide ?
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}