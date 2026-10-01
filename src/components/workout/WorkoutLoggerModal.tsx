import React, { useState } from 'react';
import { WorkoutSession, WorkoutSet } from '../../types';
import { useEleve } from '../../context/EleveContext';
import { X, Plus, Trash2, Trophy, CheckCircle, Zap } from 'lucide-react';

interface WorkoutLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSession?: WorkoutSession | null;
}

export const WorkoutLoggerModal: React.FC<WorkoutLoggerModalProps> = ({
  isOpen,
  onClose,
  initialSession,
}) => {
  const { completeWorkout, exercises } = useEleve();

  const [session, setSession] = useState<WorkoutSession>(() => {
    if (initialSession) return { ...initialSession };
    return {
      id: 'session_' + Date.now(),
      name: 'Custom Strength Session',
      discipline: 'Strength',
      scheduledDate: new Date().toISOString().split('T')[0],
      durationMin: 45,
      caloriesBurned: 380,
      totalVolumeKg: 0,
      perceivedExertion: 8,
      notes: '',
      exercises: [
        {
          exerciseId: 'ex_squat',
          exerciseName: 'Barbell Back Squat',
          targetSets: 3,
          targetReps: '8-10',
          sets: [
            { id: 's1', setNumber: 1, reps: 10, weightKg: 100, completed: true },
            { id: 's2', setNumber: 2, reps: 8, weightKg: 110, completed: true },
            { id: 's3', setNumber: 3, reps: 8, weightKg: 120, completed: true, isPr: true },
          ],
        },
      ],
    };
  });

  if (!isOpen) return null;

  // Calculate live volume
  const calculateVolume = (): number => {
    return session.exercises.reduce((acc, ex) => {
      return (
        acc +
        ex.sets.reduce((setAcc, s) => {
          return setAcc + (s.completed ? s.reps * s.weightKg : 0);
        }, 0)
      );
    }, 0);
  };

  const handleSetChange = (
    exIdx: number,
    setIdx: number,
    field: keyof WorkoutSet,
    val: any
  ) => {
    const updated = { ...session };
    updated.exercises[exIdx].sets[setIdx] = {
      ...updated.exercises[exIdx].sets[setIdx],
      [field]: val,
    };
    updated.totalVolumeKg = calculateVolume();
    setSession(updated);
  };

  const handleAddSet = (exIdx: number) => {
    const updated = { ...session };
    const prevSet =
      updated.exercises[exIdx].sets[updated.exercises[exIdx].sets.length - 1];
    const newSetNumber = updated.exercises[exIdx].sets.length + 1;
    updated.exercises[exIdx].sets.push({
      id: 'set_' + Date.now() + Math.random().toString(36).substring(2, 4),
      setNumber: newSetNumber,
      reps: prevSet ? prevSet.reps : 10,
      weightKg: prevSet ? prevSet.weightKg : 60,
      completed: true,
      isPr: false,
    });
    updated.totalVolumeKg = calculateVolume();
    setSession(updated);
  };

  const handleRemoveSet = (exIdx: number, setIdx: number) => {
    const updated = { ...session };
    updated.exercises[exIdx].sets.splice(setIdx, 1);
    updated.totalVolumeKg = calculateVolume();
    setSession(updated);
  };

  const handleAddExercise = (exerciseId: string) => {
    const exObj = exercises.find((e) => e.id === exerciseId);
    if (!exObj) return;
    const updated = { ...session };
    updated.exercises.push({
      exerciseId: exObj.id,
      exerciseName: exObj.name,
      targetSets: 3,
      targetReps: '8-12',
      sets: [
        {
          id: 'set_' + Date.now(),
          setNumber: 1,
          reps: 10,
          weightKg: 50,
          completed: true,
          isPr: false,
        },
      ],
    });
    updated.totalVolumeKg = calculateVolume();
    setSession(updated);
  };

  const handleFinish = () => {
    const finalVolume = calculateVolume();
    const finalSession = {
      ...session,
      totalVolumeKg: finalVolume,
      completedAt: new Date().toISOString(),
    };
    completeWorkout(finalSession);
    onClose();
  };

  const totalVolume = calculateVolume();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#1E2330] flex items-center justify-between bg-[#151924]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-eleve-lime/10 text-eleve-lime">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <input
                type="text"
                value={session.name}
                onChange={(e) => setSession({ ...session, name: e.target.value })}
                className="bg-transparent text-white font-bold font-display text-lg focus:outline-none focus:border-b border-eleve-lime w-full"
              />
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                <span>Discipline: {session.discipline}</span>
                <span>•</span>
                <span className="text-eleve-lime font-bold">
                  {totalVolume.toLocaleString()} kg Total Volume
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2330] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable exercise sets body */}
        <div className="p-5 space-y-6 overflow-y-auto flex-1">
          {session.exercises.map((ex, exIdx) => (
            <div
              key={ex.exerciseId + exIdx}
              className="bg-[#171B26] border border-[#232838] rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm tracking-wide">
                  {ex.exerciseName}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Target: {ex.targetReps} reps
                </span>
              </div>

              {/* Set headers */}
              <div className="grid grid-cols-12 gap-2 text-[10px] font-mono uppercase text-slate-400 font-semibold px-1">
                <div className="col-span-2">Set</div>
                <div className="col-span-3">Weight (kg)</div>
                <div className="col-span-3">Reps</div>
                <div className="col-span-2 text-center">PR?</div>
                <div className="col-span-2 text-right">Done</div>
              </div>

              {/* Sets rows */}
              <div className="space-y-2">
                {ex.sets.map((s, setIdx) => (
                  <div
                    key={s.id}
                    className={`grid grid-cols-12 gap-2 items-center p-2 rounded-lg transition-colors ${
                      s.completed ? 'bg-[#1C212E]' : 'bg-[#141720] opacity-60'
                    }`}
                  >
                    <div className="col-span-2 font-mono text-xs font-bold text-slate-300">
                      #{s.setNumber}
                    </div>

                    <div className="col-span-3">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={s.weightKg}
                        onChange={(e) =>
                          handleSetChange(
                            exIdx,
                            setIdx,
                            'weightKg',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full bg-[#12151D] border border-[#282F42] rounded-md px-2 py-1 text-xs font-mono text-white text-center focus:outline-none focus:border-eleve-lime"
                      />
                    </div>

                    <div className="col-span-3">
                      <input
                        type="number"
                        min="1"
                        value={s.reps}
                        onChange={(e) =>
                          handleSetChange(
                            exIdx,
                            setIdx,
                            'reps',
                            parseInt(e.target.value, 10) || 0
                          )
                        }
                        className="w-full bg-[#12151D] border border-[#282F42] rounded-md px-2 py-1 text-xs font-mono text-white text-center focus:outline-none focus:border-eleve-lime"
                      />
                    </div>

                    <div className="col-span-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleSetChange(exIdx, setIdx, 'isPr', !s.isPr)
                        }
                        className={`p-1 rounded-md transition-colors ${
                          s.isPr
                            ? 'bg-amber-400/20 text-amber-400'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                        title="Mark as Personal Record"
                      >
                        <Trophy className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleSetChange(exIdx, setIdx, 'completed', !s.completed)
                        }
                        className={`p-1 rounded-md transition-colors ${
                          s.completed
                            ? 'text-eleve-lime'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>

                      {ex.sets.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSet(exIdx, setIdx)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleAddSet(exIdx)}
                className="w-full py-1.5 rounded-lg border border-dashed border-[#2F374D] hover:border-eleve-lime/50 text-[11px] font-mono text-slate-400 hover:text-eleve-lime flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Set</span>
              </button>
            </div>
          ))}

          {/* Add Exercise Selector */}
          <div className="pt-2">
            <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
              Add Exercise to Session:
            </label>
            <div className="flex flex-wrap gap-2">
              {exercises.slice(0, 6).map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => handleAddExercise(ex.id)}
                  className="px-3 py-1.5 rounded-lg bg-[#181C26] hover:bg-[#202534] border border-[#282E40] text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-eleve-lime" />
                  <span>{ex.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RPE & Duration */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#1E2330]">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                value={session.durationMin}
                onChange={(e) =>
                  setSession({
                    ...session,
                    durationMin: parseInt(e.target.value, 10) || 0,
                  })
                }
                className="w-full bg-[#171B26] border border-[#282F42] rounded-lg px-3 py-2 text-sm text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                RPE Exertion (1 to 10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={session.perceivedExertion || 8}
                onChange={(e) =>
                  setSession({
                    ...session,
                    perceivedExertion: parseInt(e.target.value, 10),
                  })
                }
                className="w-full accent-eleve-lime mt-2"
              />
              <div className="text-right text-xs font-mono text-eleve-lime font-bold">
                RPE {session.perceivedExertion || 8} / 10
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E2330] bg-[#151924] flex items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            Recorded Volume:{' '}
            <span className="text-white font-bold">{totalVolume} kg</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider shadow-glow-lime transition-all"
            >
              Finish & Log Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
