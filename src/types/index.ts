// ============================================================================
// ELEVE | BIGGEST FITNESS REVOLUTION
// TypeScript Domain Type Definitions
// ============================================================================

export type TrainingDiscipline =
  | 'Strength'
  | 'Calisthenics'
  | 'HYROX'
  | 'Combat Sports'
  | 'Yoga'
  | 'Mobility'
  | 'Zumba'
  | 'Home Workouts';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  username: string;
  avatarUrl: string;
  fitnessGoals: string[];
  preferredTraining: TrainingDiscipline[];
  availableDays: number;
  sessionDuration: number;
  equipment: string[];
  experienceLevel: ExperienceLevel;
  streak: number;
  consistencyScore: number;
  totalVolumeKg: number;
  prsCount: number;
  weightKg?: number;
  heightCm?: number;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  slug: string;
  muscleGroups: string[];
  secondaryMuscles?: string[];
  equipment: string;
  difficulty: ExperienceLevel;
  discipline: TrainingDiscipline;
  movementPattern: string;
  instructions: string[];
  commonMistakes: string[];
  safetyNotes: string;
  videoUrl?: string;
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  reps: number;
  weightKg: number;
  rpe?: number;
  completed: boolean;
  isPr?: boolean;
}

export interface WorkoutExerciseItem {
  exerciseId: string;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  name: string;
  discipline: TrainingDiscipline;
  scheduledDate: string;
  completedAt?: string;
  durationMin: number;
  caloriesBurned: number;
  totalVolumeKg: number;
  perceivedExertion?: number;
  notes?: string;
  exercises: WorkoutExerciseItem[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  discipline: TrainingDiscipline;
  level: ExperienceLevel | 'All Levels';
  durationWeeks: number;
  daysPerWeek: number;
  sessionDurationMin: number;
  description: string;
  tags: string[];
  isFeatured?: boolean;
  currentWeek?: number;
  currentDay?: number;
  schedule?: {
    week: number;
    totalWeeks: number;
    split: string[];
    todayWorkout?: {
      name: string;
      discipline: TrainingDiscipline;
      duration: number;
      exercisesCount: number;
      targetVolume: number;
    };
  };
}

export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  metric: string;
  value: number;
  previousValue?: number;
  unit: string;
  achievedAt: string;
}

export interface NutritionMacroSummary {
  date: string;
  caloriesTarget: number;
  caloriesConsumed: number;
  proteinTarget: number;
  proteinConsumed: number;
  carbsTarget: number;
  carbsConsumed: number;
  fatTarget: number;
  fatConsumed: number;
  waterTargetMl: number;
  waterConsumedMl: number;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Pre-Workout' | 'Post-Workout';

export interface MealEntry {
  id: string;
  date: string;
  mealType: MealType;
  title: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  items?: string[];
  loggedAt: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  prepTimeMin: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  tags: string[];
  imageUrl: string;
  isSaved?: boolean;
}

export interface WellnessData {
  date: string;
  sleepHours: number;
  deepSleepHours: number;
  remSleepHours: number;
  sleepScore: number;
  steps: number;
  stepsGoal: number;
  distanceKm: number;
  activeCalories: number;
  activeMinutes: number;
  restingHr: number;
  hrvMs: number;
  recoveryScore: number;
}

export interface DiaryEntry {
  id: string;
  date: string;
  mood: 'Peak' | 'Strong' | 'Focused' | 'Fatigued' | 'Stressed' | 'Recovering';
  energyLevel: number; // 1-10
  recoveryPerception: number; // 1-10
  workoutNotes: string;
  nutritionNotes: string;
  reflections: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  authorRole?: string;
  content: string;
  workoutSummary?: {
    name: string;
    discipline: string;
    durationMin: number;
    volumeKg: number;
    prCount?: number;
  };
  achievementBadge?: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  createdAt: string;
  comments?: PostComment[];
}

export interface PostComment {
  id: string;
  postId: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  description: string;
  durationDays: number;
  daysRemaining: number;
  goalType: 'consistency' | 'steps' | 'volume' | 'workouts';
  targetValue: number;
  currentProgress: number;
  participantsCount: number;
  xpReward: number;
  badgeName: string;
  isJoined: boolean;
  isCompleted: boolean;
  endDate: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  category: 'Consistency' | 'Strength' | 'Endurance' | 'Wellness' | 'Milestone';
  icon: string;
  xp: number;
  unlockedAt?: string;
  progressPercent: number;
  isUnlocked: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  score: number;
  category: string;
  streak: number;
  consistency: number;
  isCurrentUser?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  bio: string;
  credentials: string[];
  avatarUrl: string;
  availableSlots: string[];
}

export interface CoachBooking {
  id: string;
  coachId: string;
  coachName: string;
  scheduledDate: string;
  timeSlot: string;
  sessionType: string;
  status: 'Confirmed' | 'Completed' | 'Pending';
  notes?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Protein' | 'Creatine' | 'Recovery' | 'Gear';
  subtitle: string;
  rating: number;
  reviewsCount: number;
  price: number;
  description: string;
  ingredients: string[];
  considerations: string[];
  safetyNotes: string;
  imageUrl: string;
}

export interface ProductReview {
  id: string;
  targetType: 'Product' | 'Coach' | 'Exercise' | 'Plan';
  targetId: string;
  targetName: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface ConnectedDevice {
  provider: 'Apple Health' | 'Garmin' | 'Google Fit / Health Connect' | 'Whoop';
  deviceName: string;
  icon: string;
  isConnected: boolean;
  lastSync?: string;
  syncStatus: 'Ready' | 'Syncing' | 'Offline';
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  quickActions?: string[];
  isDemo?: boolean;
  metricsSnapshot?: {
    streak?: number;
    consistency?: number;
    readiness?: number;
  };
}

export interface FormAnalysisState {
  isActive: boolean;
  exercise: string;
  reps: number;
  tempo: 'Controlled' | 'Fast' | 'Explosive' | 'Too Slow';
  rangeOfMotionPct: number;
  formScore: number;
  status: 'Tracking' | 'Standby' | 'Rep Completed' | 'Form Alert';
  feedback: string;
  skeletonPoints: { x: number; y: number; confidence: number; label: string }[];
}
