/* eslint-disable react-hooks/purity */
// app/loading.tsx
import { Dumbbell, HeartPulse, Activity, Target } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {/* Logo & Title */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            Sport<span className="text-orange-500">Posture</span>
          </h1>
        </div>
        <p className="text-gray-600">Optimisez votre posture, maximisez vos performances</p>
      </div>

      {/* Animated Sport Icons */}
      <div className="flex gap-8 mb-12">
        {[Dumbbell, HeartPulse, Target, Activity].map((Icon, index) => (
          <div
            key={index}
            className="relative group"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 animate-bounce">
              <Icon className="w-8 h-8 text-blue-600 group-hover:text-cyan-500 transition-colors" />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl animate-pulse" />
          </div>
        ))}
      </div>

      {/* Progress Bar with Animation */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Analyse en cours...</span>
          <span className="font-semibold text-blue-600 animate-pulse">Votre posture</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-blue-500 via-cyan-500 to-emerald-500 rounded-full w-1/2 animate-[loading_2s_ease-in-out_infinite] relative">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Démarrage</span>
          <span>Analyse biomécanique</span>
          <span>Recommandations</span>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 max-w-lg text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full mb-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-700">Conseil du moment</span>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
          <p className="text-gray-700 italic">
            Maintenez votre dos droit et vos épaules en arrière pendant vos exercices pour prévenir les blessures.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-cyan-300 border-2 border-white animate-bounce"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">+{Math.floor(Math.random() * 50)} sportifs suivent ce conseil</span>
          </div>
        </div>
      </div>

      {/* Sport Animation */}
      <div className="mt-12">
        <div className="relative w-64 h-32">
          {/* Running Person */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 animate-[run_3s_linear_infinite]">
            <div className="w-8 h-12 bg-linear-to-b from-blue-600 to-cyan-500 rounded-full relative">
              {/* Head */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-linear-to-b from-blue-700 to-cyan-600 rounded-full" />
              {/* Arms */}
              <div className="absolute top-2 -left-3 w-6 h-2 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full animate-[armSwing_1.5s_ease-in-out_infinite]" />
              <div className="absolute top-2 -right-3 w-6 h-2 bg-linear-to-l from-blue-600 to-cyan-500 rounded-full animate-[armSwing_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.75s' }} />
              {/* Legs */}
              <div className="absolute bottom-0 left-1 w-2 h-8 bg-linear-to-b from-blue-700 to-cyan-600 rounded-full animate-[legKick_1.5s_ease-in-out_infinite]" />
              <div className="absolute bottom-0 right-1 w-2 h-8 bg-linear-to-b from-blue-700 to-cyan-600 rounded-full animate-[legKick_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.75s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}