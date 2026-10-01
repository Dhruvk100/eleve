import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import { MealLoggerModal } from '../components/nutrition/MealLoggerModal';
import {
  Plus,
  Droplet,
  } from 'lucide-react';
import { ProgressRing } from '../components/common/ProgressRing';

export const NutritionPage: React.FC = () => {
  const { nutrition, meals, logWater } = useEleve();
  const [modalOpen, setModalOpen] = useState(false);

  const caloriePct = Math.min(100, Math.round((nutrition.caloriesConsumed / nutrition.caloriesTarget) * 100));
  const proteinPct = Math.min(100, Math.round((nutrition.proteinConsumed / nutrition.proteinTarget) * 100));
  const carbsPct = Math.min(100, Math.round((nutrition.carbsConsumed / nutrition.carbsTarget) * 100));
  const fatPct = Math.min(100, Math.round((nutrition.fatConsumed / nutrition.fatTarget) * 100));
  const waterPct = Math.min(100, Math.round((nutrition.waterConsumedMl / nutrition.waterTargetMl) * 100));

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              METABOLIC FUEL ENGINE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Nutrition & Macro Calibration
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Precision macronutrient partitioning engineered to maximize glycogen resynthesis, muscle protein synthesis, and cellular hydration.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-glow-lime transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Log Meal Entry</span>
        </button>
      </div>

      {/* Primary Energy & Macro Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calories Master Ring */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-[#222838] flex flex-col items-center justify-center text-center space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            Daily Caloric Budget
          </div>

          <ProgressRing
            progress={caloriePct}
            size={180}
            strokeWidth={14}
            strokeColor="#CCFF00"
            bgColor="#1C202C"
          >
            <div className="space-y-1">
              <span className="text-3xl font-black text-white font-display">
                {nutrition.caloriesConsumed}
              </span>
              <div className="text-[11px] font-mono text-slate-400">
                / {nutrition.caloriesTarget} kcal
              </div>
              <div className="text-[10px] font-mono text-eleve-lime font-bold">
                {nutrition.caloriesTarget - nutrition.caloriesConsumed} remaining
              </div>
            </div>
          </ProgressRing>

          <div className="w-full pt-4 border-t border-[#1C202C] grid grid-cols-2 gap-4 text-xs font-mono">
            <div className="text-center">
              <span className="text-slate-500 uppercase">Target</span>
              <div className="font-bold text-white mt-0.5">{nutrition.caloriesTarget} kcal</div>
            </div>
            <div className="text-center">
              <span className="text-slate-500 uppercase">Status</span>
              <div className="font-bold text-eleve-lime mt-0.5">
                {caloriePct >= 100 ? 'Budget Hit' : `${100 - caloriePct}% Remaining`}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Macronutrients + Water */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Protein */}
          <div className="glass-card rounded-2xl p-5 border border-[#222838] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-emerald-400">
                Protein (MPS Synthesis)
              </span>
              <span className="text-xs font-mono text-white font-bold">{proteinPct}%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-display">
                {nutrition.proteinConsumed}g
              </span>
              <span className="text-xs font-mono text-slate-400">/ {nutrition.proteinTarget}g</span>
            </div>
            <div className="w-full bg-[#1A1F2C] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${proteinPct}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {nutrition.proteinTarget - nutrition.proteinConsumed}g left to hit 2.2g/kg threshold
            </div>
          </div>

          {/* Carbs */}
          <div className="glass-card rounded-2xl p-5 border border-[#222838] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">
                Carbohydrates (Glycogen)
              </span>
              <span className="text-xs font-mono text-white font-bold">{carbsPct}%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-display">
                {nutrition.carbsConsumed}g
              </span>
              <span className="text-xs font-mono text-slate-400">/ {nutrition.carbsTarget}g</span>
            </div>
            <div className="w-full bg-[#1A1F2C] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${carbsPct}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              High glycolytic refueling pool
            </div>
          </div>

          {/* Fats */}
          <div className="glass-card rounded-2xl p-5 border border-[#222838] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-amber-400">
                Dietary Fats (Endocrine)
              </span>
              <span className="text-xs font-mono text-white font-bold">{fatPct}%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-display">
                {nutrition.fatConsumed}g
              </span>
              <span className="text-xs font-mono text-slate-400">/ {nutrition.fatTarget}g</span>
            </div>
            <div className="w-full bg-[#1A1F2C] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${fatPct}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Essential fatty acids & hormonal baseline
            </div>
          </div>

          {/* Hydration */}
          <div className="glass-card rounded-2xl p-5 border border-[#222838] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase font-bold text-eleve-cyan flex items-center gap-1.5">
                <Droplet className="w-4 h-4" />
                Intracellular Hydration
              </span>
              <span className="text-xs font-mono text-white font-bold">{waterPct}%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-display">
                {(nutrition.waterConsumedMl / 1000).toFixed(1)}L
              </span>
              <span className="text-xs font-mono text-slate-400">
                / {(nutrition.waterTargetMl / 1000).toFixed(1)}L
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => logWater(250)}
                className="px-3 py-1 bg-[#181C26] hover:bg-cyan-500/20 text-cyan-300 border border-[#282F42] hover:border-cyan-400 text-xs font-mono rounded-lg transition-all"
              >
                +250ml
              </button>
              <button
                onClick={() => logWater(500)}
                className="px-3 py-1 bg-[#181C26] hover:bg-cyan-500/20 text-cyan-300 border border-[#282F42] hover:border-cyan-400 text-xs font-mono rounded-lg transition-all"
              >
                +500ml
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logged Meals Breakdown */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#222838] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
              Today's Logged Meals
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Chronological fuel timeline and nutrient intake
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-[#141824] border border-[#232838] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-500 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#181D2A] text-eleve-lime border border-[#262E40]">
                    {meal.mealType}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{meal.loggedAt}</span>
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  {meal.title}
                </h4>
                {meal.items && (
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {meal.items.join(' • ')}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-mono shrink-0">
                <div className="text-right">
                  <div className="font-bold text-white text-sm">{meal.calories} kcal</div>
                  <div className="text-slate-400">
                    <span className="text-emerald-400 font-semibold">{meal.proteinG}g P</span> •{' '}
                    <span className="text-cyan-400 font-semibold">{meal.carbsG}g C</span> •{' '}
                    <span className="text-amber-400 font-semibold">{meal.fatG}g F</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MealLoggerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
