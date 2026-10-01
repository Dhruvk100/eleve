import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEleve } from '../context/EleveContext';
import { Exercise, TrainingDiscipline } from '../types';
import { disciplinesData } from '../data/disciplines';
import {
  Search,
  Dumbbell,
  Play,
  AlertTriangle,
  Shield,
  X,
  Sparkles,
} from 'lucide-react';

export const ExerciseLibraryPage: React.FC = () => {
  const { exercises } = useEleve();
  const [searchParams, setSearchParams] = useSearchParams();

  // Selected Discipline from URL or default 'All'
  const currentDisciplineParam = searchParams.get('discipline') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(currentDisciplineParam);
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [activeModalExercise, setActiveModalExercise] = useState<Exercise | null>(null);

  // Synchronize when query param changes
  const handleDisciplineChange = (disc: string) => {
    setSelectedDiscipline(disc);
    if (disc === 'All') {
      searchParams.delete('discipline');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ discipline: disc });
    }
  };

  // Filter options
  const disciplinesList: string[] = [
    'All',
    'Strength',
    'Calisthenics',
    'HYROX',
    'Combat Sports',
    'Yoga',
    'Mobility',
    'Zumba',
    'Home Workouts',
  ];

  const muscles = ['All', 'Chest', 'Lats', 'Upper Back', 'Quadriceps', 'Hamstrings', 'Glutes', 'Shoulders', 'Triceps', 'Biceps', 'Core'];
  const equipments = ['All', 'Barbell', 'Dumbbells', 'Pull-Up Bar', 'Bodyweight', 'Sled / Turf', 'Kettlebell', 'Yoga Mat', 'Resistance Band'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Elite'];

  // Filtered exercises
  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch =
        ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.movementPattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.instructions.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDiscipline =
        selectedDiscipline === 'All' || ex.discipline === selectedDiscipline;

      const matchesMuscle =
        selectedMuscle === 'All' ||
        ex.muscleGroups.some((m) => m.toLowerCase().includes(selectedMuscle.toLowerCase())) ||
        (ex.secondaryMuscles && ex.secondaryMuscles.some((m) => m.toLowerCase().includes(selectedMuscle.toLowerCase())));

      const matchesEquipment =
        selectedEquipment === 'All' ||
        ex.equipment.toLowerCase().includes(selectedEquipment.toLowerCase());

      const matchesDiff =
        selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;

      return matchesSearch && matchesDiscipline && matchesMuscle && matchesEquipment && matchesDiff;
    });
  }, [exercises, searchQuery, selectedDiscipline, selectedMuscle, selectedEquipment, selectedDifficulty]);

  // Selected discipline metadata
  const currentDisciplineInfo = disciplinesData.find((d) => d.id === selectedDiscipline);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              DISCIPLINE-INDEXED REPOSITORY
            </span>
            <span className="text-xs font-mono text-slate-400">
              {filteredExercises.length} Movements Cataloged
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Exercise Library
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Browse targeted exercises mapped to their exact training discipline — including strict push-up progressions, pull-up variations, barbell compounds, and functional conditioning.
          </p>
        </div>
      </div>

      {/* Discipline Selector Ribbon */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Dumbbell className="w-3.5 h-3.5 text-eleve-lime" />
            <span>Select Training Discipline</span>
          </span>
          {selectedDiscipline !== 'All' && (
            <button
              onClick={() => handleDisciplineChange('All')}
              className="text-xs font-mono text-eleve-lime hover:underline"
            >
              Show All Disciplines
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {disciplinesList.map((disc) => {
            const count =
              disc === 'All'
                ? exercises.length
                : exercises.filter((e) => e.discipline === disc).length;

            const isSelected = selectedDiscipline === disc;

            return (
              <button
                key={disc}
                onClick={() => handleDisciplineChange(disc)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-eleve-lime text-black font-extrabold shadow-glow-lime'
                    : 'bg-[#12151E] text-slate-300 hover:text-white hover:bg-[#181D2A] border border-[#202534]'
                }`}
              >
                <span>{disc}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-[#1C2230] text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discipline Active Banner */}
      {currentDisciplineInfo && (
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-[#242C3E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#141A28] to-[#0E121B]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-eleve-lime/20 text-eleve-lime">
                {currentDisciplineInfo.intensity} Intensity
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentDisciplineInfo.activeAthletes.toLocaleString()} Athletes Training
              </span>
            </div>
            <h3 className="text-lg font-black text-white font-display uppercase tracking-wide">
              {currentDisciplineInfo.title}
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {currentDisciplineInfo.description}
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400 shrink-0">
            Filtering <span className="text-eleve-lime font-bold">{filteredExercises.length}</span> exercises
          </div>
        </div>
      )}

      {/* Search & Fine-grained Filters */}
      <div className="glass-card rounded-2xl p-5 border border-[#222838] space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search exercises by name (e.g., Diamond Push-Up, Pull-Up, Squat, Sled Push)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151924] border border-[#282F42] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          {/* Muscle */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 uppercase font-bold text-[10px]">Muscle:</span>
            {muscles.slice(0, 7).map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedMuscle === m
                    ? 'bg-eleve-lime text-black font-bold'
                    : 'bg-[#181C26] text-slate-400 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Equipment */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 uppercase font-bold text-[10px]">Equipment:</span>
            {equipments.slice(0, 6).map((eq) => (
              <button
                key={eq}
                onClick={() => setSelectedEquipment(eq)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedEquipment === eq
                    ? 'bg-eleve-cyan text-black font-bold'
                    : 'bg-[#181C26] text-slate-400 hover:text-white'
                }`}
              >
                {eq}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-500 uppercase font-bold text-[10px]">Level:</span>
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-indigo-500 text-white font-bold'
                    : 'bg-[#181C26] text-slate-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Exercises */}
      {filteredExercises.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#12151E] border border-[#202534] space-y-3">
          <Dumbbell className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white font-display">
            No movements match your current filters
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try resetting your muscle, equipment, or discipline selection to browse the complete library.
          </p>
          <button
            onClick={() => {
              setSelectedDiscipline('All');
              setSelectedMuscle('All');
              setSelectedEquipment('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
              searchParams.delete('discipline');
              setSearchParams(searchParams);
            }}
            className="px-4 py-2 rounded-xl bg-eleve-lime text-black font-bold text-xs uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              onClick={() => setActiveModalExercise(ex)}
              className="glass-card-hover bg-[#12151E] border border-[#202534] rounded-2xl p-5 flex flex-col justify-between cursor-pointer group hover:border-eleve-lime/40 transition-all"
            >
              <div className="space-y-3">
                {/* Discipline Tag & Level */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
                    {ex.discipline}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    {ex.difficulty}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-eleve-lime transition-colors">
                    {ex.name}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-2">
                    <span>Pattern: {ex.movementPattern}</span>
                  </div>
                </div>

                {/* Primary & Secondary Muscles */}
                <div className="pt-1 flex flex-wrap gap-1">
                  {ex.muscleGroups.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181D2A] text-slate-200 border border-[#23293A]"
                    >
                      {m}
                    </span>
                  ))}
                  {ex.secondaryMuscles &&
                    ex.secondaryMuscles.slice(0, 2).map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#121620] text-slate-500"
                      >
                        +{m}
                      </span>
                    ))}
                </div>

                {/* Equipment Requirement */}
                <div className="text-xs font-mono text-slate-400 pt-1 flex items-center gap-1.5">
                  <span className="text-slate-500">Equipment:</span>
                  <span className="text-slate-200 font-medium">{ex.equipment}</span>
                </div>
              </div>

              {/* Action bar */}
              <div className="pt-4 border-t border-[#1C202C] mt-4 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white">
                <span>View Full Execution Cues</span>
                <Play className="w-3.5 h-3.5 text-eleve-lime group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exercise Detail Modal */}
      {activeModalExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#1E2330] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-eleve-lime/20 text-eleve-lime border border-eleve-lime/30">
                    {activeModalExercise.discipline}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#181C26] text-slate-300">
                    {activeModalExercise.movementPattern}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeModalExercise.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight">
                  {activeModalExercise.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalExercise(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2330] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video preview / Demonstration section */}
            {activeModalExercise.videoUrl ? (
              <div className="rounded-2xl overflow-hidden bg-black border border-[#232838] aspect-video relative">
                <video
                  src={activeModalExercise.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white font-mono text-[11px] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-eleve-lime animate-pulse" />
                  <span>Biomechanical Demonstration</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl p-6 bg-[#141824] border border-[#232838] text-center space-y-2">
                <Dumbbell className="w-8 h-8 text-eleve-lime mx-auto" />
                <div className="text-xs font-mono uppercase text-slate-300 font-bold">
                  Standard {activeModalExercise.equipment} Protocol
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Target: {activeModalExercise.muscleGroups.join(', ')}
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-eleve-lime font-bold tracking-wider">
                Step-by-Step Execution Protocol:
              </h4>
              <ol className="space-y-2 text-xs text-slate-300 leading-relaxed list-decimal list-inside">
                {activeModalExercise.instructions.map((inst, idx) => (
                  <li key={idx} className="pl-1">
                    {inst}
                  </li>
                ))}
              </ol>
            </div>

            {/* Common Mistakes */}
            {activeModalExercise.commonMistakes && activeModalExercise.commonMistakes.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Common Mechanical Breakdown / Faults:</span>
                </div>
                <ul className="text-xs text-amber-200/90 space-y-1 list-disc list-inside">
                  {activeModalExercise.commonMistakes.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Safety notes */}
            {activeModalExercise.safetyNotes && (
              <div className="p-4 rounded-xl bg-[#161B26] border border-[#282F42] space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-400 font-bold">
                  <Shield className="w-4 h-4 text-eleve-cyan shrink-0" />
                  <span>Joint Longevity & Safety Protocol:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeModalExercise.safetyNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
