-- ============================================================================
-- ELEVE | BIGGEST FITNESS REVOLUTION
-- Modern Athletic Operating System Database Schema
-- Supabase PostgreSQL with Row Level Security (RLS)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. USERS & PROFILES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT NOT NULL DEFAULT 'Alex Mercer',
    username TEXT UNIQUE,
    avatar_url TEXT,
    fitness_goals TEXT[] DEFAULT ARRAY['Strength', 'Endurance', 'Hypertrophy'],
    preferred_training TEXT[] DEFAULT ARRAY['Strength', 'HYROX'],
    available_days INT DEFAULT 5,
    session_duration INT DEFAULT 60,
    equipment TEXT[] DEFAULT ARRAY['Full Gym', 'Barbell', 'Dumbbells', 'Cables'],
    experience_level TEXT DEFAULT 'Intermediate',
    streak INT DEFAULT 14,
    consistency_score NUMERIC(5,2) DEFAULT 91.0,
    total_volume_kg NUMERIC(10,2) DEFAULT 14250.0,
    prs_count INT DEFAULT 12,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. WORKOUT PLANS & EXERCISES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    muscle_groups TEXT[] NOT NULL,
    secondary_muscles TEXT[],
    equipment TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced', 'Elite')),
    movement_pattern TEXT,
    instructions TEXT[] NOT NULL,
    common_mistakes TEXT[],
    safety_notes TEXT,
    video_url TEXT,
    has_3d BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    discipline TEXT NOT NULL,
    level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
    duration_weeks INT NOT NULL DEFAULT 8,
    days_per_week INT NOT NULL DEFAULT 5,
    session_duration_min INT NOT NULL DEFAULT 60,
    description TEXT,
    schedule JSONB, -- weekly breakdown
    tags TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_active_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
    current_week INT DEFAULT 5,
    current_day INT DEFAULT 2,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, is_active)
);

-- ----------------------------------------------------------------------------
-- 3. WORKOUTS, SETS & HISTORY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.workout_plans(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    discipline TEXT NOT NULL DEFAULT 'Strength',
    scheduled_date DATE DEFAULT CURRENT_DATE,
    completed_at TIMESTAMPTZ,
    duration_min INT DEFAULT 60,
    calories_burned INT DEFAULT 450,
    total_volume_kg NUMERIC(10,2) DEFAULT 0,
    perceived_exertion INT CHECK (perceived_exertion BETWEEN 1 AND 10),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.workout_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES public.workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    set_number INT NOT NULL,
    reps INT NOT NULL,
    weight_kg NUMERIC(6,2) DEFAULT 0,
    rpe NUMERIC(3,1),
    completed BOOLEAN DEFAULT true,
    is_pr BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.personal_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    metric TEXT NOT NULL DEFAULT '1RM', -- '1RM', 'Max Reps', 'Volume'
    value NUMERIC(8,2) NOT NULL,
    previous_value NUMERIC(8,2),
    achieved_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. NUTRITION & RECIPES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.nutrition_daily (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    calories_target INT DEFAULT 2600,
    calories_consumed INT DEFAULT 0,
    protein_target INT DEFAULT 180,
    protein_consumed INT DEFAULT 0,
    carbs_target INT DEFAULT 280,
    carbs_consumed INT DEFAULT 0,
    fat_target INT DEFAULT 70,
    fat_consumed INT DEFAULT 0,
    water_target_ml INT DEFAULT 3000,
    water_consumed_ml INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS public.meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    meal_type TEXT CHECK (meal_type IN ('Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-Workout', 'Post-Workout')),
    title TEXT NOT NULL,
    calories INT NOT NULL,
    protein_g INT NOT NULL,
    carbs_g INT NOT NULL,
    fat_g INT NOT NULL,
    items JSONB,
    logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'High Protein',
    prep_time_min INT DEFAULT 15,
    calories INT NOT NULL,
    protein_g INT NOT NULL,
    carbs_g INT NOT NULL,
    fat_g INT NOT NULL,
    ingredients JSONB NOT NULL,
    instructions TEXT[] NOT NULL,
    tags TEXT[],
    image_url TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. WELLNESS & WEARABLES (Sleep, Water, Activity)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wellness_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    sleep_hours NUMERIC(4,2) DEFAULT 7.5,
    deep_sleep_hours NUMERIC(4,2) DEFAULT 1.8,
    rem_sleep_hours NUMERIC(4,2) DEFAULT 2.1,
    sleep_score INT DEFAULT 88,
    steps INT DEFAULT 10450,
    distance_km NUMERIC(5,2) DEFAULT 8.2,
    active_calories INT DEFAULT 620,
    active_minutes INT DEFAULT 65,
    resting_hr INT DEFAULT 52,
    hrv_ms INT DEFAULT 78,
    recovery_score INT DEFAULT 89,
    logged_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS public.connected_devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- 'Apple Health', 'Garmin', 'Google Fit / Health Connect', 'Whoop'
    device_name TEXT NOT NULL,
    is_connected BOOLEAN DEFAULT false,
    last_sync TIMESTAMPTZ,
    sync_status TEXT DEFAULT 'Ready',
    UNIQUE(user_id, provider)
);

-- ----------------------------------------------------------------------------
-- 6. PRIVATE DIARY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.diary_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    mood TEXT CHECK (mood IN ('Peak', 'Strong', 'Focused', 'Fatigued', 'Stressed', 'Recovering')),
    energy_level INT CHECK (energy_level BETWEEN 1 AND 10),
    recovery_perception INT CHECK (recovery_perception BETWEEN 1 AND 10),
    workout_notes TEXT,
    nutrition_notes TEXT,
    reflections TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. COMMUNITY, COMMENTS, LIKES & FOLLOWS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    workout_summary JSONB,
    achievement_badge TEXT,
    image_url TEXT,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.post_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.post_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_avatar TEXT,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(follower_id, following_id)
);

