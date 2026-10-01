 # ELEVE — BIGGEST FITNESS REVOLUTION
> **Philosophy:** TRAIN. FUEL. RECOVER. EVOLVE.  
> **Type:** High-Performance Athletic Operating System & Full-Stack Platform

---

## ⚡ Executive Overview

**ELEVE** is not a generic landing page or simple workout tracker. It is engineered as a **modern athletic operating system** — uniting mechanical overload tracking, macronutrient partitioning, recovery telemetry, computer-vision biomechanics, and artificial intelligence into a single connected ecosystem.

### Aesthetic & UI System
- **Dark Premium Athletic Theme:** Near-black obsidian backdrop (`#08090C`), graphite cards (`#12151D`), subtle glassmorphic borders (`#232838`).
- **Signature Electric Lime Accent:** `#CCFF00` with energetic glow shadows.
- **AI Intelligence Hue:** Deep indigo-to-purple gradients (`#6366F1` to `#8B5CF6`).
- **Typography:** Bold modern headings in *Plus Jakarta Sans*, body typography in *Inter*, and data metrics in *JetBrains Mono*.
- **Motion & Polish:** Animated SVG progress rings, interactive Recharts telemetry, toast event dispatches, and celebratory achievement confetti.

---

## 🏗️ Architecture & Full-Stack Directory Structure

ELEVE enforces a clean, modular, scalable structure separating database operations from UI rendering:

```text
eleve/
├── public/
│   ├── favicon.svg                  # Geometric ELEVE monogram favicon
│   └── eleve-logo.svg               # Vector brand logotype & wordmark
├── supabase/
│   ├── schema.sql                   # Full PostgreSQL schema with RLS policies & indexes (26 tables)
│   └── seed.sql                     # Production seed data (Alex Mercer, exercises, plans, products)
├── src/
│   ├── types/
│   │   └── index.ts                 # Strongly-typed domain interfaces for the entire platform
│   ├── services/
│   │   ├── supabaseClient.ts        # Supabase client manager with offline local fallback
│   │   ├── aiCoachService.ts        # Biomechanical AI guidance service with Demo/Live modes
│   │   └── ecosystemSync.ts         # Centralized ecosystem orchestration
│   ├── context/
│   │   ├── AuthContext.tsx          # Supabase auth, persistent sessions & onboarding state
│   │   ├── EleveContext.tsx         # Unified platform state, workouts, nutrition, community, PRs
│   │   └── ToastContext.tsx         # Global toast notification pipeline
│   ├── layouts/
│   │   └── MainLayout.tsx           # Global athletic layout with Navbar, Sidebar, and MobileNav
│   ├── components/
│   │   ├── common/
│   │   │   ├── Logo.tsx             # Geometric brand mark
│   │   │   ├── Navbar.tsx           # Sticky top bar with AI status and streak indicator
│   │   │   ├── Sidebar.tsx          # Desktop navigation & mobile drawer
│   │   │   ├── MobileNav.tsx        # Mobile bottom quick touch navigation
│   │   │   ├── ProgressRing.tsx     # Animated SVG circular gauge
│   │   │   └── MetricCard.tsx       # Athletic KPI metric card
│   │   ├── workout/
│   │   │   └── WorkoutLoggerModal.tsx # Dynamic set/rep/weight logging with live volume & PRs
│   │   └── nutrition/
│   │       └── MealLoggerModal.tsx  # Dynamic meal & macronutrient entry modal
│   ├── pages/
│   │   ├── TodayDashboard.tsx       # Flagship Today OS view with Hero, rings, and telemetry
│   │   ├── WorkoutPlansPage.tsx     # Training splits & periodized programs
│   │   ├── ExerciseLibraryPage.tsx  # Biomechanical repository with video cues & filters
│   │   ├── LearningCenterPage.tsx   # Evidence-based masterclasses & reading modals
│   │   ├── AICoachPage.tsx          # Conversational AI coach with quick action presets
│   │   ├── FormAnalystPage.tsx      # Computer-vision optical joint tracking prototype
│   │   ├── FitnessTrackingPage.tsx  # Daily, weekly, monthly, yearly analytics charts
│   │   ├── NutritionPage.tsx        # Macro partitioning, hydration, and meal log
│   │   ├── RecipesPage.tsx          # High-protein recipes & custom recipe creator
│   │   ├── CommunityPage.tsx        # Global social feed with workout summary sharing
│   │   ├── ChallengesPage.tsx       # 30-day consistency, 100K steps, volume arenas
│   │   ├── RankingPage.tsx          # Objective leaderboard (consistency, streaks, XP)
│   │   ├── AchievementsPage.tsx     # Milestone badges with activity-triggered unlocks
│   │   ├── ProductsPage.tsx         # Supplement science, ingredients, and safety notes
│   │   ├── ReviewsPage.tsx          # Platform ratings & feedback submission modal
│   │   ├── CoachesPage.tsx          # Coach directory & interactive demo booking flow
│   │   ├── DiaryPage.tsx            # Encrypted private journal for recovery and reflection
│   │   ├── ProfilePage.tsx          # Athlete parameters, equipment, and goals editor
│   │   ├── SettingsPage.tsx         # Wearable hardware bridge (Apple Health, Garmin, etc.)
│   │   ├── LoginPage.tsx            # Sign in with instant 1-click Demo Account access
│   │   ├── SignupPage.tsx           # Registration flow
│   │   └── OnboardingPage.tsx       # 5-step intake questionnaire
│   ├── data/
│   │   ├── initialDemoData.ts       # Realistic production dataset for Alex Mercer
│   │   └── disciplines.ts           # Metadata for 8 training disciplines
│   ├── App.tsx                      # Router and route guards
│   ├── index.css                    # Tailwind CSS directives, glassmorphic styling, scrollbars
│   └── main.tsx                     # React 19 entry point
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Installation
Navigate into the project directory and install dependencies:
```bash
cd eleve
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔑 Authentication & Demo Access

