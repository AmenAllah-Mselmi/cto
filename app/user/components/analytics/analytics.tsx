// components/analytics/SimpleAnalytics.tsx
'use client'

import React, { useState } from 'react'

interface AnalyticsData {
  weeklyActivity: Array<{
    day: string
    workouts: number
    duration: number
    calories: number
  }>
  workoutTypes: Array<{
    name: string
    percentage: number
    color: string
    workouts: number
  }>
}

const analyticsData: AnalyticsData = {
  weeklyActivity: [
    { day: 'Mon', workouts: 2, duration: 90, calories: 600 },
    { day: 'Tue', workouts: 1, duration: 60, calories: 450 },
    { day: 'Wed', workouts: 3, duration: 120, calories: 800 },
    { day: 'Thu', workouts: 2, duration: 105, calories: 700 },
    { day: 'Fri', workouts: 1, duration: 75, calories: 500 },
    { day: 'Sat', workouts: 2, duration: 90, calories: 600 },
    { day: 'Sun', workouts: 0, duration: 0, calories: 0 }
  ],
  workoutTypes: [
    { name: 'Strength', percentage: 40, color: 'bg-blue-500', workouts: 50 },
    { name: 'Cardio', percentage: 30, color: 'bg-green-500', workouts: 37 },
    { name: 'HIIT', percentage: 20, color: 'bg-orange-500', workouts: 25 },
    { name: 'Flexibility', percentage: 10, color: 'bg-purple-500', workouts: 12 }
  ]
}

const stats = [
  { label: 'Total Workouts', value: '124', change: '+12%', positive: true },
  { label: 'Avg. Duration', value: '75 min', change: '+8%', positive: true },
  { label: 'Calories Burned', value: '32.4K', change: '+18%', positive: true },
  { label: 'Success Rate', value: '92%', change: '+5%', positive: true }
]

const muscleGroups = [
  { name: 'Chest', value: 85, color: 'bg-blue-500' },
  { name: 'Back', value: 75, color: 'bg-green-500' },
  { name: 'Legs', value: 90, color: 'bg-orange-500' },
  { name: 'Shoulders', value: 70, color: 'bg-purple-500' },
  { name: 'Arms', value: 80, color: 'bg-red-500' },
  { name: 'Core', value: 95, color: 'bg-cyan-500' }
]

export default function SimpleAnalytics() {
  const [timeRange, setTimeRange] = useState('month')
  const [activeView, setActiveView] = useState('overview')

  const maxCalories = Math.max(...analyticsData.weeklyActivity.map(d => d.calories))
  const maxDuration = Math.max(...analyticsData.weeklyActivity.map(d => d.duration))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your fitness progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-700">
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 dark:text-white">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500">from last month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b dark:border-gray-700">
        {['overview', 'performance', 'distribution'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveView(tab)}
            className={`px-4 py-2 font-medium capitalize ${activeView === tab 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Weekly Activity</h3>
          <div className="space-y-6">
            {analyticsData.weeklyActivity.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium dark:text-white">{day.day}</span>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{day.workouts} workouts</span>
                    <span>{day.duration} min</span>
                    <span>{day.calories} cal</span>
                  </div>
                </div>
                
                {/* Progress bars */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-12">Calories:</span>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${(day.calories / maxCalories) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-12">Duration:</span>
                    <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(day.duration / maxDuration) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
          <h3 className="text-lg font-semibold dark:text-white mb-4">Workout Distribution</h3>
          <div className="space-y-4">
            {analyticsData.workoutTypes.map((type) => (
              <div key={type.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${type.color}`} />
                    <span className="font-medium dark:text-white">{type.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {type.workouts} workouts
                    </span>
                    <span className="font-semibold dark:text-white">{type.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${type.color}`}
                    style={{ width: `${type.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Muscle Groups */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold dark:text-white mb-4">Muscle Focus</h3>
            <div className="grid grid-cols-2 gap-4">
              {muscleGroups.map((muscle) => (
                <div key={muscle.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-white">{muscle.name}</span>
                    <span className="text-sm font-semibold dark:text-white">{muscle.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${muscle.color}`}
                      style={{ width: `${muscle.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-semibold dark:text-white mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">124</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Workouts</div>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">92%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Week Streak</div>
          </div>
          
          <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">32.4K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Calories Burned</div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
        <h3 className="text-lg font-semibold dark:text-white mb-4">Key Insights</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">📈 Strong Progress:</span> Your workout consistency improved by 12% this month.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">💪 Strength Focus:</span> 40% of your workouts are strength training. Consider adding more variety.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold">🎯 Weekend Gap:</span> No workouts recorded on Sundays. Try adding light activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}