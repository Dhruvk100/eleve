// ============================================================================
// ELEVE | Master Platform Context & Connected Ecosystem Engine
// ============================================================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  WorkoutSession,
  WorkoutPlan,
  Exercise,
  PersonalRecord,
  NutritionMacroSummary,
  MealEntry,
  Recipe,
  WellnessData,
  DiaryEntry,
  CommunityPost,
  Challenge,
  Achievement,
  LeaderboardEntry,
  Coach,
  CoachBooking,
  ProductItem,
  ProductReview,
  ConnectedDevice,
} from '../types';
import {
  initialPlans,
  initialExercises,
  initialChallenges,
  initialAchievements,
  initialLeaderboard,
  initialCoaches,
  initialProducts,
  initialConnectedDevices,
} from '../data/initialDemoData';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface EleveContextValue {
  // Workouts
  activeWorkout: WorkoutSession | null;
  workoutPlans: WorkoutPlan[];
  activePlan: WorkoutPlan | null;
  exercises: Exercise[];
  personalRecords: PersonalRecord[];
  addPersonalRecord: (pr: Omit<PersonalRecord, 'id' | 'achievedAt'>) => void;
  workoutHistory: WorkoutSession[];
  completeWorkout: (session: WorkoutSession) => void;
  updateActiveWorkout: (session: WorkoutSession) => void;
  selectActivePlan: (planId: string) => void;

  // Nutrition & Recipes
  nutrition: NutritionMacroSummary;
  meals: MealEntry[];
  recipes: Recipe[];
  logMeal: (meal: Omit<MealEntry, 'id' | 'loggedAt' | 'date'>) => void;
  logWater: (amountMl: number) => void;
  saveRecipe: (recipeId: string) => void;
  createRecipe: (recipe: Omit<Recipe, 'id'>) => void;

  // Wellness
  wellness: WellnessData;
  updateWellness: (updates: Partial<WellnessData>) => void;

  // Community
  communityPosts: CommunityPost[];
  createCommunityPost: (content: string, workoutSummary?: any, badge?: string) => void;
  likeCommunityPost: (postId: string) => void;
  addCommentToPost: (postId: string, comment: string) => void;

  // Challenges & Achievements
  challenges: Challenge[];
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
  joinChallenge: (challengeId: string) => void;
  updateChallengeProgress: (challengeId: string, increment: number) => void;

  // Diary (Private)
  diaryEntries: DiaryEntry[];
  createDiaryEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteDiaryEntry: (id: string) => void;

  // Coaches & Bookings
  coaches: Coach[];
  coachBookings: CoachBooking[];
  bookCoachSession: (coachId: string, date: string, timeSlot: string, notes?: string) => void;

  // Products & Reviews
  products: ProductItem[];
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'createdAt'>) => void;

  // Connected Devices (Wearables)
  connectedDevices: ConnectedDevice[];
  toggleDeviceConnection: (providerName: string) => void;
  syncDevice: (providerName: string) => void;
}

const EleveContext = createContext<EleveContextValue | undefined>(undefined);

