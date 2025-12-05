'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Camera, 
  Video, 
  Activity, 
  Timer, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Download,
  BarChart3,
  Target,
  Users,
  Zap,
  Dumbbell,
  HeartPulse
} from 'lucide-react'
import { motion } from 'framer-motion'

type MovementType = 'squat' | 'pushup' | 'pullup' | 'lunge' | 'plank' | 'bench-press'
type AnalysisResult = {
  movement: MovementType
  count: number
  formScore: number
  caloriesBurned: number
  duration: number
  breakdown: {
    reps: number
    sets: number
    avgFormScore: number
    mistakes: Array<{
      time: number
      issue: string
      severity: 'low' | 'medium' | 'high'
      suggestion: string
    }>
  }
}

const movementConfigs = {
  squat: {
    name: 'Squat',
    icon: <Users className="w-5 h-5" />,
    color: 'bg-blue-500',
    muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
    tips: ['Keep chest up', 'Knees over toes', 'Go parallel']
  },
  pushup: {
    name: 'Push-up',
    icon: <Target className="w-5 h-5" />,
    color: 'bg-red-500',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    tips: ['Keep body straight', 'Elbows at 45°', 'Full range of motion']
  },
  pullup: {
    name: 'Pull-up',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-green-500',
    muscles: ['Back', 'Biceps', 'Forearms'],
    tips: ['Full extension', 'Engage back muscles', 'Control descent']
  },
  lunge: {
    name: 'Lunge',
    icon: <Activity className="w-5 h-5" />,
    color: 'bg-purple-500',
    muscles: ['Quadriceps', 'Glutes', 'Core'],
    tips: ['Front knee at 90°', 'Back knee nearly touching ground', 'Upright torso']
  },
  plank: {
    name: 'Plank',
    icon: <Dumbbell className="w-5 h-5" />,
    color: 'bg-orange-500',
    muscles: ['Core', 'Shoulders', 'Back'],
    tips: ['Straight line head to heels', 'Engage core', 'Don\'t sag hips']
  },
  'bench-press': {
    name: 'Bench Press',
    icon: <HeartPulse className="w-5 h-5" />,
    color: 'bg-cyan-500',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    tips: ['Feet planted', 'Back arched slightly', 'Control the bar']
  }
}

