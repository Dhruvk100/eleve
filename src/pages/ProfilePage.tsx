import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEleve } from '../context/EleveContext';
import { TrainingDiscipline, ExperienceLevel } from '../types';
import {
  User,
  Flame,
  Award,
  TrendingUp,
  Dumbbell,
  Shield,
  Edit3,
  CheckCircle2,
  Calendar,
  Clock,
  Activity,
  ArrowRight,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || 'Athlete');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    user?.experienceLevel || 'Intermediate'
  );
  const [availableDays, setAvailableDays] = useState(user?.availableDays || 5);
  const [sessionDuration, setSessionDuration] = useState(user?.sessionDuration || 60);

  const handleSave = () => {
    updateProfile({
      fullName,
      experienceLevel,
      availableDays: Number(availableDays),
      sessionDuration: Number(sessionDuration),
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Profile Hero Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#23293A] relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <img
            src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'Athlete')}&background=random`}
            alt={user?.fullName || 'Athlete'}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-eleve-lime/40 shadow-glow-lime/20"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                  {user?.fullName || 'Athlete'}
                </h1>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  @{user?.username || 'athlete'} • {user?.createdAt ? `Member since ${new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : 'Member'}
                </div>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-auto">
                <Link
                  to="/track"
                  className="px-4 py-2 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-glow-lime"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>My Progress</span>
                </Link>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 rounded-xl bg-[#171B26] hover:bg-[#202534] border border-[#2A3144] text-xs font-mono text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-eleve-lime" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>

            {/* Disciplines and Goals */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              {user?.preferredTraining.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30"
                >
                  {t}
                </span>
              ))}
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {user?.experienceLevel} Tier
              </span>
            </div>
          </div>
        </div>

        {/* Aggregate Performance Bar - Clickable to navigate progress */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-[#1C202C] text-xs font-mono text-center">
          <div
            onClick={() => navigate('/achievements')}
            className="bg-[#141824] hover:bg-[#1A1F30] p-3 rounded-xl border border-[#222838] hover:border-eleve-lime/40 cursor-pointer transition-all group"
          >
            <span className="text-slate-500 uppercase text-[10px] group-hover:text-eleve-lime">Unbroken Streak</span>
            <div className="text-xl font-bold text-eleve-lime mt-0.5">
              {user?.streak ?? 0} Days 🔥
            </div>
          </div>
          <div
            onClick={() => navigate('/track')}
            className="bg-[#141824] hover:bg-[#1A1F30] p-3 rounded-xl border border-[#222838] hover:border-cyan-400/40 cursor-pointer transition-all group"
          >
            <span className="text-slate-500 uppercase text-[10px] group-hover:text-cyan-400">Consistency Index</span>
            <div className="text-xl font-bold text-cyan-400 mt-0.5">
              {user?.consistencyScore ?? 0}%
            </div>
          </div>
          <div
            onClick={() => navigate('/track')}
            className="bg-[#141824] hover:bg-[#1A1F30] p-3 rounded-xl border border-[#222838] hover:border-indigo-400/40 cursor-pointer transition-all group"
          >
            <span className="text-slate-500 uppercase text-[10px] group-hover:text-indigo-400">Total Volume Logged</span>
            <div className="text-xl font-bold text-white mt-0.5">
              {(user?.totalVolumeKg ?? 0).toLocaleString()} kg
            </div>
          </div>
          <div
            onClick={() => navigate('/track')}
            className="bg-[#141824] hover:bg-[#1A1F30] p-3 rounded-xl border border-[#222838] hover:border-amber-400/40 cursor-pointer transition-all group"
          >
            <span className="text-slate-500 uppercase text-[10px] group-hover:text-amber-400">Personal Records</span>
            <div className="text-xl font-bold text-amber-400 mt-0.5">
              {user?.prsCount ?? 0} Active PRs
            </div>
          </div>
        </div>
      </div>

      {/* Profile Parameters Editor */}
      {isEditing && (
        <div className="glass-card rounded-2xl p-6 border border-eleve-lime/40 space-y-4 animate-in fade-in duration-200">
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
            Update Athlete Profile Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#161B26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 uppercase mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full bg-[#161B26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Elite">Elite</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 uppercase mb-1">Available Training Days / Wk</label>
              <input
                type="number"
                min="1"
                max="7"
                value={availableDays}
                onChange={(e) => setAvailableDays(Number(e.target.value))}
                className="w-full bg-[#161B26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 uppercase mb-1">Session Duration (Minutes)</label>
              <input
                type="number"
                min="20"
                max="180"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(Number(e.target.value))}
                className="w-full bg-[#161B26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-eleve-lime text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-lime"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}

      {/* Equipment & Goal Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fitness Goals */}
        <div className="glass-card rounded-2xl p-6 border border-[#222838] space-y-3">
          <h3 className="text-sm font-mono uppercase font-bold text-slate-400">
            Primary Performance Objectives
          </h3>
          <ul className="space-y-2 text-xs">
            {user?.fitnessGoals.map((goal, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-slate-200 bg-[#161A24] p-2.5 rounded-xl border border-[#232838]"
              >
                <CheckCircle2 className="w-4 h-4 text-eleve-lime shrink-0" />
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Equipment Access */}
        <div className="glass-card rounded-2xl p-6 border border-[#222838] space-y-3">
          <h3 className="text-sm font-mono uppercase font-bold text-slate-400">
            Configured Equipment Access
          </h3>
          <div className="flex flex-wrap gap-2">
            {user?.equipment.map((eq, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-[#161A24] text-slate-300 text-xs font-mono border border-[#232838]"
              >
                {eq}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
