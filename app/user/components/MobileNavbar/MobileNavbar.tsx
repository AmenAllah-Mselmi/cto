'use client'

import React from 'react'
import { Activity, Target, Trophy, Settings, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'

const mobileItems = [
  { icon: <Activity className="w-6 h-6" />, label: 'Home', href: '/dashboard' },
  { icon: <Target className="w-6 h-6" />, label: 'Workouts', href: '/workouts' },
  { icon: <Trophy className="w-6 h-6" />, label: 'Progress', href: '/progress' },
  { icon: <Settings className="w-6 h-6" />, label: 'Settings', href: '/settings' },
]

export default function MobileNavbar() {
  const router = useRouter()

  const handleStartWorkout = () => {
    // Logic to start workout
    console.log('Start workout')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-white dark:bg-gray-800 z-40">
      <div className="flex items-center justify-around p-3">
        {mobileItems.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.href)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="p-1">
              {item.icon}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
        
        {/* Start Workout Button */}
        <button
          onClick={handleStartWorkout}
          className="flex flex-col items-center gap-1 -mt-8"
        >
          <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">
            <Play className="w-8 h-8 text-white" />
          </div>
          <span className="text-xs font-medium">Start</span>
        </button>
      </div>
    </div>
  )
}