ELEVE is equipped with dual-engine authentication:
1. **Instant 1-Click Demo Login:**  
   Click the **"Instant Demo Login (Alex Mercer)"** button on the Login page (`/login`) to explore the platform with pre-populated realistic data.
   - **Email:** `alex.mercer@eleve.fit`
   - **Password:** `revolution`
2. **Supabase Cloud Authentication:**  
   When Supabase keys are configured in `.env`, sign up, login, and password resets interface directly with your live Supabase project.

---

## 🗄️ Database & Supabase PostgreSQL Setup

The complete database schema is located in `supabase/schema.sql`, featuring:
- **26 Relational Tables** with UUID primary keys and foreign keys.
- **Row Level Security (RLS)** protecting private tables (`profiles`, `workouts`, `workout_sets`, `nutrition_daily`, `meals`, `diary_entries`, `connected_devices`, `coach_bookings`).
- **Public Read Policies** for `exercises`, `workout_plans`, `challenges`, `achievements`, `products`, `coaches`, and `reviews`.
- **Performance Indexes** on composite foreign keys, timestamps, and GIN indexes for array lookups.

### Executing Database Setup in Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor**.
3. Copy and run the contents of [`supabase/schema.sql`](file:///C:/Users/Asus/.gemini/antigravity/scratch/eleve/supabase/schema.sql).
4. Run the contents of [`supabase/seed.sql`](file:///C:/Users/Asus/.gemini/antigravity/scratch/eleve/supabase/seed.sql) to populate initial exercises, plans, coaches, and products.

---

## ⚙️ Environment Variables

Create a `.env` file in the root of `eleve/` based on [`.env.example`](file:///C:/Users/Asus/.gemini/antigravity/scratch/eleve/.env.example):

```bash
# Supabase Configuration (Optional - falls back to persistent offline demo store if omitted)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Live AI Inference Key (Optional - can also be set in /coach UI)
VITE_AI_API_KEY=
```

*Note: If no Supabase URL is supplied, ELEVE functions in **Persistent Storage Mode** using browser `localStorage` so that all workouts, sets, recipes, meals, and diary entries persist seamlessly across page reloads without requiring cloud credentials.*

---

## 🌐 Connected Ecosystem Architecture

ELEVE operates as a unified closed loop rather than isolated screens:

```text
[Workout Logged & Completed]
        │
        ├──► Profile: Increments streak, updates consistency (91%), adds volume (1,240 kg)
        ├──► PR Engine: Identifies new maximums (e.g. +20kg Pull-Up) & updates PR vault
        ├──► Achievements: Triggers milestone unlocks (Barrier Shattered, 7-Day Streak)
        ├──► Challenges: Auto-increments progress on enrolled arenas (30-Day Consistency)
        ├──► Leaderboard: Recalculates ranking XP score
        └──► AI Context: Feeds latest exertion and volume into AI Coach for recovery guidance
```

Similar automatic synchronization occurs when logging nutrition meals, updating hydration, or conquering challenges.

---

## 🔬 Clearly Labeled Prototype & Demo Features

In strict adherence to engineering transparency, advanced future hardware and neural interfaces are clearly labeled:
1. **ELEVE AI Coach (`/coach`):** Operates in **Demo AI Mode** using local contextual heuristic models. When a real API key is entered, it transitions to **Live AI Mode**.
2. **Form Analyst (`/coach/form-analysis`):** Operates as a **Computer-Vision Prototype**. It activates the user's camera (or a synthetic high-frame-rate athletic feed if camera access is denied) and renders an optical joint skeleton overlay with live rep counting, tempo monitoring, and form scoring.
3. **Wearables Integration (`/settings`):** Operates as an interactive **Demo Integration**. Users can connect, sync, or disconnect Apple Health, Garmin, Google Health Connect, and Whoop with simulated data reconciliation.
4. **Coach Booking (`/coaches`):** Operates as an interactive **Demo Booking Flow** confirming scheduled 1-on-1 strategy consultations into the athlete's upcoming bookings.

---

## 🔌 Connecting Future AI, Computer Vision & Wearables

### 1. Connecting Live AI (Gemini / OpenAI)
In `src/services/aiCoachService.ts`, the `generateResponse()` method is ready for direct REST/SDK calls:
```typescript
const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
  method: "POST",
  headers: { "Content-Type": "application/json", "x-goog-api-key": this.apiKey },
  body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
});
```

### 2. Connecting Production Computer Vision (MediaPipe / TensorRT)
The canvas rendering pipeline in `src/pages/FormAnalystPage.tsx` expects 33 normalized landmark coordinates (MediaPipe Pose standard). To integrate `@mediapipe/pose`:
1. `npm install @mediapipe/pose @mediapipe/camera_utils`
2. Initialize `Pose` detector inside `useEffect()` and pipe `videoRef.current` frames to `pose.send({ image: videoElement })`.
3. Feed normalized landmarks directly into the existing `renderSkeleton()` canvas loop.

### 3. Connecting Live Wearables
To transition wearable sync to production:
- **Apple HealthKit:** Deploy a React Native or Capacitor container using `@capacitor-community/health-kit`.
- **Google Health Connect:** Utilize Android Health Connect SDK with OAuth2 PKCE token exchange.
- **Garmin Connect Developer Program:** Configure server-side webhook endpoints in Supabase Edge Functions listening to Garmin Push API pings.

---

## 🏆 Brand Standards

- **Brand:** **ELEVE**
- **Tagline:** **BIGGEST FITNESS REVOLUTION**
- **Core Philosophy:** **TRAIN. FUEL. RECOVER. EVOLVE.**
