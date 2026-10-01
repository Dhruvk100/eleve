import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import { WorkoutPlan } from '../types';
import { WorkoutLoggerModal } from '../components/workout/WorkoutLoggerModal';
import {
  Dumbbell,
  Clock,
  Calendar,
  CheckCircle2,
  Play,
  Plus,
  Filter,
  Flame,
  Award,
} from 'lucide-react';

export const WorkoutPlansPage: React.FC = () => {
  const { workoutPlans, activePlan, selectActivePlan, activeWorkout } = useEleve();
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [loggerModalOpen, setLoggerModalOpen] = useState(false);

  const filteredPlans =
    selectedDiscipline === 'All'
      ? workoutPlans
      : workoutPlans.filter((p) => p.discipline === selectedDiscipline);

  const disciplines = ['All', 'Strength', 'HYROX', 'Calisthenics', 'Combat Sports', 'Mobility'];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              PROGRAMMING ARCHITECTURE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Workout Plans & Periodization
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Scientifically calibrated training splits engineered for neuromuscular adaptation, progressive mechanical tension, and athletic capacity.
          </p>
        </div>

        <button
          onClick={() => setLoggerModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-glow-lime transition-all"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>Start Training Session</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1" />
        {disciplines.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDiscipline(d)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 ${
              selectedDiscipline === d
                ? 'bg-eleve-lime text-black shadow-glow-lime/30'
                : 'bg-[#12151E] text-slate-400 hover:text-white border border-[#202534]'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Active Plan Spotlight */}
      {activePlan && (
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#141824] via-[#10141D] to-[#0A0C11] border-2 border-eleve-lime/40 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Dumbbell className="w-48 h-48 text-eleve-lime" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-eleve-lime text-black">
                CURRENT ACTIVE PLAN
              </span>
              <span className="text-xs font-mono text-slate-400">
                Week {activePlan.currentWeek || 5} of {activePlan.durationWeeks}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
              {activePlan.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activePlan.description}
            </p>

            {/* Split Breakdown */}
            {activePlan.schedule && (
              <div className="pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Microcycle Schedule (7-Day Rotation):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {activePlan.schedule.split.map((dayName, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        idx === 1
                          ? 'bg-eleve-lime/10 border-eleve-lime text-eleve-lime font-bold shadow-sm'
                          : 'bg-[#151924] border-[#222838] text-slate-300'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase text-slate-500">
                        Day {idx + 1}
                      </div>
                      <div className="text-xs font-semibold mt-1 leading-tight line-clamp-2">
                        {dayName}
                      </div>
                      {idx === 1 && (
                        <span className="inline-block mt-1 text-[9px] font-mono text-eleve-lime uppercase font-bold">
                          Today
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Available Plans Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-white font-display uppercase tracking-wider">
          Available Training Architectures
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => {
            const isActive = activePlan?.id === plan.id;
            return (
              <div
                key={plan.id}
                className={`glass-card rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                  isActive
                    ? 'border-eleve-lime shadow-glow-lime/20'
                    : 'border-[#222838] hover:border-slate-500'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-[#181C26] text-eleve-lime border border-[#2B3245]">
                      {plan.discipline}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {plan.level}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                      {plan.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                    <div className="bg-[#151924] p-2 rounded-lg border border-[#232838]">
                      <div className="text-[10px] font-mono text-slate-500">DURATION</div>
                      <div className="text-xs font-bold text-white font-mono mt-0.5">
                        {plan.durationWeeks} Wks
                      </div>
                    </div>
                    <div className="bg-[#151924] p-2 rounded-lg border border-[#232838]">
                      <div className="text-[10px] font-mono text-slate-500">DAYS / WK</div>
                      <div className="text-xs font-bold text-white font-mono mt-0.5">
                        {plan.daysPerWeek} Days
                      </div>
                    </div>
                    <div className="bg-[#151924] p-2 rounded-lg border border-[#232838]">
                      <div className="text-[10px] font-mono text-slate-500">SESSION</div>
                      <div className="text-xs font-bold text-white font-mono mt-0.5">
                        {plan.sessionDurationMin} Min
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {plan.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161A24] text-slate-400 border border-[#242A3A]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  {isActive ? (
                    <div className="w-full py-2.5 rounded-xl bg-eleve-lime/20 border border-eleve-lime/40 text-eleve-lime font-mono text-xs font-bold text-center flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Currently Active Plan</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => selectActivePlan(plan.id)}
                      className="w-full py-2.5 rounded-xl bg-[#181C26] hover:bg-eleve-lime hover:text-black border border-[#2B3245] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      Activate Program
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <WorkoutLoggerModal
        isOpen={loggerModalOpen}
        onClose={() => setLoggerModalOpen(false)}
        initialSession={activeWorkout}
      />
    </div>
  );
};
