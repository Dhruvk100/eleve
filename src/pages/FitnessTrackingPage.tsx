import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEleve } from '../context/EleveContext';
import { MetricCard } from '../components/common/MetricCard';
import { WorkoutLoggerModal } from '../components/workout/WorkoutLoggerModal';
import {
  Activity,
  Flame,
  Dumbbell,
  Moon,
  Plus,
  Trophy,
  Award,
  ChevronRight,
  TrendingUp,
  X,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const FitnessTrackingPage: React.FC = () => {
  const { user } = useAuth();
  const {
    wellness,
    nutrition,
    personalRecords,
    addPersonalRecord,
    updateWellness,
    workoutHistory,
  } = useEleve();

  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [prModalOpen, setPrModalOpen] = useState(false);
  const [telemetryModalOpen, setTelemetryModalOpen] = useState(false);

  // PR Form State
  const [prExercise, setPrExercise] = useState('Barbell Back Squat');
  const [prMetric, setPrMetric] = useState('1 Rep Max');
  const [prValue, setPrValue] = useState(100);
  const [prUnit, setPrUnit] = useState('kg');

  // Telemetry Form State
  const [inputSteps, setInputSteps] = useState(wellness.steps || 0);
  const [inputSleep, setInputSleep] = useState(wellness.sleepHours || 0);
  const [inputCalories, setInputCalories] = useState(wellness.activeCalories || 0);
  const [inputDistance, setInputDistance] = useState(wellness.distanceKm || 0);

  // Compute weekly chart data from user's actual workoutHistory
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = daysOfWeek.map((day) => {
    const daySessions = workoutHistory.filter((w) => {
      if (!w.completedAt) return false;
      const d = new Date(w.completedAt).toLocaleDateString('en-US', { weekday: 'short' });
      return d === day;
    });
    const volume = daySessions.reduce((acc, s) => acc + (s.totalVolumeKg || 0), 0);
    const calories = daySessions.reduce((acc, s) => acc + (s.caloriesBurned || 0), 0);
    return {
      period: day,
      volume,
      calories: calories > 0 ? calories : (nutrition.caloriesConsumed ? Math.round(nutrition.caloriesConsumed / 7) : 0),
      steps: wellness.steps ? Math.round(wellness.steps / 7) : 0,
      sleep: wellness.sleepHours || 0,
    };
  });

  const monthlyData = ['W1', 'W2', 'W3', 'W4'].map((w, idx) => ({
    period: w,
    volume: idx === 0 ? (user?.totalVolumeKg || 0) : 0,
    calories: idx === 0 ? (nutrition.caloriesConsumed || 0) : 0,
    steps: idx === 0 ? (wellness.steps || 0) : 0,
    sleep: wellness.sleepHours || 0,
  }));

  const yearlyData = ['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => ({
    period: q,
    volume: idx === 0 ? (user?.totalVolumeKg || 0) : 0,
    calories: idx === 0 ? (nutrition.caloriesConsumed || 0) * 4 : 0,
    steps: idx === 0 ? (wellness.steps || 0) * 4 : 0,
    sleep: wellness.sleepHours || 0,
  }));

  const chartData =
    timeframe === 'weekly' ? weeklyData : timeframe === 'monthly' ? monthlyData : yearlyData;

  const handleSavePr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prExercise.trim()) return;
    addPersonalRecord({
      exerciseId: 'ex_' + prExercise.toLowerCase().replace(/\s+/g, '_'),
      exerciseName: prExercise.trim(),
      metric: prMetric,
      value: Number(prValue),
      unit: prUnit,
    });
    setPrModalOpen(false);
  };

  const handleSaveTelemetry = (e: React.FormEvent) => {
    e.preventDefault();
    updateWellness({
      steps: Number(inputSteps),
      sleepHours: Number(inputSleep),
      activeCalories: Number(inputCalories),
      distanceKm: Number(inputDistance),
      sleepScore: inputSleep >= 7 ? 85 : inputSleep >= 5 ? 65 : 40,
    });
    setTelemetryModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              TELEMETRY & ANALYTICS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Athlete Progress & Telemetry
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Live telemetry tracking for your fitness journey. All values start from zero and grow with your verified workouts and biometric records.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setWorkoutModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-glow-lime"
          >
            <Plus className="w-4 h-4" />
            <span>Log Workout</span>
          </button>

          <button
            onClick={() => setPrModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#171B26] hover:bg-[#202534] border border-[#2A3144] hover:border-amber-400 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Record PR</span>
          </button>

          <button
            onClick={() => setTelemetryModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#171B26] hover:bg-[#202534] border border-[#2A3144] hover:border-eleve-cyan text-cyan-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            <Activity className="w-4 h-4 text-eleve-cyan" />
            <span>Log Telemetry</span>
          </button>
        </div>
      </div>

      {/* Snapshot Metrics - Starts strictly at ZERO */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label="Total Volume"
          value={`${(user?.totalVolumeKg ?? 0).toLocaleString()} kg`}
          subvalue="Logged Resistance"
          accentColor="lime"
          icon={<Dumbbell className="w-4 h-4 text-eleve-lime" />}
          trend={`${workoutHistory.length} Sessions`}
          trendUp={workoutHistory.length > 0}
        />
        <MetricCard
          label="Active Calories"
          value={`${wellness.activeCalories || nutrition.caloriesConsumed} kcal`}
          subvalue="Daily Burn"
          accentColor="amber"
          icon={<Flame className="w-4 h-4 text-amber-400" />}
          trend="Telemetry"
        />
        <MetricCard
          label="Daily NEAT Steps"
          value={(wellness.steps || 0).toLocaleString()}
          subvalue={`${wellness.distanceKm || 0} km walked`}
          accentColor="cyan"
          icon={<Activity className="w-4 h-4 text-eleve-cyan" />}
          trend="Goal: 10,000"
        />
        <MetricCard
          label="Sleep Duration"
          value={`${wellness.sleepHours || 0} h`}
          subvalue={wellness.sleepHours >= 7 ? 'Optimal Recovery' : 'Rest Needed'}
          accentColor="purple"
          icon={<Moon className="w-4 h-4 text-indigo-400" />}
          trend="Goal: 8.0h"
        />
      </div>

      {/* Chart Timeframe switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-eleve-lime" />
          <h2 className="text-base font-bold text-white uppercase font-display tracking-wider">
            Volume & Expenditure Curves
          </h2>
        </div>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#12151E] border border-[#202534]">
          {(['weekly', 'monthly', 'yearly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                timeframe === t
                  ? 'bg-eleve-lime text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts: Volume Load & Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mechanical Volume Load Chart */}
        <div className="glass-card rounded-3xl p-6 border border-[#222838] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
                Mechanical Resistance Volume (kg)
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {workoutHistory.length === 0
                  ? 'Zero sessions logged. Complete a workout to chart volume.'
                  : `Total: ${(user?.totalVolumeKg || 0).toLocaleString()} kg over ${workoutHistory.length} sessions`}
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-eleve-lime/10 text-eleve-lime font-mono text-xs font-bold">
              {timeframe.toUpperCase()}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" vertical={false} />
                <XAxis dataKey="period" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, 'auto']} />
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
                <Bar dataKey="volume" fill="#CCFF00" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aerobic Expenditure & Steps */}
        <div className="glass-card rounded-3xl p-6 border border-[#222838] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
                Caloric Burn & Activity Flux
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Aerobic output and metabolic expenditure
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold">
              FLUX
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2330" vertical={false} />
                <XAxis dataKey="period" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12151E',
                    borderColor: '#262C3D',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                  }}
                  itemStyle={{ color: '#00F0FF' }}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#00F0FF"
                  strokeWidth={2}
                  fill="url(#colorSteps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Personal Records Table */}
      <div className="glass-card rounded-3xl p-6 border border-[#222838] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Authenticated Personal Records (PRs)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Validated lifts, personal bests, and benchmarks recorded during your journey.
            </p>
          </div>

          <button
            onClick={() => setPrModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record New PR</span>
          </button>
        </div>

        {personalRecords.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#12151E] border border-dashed border-[#262C3D] space-y-3">
            <Award className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Personal Records Logged Yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-mono">
              Your record book is clean. Hit "Record New PR" or check the PR box during any logged workout to celebrate your milestones!
            </p>
            <button
              onClick={() => setPrModalOpen(true)}
              className="mt-2 px-4 py-2 rounded-xl bg-eleve-lime text-black font-extrabold text-xs uppercase tracking-wider"
            >
              Record First Milestone
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E2330] text-slate-500 uppercase">
                  <th className="py-3 px-4">Exercise</th>
                  <th className="py-3 px-4">Metric</th>
                  <th className="py-3 px-4">Current PR</th>
                  <th className="py-3 px-4">Previous</th>
                  <th className="py-3 px-4">Achieved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#181C28]">
                {personalRecords.map((pr) => (
                  <tr key={pr.id} className="hover:bg-[#141824] transition-colors">
                    <td className="py-3 px-4 font-bold text-white font-sans text-sm">
                      {pr.exerciseName}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{pr.metric}</td>
                    <td className="py-3 px-4 text-eleve-lime font-bold text-sm">
                      {pr.value} {pr.unit}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {pr.previousValue ? `${pr.previousValue} ${pr.unit}` : '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(pr.achievedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: Record Personal Record */}
      {prModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#12151E] border border-[#262C3D] rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1E2330] pb-3">
              <h3 className="text-base font-bold text-white uppercase font-display flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Record Personal Record (PR)</span>
              </h3>
              <button
                onClick={() => setPrModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2330]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePr} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 uppercase mb-1">Exercise Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barbell Deadlift, Pull-Ups, 5km Run"
                  value={prExercise}
                  onChange={(e) => setPrExercise(e.target.value)}
                  className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Metric Type</label>
                  <select
                    value={prMetric}
                    onChange={(e) => setPrMetric(e.target.value)}
                    className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="1 Rep Max">1 Rep Max</option>
                    <option value="Max Reps">Max Reps</option>
                    <option value="Fastest Time">Fastest Time</option>
                    <option value="Max Weight">Max Weight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Unit</label>
                  <select
                    value={prUnit}
                    onChange={(e) => setPrUnit(e.target.value)}
                    className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2.5 text-white"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                    <option value="reps">reps</option>
                    <option value="minutes">minutes</option>
                    <option value="seconds">seconds</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Record Value</label>
                <input
                  type="number"
                  required
                  step="any"
                  value={prValue}
                  onChange={(e) => setPrValue(Number(e.target.value))}
                  className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2.5 text-white font-bold text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPrModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase tracking-wide flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Milestone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Log Biometric Telemetry */}
      {telemetryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#12151E] border border-[#262C3D] rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#1E2330] pb-3">
              <h3 className="text-base font-bold text-white uppercase font-display flex items-center gap-2">
                <Activity className="w-4 h-4 text-eleve-cyan" />
                <span>Update Biometric Telemetry</span>
              </h3>
              <button
                onClick={() => setTelemetryModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2330]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTelemetry} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Steps Today</label>
                  <input
                    type="number"
                    value={inputSteps}
                    onChange={(e) => setInputSteps(Number(e.target.value))}
                    className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Distance (km)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputDistance}
                    onChange={(e) => setInputDistance(Number(e.target.value))}
                    className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Sleep (Hours)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inputSleep}
                    onChange={(e) => setInputSleep(Number(e.target.value))}
                    className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Active Calories</label>
                  <input
                    type="number"
                    value={inputCalories}
                    onChange={(e) => setInputCalories(Number(e.target.value))}
                    className="w-full bg-[#181C28] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setTelemetryModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-eleve-cyan hover:bg-cyan-300 text-black font-extrabold uppercase tracking-wide flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Telemetry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Workout Logger Modal */}
      <WorkoutLoggerModal
        isOpen={workoutModalOpen}
        onClose={() => setWorkoutModalOpen(false)}
      />
    </div>
  );
};
export default FitnessTrackingPage;
