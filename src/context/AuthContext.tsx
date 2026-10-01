// ============================================================================
// ELEVE | Authentication & Session Management
// Supabase Auth Integration with Persistent Session & Offline Demo Support
// ============================================================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ExperienceLevel, TrainingDiscipline } from '../types';
import { initialProfile } from '../data/initialDemoData';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

export interface OnboardingData {
  fullName: string;
  fitnessGoals: string[];
  preferredTraining: TrainingDiscipline[];
  availableDays: number;
  sessionDuration: number;
  equipment: string[];
  experienceLevel: ExperienceLevel;
}

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSupabaseLive: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (email: string, password?: string, fullName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: OnboardingData) => void;
  loginAsDemoUser: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'eleve_current_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialProfile;
      }
    }
    return initialProfile; // Instant entry with clean zeroed stats for any device
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isSupabaseLive = isSupabaseConfigured();

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      if (isSupabaseLive) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              const loadedUser: UserProfile = {
                id: profile.id,
                email: profile.email || session.user.email || '',
                fullName: profile.full_name,
                username: profile.username || 'athlete',
                avatarUrl: profile.avatar_url || initialProfile.avatarUrl,
                fitnessGoals: profile.fitness_goals || ['Strength'],
                preferredTraining: profile.preferred_training || ['Strength'],
                availableDays: profile.available_days || 5,
                sessionDuration: profile.session_duration || 60,
                equipment: profile.equipment || ['Barbell'],
                experienceLevel: profile.experience_level || 'Intermediate',
                streak: profile.streak || 1,
                consistencyScore: profile.consistency_score || 90,
                totalVolumeKg: profile.total_volume_kg || 0,
                prsCount: profile.prs_count || 0,
                onboardingCompleted: true,
                createdAt: profile.created_at,
              };
              setUser(loadedUser);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedUser));
            }
          }
        } catch (err) {
          console.warn('Supabase session fetch fallback to local:', err);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [isSupabaseLive]);

  const saveUserSession = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    if (isSupabaseLive && password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.user) {
          const loggedUser: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || 'Athlete',
            username: (data.user.email || email).split('@')[0].toLowerCase(),
            avatarUrl: '',
            fitnessGoals: [],
            preferredTraining: [],
            availableDays: 0,
            sessionDuration: 0,
            equipment: [],
            experienceLevel: 'Beginner' as ExperienceLevel,
            streak: 0,
            consistencyScore: 0,
            totalVolumeKg: 0,
            prsCount: 0,
            onboardingCompleted: false,
            createdAt: new Date().toISOString(),
          };
          saveUserSession(loggedUser);
          setIsLoading(false);
          return true;
        }
      } catch (err) {
        console.warn('Live Supabase login failed, trying demo fallback:', err);
      }
    }

    // Demo / Offline Login fallback
    await new Promise((resolve) => setTimeout(resolve, 500));
    const mockUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email,
      fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      username: email.split('@')[0].toLowerCase(),
      avatarUrl: '',
      fitnessGoals: [],
      preferredTraining: [],
      availableDays: 0,
      sessionDuration: 0,
      equipment: [],
      experienceLevel: 'Beginner' as ExperienceLevel,
      streak: 0,
      consistencyScore: 0,
      totalVolumeKg: 0,
      prsCount: 0,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    };
    saveUserSession(mockUser);
    setIsLoading(false);
    return true;
  };

  const signup = async (email: string, password?: string, fullName?: string): Promise<boolean> => {
    setIsLoading(true);
    if (isSupabaseLive && password) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || 'New Athlete',
            }
          }
        });
        if (error) throw error;
        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            email,
            fullName: fullName || 'New Athlete',
            username: (fullName || email.split('@')[0]).toLowerCase().replace(/\s+/g, ''),
            avatarUrl: '',
            fitnessGoals: [],
            preferredTraining: [],
            availableDays: 0,
            sessionDuration: 0,
            equipment: [],
            experienceLevel: 'Beginner' as ExperienceLevel,
            streak: 0,
            consistencyScore: 0,
            totalVolumeKg: 0,
            prsCount: 0,
            onboardingCompleted: false, // Redirect to /onboarding
            createdAt: new Date().toISOString(),
          };
          saveUserSession(newUser);
          setIsLoading(false);
          return true;
        }
      } catch (err) {
        console.warn('Live Supabase signup error, fallback:', err);
      }
    }

    // Demo Signup
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      email,
      fullName: fullName || 'New Athlete',
      username: (fullName || email.split('@')[0]).toLowerCase().replace(/\s+/g, ''),
      avatarUrl: '',
      fitnessGoals: [],
      preferredTraining: [],
      availableDays: 0,
      sessionDuration: 0,
      equipment: [],
      experienceLevel: 'Beginner' as ExperienceLevel,
      streak: 0,
      consistencyScore: 0,
      totalVolumeKg: 0,
      prsCount: 0,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    };
    saveUserSession(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = async () => {
    if (isSupabaseLive) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout notice:', e);
      }
    }
    saveUserSession(null);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    if (isSupabaseLive) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        return { success: true, message: `Reset link dispatched to ${email}. Check your inbox.` };
      } catch (err: any) {
        return { success: false, message: err.message || 'Failed to dispatch reset email.' };
      }
    }
    return {
      success: true,
      message: `[DEMO MODE] Password recovery token dispatched to ${email}. In production, Supabase emails the magic link.`,
    };
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    saveUserSession(updated);

    if (isSupabaseLive) {
      supabase.from('profiles').update({
        full_name: updated.fullName,
        fitness_goals: updated.fitnessGoals,
        preferred_training: updated.preferredTraining,
        available_days: updated.availableDays,
        session_duration: updated.sessionDuration,
        equipment: updated.equipment,
        experience_level: updated.experienceLevel,
        streak: updated.streak,
        consistency_score: updated.consistencyScore,
        total_volume_kg: updated.totalVolumeKg,
        prs_count: updated.prsCount,
      }).eq('id', user.id).then();
    }
  };

  const completeOnboarding = (data: OnboardingData) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      fullName: data.fullName || user.fullName,
      fitnessGoals: data.fitnessGoals,
      preferredTraining: data.preferredTraining,
      availableDays: data.availableDays,
      sessionDuration: data.sessionDuration,
      equipment: data.equipment,
      experienceLevel: data.experienceLevel,
      onboardingCompleted: true,
    };
    saveUserSession(updated);
  };

  const loginAsDemoUser = () => {
    saveUserSession(initialProfile);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isSupabaseLive,
        login,
        signup,
        logout,
        resetPassword,
        updateProfile,
        completeOnboarding,
        loginAsDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
