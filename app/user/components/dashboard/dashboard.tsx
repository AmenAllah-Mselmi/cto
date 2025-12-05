/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState } from 'react'

const workoutData = [
  { id: 1, name: 'Morning Run', type: 'Cardio', duration: 45, calories: 450, date: 'Today', time: '7:30 AM' },
  { id: 2, name: 'Strength Training', type: 'Strength', duration: 60, calories: 520, date: 'Today', time: '6:00 PM' },
  { id: 3, name: 'Yoga Session', type: 'Flexibility', duration: 30, calories: 180, date: 'Yesterday', time: '8:00 AM' },
  { id: 4, name: 'HIIT Workout', type: 'HIIT', duration: 25, calories: 320, date: '2 days ago', time: '7:00 PM' }
]

const goals = [
  { title: 'Workout Days', target: 20, current: 15, unit: 'days' },
  { title: 'Calories Burned', target: 20000, current: 15600, unit: 'cal' },
  { title: 'Running Distance', target: 50, current: 32, unit: 'km' }
]

export default function SimpleDashboard() {
  const [activeTab, setActiveTab] = useState('today')

  const stats = [
    { label: 'Workouts This Week', value: '5', change: '+1', positive: true },
    { label: 'Total Duration', value: '3h 40m', change: '+45m', positive: true },
    { label: 'Calories Burned', value: '2,150', change: '+320', positive: true },
    { label: 'Streak', value: '5 days', change: 'Active', positive: true }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">Welcome back, Alex! 👋</h1>
        <p className="mt-2 opacity-90">You're on a 5-day streak. Keep up the great work!</p>
        <button className="mt-4 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
          Start New Workout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? '↑' : '↓'} {stat.change}
              </span>
              <span className="text-sm text-gray-500">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Workouts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold dark:text-white">Recent Workouts</h2>
              <div className="flex gap-2">
                {['today', 'week', 'month'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg capitalize ${activeTab === tab
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {workoutData.map((workout) => (
                <div key={workout.id} className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      workout.type === 'Cardio' ? 'bg-green-100 text-green-600' :
                      workout.type === 'Strength' ? 'bg-blue-100 text-blue-600' :
                      workout.type === 'Flexibility' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <span className="text-lg">
                        {workout.type === 'Cardio' ? '🏃' :
                         workout.type === 'Strength' ? '💪' :
                         workout.type === 'Flexibility' ? '🧘' : '⚡'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-white">{workout.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{workout.type}</span>
                        <span>{workout.duration} min</span>
                        <span>{workout.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span>{workout.date}</span>
                        <span>•</span>
                        <span>{workout.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
              <h3 className="font-semibold dark:text-white mb-4">Activity This Week</h3>
              <div className="space-y-3">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-8 text-gray-600 dark:text-gray-400">{day}</span>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${[60, 40, 80, 50, 70, 30, 0][i]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
              <h3 className="font-semibold dark:text-white mb-4">Workout Types</h3>
              <div className="space-y-3">
                {[
                  { type: 'Strength', percentage: 40, color: 'bg-blue-500' },
                  { type: 'Cardio', percentage: 30, color: 'bg-green-500' },
                  { type: 'HIIT', percentage: 20, color: 'bg-orange-500' },
                  { type: 'Flexibility', percentage: 10, color: 'bg-purple-500' }
                ].map((item) => (
                  <div key={item.type} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="dark:text-white">{item.type}</span>
                      <span className="font-semibold dark:text-white">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Goals Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <h2 className="text-xl font-bold dark:text-white mb-6">Your Goals</h2>
            <div className="space-y-6">
              {goals.map((goal) => {
                const progress = (goal.current / goal.target) * 100
                return (
                  <div key={goal.title} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium dark:text-white">{goal.title}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <button className="w-full mt-6 py-3 border border-dashed rounded-lg text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
              + Add New Goal
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <h2 className="text-xl font-bold dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30">
                <div className="text-2xl mb-2">💪</div>
                <span className="font-medium">Strength</span>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30">
                <div className="text-2xl mb-2">🏃</div>
                <span className="font-medium">Cardio</span>
              </button>
              <button className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30">
                <div className="text-2xl mb-2">🧘</div>
                <span className="font-medium">Yoga</span>
              </button>
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30">
                <div className="text-2xl mb-2">⚡</div>
                <span className="font-medium">HIIT</span>
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <h2 className="text-xl font-bold dark:text-white mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              {[
                { title: '5 Day Streak', icon: '🔥', date: 'Today' },
                { title: 'Strength Milestone', icon: '🏆', date: '2 days ago' },
                { title: 'Cardio Progress', icon: '🚀', date: '1 week ago' }
              ].map((achievement) => (
                <div key={achievement.title} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium dark:text-white">{achievement.title}</h4>
                    <p className="text-sm text-gray-500">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}