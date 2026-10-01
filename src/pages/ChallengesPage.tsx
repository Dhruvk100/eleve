import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import {
  Flame,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  const { challenges, joinChallenge, updateChallengeProgress } = useEleve();
  const [filterType, setFilterType] = useState<'all' | 'joined'>('all');

  const filtered =
    filterType === 'all' ? challenges : challenges.filter((c) => c.isJoined);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              ARENA PROTOCOLS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Athletic Challenges & Milestones
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Structured endurance, consistency, and volume arenas. Compete with global athletes and earn authenticated XP rewards.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#12151E] border border-[#202534]">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
              filterType === 'all'
                ? 'bg-eleve-lime text-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Challenges
          </button>
          <button
            onClick={() => setFilterType('joined')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
              filterType === 'joined'
                ? 'bg-eleve-lime text-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Enrolled ({challenges.filter((c) => c.isJoined).length})
          </button>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ch) => {
          const progressPercent = Math.min(
            100,
            Math.round((ch.currentProgress / ch.targetValue) * 100)
          );

          return (
            <div
              key={ch.id}
              className={`glass-card rounded-2xl p-6 border flex flex-col justify-between transition-all ${
                ch.isCompleted
                  ? 'border-emerald-500/50 bg-[#121814]'
                  : ch.isJoined
                  ? 'border-eleve-lime/40'
                  : 'border-[#222838]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#181C26] text-eleve-lime border border-[#2B3245]">
                    {ch.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{ch.daysRemaining} days left</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                    {ch.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                {/* Progress bar if joined */}
                {ch.isJoined && (
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Your Progress</span>
                      <span className="text-eleve-lime font-bold">
                        {ch.currentProgress.toLocaleString()} / {ch.targetValue.toLocaleString()} ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#181C28] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          ch.isCompleted ? 'bg-emerald-400' : 'bg-eleve-lime'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Metadata details */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-[#151924] p-2 rounded-lg border border-[#232838] flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ch.participantsCount.toLocaleString()} Athletes</span>
                  </div>
                  <div className="bg-[#151924] p-2 rounded-lg border border-[#232838] flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-amber-300 font-bold">+{ch.xpReward} XP</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-eleve-lime" />
                  <span>Unlocks Badge: <strong>'{ch.badgeName}'</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6">
                {ch.isCompleted ? (
                  <div className="w-full py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold text-center flex items-center justify-center gap-2 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Challenge Conquered</span>
                  </div>
                ) : ch.isJoined ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateChallengeProgress(ch.id, ch.goalType === 'steps' ? 5000 : 1)}
                      className="flex-1 py-2.5 rounded-xl bg-[#1A1F2C] hover:bg-[#222838] border border-[#2B3245] text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5 text-eleve-lime" />
                      <span>Log Progress</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => joinChallenge(ch.id)}
                    className="w-full py-2.5 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-lime flex items-center justify-center gap-2"
                  >
                    <span>Enroll in Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
