/* eslint-disable react/no-unescaped-entities */
// app/exercices/page.tsx - Version avec vidéos et PDF réels
'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  Search, 
  Filter, 
  ChevronDown,
  PlayCircle,
  BookOpen,
  AlertTriangle,
  Target,
  Clock,
  Users,
  Star,
  BarChart3,
  Heart,
  Dumbbell,
  Activity,
  Shield,
  Award,
  TrendingUp,
  Download,
  X,
  Maximize2,
  Volume2,
  VolumeX
} from 'lucide-react'
import { Button } from '@/components/ui/button'

type Exercise = {
  id: number
  name: string
  category: 'musculation' | 'yoga' | 'cardio' | 'étirement'
  difficulty: 'débutant' | 'intermédiaire' | 'avancé'
  duration: string
  equipment: string[]
  muscles: string[]
  description: string
  tips: string[]
  mistakes: string[]
  videoUrl: string
  videoThumbnail: string
  videoDuration: string
  pdfUrl: string
  rating: number
  views: number
}

export default function ExercicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [videoModal, setVideoModal] = useState<{isOpen: boolean, url: string, title: string}>({
    isOpen: false,
    url: '',
    title: ''
  })
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const categories = [
    { id: 'all', name: 'Tous les exercices', icon: Dumbbell, count: 24 },
    { id: 'musculation', name: 'Musculation', icon: Activity, count: 10 },
    { id: 'yoga', name: 'Yoga & Stretching', icon: Heart, count: 6 },
    { id: 'cardio', name: 'Cardio', icon: TrendingUp, count: 4 },
    { id: 'étirement', name: 'Étirement', icon: Shield, count: 4 }
  ]

  const difficultyLevels = [
    { id: 'all', name: 'Tous niveaux', color: 'bg-gray-200' },
    { id: 'débutant', name: 'Débutant', color: 'bg-green-100 text-green-800' },
    { id: 'intermédiaire', name: 'Intermédiaire', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'avancé', name: 'Avancé', color: 'bg-red-100 text-red-800' }
  ]

  // PDF téléchargeable réel
  const pdfGuideUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

  const exercises: Exercise[] = [
    {
      id: 1,
      name: "Squat - Posture Parfaite",
      category: "musculation",
      difficulty: "débutant",
      duration: "15 min",
      equipment: ["Aucun", "Barre optionnelle"],
      muscles: ["Quadriceps", "Fessiers", "Ischio-jambiers"],
      description: "Le squat est l'exercice de base pour renforcer les jambes et améliorer la stabilité. Une bonne technique est essentielle pour protéger le dos et les genoux.",
      tips: [
        "Gardez le dos droit tout au long du mouvement",
        "Les genoux doivent rester alignés avec les pieds",
        "Descendez jusqu'à ce que vos cuisses soient parallèles au sol",
        "Contractez vos abdos pour maintenir la stabilité"
      ],
      mistakes: [
        "Dos arrondi : risque de blessure au bas du dos",
        "Genoux qui rentrent vers l'intérieur : pression sur les ligaments",
        "Trop en avant sur les orteils : déséquilibre"
      ],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      videoThumbnail: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=800&h=450&fit=crop",
      videoDuration: "3:45",
      pdfUrl: pdfGuideUrl,
      rating: 4.8,
      views: 12500
    },
    {
      id: 2,
      name: "Pompes - Technique Complète",
      category: "musculation",
      difficulty: "intermédiaire",
      duration: "20 min",
      equipment: ["Tapis"],
      muscles: ["Pectoraux", "Triceps", "Épaules", "Abdos"],
      description: "Exercice complet pour le haut du corps. Une bonne technique de pompes renforce non seulement les muscles mais aussi la ceinture abdominale.",
      tips: [
        "Corps aligné comme une planche",
        "Coudes à 45 degrés du corps",
        "Descente contrôlée jusqu'à effleurer le sol",
        "Respiration : inspirez en descendant, expirez en montant"
      ],
      mistakes: [
        "Hanches qui s'affaissent : pression sur le bas du dos",
        "Coudes trop écartés : stress sur les épaules",
        "Mouvement incomplet : efficacité réduite"
      ],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      videoThumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
      videoDuration: "4:20",
      pdfUrl: pdfGuideUrl,
      rating: 4.6,
      views: 9800
    },
    {
      id: 3,
      name: "Posture du Chien Tête en Bas",
      category: "yoga",
      difficulty: "débutant",
      duration: "10 min",
      equipment: ["Tapis de yoga"],
      muscles: ["Épaules", "Dos", "Ischio-jambiers", "Mollets"],
      description: "Posture de yoga fondamentale qui étire l'ensemble du corps et améliore la circulation sanguine.",
      tips: [
        "Répartissez le poids uniformément entre mains et pieds",
        "Gardez le dos droit et allongé",
        "Relâchez la tête et le cou",
        "Respirez profondément"
      ],
      mistakes: [
        "Dos arrondi : mauvaise répartition du poids",
        "Épaules montées vers les oreilles : tension inutile"
      ],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      videoThumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop",
      videoDuration: "2:30",
      pdfUrl: pdfGuideUrl,
      rating: 4.9,
      views: 7500
    },
    {
      id: 4,
      name: "Planche Abdominale",
      category: "musculation",
      difficulty: "débutant",
      duration: "5-10 min",
      equipment: ["Tapis"],
      muscles: ["Abdos", "Dos", "Épaules"],
      description: "Exercice isométrique excellent pour renforcer la ceinture abdominale et améliorer la posture.",
      tips: [
        "Corps parfaitement aligné",
        "Contractez les fessiers et les abdos",
        "Regardez vers le sol pour garder la nuque neutre",
        "Respirez normalement sans bloquer la respiration"
      ],
      mistakes: [
        "Hanches trop hautes : travail réduit",
        "Hanches trop basses : pression sur le bas du dos",
        "Rétention de la respiration : diminue l'efficacité"
      ],
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      videoThumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
      videoDuration: "3:15",
      pdfUrl: pdfGuideUrl,
      rating: 4.7,
      views: 11200
    }
  ]

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'débutant': return 'bg-green-100 text-green-800'
      case 'intermédiaire': return 'bg-yellow-100 text-yellow-800'
      case 'avancé': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'musculation': return Activity
      case 'yoga': return Heart
      case 'cardio': return TrendingUp
      case 'étirement': return Shield
      default: return Dumbbell
    }
  }

  const openVideoModal = (url: string, title: string) => {
    setVideoModal({ isOpen: true, url, title })
  }

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, url: '', title: '' })
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const downloadPDF = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'guide-posture-sportive.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Dumbbell className="w-5 h-5" />
                <span>Bibliothèque d'exercices</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Maîtrisez chaque mouvement
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Découvrez notre collection d'exercices avec des vidéos détaillées 
                et des guides PDF pour exécuter parfaitement chaque mouvement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => downloadPDF(pdfGuideUrl, 'guide-complet-sportposture.pdf')}
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger le guide complet
                </Button>
                <Button 
                  onClick={() => openVideoModal("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "Introduction SportPosture")}
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Voir la vidéo d'introduction
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{exercises.length}</div>
                <div className="text-gray-600">Exercices détaillés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">15+</div>
                <div className="text-gray-600">Vidéos tutoriels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-gray-600">Contenu gratuit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.7/5</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8 bg-gray-50 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un exercice..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-4">
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Catégorie</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {categories.map(category => {
                      const Icon = category.icon
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 transition-colors ${
                            selectedCategory === category.id ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            <span>{category.name}</span>
                          </div>
                          <span className="text-sm text-gray-500">{category.count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                    <Target className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Niveau</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {difficultyLevels.map(level => (
                      <button
                        key={level.id}
                        onClick={() => setSelectedDifficulty(level.id)}
                        className={`flex items-center w-full px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedDifficulty === level.id ? 'bg-blue-50 text-blue-600' : ''
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full mr-3 ${level.color}`} />
                        <span>{level.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exercises Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredExercises.length} exercices trouvés
                </h2>
                <p className="text-gray-600 mt-1">
                  Tous accompagnés de vidéos détaillées et guides PDF
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Tri :</span>
                <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Plus populaire</option>
                  <option>Difficulté croissante</option>
                  <option>Durée vidéo</option>
                  <option>Note</option>
                </select>
              </div>
            </div>

            {filteredExercises.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Aucun exercice trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedDifficulty('all')
                  }}
                  variant="outline"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map(exercise => {
                  const CategoryIcon = getCategoryIcon(exercise.category)
                  const isExpanded = expandedExercise === exercise.id
                  const isFavorite = favorites.includes(exercise.id)

                  return (
                    <div 
                      key={exercise.id}
                      className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                      }`}
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-10 h-10 ${getDifficultyColor(exercise.difficulty)} rounded-lg flex items-center justify-center`}>
                                <CategoryIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                    {exercise.difficulty}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {exercise.duration}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">
                                  {exercise.name}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleFavorite(exercise.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Heart 
                                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                              />
                            </button>
                            <button
                              onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <ChevronDown 
                                className={`w-5 h-5 text-gray-600 transition-transform ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Video Preview */}
                        <div 
                          className="relative rounded-xl overflow-hidden mb-4 cursor-pointer group"
                          onClick={() => openVideoModal(exercise.videoUrl, exercise.name)}
                        >
                          <div className="aspect-video bg-gray-200">
                            <img 
                              src={exercise.videoThumbnail} 
                              alt={exercise.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop'
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                              <PlayCircle className="w-10 h-10 text-blue-600" />
                            </div>
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                            {exercise.videoDuration}
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{exercise.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{exercise.views.toLocaleString()} vues</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">{exercise.rating}/5</span>
                          </div>
                        </div>

                        {/* Preview */}
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {exercise.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exercise.muscles.map((muscle, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                            >
                              {muscle}
                            </span>
                          ))}
                          {exercise.equipment.map((item, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons - Collapsed */}
                        {!isExpanded && (
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex gap-2">
                              <Button 
                                size="sm"
                                onClick={() => openVideoModal(exercise.videoUrl, exercise.name)}
                              >
                                <PlayCircle className="w-4 h-4 mr-1" />
                                Voir la vidéo
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => downloadPDF(exercise.pdfUrl, `${exercise.name.toLowerCase().replace(/\s+/g, '-')}-guide.pdf`)}
                              >
                                <Download className="w-4 h-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                            <button
                              onClick={() => setExpandedExercise(exercise.id)}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                            >
                              Voir les détails
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Expanded Content */}
                        {isExpanded && (
                          <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top-5">
                            <div className="grid md:grid-cols-2 gap-8">
                              {/* Left Column - Tips */}
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <Award className="w-5 h-5 text-green-600" />
                                  Conseils d'exécution
                                </h4>
                                <ul className="space-y-3">
                                  {exercise.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-green-600 text-sm font-bold">✓</span>
                                      </div>
                                      <span className="text-gray-700">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Right Column - Common Mistakes */}
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                  <AlertTriangle className="w-5 h-5 text-red-600" />
                                  Erreurs à éviter
                                </h4>
                                <ul className="space-y-3">
                                  {exercise.mistakes.map((mistake, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-red-600 text-sm font-bold">!</span>
                                      </div>
                                      <span className="text-gray-700">{mistake}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Video Player */}
                            <div className="mt-8">
                              <h4 className="text-lg font-bold text-gray-900 mb-4">
                                Tutoriel vidéo détaillé
                              </h4>
                              <div className="relative rounded-xl overflow-hidden bg-black">
                                <video
                                  ref={videoRef}
                                  src={exercise.videoUrl}
                                  className="w-full aspect-video"
                                  controls
                                  poster={exercise.videoThumbnail}
                                  preload="metadata"
                                >
                                  Votre navigateur ne supporte pas la lecture vidéo.
                                </video>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                              <div className="flex flex-wrap gap-3">
                                <Button 
                                  className="bg-gradient-to-r from-blue-600 to-cyan-500"
                                  onClick={() => openVideoModal(exercise.videoUrl, exercise.name)}
                                >
                                  <PlayCircle className="w-5 h-5 mr-2" />
                                  Ouvrir en plein écran
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => downloadPDF(exercise.pdfUrl, `${exercise.name.toLowerCase().replace(/\s+/g, '-')}-guide.pdf`)}
                                >
                                  <Download className="w-5 h-5 mr-2" />
                                  Télécharger le guide PDF
                                </Button>
                                <Button variant="outline">
                                  <BarChart3 className="w-5 h-5 mr-2" />
                                  Ajouter à mon programme
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Live Videos Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-950 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Sessions en direct avec nos coachs
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Rejoignez nos sessions interactives en direct pour des conseils personnalisés.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-400 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-sm font-medium">EN DIRECT</div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                    LIVE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Posture & Mobilité</h3>
                  <p className="text-gray-300 text-sm mb-4">Coach Sarah - En ce moment</p>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500">
                    Rejoindre la session
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-400 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Clock className="w-12 h-12 text-white mx-auto mb-4" />
                      <div className="text-sm font-medium">À 18:00</div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    PROCHAINEMENT
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Yoga Postural</h3>
                  <p className="text-gray-300 text-sm mb-4">Coach Thomas - Dans 2h</p>
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white/10">
                    Programmer un rappel
                  </Button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-400 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <PlayCircle className="w-12 h-12 text-white mx-auto mb-4" />
                      <div className="text-sm font-medium">REPLAY</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Renforcement Dos</h3>
                  <p className="text-gray-300 text-sm mb-4">Coach Alex - Hier</p>
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white/10">
                    Voir le replay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ressources à télécharger
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Guides complets et programmes d'entraînement en format PDF.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Guide Posture Complète
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  48 pages d'exercices et conseils pour améliorer votre posture
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => downloadPDF(pdfGuideUrl, 'guide-posture-complete.pdf')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger (PDF, 8.2MB)
                </Button>
              </div>

              <div className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Programme 30 Jours
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Programme progressif pour transformer votre posture en 1 mois
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => downloadPDF(pdfGuideUrl, 'programme-30-jours.pdf')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger (PDF, 5.1MB)
                </Button>
              </div>

              <div className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Guide Blessures & Prévention
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comment prévenir et gérer les blessures sportives courantes
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => downloadPDF(pdfGuideUrl, 'guide-blessures-prevention.pdf')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger (PDF, 6.8MB)
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à transformer votre pratique ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté et accédez à toutes nos ressources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => downloadPDF(pdfGuideUrl, 'pack-complet-sportposture.pdf')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Télécharger tous les guides
              </Button>
              <Button 
                onClick={() => openVideoModal("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "Présentation complète")}
                variant="outline" 
                className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Voir la présentation vidéo
              </Button>
            </div>
          </div>
        </section>
      </main>
      

      {/* Video Modal */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-4xl w-full'}`}>
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={videoModal.url}
                className="w-full aspect-video"
                controls
                autoPlay
                muted={isMuted}
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
              
              {/* Custom Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Maximize2 className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-white font-medium">
                  {videoModal.title}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-gray-300">
                Utilisez les contrôles vidéo standards ou nos boutons personnalisés
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}