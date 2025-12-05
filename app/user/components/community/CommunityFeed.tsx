'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Bookmark, 
  Send, 
  Filter, 
  TrendingUp, 
  Users, 
  Trophy, 
  Flame, 
  Calendar,
  MapPin,
  Video,
  Image as ImageIcon,
  MoreVertical,
  Search,
  Heart,
  Eye,
  MessageSquare,
  Award,
  Star,
  Target,
  Clock,
  UserPlus,
  ChevronRight
} from 'lucide-react'
import { motion } from 'framer-motion'

interface CommunityPost {
  id: string
  author: {
    name: string
    avatar: string
    role: 'member' | 'trainer' | 'pro'
    level: number
  }
  content: string
  media?: {
    type: 'image' | 'video'
    url: string
  }
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  tags: string[]
  workout?: {
    type: string
    duration: number
    calories: number
  }
}

interface Challenge {
  id: string
  title: string
  description: string
  participants: number
  target: number
  progress: number
  deadline: string
  icon: React.ReactNode
  color: string
}

interface User {
  id: string
  name: string
  avatar: string
  role: string
  streak: number
  workouts: number
  following: boolean
}

export default function CommunityFeed() {
  const [activeTab, setActiveTab] = useState('feed')
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        role: 'pro',
        level: 42
      },
      content: 'Just completed a new PR on deadlifts! 180kg 💪 The form felt perfect today. Remember, progress takes time but consistency is key!',
      media: {
        type: 'video',
        url: 'https://example.com/video1.mp4'
      },
      timestamp: '2 hours ago',
      likes: 245,
      comments: 42,
      shares: 18,
      isLiked: false,
      isBookmarked: true,
      tags: ['deadlift', 'pr', 'strength'],
      workout: {
        type: 'Strength Training',
        duration: 90,
        calories: 520
      }
    },
    {
      id: '2',
      author: {
        name: 'Mike Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        role: 'trainer',
        level: 38
      },
      content: 'Teaching proper squat form in today\'s class. Key points: chest up, knees tracking toes, depth to parallel. Who\'s working on their squats this week?',
      timestamp: '5 hours ago',
      likes: 189,
      comments: 31,
      shares: 9,
      isLiked: true,
      isBookmarked: false,
      tags: ['squat', 'form', 'technique'],
      workout: {
        type: 'HIIT',
        duration: 60,
        calories: 450
      }
    },
    {
      id: '3',
      author: {
        name: 'Alex Rivera',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        role: 'member',
        level: 24
      },
      content: '30-day yoga challenge completed! 🧘‍♀️ My flexibility and mindfulness have improved tremendously. Highly recommend trying a challenge!',
      timestamp: '1 day ago',
      likes: 156,
      comments: 28,
      shares: 12,
      isLiked: false,
      isBookmarked: true,
      tags: ['yoga', 'challenge', 'flexibility']
    }
  ])

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: '10K Steps Daily',
      description: 'Walk 10,000 steps every day for 30 days',
      participants: 1245,
      target: 10000,
      progress: 7842,
      deadline: '2024-02-15',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Push-up Challenge',
      description: '100 push-ups daily for 21 days',
      participants: 892,
      target: 2100,
      progress: 1540,
      deadline: '2024-02-10',
      icon: <Flame className="w-6 h-6" />,
      color: 'bg-red-500'
    },
    {
      id: '3',
      title: 'Plank Marathon',
      description: 'Increase plank time by 1 minute daily',
      participants: 567,
      target: 30,
      progress: 18,
      deadline: '2024-02-20',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-green-500'
    }
  ])

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      role: 'Pro Athlete',
      streak: 45,
      workouts: 312,
      following: true
    },
    {
      id: '2',
      name: 'David Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      role: 'Yoga Instructor',
      streak: 67,
      workouts: 289,
      following: false
    },
    {
      id: '3',
      name: 'Lisa Zhang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      role: 'Marathon Runner',
      streak: 89,
      workouts: 456,
      following: true
    }
  ])

  const [newPost, setNewPost] = useState('')

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
  }

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ))
  }

  const handleFollow = (userId: string) => {
    // Toggle follow status
    console.log('Follow user:', userId)
  }

  const handleShare = (postId: string) => {
    // Share logic
    console.log('Share post:', postId)
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const newPostObj: CommunityPost = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        role: 'member',
        level: 28
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      tags: ['update']
    }

    setPosts([newPostObj, ...posts])
    setNewPost('')
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
              Fitness <span className="text-blue-600">Community</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Connect, share, and grow with fitness enthusiasts worldwide
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search community..."
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Users className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your workout, achievement, or question..."
                    value={newPost}
                    onChange={(e: { target: { value: React.SetStateAction<string> } }) => setNewPost(e.target.value)}
                    className="min-h-24 mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location
                      </Button>
                    </div>
                    <Button onClick={handlePostSubmit} disabled={!newPost.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feed Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="feed">
                <MessageSquare className="w-4 h-4 mr-2" />
                Feed
              </TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="following">
                <Users className="w-4 h-4 mr-2" />
                Following
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6 mt-6">
              {/* Posts */}
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-blue-100">
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold dark:text-white">
                                {post.author.name}
                              </h3>
                              <Badge variant={post.author.role === 'pro' ? 'default' : 'secondary'}>
                                {post.author.role === 'pro' && <Star className="w-3 h-3 mr-1" />}
                                {post.author.role}
                              </Badge>
                              <Badge variant="outline" className="gap-1">
                                <Trophy className="w-3 h-3" />
                                Lvl {post.author.level}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {post.timestamp}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="dark:text-white">{post.content}</p>
                      
                      {post.workout && (
                        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium dark:text-white">
                                  {post.workout.type}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  Workout Details
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <div className="text-center">
                                  <div className="font-bold dark:text-white">
                                    {post.workout.duration}min
                                  </div>
                                  <div className="text-xs text-gray-500">Duration</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold dark:text-white">
                                    {post.workout.calories}
                                  </div>
                                  <div className="text-xs text-gray-500">Calories</div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="border-t pt-4">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex gap-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`gap-2 ${post.isLiked ? 'text-red-500' : ''}`}
                          >
                            <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-red-500' : ''}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="w-5 h-5" />
                            {post.comments}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(post.id)}
                            className="gap-2"
                          >
                            <Share2 className="w-5 h-5" />
                            {post.shares}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(post.id)}
                          className={post.isBookmarked ? 'text-blue-500' : ''}
                        >
                          <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-blue-500' : ''}`} />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Active Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Active Challenges
              </CardTitle>
              <CardDescription>
                Join community challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-full ${challenge.color} text-white`}>
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold dark:text-white">{challenge.title}</h4>
                      <p className="text-sm text-gray-500 mb-2">{challenge.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {challenge.participants.toLocaleString()} participants
                        </span>
                        <span className="font-semibold">
                          {Math.round((challenge.progress / challenge.target) * 100)}%
                        </span>
                      </div>
                      <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Ends: {new Date(challenge.deadline).toLocaleDateString()}
                    </span>
                    <Button size="sm">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Challenges
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Top Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Top Members
              </CardTitle>
              <CardDescription>
                Most active this week
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium dark:text-white">{user.name}</h4>
                      <p className="text-sm text-gray-500">{user.role}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs flex items-center gap-1">
                          <Flame className="w-3 h-3 text-orange-500" />
                          {user.streak} day streak
                        </span>
                        <span className="text-xs flex items-center gap-1">
                          <Target className="w-3 h-3 text-blue-500" />
                          {user.workouts} workouts
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={user.following ? 'outline' : 'default'}
                    onClick={() => handleFollow(user.id)}
                  >
                    {user.following ? 'Following' : 'Follow'}
                    {!user.following && <UserPlus className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: 'Virtual Yoga Session',
                  date: 'Tomorrow, 8:00 AM',
                  host: 'David Park',
                  participants: 42
                },
                {
                  title: 'Strength Training Workshop',
                  date: 'Jan 20, 6:00 PM',
                  host: 'Sarah Johnson',
                  participants: 28
                },
                {
                  title: 'Running Club Meetup',
                  date: 'Jan 22, 7:00 AM',
                  host: 'Lisa Zhang',
                  participants: 35
                }
              ].map((event, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <h4 className="font-medium dark:text-white">{event.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm">
                      Host: <span className="font-medium">{event.host}</span>
                    </span>
                    <Badge variant="outline">
                      <Users className="w-3 h-3 mr-1" />
                      {event.participants}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}