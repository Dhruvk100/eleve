import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { EleveProvider } from './context/EleveContext';
import { MainLayout } from './layouts/MainLayout';

// Pages
import { TodayDashboard } from './pages/TodayDashboard';
import { WorkoutPlansPage } from './pages/WorkoutPlansPage';
import { ExerciseLibraryPage } from './pages/ExerciseLibraryPage';
import { LearningCenterPage } from './pages/LearningCenterPage';
import { AICoachPage } from './pages/AICoachPage';
import { FitnessTrackingPage } from './pages/FitnessTrackingPage';
import { NutritionPage } from './pages/NutritionPage';
import { RecipesPage } from './pages/RecipesPage';
import { CommunityPage } from './pages/CommunityPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { RankingPage } from './pages/RankingPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { CoachesPage } from './pages/CoachesPage';
import { DiaryPage } from './pages/DiaryPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-eleve-lime border-t-transparent animate-spin" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            INITIALIZING ELEVE OS...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <EleveProvider>
            <Routes>
              {/* Public Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <OnboardingPage />
                  </ProtectedRoute>
                }
              />

              {/* Protected Platform Operating System Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<TodayDashboard />} />
                <Route path="plans" element={<WorkoutPlansPage />} />
                <Route path="exercises" element={<ExerciseLibraryPage />} />
                <Route path="learn" element={<LearningCenterPage />} />
                <Route path="coach" element={<AICoachPage />} />
                <Route path="track" element={<FitnessTrackingPage />} />
                <Route path="nutrition" element={<NutritionPage />} />
                <Route path="recipes" element={<RecipesPage />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="challenges" element={<ChallengesPage />} />
                <Route path="ranking" element={<RankingPage />} />
                <Route path="achievements" element={<AchievementsPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="coaches" element={<CoachesPage />} />
                <Route path="diary" element={<DiaryPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Wildcard Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </EleveProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