export default function WorkoutAnalyzer() {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload')
  const [selectedMovement, setSelectedMovement] = useState<MovementType>('squat')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [realtimeFeedback, setRealtimeFeedback] = useState<string[]>([])
  const [realtimeScore, setRealtimeScore] = useState<number>(0)
  const [repCount, setRepCount] = useState(0)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const cameraVideoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Simuler l'analyse de mouvement (à remplacer par un vrai modèle IA)
  const analyzeMovement = async (videoUrl: string, movement: MovementType): Promise<AnalysisResult> => {
    setIsAnalyzing(true)
    
    // Simulation de l'analyse
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const mockResult: AnalysisResult = {
      movement,
      count: Math.floor(Math.random() * 20) + 5,
      formScore: Math.floor(Math.random() * 30) + 70,
      caloriesBurned: Math.floor(Math.random() * 100) + 50,
      duration: Math.floor(Math.random() * 180) + 60,
      breakdown: {
        reps: Math.floor(Math.random() * 20) + 5,
        sets: Math.floor(Math.random() * 5) + 1,
        avgFormScore: Math.floor(Math.random() * 30) + 70,
        mistakes: [
          {
            time: 15,
            issue: 'Knee alignment off',
            severity: 'medium',
            suggestion: 'Keep knees aligned with toes'
          },
          {
            time: 45,
            issue: 'Depth insufficient',
            severity: 'low',
            suggestion: 'Aim for parallel depth'
          }
        ]
      }
    }
    
    setIsAnalyzing(false)
    return mockResult
  }

  // Gérer l'upload de vidéo
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
      const previewUrl = URL.createObjectURL(file)
      setVideoPreview(previewUrl)
      setAnalysisResult(null)
    }
  }

  // Démarrer l'analyse
  const startAnalysis = async () => {
    if (!videoPreview) return
    
    const result = await analyzeMovement(videoPreview, selectedMovement)
    setAnalysisResult(result)
  }

  // Démarrer la caméra
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      setCameraStream(stream)
      setIsCameraActive(true)
      
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream
      }
      
      // Démarrer l'analyse en temps réel
      startRealtimeAnalysis()
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }

  // Arrêter la caméra
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
      setIsCameraActive(false)
      setRealtimeFeedback([])
      setRealtimeScore(0)
      setRepCount(0)
    }
  }

  // Simuler l'analyse en temps réel
  const startRealtimeAnalysis = () => {
    const interval = setInterval(() => {
      if (!isCameraActive) {
        clearInterval(interval)
        return
      }
      
      // Simuler la détection de répétition
      if (Math.random() > 0.7) {
        setRepCount(prev => prev + 1)
        setRealtimeScore(prev => Math.min(100, prev + Math.random() * 5))
        
        const feedbacks = [
          'Good form! Keep going!',
          'Keep your back straight',
          'Excellent depth on that squat',
          'Remember to breathe',
          'Slow down the movement',
          'Engage your core more'
        ]
        
        const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)]
        setRealtimeFeedback(prev => [...prev.slice(-4), randomFeedback])
      }
    }, 1000)
    
    return () => clearInterval(interval)
  }

  // Effet de nettoyage
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [cameraStream])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Workout Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Upload video or use real-time camera to analyze your exercise form
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls & Movements */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-600" />
                Exercise Selection
              </CardTitle>
              <CardDescription>
                Choose the movement you want to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Movement Selection */}
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(movementConfigs) as MovementType[]).map((movement) => {
                  const config = movementConfigs[movement]
                  return (
                    <button
                      key={movement}
                      onClick={() => setSelectedMovement(movement)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                        selectedMovement === movement
                          ? `${config.color} border-blue-500 text-white`
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="p-2 rounded-full bg-white/20">
                        {config.icon}
                      </div>
                      <span className="font-medium">{config.name}</span>
                    </button>
                  )
                })}
              </div>

              {/* Selected Movement Details */}
              {selectedMovement && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <h3 className="font-semibold text-lg mb-3">
                    {movementConfigs[selectedMovement].name} Tips
                  </h3>
                  <ul className="space-y-2">
                    {movementConfigs[selectedMovement].tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Target Muscles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {movementConfigs[selectedMovement].muscles.map((muscle) => (
                        <Badge key={muscle} variant="secondary">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mode Selection */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'upload' | 'camera')}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Video
                  </TabsTrigger>
                  <TabsTrigger value="camera" className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Live Camera
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Middle Column - Video Player & Camera */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeTab === 'upload' ? (
                  <>
                    <Video className="w-6 h-6" />
                    Video Analysis
                  </>
                ) : (
                  <>
                    <Camera className="w-6 h-6" />
                    Live Analysis
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Upload Your Workout Video
                    </h3>
                    <p className="text-gray-500 mb-4">
                      MP4, AVI, MOV up to 100MB
                    </p>
                    <Button variant="outline">
                      Choose File
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </div>

                  {videoPreview && (
                    <div className="space-y-4">
                      <div className="relative rounded-xl overflow-hidden bg-black">
                        <video
                          ref={videoRef}
                          src={videoPreview}
                          controls
                          className="w-full h-auto max-h-[400px]"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            <Timer className="w-3 h-3 mr-1" />
                            Preview
                          </Badge>
                        </div>
                      </div>

                      <Button
                        onClick={startAnalysis}
                        disabled={isAnalyzing}
                        className="w-full py-6 text-lg font-semibold"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Analyzing Movement...
                          </>
                        ) : (
                          <>
                            <Activity className="w-5 h-5 mr-2" />
                            Analyze Exercise Form
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Camera Section */}
              {activeTab === 'camera' && (
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden bg-black">
                    {!isCameraActive ? (
                      <div className="aspect-video flex items-center justify-center">
                        <div className="text-center p-8">
                          <Camera className="w-20 h-20 mx-auto text-gray-400 mb-4" />
                          <h3 className="text-xl font-semibold text-white mb-2">
                            Live Camera Analysis
                          </h3>
                          <p className="text-gray-300 mb-6">
                            Allow camera access to analyze your form in real-time
                          </p>
                          <Button onClick={startCamera} size="lg">
                            <Camera className="w-5 h-5 mr-2" />
                            Start Camera
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <video
                          ref={cameraVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-auto aspect-video"
                        />
                        <canvas
                          ref={canvasRef}
                          className="absolute top-0 left-0 w-full h-full"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            LIVE
                          </Badge>
                          <Badge variant="secondary" className="bg-black/50 text-white">
                            <Timer className="w-3 h-3 mr-1" />
                            Real-time
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                          <Button
                            onClick={stopCamera}
                            variant="destructive"
                            size="lg"
                            className="rounded-full px-6"
                          >
                            Stop Camera
                          </Button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Real-time Feedback */}
                  {isCameraActive && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                              {repCount}
                            </div>
                            <div className="text-sm text-gray-500">Reps Count</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-green-600 mb-2">
                              {realtimeScore}%
                            </div>
                            <div className="text-sm text-gray-500">Form Score</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-orange-600 mb-2">
                              {Math.floor(repCount * 0.5)}
                            </div>
                            <div className="text-sm text-gray-500">Calories</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Feedback Messages */}
                  {realtimeFeedback.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Real-time Feedback
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {realtimeFeedback.map((feedback, index) => (
                            <div
                              key={index}
                              className="p-3 bg-blue-50 rounded-lg border border-blue-100 animate-pulse"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm">{feedback}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of your {movementConfigs[selectedMovement].name} performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {analysisResult.count}
                    </div>
                    <div className="text-sm font-medium">Total Reps</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {analysisResult.formScore}%
                    </div>
                    <div className="text-sm font-medium">Form Score</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-xl">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {analysisResult.caloriesBurned}
                    </div>
                    <div className="text-sm font-medium">Calories Burned</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {analysisResult.duration}s
                    </div>
                    <div className="text-sm font-medium">Duration</div>
                  </div>
                </div>

                {/* Form Score Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Form Accuracy</span>
                    <span className="text-sm text-gray-500">{analysisResult.formScore}%</span>
                  </div>
                  <Progress value={analysisResult.formScore} className="h-3" />
                </div>

                {/* Mistakes & Suggestions */}
                {analysisResult.breakdown.mistakes.length > 0 && (
                  <Card className="border-red-100 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisResult.breakdown.mistakes.map((mistake, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-medium">{mistake.issue}</div>
                                <div className="text-sm text-gray-500">
                                  At {mistake.time} seconds
                                </div>
                              </div>
                              <Badge
                                variant={
                                  mistake.severity === 'high' ? 'destructive' :
                                  mistake.severity === 'medium' ? 'default' : 'secondary'
                                }
                              >
                                {mistake.severity.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-700">
                              💡 <span className="font-medium">Suggestion:</span> {mistake.suggestion}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Analyze Another Video
                  </Button>
                  <Button className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Analysis Video
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}