-- ----------------------------------------------------------------------------
-- 8. CHALLENGES & LEADERBOARDS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    duration_days INT NOT NULL,
    goal_type TEXT NOT NULL, -- 'consistency', 'steps', 'volume', 'workouts'
    target_value NUMERIC(10,2) NOT NULL,
    participants_count INT DEFAULT 0,
    xp_reward INT DEFAULT 500,
    badge_name TEXT NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    progress_current NUMERIC(10,2) DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    UNIQUE(challenge_id, user_id)
);

-- ----------------------------------------------------------------------------
-- 9. ACHIEVEMENTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    icon TEXT NOT NULL,
    xp INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- ----------------------------------------------------------------------------
-- 10. COACHES & BOOKINGS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.coaches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    specialization TEXT NOT NULL,
    experience_years INT NOT NULL,
    rating NUMERIC(3,2) DEFAULT 4.95,
    reviews_count INT DEFAULT 42,
    hourly_rate INT DEFAULT 85,
    bio TEXT NOT NULL,
    credentials TEXT[] NOT NULL,
    avatar_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.coach_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_id UUID NOT NULL REFERENCES public.coaches(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    session_type TEXT DEFAULT 'Virtual Strategy & Form Check',
    status TEXT DEFAULT 'Confirmed',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 11. PRODUCTS & REVIEWS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Protein', 'Creatine', 'Recovery', 'Equipment'
    subtitle TEXT NOT NULL,
    rating NUMERIC(3,2) DEFAULT 4.9,
    reviews_count INT DEFAULT 128,
    price NUMERIC(6,2) NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT[] NOT NULL,
    considerations TEXT[] NOT NULL,
    safety_notes TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_type TEXT NOT NULL CHECK (target_type IN ('Product', 'Coach', 'Exercise', 'Plan')),
    target_id UUID NOT NULL,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Read public items (exercises, plans, products, coaches, challenges, achievements)
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read exercises" ON public.exercises FOR SELECT USING (true);

ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read plans" ON public.workout_plans FOR SELECT USING (true);

ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read challenges" ON public.challenges FOR SELECT USING (true);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read achievements" ON public.achievements FOR SELECT USING (true);

ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read coaches" ON public.coaches FOR SELECT USING (true);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);

-- User Profiles: can read all public profiles, only update own
CREATE POLICY "Read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Workouts & Sets: only user can view & modify their own workouts
CREATE POLICY "User workouts manage" ON public.workouts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User sets manage" ON public.workout_sets FOR ALL USING (
    EXISTS (SELECT 1 FROM public.workouts WHERE id = workout_sets.workout_id AND user_id = auth.uid())
);
CREATE POLICY "User PRs manage" ON public.personal_records FOR ALL USING (auth.uid() = user_id);

-- Nutrition & Meals: private to user
CREATE POLICY "User nutrition manage" ON public.nutrition_daily FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User meals manage" ON public.meals FOR ALL USING (auth.uid() = user_id);

-- Recipes: user can manage own, public can view public recipes
CREATE POLICY "Read public or own recipes" ON public.recipes FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "User manage own recipes" ON public.recipes FOR ALL USING (auth.uid() = user_id);

-- Wellness & Devices: strictly private to user
CREATE POLICY "User wellness manage" ON public.wellness_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User devices manage" ON public.connected_devices FOR ALL USING (auth.uid() = user_id);

-- Diary entries: strictly private to user
CREATE POLICY "User diary private" ON public.diary_entries FOR ALL USING (auth.uid() = user_id);

-- Community: anyone authenticated can read posts, create posts, like & comment
CREATE POLICY "Read community posts" ON public.community_posts FOR SELECT USING (true);
CREATE POLICY "Create community posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Modify own community posts" ON public.community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Delete own community posts" ON public.community_posts FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Read comments" ON public.post_comments FOR SELECT USING (true);
CREATE POLICY "Insert comments" ON public.post_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Read likes" ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "Manage likes" ON public.post_likes FOR ALL USING (auth.uid() = user_id);

-- User Challenges & Achievements
CREATE POLICY "User challenges manage" ON public.user_challenges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User achievements manage" ON public.user_achievements FOR ALL USING (auth.uid() = user_id);

-- Coach Bookings & Reviews
CREATE POLICY "User coach bookings manage" ON public.coach_bookings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Create review" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_workouts_user ON public.workouts(user_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_nutrition_user_date ON public.nutrition_daily(user_id, date);
CREATE INDEX IF NOT EXISTS idx_diary_user_date ON public.diary_entries(user_id, date);
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON public.community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_exercises_muscle ON public.exercises USING GIN(muscle_groups);
