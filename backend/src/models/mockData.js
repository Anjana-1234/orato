// Mock Data for ORATO Dashboard
// This will be replaced with actual database queries when you connect to your database

const users = [
  {
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD',
    level: 'Intermediate',
    createdAt: '2024-01-15T08:00:00Z',
    lastLogin: '2024-02-15T10:30:00Z'
  }
];

const userStats = {
  'user-001': {
    dayStreak: 15,
    streakChange: 2,
    totalPoints: 2450,
    rankPercentile: 10,
    badgesEarned: 12,
    badgesToNextLevel: 3,
    lessonsDone: 47,
    lessonsThisWeek: 5
  }
};

const lessons = [
  {
    id: 'lesson-001',
    userId: 'user-001',
    title: 'English Grammar: Present Tense',
    category: 'Grammar',
    timeLeft: '15 min left',
    totalTime: 60,
    progress: 75,
    icon: '📚',
    iconBg: 'bg-green-100',
    lastAccessed: '2024-02-15T09:00:00Z',
    order: 1
  },
  {
    id: 'lesson-002',
    userId: 'user-001',
    title: 'English Pronunciation Basics',
    category: 'Speaking',
    timeLeft: '25 min left',
    totalTime: 45,
    progress: 40,
    icon: '🗣️',
    iconBg: 'bg-purple-100',
    lastAccessed: '2024-02-14T14:30:00Z',
    order: 2
  },
  {
    id: 'lesson-003',
    userId: 'user-001',
    title: 'English Vocabulary: Daily Life',
    category: 'Vocabulary',
    timeLeft: '5 min left',
    totalTime: 30,
    progress: 90,
    icon: '📖',
    iconBg: 'bg-blue-100',
    lastAccessed: '2024-02-15T08:30:00Z',
    order: 3
  }
];

const dailyChallenges = [
  {
    id: 'challenge-001',
    userId: 'user-001',
    title: 'Complete 3 lessons',
    current: 2,
    target: 3,
    points: 50,
    type: 'lessons',
    completed: false,
    expiresAt: '2024-02-16T00:00:00Z'
  },
  {
    id: 'challenge-002',
    userId: 'user-001',
    title: 'Practice speaking for 10 min',
    current: 7,
    target: 10,
    points: 30,
    type: 'speaking',
    completed: false,
    expiresAt: '2024-02-16T00:00:00Z'
  },
  {
    id: 'challenge-003',
    userId: 'user-001',
    title: 'Master 20 new words',
    current: 15,
    target: 20,
    points: 40,
    type: 'vocabulary',
    completed: false,
    expiresAt: '2024-02-16T00:00:00Z'
  }
];

const skillProgress = [
  {
    id: 'skill-001',
    userId: 'user-001',
    name: 'Vocabulary',
    percentage: 78,
    color: '#3B82F6',
    totalWords: 450,
    masteredWords: 351
  },
  {
    id: 'skill-002',
    userId: 'user-001',
    name: 'Grammar',
    percentage: 62,
    color: '#8B5CF6',
    totalRules: 85,
    masteredRules: 53
  },
  {
    id: 'skill-003',
    userId: 'user-001',
    name: 'Speaking',
    percentage: 45,
    color: '#1DB954',
    totalExercises: 120,
    completedExercises: 54
  },
  {
    id: 'skill-004',
    userId: 'user-001',
    name: 'Listening',
    percentage: 70,
    color: '#F97316',
    totalAudio: 95,
    completedAudio: 67
  },
  {
    id: 'skill-005',
    userId: 'user-001',
    name: 'Writing',
    percentage: 55,
    color: '#EC4899',
    totalExercises: 80,
    completedExercises: 44
  }
];

const achievements = [
  {
    id: 'achievement-001',
    userId: 'user-001',
    title: 'Week Warrior',
    description: '7-day streak',
    icon: 'flame',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-100',
    earnedAt: '2024-02-10T00:00:00Z',
    rarity: 'common'
  },
  {
    id: 'achievement-002',
    userId: 'user-001',
    title: 'Quick Learner',
    description: 'Completed 10 lessons',
    icon: 'zap',
    iconColor: 'text-yellow-500',
    iconBg: 'bg-yellow-100',
    earnedAt: '2024-02-08T00:00:00Z',
    rarity: 'common'
  },
  {
    id: 'achievement-003',
    userId: 'user-001',
    title: 'Vocabulary Master',
    description: 'Learned 100 words',
    icon: 'book',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100',
    earnedAt: '2024-02-05T00:00:00Z',
    rarity: 'rare'
  }
];

const allAchievements = [
  {
    id: 'achievement-001',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: 'flame',
    points: 100,
    rarity: 'common'
  },
  {
    id: 'achievement-002',
    title: 'Quick Learner',
    description: 'Complete 10 lessons in a single day',
    icon: 'zap',
    points: 150,
    rarity: 'common'
  },
  {
    id: 'achievement-003',
    title: 'Vocabulary Master',
    description: 'Learn 100 new words',
    icon: 'book',
    points: 200,
    rarity: 'rare'
  },
  {
    id: 'achievement-004',
    title: 'Grammar Guru',
    description: 'Master all grammar rules in a level',
    icon: 'pen',
    points: 300,
    rarity: 'rare'
  },
  {
    id: 'achievement-005',
    title: 'Speaking Pro',
    description: 'Practice speaking for 100 minutes total',
    icon: 'mic',
    points: 250,
    rarity: 'rare'
  },
  {
    id: 'achievement-006',
    title: 'Perfect Score',
    description: 'Get 100% on any quiz',
    icon: 'star',
    points: 500,
    rarity: 'epic'
  }
];

const activityHistory = [
  {
    id: 'activity-001',
    userId: 'user-001',
    type: 'lesson_completed',
    title: 'Completed Present Tense lesson',
    points: 25,
    timestamp: '2024-02-15T09:30:00Z'
  },
  {
    id: 'activity-002',
    userId: 'user-001',
    type: 'challenge_progress',
    title: 'Made progress on Daily Challenge',
    points: 10,
    timestamp: '2024-02-15T08:45:00Z'
  },
  {
    id: 'activity-003',
    userId: 'user-001',
    type: 'vocabulary_learned',
    title: 'Learned 5 new words',
    points: 15,
    timestamp: '2024-02-15T08:00:00Z'
  },
  {
    id: 'activity-004',
    userId: 'user-001',
    type: 'streak_maintained',
    title: 'Maintained 15-day streak',
    points: 50,
    timestamp: '2024-02-15T00:00:00Z'
  }
];

module.exports = {
  users,
  userStats,
  lessons,
  dailyChallenges,
  skillProgress,
  achievements,
  allAchievements,
  activityHistory
};
