'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Target,
  Trophy,
  Calendar,
  TrendingUp,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingDown,
  ArrowUpRight,
  Award,
  Flame,
  Weight,
  Heart,
  Timer,
  Users,
  ChevronRight,
  Filter,
  SortAsc,
  MoreVertical,
  Star,
  Zap,
  Dumbbell,
  Footprints,
  Sun,
  Moon
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

type GoalType = 'weight' | 'strength' | 'endurance' | 'flexibility' | 'nutrition' | 'habit'
type GoalStatus = 'active' | 'completed' | 'behind'

interface Goal {
  id: string
  title: string
  description: string
  type: GoalType
  targetValue: number
  currentValue: number
  unit: string
  deadline: string
  status: GoalStatus
  progress: number
  streak: number
  milestone: number
  createdAt: string
  category: 'fitness' | 'health' | 'performance' | 'lifestyle'
}

interface Milestone {
  id: string
  goalId: string
  title: string
  target: number
  achieved: boolean
  achievedDate?: string
}

export default function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Lose Body Fat',
      description: 'Reduce body fat percentage for better health and definition',
      type: 'weight',
      targetValue: 15,
      currentValue: 18.5,
      unit: '%',
      deadline: '2024-03-15',
      status: 'active',
      progress: 65,
      streak: 22,
      milestone: 2,
      createdAt: '2024-01-01',
      category: 'health'
    },
    {
      id: '2',
      title: 'Bench Press 120kg',
      description: 'Increase bench press max to 120kg',
      type: 'strength',
      targetValue: 120,
      currentValue: 100,
      unit: 'kg',
      deadline: '2024-02-28',
      status: 'active',
      progress: 83,
      streak: 15,
      milestone: 1,
      createdAt: '2024-01-05',
      category: 'performance'
    },
    {
      id: '3',
      title: 'Run 10k Under 45min',
      description: 'Improve 10k running time',
      type: 'endurance',
      targetValue: 45,
      currentValue: 52,
      unit: 'minutes',
      deadline: '2024-04-01',
      status: 'behind',
      progress: 42,
      streak: 8,
      milestone: 0,
      createdAt: '2024-01-10',
      category: 'fitness'
    },
    {
      id: '4',
      title: 'Daily 10K Steps',
      description: 'Walk 10,000 steps every day',
      type: 'habit',
      targetValue: 30,
      currentValue: 22,
      unit: 'days',
      deadline: '2024-01-31',
      status: 'active',
      progress: 73,
      streak: 5,
      milestone: 3,
      createdAt: '2024-01-01',
      category: 'lifestyle'
    },
    {
      id: '5',
      title: 'Meditate Daily',
      description: 'Establish a daily meditation practice',
      type: 'habit',
      targetValue: 90,
      currentValue: 90,
      unit: 'days',
      deadline: '2024-03-30',
      status: 'completed',
      progress: 100,
      streak: 90,
      milestone: 5,
      createdAt: '2024-01-01',
      category: 'lifestyle'
    }
  ])

  const [milestones] = useState<Milestone[]>([
    { id: 'm1', goalId: '1', title: 'Reach 17% body fat', target: 17, achieved: true, achievedDate: '2024-01-15' },
    { id: 'm2', goalId: '1', title: 'Reach 16% body fat', target: 16, achieved: false },
    { id: 'm3', goalId: '2', title: 'Bench 110kg', target: 110, achieved: true, achievedDate: '2024-01-20' },
    { id: 'm4', goalId: '4', title: '7-day streak', target: 7, achieved: true, achievedDate: '2024-01-08' },
    { id: 'm5', goalId: '4', title: '14-day streak', target: 14, achieved: true, achievedDate: '2024-01-15' },
  ])

  const [activeTab, setActiveTab] = useState('active')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    type: 'strength' as GoalType,
    targetValue: 0,
    unit: '',
    deadline: '',
    category: 'fitness' as Goal['category']
  })

  const getGoalIcon = (type: GoalType) => {
    switch (type) {
      case 'weight': return <Weight className="w-5 h-5" />
      case 'strength': return <Dumbbell className="w-5 h-5" />
      case 'endurance': return <Footprints className="w-5 h-5" />
      case 'flexibility': return <Sun className="w-5 h-5" />
      case 'nutrition': return <Heart className="w-5 h-5" />
      case 'habit': return <Zap className="w-5 h-5" />
      default: return <Target className="w-5 h-5" />
    }
  }

  const getGoalColor = (type: GoalType) => {
    switch (type) {
      case 'weight': return 'bg-purple-500'
      case 'strength': return 'bg-red-500'
      case 'endurance': return 'bg-blue-500'
      case 'flexibility': return 'bg-green-500'
      case 'nutrition': return 'bg-orange-500'
      case 'habit': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusBadge = (status: GoalStatus) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      case 'behind':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Behind Schedule</Badge>
    }
  }

  const filteredGoals = goals.filter(goal => {
    if (activeTab === 'active') return goal.status === 'active'
    if (activeTab === 'completed') return goal.status === 'completed'
    if (activeTab === 'behind') return goal.status === 'behind'
    return true
  })

  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.status === 'completed').length,
    active: goals.filter(g => g.status === 'active').length,
    avgProgress: Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length),
    totalStreak: goals.reduce((acc, goal) => acc + goal.streak, 0)
  }

  const handleCreateGoal = () => {
    if (!newGoal.title || !newGoal.targetValue) return

    const newGoalObj: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetValue: newGoal.targetValue,
      currentValue: 0,
      unit: newGoal.unit || 'units',
      deadline: newGoal.deadline,
      status: 'active',
      progress: 0,
      streak: 0,
      milestone: 0,
      createdAt: new Date().toISOString().split('T')[0],
      category: newGoal.category
    }

    setGoals([...goals, newGoalObj])
    setIsCreateDialogOpen(false)
    setNewGoal({
      title: '',
      description: '',
      type: 'strength',
      targetValue: 0,
      unit: '',
      deadline: '',
      category: 'fitness'
    })
  }

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedProgress = Math.min(newProgress, 100)
        const newCurrentValue = (goal.targetValue * updatedProgress) / 100
        const newStatus = updatedProgress === 100 ? 'completed' : 
                         updatedProgress < 50 ? 'behind' : 'active'
        
        return {
          ...goal,
          currentValue: newCurrentValue,
          progress: updatedProgress,
          status: newStatus,
          streak: newStatus === 'active' ? goal.streak + 1 : goal.streak
        }
      }
      return goal
    }))
  }

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals(goals.filter(goal => goal.id !== goalId))
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold dark:text-white">
              Goal <span className="text-blue-600">Tracker</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Set, track, and achieve your fitness goals
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                  <DialogDescription>
                    Set a SMART goal to track your progress
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Goal Title</Label>
                    <Input
                      id="title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      placeholder="e.g., Lose 10kg, Run Marathon"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                      placeholder="Describe your goal in detail..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Goal Type</Label>
                      <Select
                        value={newGoal.type}
                        onValueChange={(value: string) => setNewGoal({...newGoal, type: value as GoalType})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weight">Weight Management</SelectItem>
                          <SelectItem value="strength">Strength Training</SelectItem>
                          <SelectItem value="endurance">Endurance</SelectItem>
                          <SelectItem value="flexibility">Flexibility</SelectItem>
                          <SelectItem value="nutrition">Nutrition</SelectItem>
                          <SelectItem value="habit">Habit Building</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newGoal.category}
                        onValueChange={(value: string) => setNewGoal({...newGoal, category: value as Goal['category']})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="performance">Performance</SelectItem>
                          <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="target">Target Value</Label>
                      <Input
                        id="target"
                        type="number"
                        value={newGoal.targetValue}
                        onChange={(e) => setNewGoal({...newGoal, targetValue: parseFloat(e.target.value)})}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                        placeholder="kg, days, minutes, etc."
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deadline">Target Date</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateGoal}>
                    Create Goal
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Goals</p>
                <h3 className="text-2xl font-bold mt-2">{stats.total}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <h3 className="text-2xl font-bold mt-2">{stats.completed}</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Progress</p>
                <h3 className="text-2xl font-bold mt-2">{stats.avgProgress}%</h3>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Streak</p>
                <h3 className="text-2xl font-bold mt-2">{stats.totalStreak} days</h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Flame className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Goals List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">All Goals</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="behind">Behind</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6 mt-6">
              {filteredGoals.map((goal, index) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-full ${getGoalColor(goal.type)} text-white`}>
                            {getGoalIcon(goal.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="dark:text-white">{goal.title}</CardTitle>
                              {getStatusBadge(goal.status)}
                            </div>
                            <CardDescription className="mt-1">
                              {goal.description}
                            </CardDescription>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Target: {new Date(goal.deadline).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Flame className="w-4 h-4" />
                                {goal.streak} day streak
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingGoal(goal)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Progress</span>
                            <span className="text-2xl font-bold">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-3" />
                          <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>{goal.currentValue.toFixed(1)} {goal.unit}</span>
                            <span>Target: {goal.targetValue} {goal.unit}</span>
                          </div>
                        </div>

                        {/* Quick Update */}
                        {goal.status === 'active' && (
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">Update Progress:</span>
                            <Slider
                              defaultValue={[goal.progress]}
                              max={100}
                              step={5}
                              onValueChange={([value]: [number]) => handleUpdateProgress(goal.id, value)}
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              onClick={() => handleUpdateProgress(goal.id, goal.progress + 10)}
                            >
                              +10%
                            </Button>
                          </div>
                        )}

                        {/* Milestones */}
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium">Milestones:</span>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((milestone) => (
                              <div
                                key={milestone}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                  milestone <= goal.milestone
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                              >
                                {milestone <= goal.milestone ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  milestone
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center justify-between w-full">
                        <div className="text-sm text-gray-500">
                          Created: {new Date(goal.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Share Progress
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Analytics & Milestones */}
        <div className="space-y-6">
          {/* Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Goal Progress
              </CardTitle>
              <CardDescription>
                Overall goal completion rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <div className="space-y-4">
                  {goals.slice(0, 5).map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate max-w-[120px]">{goal.title}</span>
                        <span className="text-sm text-gray-500">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Recent Milestones
              </CardTitle>
              <CardDescription>
                Your latest achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones
                .filter(m => m.achieved)
                .slice(0, 4)
                .map((milestone) => {
                  const goal = goals.find(g => g.id === milestone.goalId)
                  return (
                    <div key={milestone.id} className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium dark:text-white">{milestone.title}</h4>
                          <p className="text-sm text-gray-500">
                            {goal?.title} • {milestone.achievedDate && new Date(milestone.achievedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Milestones
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Goal Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Goal Setting Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Break big goals into smaller milestones",
                "Track progress consistently",
                "Celebrate small wins",
                "Adjust goals based on progress",
                "Share goals for accountability"
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-blue-100 mt-0.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                  <span className="text-sm">{tip}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}