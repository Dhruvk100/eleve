import React from 'react';
import { useEleve } from '../context/EleveContext';
import {
  Award,
  Zap,
  Flame,
  Trophy,
  ShieldCheck,
  Crown,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const AchievementsPage: React.FC = () => {
  const { achievements } = useEleve();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-eleve-lime" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-cyan-400" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6 text-eleve-lime" />;
      case 'Award':
        return <Award className="w-6 h-6 text-indigo-400" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-amber-300" />;
      default:
        return <Award className="w-6 h-6 text-slate-400" />;
    }
  };

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalXp = achievements
    .filter((a) => a.isUnlocked)
    .reduce((sum, a) => sum + a.xp, 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              MOMENTUM & BADGES
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Athletic Achievements
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Authenticated badges awarded automatically upon completion of training consistency thresholds and validated PRs.
          </p>
        </div>

        {/* Aggregate Status Pill */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#12151E] border border-[#202534] text-xs font-mono">
          <div>
            <span className="text-slate-500 uppercase">Unlocked</span>
            <div className="text-lg font-bold text-eleve-lime mt-0.5">
              {unlockedCount} / {achievements.length} Badges
            </div>
          </div>
          <div className="w-px h-8 bg-[#202534]" />
          <div>
            <span className="text-slate-500 uppercase">Earned XP</span>
            <div className="text-lg font-bold text-white mt-0.5">
              {totalXp.toLocaleString()} XP
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`glass-card rounded-2xl p-6 border flex flex-col justify-between transition-all ${
              ach.isUnlocked
                ? 'border-eleve-lime/40 shadow-glow-lime/10 bg-gradient-to-b from-[#161B1C] to-[#11141C]'
                : 'border-[#222838] opacity-75'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className={`p-3 rounded-xl border ${
                    ach.isUnlocked
                      ? 'bg-eleve-lime/10 border-eleve-lime/30'
                      : 'bg-[#181C26] border-[#2B3245]'
                  }`}
                >
                  {getIcon(ach.icon)}
                </div>

                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-[#181C26] text-amber-400 border border-[#2B3245]">
                  +{ach.xp} XP
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight flex items-center gap-2">
                  <span>{ach.title}</span>
                  {ach.isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-eleve-lime shrink-0" />
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-white font-bold">{ach.progressPercent}%</span>
                </div>
                <div className="w-full bg-[#181C28] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ach.isUnlocked ? 'bg-eleve-lime' : 'bg-slate-600'
                    }`}
                    style={{ width: `${ach.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1C202C] mt-4 flex items-center justify-between text-xs font-mono">
              {ach.isUnlocked ? (
                <span className="text-eleve-lime font-bold">
                  Unlocked on {new Date(ach.unlockedAt || '').toLocaleDateString()}
                </span>
              ) : (
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Locked Milestone</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
