import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import { Trophy, Flame, TrendingUp, Shield, Users, Medal } from 'lucide-react';

export const RankingPage: React.FC = () => {
  const { leaderboard } = useEleve();
  const [activeTab, setActiveTab] = useState<'Global' | 'Friends' | 'Weekly' | 'Monthly' | 'Challenges'>('Global');

  const tabs: ('Global' | 'Friends' | 'Weekly' | 'Monthly' | 'Challenges')[] = [
    'Global',
    'Friends',
    'Weekly',
    'Monthly',
    'Challenges',
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              PERFORMANCE RANKING MATRIX
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Athletic Leaderboard
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Ranked objectively on verified session consistency, unbroken momentum streaks, and completed workload. Appearance is never scored.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#12151E] border border-[#202534] overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 ${
                activeTab === tab
                  ? 'bg-eleve-lime text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium (Visual athletic highlight) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Silver (Rank 2) */}
        <div className="order-2 md:order-1 glass-card rounded-2xl p-6 border border-[#252C3D] flex flex-col items-center text-center space-y-3">
          <div className="w-8 h-8 rounded-full bg-slate-300 text-black font-black font-mono flex items-center justify-center text-sm shadow-md">
            2
          </div>
          <img
            src={leaderboard[1]?.avatarUrl}
            alt={leaderboard[1]?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-400/40"
          />
          <div>
            <div className="font-bold text-white text-base">{leaderboard[1]?.name}</div>
            <div className="text-xs font-mono text-slate-400">{leaderboard[1]?.category}</div>
          </div>
          <div className="text-xs font-mono text-slate-300">
            <span className="text-eleve-lime font-bold">{leaderboard[1]?.score.toLocaleString()}</span> XP
          </div>
        </div>

        {/* Gold (Rank 1) */}
        <div className="order-1 md:order-2 glass-card rounded-2xl p-7 border-2 border-eleve-lime flex flex-col items-center text-center space-y-3 relative shadow-glow-lime/20 bg-gradient-to-b from-[#181F17] to-[#12161E]">
          <div className="w-10 h-10 rounded-full bg-eleve-lime text-black font-black font-mono flex items-center justify-center text-base shadow-lg">
            1
          </div>
          <img
            src={leaderboard[0]?.avatarUrl}
            alt={leaderboard[0]?.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-eleve-lime"
          />
          <div>
            <div className="font-bold text-white text-lg font-display">{leaderboard[0]?.name}</div>
            <div className="text-xs font-mono text-eleve-lime font-bold">
              {leaderboard[0]?.category}
            </div>
          </div>
          <div className="text-sm font-mono text-slate-200">
            <span className="text-eleve-lime font-bold text-base">
              {leaderboard[0]?.score.toLocaleString()}
            </span>{' '}
            XP • {leaderboard[0]?.streak} Day Streak
          </div>
        </div>

        {/* Bronze (Rank 3 - Alex Mercer / You) */}
        <div className="order-3 md:order-3 glass-card rounded-2xl p-6 border border-indigo-500/40 flex flex-col items-center text-center space-y-3 bg-[#131622]">
          <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black font-mono flex items-center justify-center text-sm shadow-md">
            3
          </div>
          <img
            src={leaderboard[2]?.avatarUrl}
            alt={leaderboard[2]?.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-400"
          />
          <div>
            <div className="font-bold text-white text-base flex items-center justify-center gap-1.5">
              <span>{leaderboard[2]?.name}</span>
            </div>
            <div className="text-xs font-mono text-indigo-300 font-semibold">
              {leaderboard[2]?.category}
            </div>
          </div>
          <div className="text-xs font-mono text-slate-300">
            <span className="text-eleve-lime font-bold">{leaderboard[2]?.score.toLocaleString()}</span> XP
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card rounded-3xl p-6 border border-[#222838] space-y-4">
        <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
          Division Standings
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1E2330] text-slate-500 uppercase">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Athlete</th>
                <th className="py-3 px-4">Focus</th>
                <th className="py-3 px-4 text-center">Consistency</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">XP Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181C28]">
              {leaderboard.map((entry) => (
                <tr
                  key={entry.id}
                  className={`transition-colors ${
                    entry.isCurrentUser
                      ? 'bg-eleve-lime/10 font-bold'
                      : 'hover:bg-[#141824]'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-sm">
                    {entry.rank === 1 ? '🥇 #1' : entry.rank === 2 ? '🥈 #2' : entry.rank === 3 ? '🥉 #3' : `#${entry.rank}`}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-sm flex items-center gap-3">
                    <img
                      src={entry.avatarUrl}
                      alt={entry.name}
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                    <span className="text-white font-semibold">{entry.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{entry.category}</td>
                  <td className="py-3.5 px-4 text-center text-cyan-400 font-bold">
                    {entry.consistency}%
                  </td>
                  <td className="py-3.5 px-4 text-center text-amber-400 font-bold">
                    {entry.streak} Days 🔥
                  </td>
                  <td className="py-3.5 px-4 text-right text-eleve-lime font-bold text-sm">
                    {entry.score.toLocaleString()} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
