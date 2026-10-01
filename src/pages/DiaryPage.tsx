import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import { DiaryEntry } from '../types';
import {
  BookMarked,
  Plus,
  Search,
  Lock,
  Calendar,
  Smile,
  Zap,
  Trash2,
  X,
  ShieldCheck,
} from 'lucide-react';

export const DiaryPage: React.FC = () => {
  const { diaryEntries, createDiaryEntry, deleteDiaryEntry } = useEleve();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // New Diary Entry Form
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState<DiaryEntry['mood']>('Strong');
  const [energyLevel, setEnergyLevel] = useState(8);
  const [recoveryPerception, setRecoveryPerception] = useState(8);
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [nutritionNotes, setNutritionNotes] = useState('');
  const [reflections, setReflections] = useState('');
  const [tagsInput, setTagsInput] = useState('Heavy Pull, Deep Sleep, High Focus');

  const filtered = diaryEntries.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      d.reflections.toLowerCase().includes(q) ||
      d.workoutNotes.toLowerCase().includes(q) ||
      d.nutritionNotes.toLowerCase().includes(q) ||
      d.date.includes(q)
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflections.trim() && !workoutNotes.trim()) return;

    createDiaryEntry({
      date,
      mood,
      energyLevel: Number(energyLevel),
      recoveryPerception: Number(recoveryPerception),
      workoutNotes: workoutNotes.trim(),
      nutritionNotes: nutritionNotes.trim(),
      reflections: reflections.trim(),
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
    });

    setWorkoutNotes('');
    setNutritionNotes('');
    setReflections('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>PRIVATE VAULT (ENCRYPTED)</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Personal Training Diary
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Strictly private athletic journal. Record subjective CNS energy, workout nuances, digestive sensations, and psychological readiness.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-glow-lime transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Private Entry</span>
        </button>
      </div>

      {/* Privacy guarantee banner */}
      <div className="p-3.5 rounded-xl bg-[#141722] border border-[#232838] flex items-center gap-3 text-xs text-slate-300">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <div>
          <strong className="text-white uppercase font-mono tracking-wider">Zero Community Leakage:</strong> Diary entries are governed by Supabase Row Level Security policy <code>User diary private</code>. They are strictly isolated and never exposed to public feeds.
        </div>
      </div>

      {/* Search & Date Filter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search journal entries by reflections, workout cues, or date (YYYY-MM-DD)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#12151E] border border-[#202534] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
        />
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filtered.map((entry) => (
          <div
            key={entry.id}
            className="glass-card rounded-2xl p-6 border border-[#222838] space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C202C] pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-eleve-lime">
                  {entry.date}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#181C26] text-white border border-[#2B3245]">
                  Mood: {entry.mood}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-slate-400">
                  Energy: <strong className="text-amber-400">{entry.energyLevel}/10</strong>
                </div>
                <div className="text-slate-400">
                  Recovery: <strong className="text-cyan-400">{entry.recoveryPerception}/10</strong>
                </div>
                <button
                  onClick={() => deleteDiaryEntry(entry.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-3 text-xs leading-relaxed">
              {entry.workoutNotes && (
                <div>
                  <div className="font-mono uppercase font-bold text-slate-400 text-[10px] mb-0.5">
                    Workout & Biomechanics Notes:
                  </div>
                  <p className="text-slate-200">{entry.workoutNotes}</p>
                </div>
              )}

              {entry.nutritionNotes && (
                <div>
                  <div className="font-mono uppercase font-bold text-slate-400 text-[10px] mb-0.5">
                    Nutrition & Digestion:
                  </div>
                  <p className="text-slate-200">{entry.nutritionNotes}</p>
                </div>
              )}

              {entry.reflections && (
                <div>
                  <div className="font-mono uppercase font-bold text-slate-400 text-[10px] mb-0.5">
                    Reflections & Mental State:
                  </div>
                  <p className="text-slate-300 italic">{entry.reflections}</p>
                </div>
              )}

              {entry.tags && entry.tags.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-[#171B26] text-slate-400 text-[10px] font-mono border border-[#282F42]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Entry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1E2330] pb-4">
              <h3 className="text-lg font-bold text-white font-display">New Private Diary Entry</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Subjective Mood</label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value as any)}
                    className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Peak">Peak</option>
                    <option value="Strong">Strong</option>
                    <option value="Focused">Focused</option>
                    <option value="Fatigued">Fatigued</option>
                    <option value="Stressed">Stressed</option>
                    <option value="Recovering">Recovering</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">
                    Energy Level ({energyLevel}/10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(Number(e.target.value))}
                    className="w-full accent-eleve-lime mt-2"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 uppercase mb-1">
                    Recovery Perception ({recoveryPerception}/10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={recoveryPerception}
                    onChange={(e) => setRecoveryPerception(Number(e.target.value))}
                    className="w-full accent-eleve-cyan mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Workout & Lift Notes</label>
                <textarea
                  rows={2}
                  placeholder="How did the bar path feel? Any joint tightness or PR highlights..."
                  value={workoutNotes}
                  onChange={(e) => setWorkoutNotes(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-3 text-white text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Nutrition & Hydration</label>
                <textarea
                  rows={2}
                  placeholder="Digestion, fullness, electrolyte balance..."
                  value={nutritionNotes}
                  onChange={(e) => setNutritionNotes(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-3 text-white text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Reflections & Recovery</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Psychological state, stress, sleep impressions..."
                  value={reflections}
                  onChange={(e) => setReflections(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-3 text-white text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-eleve-lime text-black font-extrabold uppercase tracking-wider shadow-glow-lime"
                >
                  Save Encrypted Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