export const EleveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  // ── Per-user storage helpers ─────────────────────────────────────────────
  // Keys are namespaced by user ID so every account has isolated data.
  const uid = user?.id ?? 'guest';

  const getStoredForUser = <T,>(userId: string, key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`eleve_${userId}_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  // Helpers for default empty states
  const emptyNutrition = (): NutritionMacroSummary => ({
    date: new Date().toISOString().split('T')[0],
    caloriesTarget: 2000,
    caloriesConsumed: 0,
    proteinTarget: 150,
    proteinConsumed: 0,
    carbsTarget: 250,
    carbsConsumed: 0,
    fatTarget: 65,
    fatConsumed: 0,
    waterTargetMl: 2000,
    waterConsumedMl: 0,
  });

  const emptyWellness = (): WellnessData => ({
    date: new Date().toISOString().split('T')[0],
    sleepHours: 0,
    deepSleepHours: 0,
    remSleepHours: 0,
    sleepScore: 0,
    steps: 0,
    stepsGoal: 10000,
    distanceKm: 0,
    activeCalories: 0,
    activeMinutes: 0,
    restingHr: 0,
    hrvMs: 0,
    recoveryScore: 0,
  });

  const emptyAchievements = () => initialAchievements.map(a => {
    const { unlockedAt: _, ...rest } = a;
    return { ...rest, isUnlocked: false, progressPercent: 0 };
  });

  const emptyChallenges = () => initialChallenges.map(c => ({ ...c, isJoined: false, currentProgress: 0 }));
  const emptyLeaderboard = () => initialLeaderboard.map(l => l.isCurrentUser ? { ...l, score: 0, currentStreak: 0 } : l);
  const emptyDevices = () => initialConnectedDevices.map(d => ({ ...d, isConnected: false }));

  // ── State (initialized from current user's namespace) ─────────────────────
  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(() =>
    getStoredForUser(uid, 'activeWorkout', null)
  );
  const [workoutPlans] = useState<WorkoutPlan[]>(initialPlans);
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(() =>
    getStoredForUser(uid, 'activePlan', null)
  );
  const [exercises] = useState<Exercise[]>(initialExercises);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(() =>
    getStoredForUser(uid, 'prs', [])
  );
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() =>
    getStoredForUser(uid, 'history', [])
  );
  const [nutrition, setNutrition] = useState<NutritionMacroSummary>(() =>
    getStoredForUser(uid, 'nutrition', emptyNutrition())
  );
  const [meals, setMeals] = useState<MealEntry[]>(() => getStoredForUser(uid, 'meals', []));
  const [recipes, setRecipes] = useState<Recipe[]>(() => getStoredForUser(uid, 'recipes', []));
  const [wellness, setWellness] = useState<WellnessData>(() =>
    getStoredForUser(uid, 'wellness', emptyWellness())
  );
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() =>
    getStoredForUser(uid, 'community', [])
  );
  const [challenges, setChallenges] = useState<Challenge[]>(() =>
    getStoredForUser(uid, 'challenges', emptyChallenges())
  );
  const [achievements, setAchievements] = useState<Achievement[]>(() =>
    getStoredForUser(uid, 'achievements', emptyAchievements())
  );
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    getStoredForUser(uid, 'leaderboard', emptyLeaderboard())
  );
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(() =>
    getStoredForUser(uid, 'diary', [])
  );
  const [coaches] = useState<Coach[]>(initialCoaches);
  const [coachBookings, setCoachBookings] = useState<CoachBooking[]>(() =>
    getStoredForUser(uid, 'bookings', [])
  );
  const [products] = useState<ProductItem[]>(initialProducts);
  const [reviews, setReviews] = useState<ProductReview[]>(() =>
    getStoredForUser(uid, 'reviews', [])
  );
  const [connectedDevices, setConnectedDevices] = useState<ConnectedDevice[]>(() =>
    getStoredForUser(uid, 'devices', emptyDevices())
  );

  // ── Reload all state when the logged-in user changes ─────────────────────
  // This ensures a new user always starts with their own data (or a clean slate).
  useEffect(() => {
    setActiveWorkout(getStoredForUser(uid, 'activeWorkout', null));
    setActivePlan(getStoredForUser(uid, 'activePlan', null));
    setPersonalRecords(getStoredForUser(uid, 'prs', []));
    setWorkoutHistory(getStoredForUser(uid, 'history', []));
    setNutrition(getStoredForUser(uid, 'nutrition', emptyNutrition()));
    setMeals(getStoredForUser(uid, 'meals', []));
    setRecipes(getStoredForUser(uid, 'recipes', []));
    setWellness(getStoredForUser(uid, 'wellness', emptyWellness()));
    setCommunityPosts(getStoredForUser(uid, 'community', []));
    setChallenges(getStoredForUser(uid, 'challenges', emptyChallenges()));
    setAchievements(getStoredForUser(uid, 'achievements', emptyAchievements()));
    setLeaderboard(getStoredForUser(uid, 'leaderboard', emptyLeaderboard()));
    setDiaryEntries(getStoredForUser(uid, 'diary', []));
    setCoachBookings(getStoredForUser(uid, 'bookings', []));
    setReviews(getStoredForUser(uid, 'reviews', []));
    setConnectedDevices(getStoredForUser(uid, 'devices', emptyDevices()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  // Sync state changes to localStorage (namespaced per user)
  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_nutrition`, JSON.stringify(nutrition));
  }, [uid, nutrition]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_meals`, JSON.stringify(meals));
  }, [uid, meals]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_community`, JSON.stringify(communityPosts));
  }, [uid, communityPosts]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_challenges`, JSON.stringify(challenges));
  }, [uid, challenges]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_achievements`, JSON.stringify(achievements));
  }, [uid, achievements]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_diary`, JSON.stringify(diaryEntries));
  }, [uid, diaryEntries]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_devices`, JSON.stringify(connectedDevices));
  }, [uid, connectedDevices]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_prs`, JSON.stringify(personalRecords));
  }, [uid, personalRecords]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_history`, JSON.stringify(workoutHistory));
  }, [uid, workoutHistory]);

  useEffect(() => {
    localStorage.setItem(`eleve_${uid}_wellness`, JSON.stringify(wellness));
  }, [uid, wellness]);

  const addPersonalRecord = (prData: Omit<PersonalRecord, 'id' | 'achievedAt'>) => {
    const newPr: PersonalRecord = {
      ...prData,
      id: 'pr_' + Date.now(),
      achievedAt: new Date().toISOString(),
    };
    setPersonalRecords((prev) => [newPr, ...prev]);
    if (user) {
      updateProfile({
        prsCount: (user.prsCount || 0) + 1,
      });
      triggerAchievementUnlock('FIRST_PR');
    }
    showToast({
      type: 'success',
      title: 'RECORD ADDED',
      message: `${newPr.exerciseName}: ${newPr.value} ${newPr.unit} recorded!`,
    });
  };

  // Trigger achievement unlock helper
  const triggerAchievementUnlock = (code: string) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.code === code && !ach.isUnlocked) {
          // Defer toast to avoid setState-during-render error
          setTimeout(() => {
            showToast({
              type: 'achievement',
              title: `ACHIEVEMENT UNLOCKED: ${ach.title}`,
              message: `+${ach.xp} XP earned! ${ach.description}`,
              duration: 6000,
            });
            try {
              confetti({
                particleCount: 60,
                spread: 60,
                origin: { y: 0.8 },
                colors: ['#CCFF00', '#00F0FF', '#FFFFFF'],
              });
            } catch {
              // Safe fallback
            }
          }, 0);
          return {
            ...ach,
            isUnlocked: true,
            progressPercent: 100,
            unlockedAt: new Date().toISOString(),
          };
        }
        return ach;
      })
    );
  };

  // ==========================================================================
  // CONNECTED ECOSYSTEM: Workout Completed
  // ==========================================================================
  const completeWorkout = (session: WorkoutSession) => {
    const finishedSession: WorkoutSession = {
      ...session,
      completedAt: new Date().toISOString(),
    };

    setWorkoutHistory((prev) => [finishedSession, ...prev]);

    // 1. Check for PRs in this session
    let newPrsCount = 0;
    session.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.isPr) {
          newPrsCount++;
          const newPr: PersonalRecord = {
            id: 'pr_' + Date.now() + Math.random().toString(36).substring(2, 4),
            exerciseId: ex.exerciseId,
            exerciseName: ex.exerciseName,
            metric: 'Weight Load',
            value: s.weightKg,
            unit: 'kg',
            achievedAt: new Date().toISOString(),
          };
          setPersonalRecords((prevPrs) => [newPr, ...prevPrs]);
          triggerAchievementUnlock('FIRST_PR');
        }
      });
    });

    // 2. Update Profile Ecosystem: Streak, Volume, PR count, Consistency
    if (user) {
      const updatedStreak = user.streak + 1;
      const updatedVolume = user.totalVolumeKg + session.totalVolumeKg;
      const updatedPrs = user.prsCount + newPrsCount;
      const updatedConsistency = Math.min(100, Number((user.consistencyScore + 0.4).toFixed(1)));

      updateProfile({
        streak: updatedStreak,
        totalVolumeKg: updatedVolume,
        prsCount: updatedPrs,
        consistencyScore: updatedConsistency,
      });

      if (updatedStreak >= 7) triggerAchievementUnlock('7_DAY_STREAK');
      if (updatedStreak >= 30) triggerAchievementUnlock('30_DAY_STREAK');
      triggerAchievementUnlock('FIRST_WORKOUT');
    }

    // 3. Update Challenge Progress
    const completedChallenges: { title: string; xpReward: number; badgeName: string }[] = [];
    setChallenges((prev) =>
      prev.map((c) => {
        if (!c.isJoined || c.isCompleted) return c;
        let increment = 0;
        if (c.goalType === 'consistency' || c.goalType === 'workouts') increment = 1;
        if (c.goalType === 'volume') increment = session.totalVolumeKg;

        const newProg = c.currentProgress + increment;
        const finished = newProg >= c.targetValue;

        if (finished && !c.isCompleted) {
          completedChallenges.push({ title: c.title, xpReward: c.xpReward, badgeName: c.badgeName });
        }

        return {
          ...c,
          currentProgress: newProg,
          isCompleted: finished,
        };
      })
    );
    // Fire side effects AFTER state update (outside updater)
    setTimeout(() => {
      completedChallenges.forEach((c) => {
        triggerAchievementUnlock('CHALLENGE_COMPLETED');
        showToast({
          type: 'achievement',
          title: `CHALLENGE CONQUERED: ${c.title}`,
          message: `Claimed +${c.xpReward} XP & '${c.badgeName}' Badge!`,
          duration: 6500,
        });
      });
    }, 0);

    // 4. Update Leaderboard score
    setLeaderboard((prev) =>
      prev.map((entry) =>
        entry.isCurrentUser
          ? {
              ...entry,
              score: entry.score + Math.round(session.totalVolumeKg / 10) + 150,
              streak: entry.streak + 1,
            }
          : entry
      )
    );

    // 5. Trigger notification
    showToast({
      type: 'success',
      title: 'TRAINING SESSION COMPLETE',
      message: `${session.name} logged. Total Volume: ${session.totalVolumeKg.toLocaleString()} kg. Ecosystem updated.`,
    });
  };

  const updateActiveWorkout = (session: WorkoutSession) => {
    setActiveWorkout(session);
    localStorage.setItem(`eleve_${uid}_activeWorkout`, JSON.stringify(session));
  };

  const selectActivePlan = (planId: string) => {
    const selected = workoutPlans.find((p) => p.id === planId);
    if (selected) {
      setActivePlan(selected);
      localStorage.setItem(`eleve_${uid}_activePlan`, JSON.stringify(selected));
      showToast({
        type: 'info',
        title: 'ACTIVE PLAN UPDATED',
        message: `Activated ${selected.title} (${selected.discipline}).`,
      });
    }
  };

  // ==========================================================================
  // NUTRITION & WATER LOGGING
  // ==========================================================================
  const logMeal = (mealData: Omit<MealEntry, 'id' | 'loggedAt' | 'date'>) => {
    const newMeal: MealEntry = {
      ...mealData,
      id: 'meal_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMeals((prev) => [newMeal, ...prev]);

    // Recalculate daily totals
    setNutrition((prev) => ({
      ...prev,
      caloriesConsumed: prev.caloriesConsumed + newMeal.calories,
      proteinConsumed: prev.proteinConsumed + newMeal.proteinG,
      carbsConsumed: prev.carbsConsumed + newMeal.carbsG,
      fatConsumed: prev.fatConsumed + newMeal.fatG,
    }));

    showToast({
      type: 'success',
      title: 'MEAL LOGGED',
      message: `${newMeal.title} added: +${newMeal.proteinG}g Protein, +${newMeal.calories} kcal.`,
    });
  };

  const logWater = (amountMl: number) => {
    setNutrition((prev) => {
      const updated = {
        ...prev,
        waterConsumedMl: prev.waterConsumedMl + amountMl,
      };
      return updated;
    });

    showToast({
      type: 'info',
      title: 'HYDRATION LOGGED',
      message: `+${amountMl}ml recorded. Total: ${((nutrition.waterConsumedMl + amountMl) / 1000).toFixed(1)}L / ${(nutrition.waterTargetMl / 1000).toFixed(1)}L`,
    });
  };

  const saveRecipe = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === recipeId ? { ...r, isSaved: !r.isSaved } : r))
    );
    showToast({
      type: 'info',
      title: 'RECIPE SAVED',
      message: 'Recipe updated in your nutrition bookmarks.',
    });
  };

  const createRecipe = (recipeData: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: 'rec_' + Date.now(),
      isSaved: true,
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    showToast({
      type: 'success',
      title: 'RECIPE CREATED',
      message: `"${newRecipe.title}" added to your recipe vault.`,
    });
  };

  const updateWellness = (updates: Partial<WellnessData>) => {
    setWellness((prev) => ({ ...prev, ...updates }));
  };

  // ==========================================================================
  // COMMUNITY
  // ==========================================================================
  const createCommunityPost = (content: string, workoutSummary?: any, badge?: string) => {
    if (!user) return;
    const newPost: CommunityPost = {
      id: 'post_' + Date.now(),
      userId: user.id,
      authorName: user.fullName,
      authorAvatar: user.avatarUrl,
      authorRole: 'Athlete',
      content,
      workoutSummary,
      achievementBadge: badge,
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
      createdAt: 'Just now',
      comments: [],
    };

    setCommunityPosts((prev) => [newPost, ...prev]);
    showToast({
      type: 'success',
      title: 'POST BROADCASTED',
      message: 'Shared with the ELEVE global community feed.',
    });
  };

  const likeCommunityPost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1,
          };
        }
        return p;
      })
    );
  };

  const addCommentToPost = (postId: string, commentText: string) => {
    if (!user) return;
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: 'comm_' + Date.now(),
            postId,
            userId: user.id,
            authorName: user.fullName,
            authorAvatar: user.avatarUrl,
            content: commentText,
            createdAt: 'Just now',
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...(p.comments || []), newComment],
          };
        }
        return p;
      })
    );
  };

  // ==========================================================================
  // CHALLENGES
  // ==========================================================================
  const joinChallenge = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          return {
            ...c,
            isJoined: true,
            participantsCount: c.participantsCount + 1,
          };
        }
        return c;
      })
    );
    showToast({
      type: 'info',
      title: 'CHALLENGE JOINED',
      message: 'Tracking active. Crush your targets to claim your badge.',
    });
  };

  const updateChallengeProgress = (challengeId: string, increment: number) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          const newProgress = c.currentProgress + increment;
          const completed = newProgress >= c.targetValue;
          return {
            ...c,
            currentProgress: newProgress,
            isCompleted: completed,
          };
        }
        return c;
      })
    );
  };

  // ==========================================================================
  // DIARY (PRIVATE)
  // ==========================================================================
  const createDiaryEntry = (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: 'diary_' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);
    showToast({
      type: 'success',
      title: 'PRIVATE DIARY SAVED',
      message: 'Reflections securely stored in your personal vault.',
    });
  };

  const deleteDiaryEntry = (id: string) => {
    setDiaryEntries((prev) => prev.filter((d) => d.id !== id));
    showToast({
      type: 'info',
      title: 'ENTRY REMOVED',
      message: 'Diary record deleted.',
    });
  };

  // ==========================================================================
  // COACHES & BOOKINGS
  // ==========================================================================
  const bookCoachSession = (coachId: string, date: string, timeSlot: string, notes?: string) => {
    const coach = coaches.find((c) => c.id === coachId);
    if (!coach) return;
    const newBooking: CoachBooking = {
      id: 'book_' + Date.now(),
      coachId,
      coachName: coach.name,
      scheduledDate: date,
      timeSlot,
      sessionType: '1-on-1 Biomechanics & Programming Strategy',
      status: 'Confirmed',
      notes,
    };
    setCoachBookings((prev) => [newBooking, ...prev]);
    showToast({
      type: 'success',
      title: 'COACH SESSION BOOKED [DEMO]',
      message: `Confirmed with ${coach.name} for ${date} at ${timeSlot}.`,
      duration: 5000,
    });
  };

  // ==========================================================================
  // PRODUCTS & REVIEWS
  // ==========================================================================
  const addReview = (reviewData: Omit<ProductReview, 'id' | 'createdAt'>) => {
    const newReview: ProductReview = {
      ...reviewData,
      id: 'rev_' + Date.now(),
      createdAt: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast({
      type: 'success',
      title: 'REVIEW PUBLISHED',
      message: 'Thank you for your feedback.',
    });
  };

  // ==========================================================================
  // WEARABLES (DEMO INTEGRATIONS)
  // ==========================================================================
  const toggleDeviceConnection = (providerName: string) => {
    setConnectedDevices((prev) =>
      prev.map((dev) => {
        if (dev.provider === providerName) {
          const nextState = !dev.isConnected;
          showToast({
            type: nextState ? 'success' : 'info',
            title: `DEVICE ${nextState ? 'CONNECTED' : 'DISCONNECTED'} [DEMO]`,
            message: `${providerName} ${nextState ? 'is now actively paired with ELEVE.' : 'was unlinked.'}`,
          });
          return {
            ...dev,
            isConnected: nextState,
            lastSync: nextState ? 'Just now' : undefined,
          };
        }
        return dev;
      })
    );
  };

  const syncDevice = (providerName: string) => {
    showToast({
      type: 'info',
      title: 'SYNCING WEARABLE [DEMO]',
      message: `Pulling latest biometric metrics from ${providerName}...`,
    });
    setTimeout(() => {
      setConnectedDevices((prev) =>
        prev.map((dev) =>
          dev.provider === providerName ? { ...dev, lastSync: 'Just now' } : dev
        )
      );
      // Simulate real-time sync into wellness
      setWellness((prev) => ({
        ...prev,
        steps: prev.steps + 240,
        distanceKm: Number((prev.distanceKm + 0.18).toFixed(2)),
      }));
      showToast({
        type: 'success',
        title: 'SYNC COMPLETE',
        message: `${providerName} biometrics refreshed.`,
      });
    }, 1200);
  };

  return (
    <EleveContext.Provider
      value={{
        activeWorkout,
        workoutPlans,
        activePlan,
        exercises,
        personalRecords,
        addPersonalRecord,
        workoutHistory,
        completeWorkout,
        updateActiveWorkout,
        selectActivePlan,
        nutrition,
        meals,
        recipes,
        logMeal,
        logWater,
        saveRecipe,
        createRecipe,
        wellness,
        updateWellness,
        communityPosts,
        createCommunityPost,
        likeCommunityPost,
        addCommentToPost,
        challenges,
        achievements,
        leaderboard,
        joinChallenge,
        updateChallengeProgress,
        diaryEntries,
        createDiaryEntry,
        deleteDiaryEntry,
        coaches,
        coachBookings,
        bookCoachSession,
        products,
        reviews,
        addReview,
        connectedDevices,
        toggleDeviceConnection,
        syncDevice,
      }}
    >
      {children}
    </EleveContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEleve = (): EleveContextValue => {
  const context = useContext(EleveContext);
  if (!context) {
    throw new Error('useEleve must be used within an EleveProvider');
  }
  return context;
};
