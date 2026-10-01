import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEleve } from '../context/EleveContext';
import { disciplinesData } from '../data/disciplines';
import { ProgressRing } from '../components/common/ProgressRing';
import { MetricCard } from '../components/common/MetricCard';
import { WorkoutLoggerModal } from '../components/workout/WorkoutLoggerModal';
import { MealLoggerModal } from '../components/nutrition/MealLoggerModal';
import {
  Flame,
  Droplet,
  Moon,
  Footprints,
  Sparkles,
  Dumbbell,
  Play,
  ArrowRight,
  TrendingUp,
  Apple,
  Award,
  ChevronRight,
  Activity,
  Plus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const TodayDashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    activeWorkout,
    activePlan,
    nutrition,
    wellness,
    logWater,
    workoutHistory,
  } = useEleve();

  const navigate = useNavigate();
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [mealModalOpen, setMealModalOpen] = useState(false);

  // Dynamic Consistency & Volume Chart data based on user's real workout history
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const consistencyChartData = daysOfWeek.map((day) => {
    const daySessions = workoutHistory.filter((w) => {
      if (!w.completedAt) return false;
      const d = new Date(w.completedAt).toLocaleDateString('en-US', { weekday: 'short' });
      return d === day;
    });
    const volume = daySessions.reduce((acc, s) => acc + (s.totalVolumeKg || 0), 0);
    const score = daySessions.length > 0 ? Math.min(100, 70 + daySessions.length * 15) : 0;
    return { day, score, volume };
  });

  const waterPercent = Math.min(100, Math.round((nutrition.waterConsumedMl / (nutrition.waterTargetMl || 2000)) * 100));
  const caloriePercent = Math.min(100, Math.round((nutrition.caloriesConsumed / (nutrition.caloriesTarget || 2000)) * 100));
  const sleepPercent = Math.min(100, Math.round((wellness.sleepHours / 8.0) * 100));
  const stepsPercent = Math.min(100, Math.round((wellness.steps / (wellness.stepsGoal || 10000)) * 100));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* =====================================================================
          1. HERO SECTION
          ===================================================================== */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0E1119] via-[#121622] to-[#0A0C11] border border-[#23293A] p-6 sm:p-10 shadow-2xl">
        {/* Subtle dynamic background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-eleve-lime/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-24 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eleve-lime/10 border border-eleve-lime/30 text-eleve-lime text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-eleve-lime animate-ping" />
            <span>ELEVE OPERATING SYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display uppercase tracking-tight leading-[1.05] mb-4">
            BIGGEST FITNESS REVOLUTION
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed mb-8 max-w-xl">
            "Your day is a system. Train. Fuel. Recover. Repeat."
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setWorkoutModalOpen(true)}
              className="px-7 py-3.5 rounded-2xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-lime flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Start Training</span>
            </button>

            <Link
              to="/plans"
              className="px-6 py-3.5 rounded-2xl bg-[#181C26] hover:bg-[#202534] border border-[#2B3245] hover:border-slate-400 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>Explore ELEVE</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              to="/coach"
              className="hidden sm:flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Coach Ready</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. TODAY'S PERFORMANCE GAUGES (Rings & Stat Cards)
          ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-eleve-lime" />
            <h2 className="text-lg font-black text-white font-display uppercase tracking-wide">
              Today's Operating Metrics
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Last biometric sync: <span className="text-eleve-lime font-bold">2 mins ago</span>
          </div>
        </div>

        {/* 4 Primary Performance Pillars with Animated Progress Rings - Clickable to Navigate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Calories */}
          <div
            onClick={() => navigate('/nutrition')}
            className="glass-card rounded-2xl p-5 flex items-center justify-between border-eleve-border hover:border-amber-500/60 transition-all cursor-pointer group hover:scale-[1.01]"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 group-hover:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold transition-colors">
                <Flame className="w-4 h-4 text-amber-400" />
                Calories (Fuel)
              </span>
              <div className="text-2xl font-black text-white font-display">
                {nutrition.caloriesConsumed.toLocaleString()}{' '}
                <span className="text-xs font-mono text-slate-500 font-normal">
                  / {nutrition.caloriesTarget}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {nutrition.caloriesTarget - nutrition.caloriesConsumed} kcal remaining • Click to log
              </div>
            </div>
            <ProgressRing
              progress={caloriePercent}
              size={76}
              strokeWidth={7}
              strokeColor="#FFA502"
              bgColor="#1E2330"
            >
              <span className="text-xs font-mono font-bold text-white">
                {caloriePercent}%
              </span>
            </ProgressRing>
          </div>

          {/* 2. Water */}
          <div className="glass-card rounded-2xl p-5 flex items-center justify-between border-eleve-border hover:border-cyan-500/40 transition-all">
            <div className="space-y-1">
              <span
                onClick={() => navigate('/nutrition')}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold cursor-pointer transition-colors"
              >
                <Droplet className="w-4 h-4 text-eleve-cyan" />
                Hydration
              </span>
              <div className="text-2xl font-black text-white font-display">
                {(nutrition.waterConsumedMl / 1000).toFixed(1)}{' '}
                <span className="text-xs font-mono text-slate-500 font-normal">
                  / {(nutrition.waterTargetMl / 1000).toFixed(1)} L
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => logWater(250)}
                  className="px-2 py-0.5 bg-[#1A1F2C] hover:bg-eleve-cyan/20 border border-[#2B3245] hover:border-eleve-cyan/40 text-[10px] font-mono text-cyan-300 rounded font-semibold transition-all"
                >
                  +250ml
                </button>
                <button
                  onClick={() => logWater(500)}
                  className="px-2 py-0.5 bg-[#1A1F2C] hover:bg-eleve-cyan/20 border border-[#2B3245] hover:border-eleve-cyan/40 text-[10px] font-mono text-cyan-300 rounded font-semibold transition-all"
                >
                  +500ml
                </button>
              </div>
            </div>
            <ProgressRing
              progress={waterPercent}
              size={76}
              strokeWidth={7}
              strokeColor="#00F0FF"
              bgColor="#1E2330"
            >
              <span className="text-xs font-mono font-bold text-white">
                {waterPercent}%
              </span>
            </ProgressRing>
          </div>

          {/* 3. Steps */}
          <div
            onClick={() => navigate('/track')}
            className="glass-card rounded-2xl p-5 flex items-center justify-between border-eleve-border hover:border-emerald-500/60 transition-all cursor-pointer group hover:scale-[1.01]"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 group-hover:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold transition-colors">
                <Footprints className="w-4 h-4 text-emerald-400" />
                Active Steps
              </span>
              <div className="text-2xl font-black text-white font-display">
                {wellness.steps.toLocaleString()}{' '}
                <span className="text-xs font-mono text-slate-500 font-normal">
                  / {wellness.stepsGoal.toLocaleString()}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {wellness.distanceKm} km • Click to view telemetry
              </div>
            </div>
            <ProgressRing
              progress={stepsPercent}
              size={76}
              strokeWidth={7}
              strokeColor="#10B981"
              bgColor="#1E2330"
            >
              <span className="text-xs font-mono font-bold text-white">
                {stepsPercent}%
              </span>
            </ProgressRing>
          </div>

          {/* 4. Sleep */}
          <div
            onClick={() => navigate('/track')}
            className="glass-card rounded-2xl p-5 flex items-center justify-between border-eleve-border hover:border-indigo-500/60 transition-all cursor-pointer group hover:scale-[1.01]"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 group-hover:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold transition-colors">
                <Moon className="w-4 h-4 text-indigo-400" />
                Sleep Recovery
              </span>
              <div className="text-2xl font-black text-white font-display">
                {wellness.sleepHours}{' '}
                <span className="text-xs font-mono text-slate-500 font-normal">
                  / 8.0 h
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                Score: {wellness.sleepScore} • Click for sleep logs
              </div>
            </div>
            <ProgressRing
              progress={sleepPercent}
              size={76}
              strokeWidth={7}
              strokeColor="#8B5CF6"
              bgColor="#1E2330"
            >
              <span className="text-xs font-mono font-bold text-white">
                {sleepPercent}%
              </span>
            </ProgressRing>
          </div>
        </div>

        {/* Secondary Ecosystem Stats: Streak, Consistency, Volume, PRs - ALL NAVIGABLE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div onClick={() => navigate('/achievements')} className="cursor-pointer group">
            <MetricCard
              label="Current Streak"
              value={`${user?.streak ?? 0} Days`}
              subvalue="Click to view badges"
              accentColor="lime"
              icon={<Flame className="w-4 h-4 text-amber-400" />}
              trend="Unbroken"
            />
          </div>
          <div onClick={() => navigate('/track')} className="cursor-pointer group">
            <MetricCard
              label="Consistency Score"
              value={`${user?.consistencyScore ?? 0}%`}
              subvalue="Click for analytics"
              accentColor="cyan"
              icon={<TrendingUp className="w-4 h-4 text-eleve-cyan" />}
              trend="Telemetry"
            />
          </div>
          <div onClick={() => navigate('/track')} className="cursor-pointer group">
            <MetricCard
              label="Total Volume"
              value={`${(user?.totalVolumeKg ?? 0).toLocaleString()} kg`}
              subvalue="Click to track lifts"
              accentColor="purple"
              icon={<Dumbbell className="w-4 h-4 text-indigo-400" />}
              progress={Math.min(100, Math.round(((user?.totalVolumeKg ?? 0) / 10000) * 100))}
            />
          </div>
          <div onClick={() => navigate('/track')} className="cursor-pointer group">
            <MetricCard
              label="Personal Records"
              value={user?.prsCount ?? 0}
              subvalue="Click to view PRs"
              accentColor="amber"
              icon={<Award className="w-4 h-4 text-amber-400" />}
              trend="All-time Bests"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ACTIVE WORKOUT & CONSISTENCY CHART
          ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Workout Plan Block */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-7 border border-[#23293A] space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-eleve-lime/10 border border-eleve-lime/30 text-eleve-lime text-[11px] font-mono font-bold uppercase tracking-wider">
                ACTIVE TRAINING PLAN
              </span>
              <span className="text-xs font-mono text-slate-400">
                Week 5 of 8 • Push / Pull / Legs
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight uppercase">
              {activePlan?.title || 'HYPERTROPHY BLOCK'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {activePlan?.description}
            </p>

            {/* Split Schedule preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
              <div className="bg-[#161A24] p-3 rounded-xl border border-[#232838]">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Frequency</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">5 Days / Wk</div>
              </div>
              <div className="bg-[#161A24] p-3 rounded-xl border border-[#232838]">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Duration</div>
                <div className="text-sm font-bold text-white font-mono mt-0.5">60 Min</div>
              </div>
              <div className="bg-[#161A24] p-3 rounded-xl border border-[#232838]">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Discipline</div>
                <div className="text-sm font-bold text-eleve-lime font-mono mt-0.5">Strength</div>
              </div>
              <div className="bg-[#161A24] p-3 rounded-xl border border-[#232838]">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Level</div>
                <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">Intermediate</div>
              </div>
            </div>
          </div>

          {/* Today's Prescribed Session */}
          <div className="p-4 rounded-2xl bg-[#141822] border border-[#222838] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono text-eleve-lime font-bold uppercase tracking-wider">
                TODAY'S SCHEDULED SESSION
              </div>
              <div className="text-base font-bold text-white font-display mt-0.5">
                Pull Hypertrophy & Back Density
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Weighted Pull-Ups • Conventional Deadlifts • Rows • 1,240 kg Target
              </div>
            </div>

            <button
              onClick={() => setWorkoutModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-lime transition-all shrink-0"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Log Session</span>
            </button>
          </div>
        </div>

        {/* Right: 7-Day Consistency & Volume Chart */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-[#23293A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                CONSISTENCY & VOLUME TRAJECTORY
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {user?.consistencyScore ?? 0}% Index
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Aggregated mechanical resistance and volume output from your logged workouts.
            </div>
          </div>

          <div className="h-52 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consistencyChartData}>
                <defs>
                  <linearGradient id="colorConsistency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke="#475569"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12151E',
                    borderColor: '#262C3D',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                  itemStyle={{ color: '#CCFF00' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#CCFF00"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorConsistency)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-[#1E2330] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Total Volume: {(user?.totalVolumeKg ?? 0).toLocaleString()} kg</span>
            <Link to="/track" className="text-eleve-lime hover:underline flex items-center gap-1 font-bold">
              <span>View Progress & Telemetry</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. TRAINING DISCIPLINES GRID
          ===================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white font-display uppercase tracking-wide">
              Training Disciplines
            </h2>
            <p className="text-xs text-slate-400">
              Select your athletic focus to tailor workouts, drills, and AI context.
            </p>
          </div>
          <Link
            to="/exercises"
            className="text-xs font-mono text-eleve-lime hover:underline flex items-center gap-1"
          >
            <span>Exercise Library</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3.5">
          {disciplinesData.map((d) => (
            <div
              key={d.id}
              onClick={() => navigate(`/exercises?discipline=${encodeURIComponent(d.id)}`)}
              className="group glass-card-hover bg-[#12151E] border border-[#202534] rounded-2xl overflow-hidden cursor-pointer relative"
            >
              <div className="h-28 relative overflow-hidden">
                <img
                  src={d.imageUrl}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151E] via-[#12151E]/40 to-transparent" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-black/60 backdrop-blur-md text-white border border-white/10">
                  {d.intensity}
                </span>
              </div>
              <div className="p-3.5">
                <h4 className="text-sm font-bold text-white font-display group-hover:text-eleve-lime transition-colors">
                  {d.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {d.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. CONNECTED ECOSYSTEM STREAM & QUICK ACTIONS
          ===================================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Quick Callout */}
        <div className="glass-card rounded-2xl p-6 border-indigo-500/25 hover:border-indigo-500/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Biomechanical Check</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display">
              "Sleep dropped to 5.6h. Keep load high, adjust accessory sets."
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              ELEVE AI detects your current recovery score at 84%. Full plan adjustment proposal ready.
            </p>
          </div>
          <Link
            to="/coach"
            className="mt-4 px-4 py-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold text-xs uppercase tracking-wider text-center border border-indigo-500/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Open AI Coach</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Training Disciplines & Exercises Explorer */}
        <div className="glass-card rounded-2xl p-6 border-eleve-lime/25 hover:border-eleve-lime/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-eleve-lime text-xs font-mono font-bold uppercase mb-2">
              <Dumbbell className="w-4 h-4" />
              <span>Exercise Library</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display">
              8 Training Disciplines
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Explore targeted variations: push-ups, pull-ups, squats, deadlifts, and hybrid stations categorized by discipline.
            </p>
          </div>
          <Link
            to="/exercises"
            className="mt-4 px-4 py-2.5 rounded-xl bg-eleve-lime/10 hover:bg-eleve-lime/20 text-eleve-lime font-bold text-xs uppercase tracking-wider text-center border border-eleve-lime/30 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore Exercises</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Nutrition Quick Log */}
        <div className="glass-card rounded-2xl p-6 border-amber-500/25 hover:border-amber-500/50 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase mb-2">
              <Apple className="w-4 h-4" />
              <span>Nutrition Calibration</span>
            </div>
            <h4 className="text-lg font-bold text-white font-display">
              145g / 180g Protein Logged
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              35g protein remaining to hit your target today. Try our recommended Protein Bowl recipe.
            </p>
          </div>
          <button
            onClick={() => setMealModalOpen(true)}
            className="mt-4 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider text-center border border-amber-500/30 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Log Meal Entry</span>
          </button>
        </div>
      </section>

      {/* Modals */}
      <WorkoutLoggerModal
        isOpen={workoutModalOpen}
        onClose={() => setWorkoutModalOpen(false)}
        initialSession={activeWorkout}
      />
      <MealLoggerModal
        isOpen={mealModalOpen}
        onClose={() => setMealModalOpen(false)}
      />
    </div>
  );
};
