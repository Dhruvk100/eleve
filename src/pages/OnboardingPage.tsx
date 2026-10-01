import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrainingDiscipline, ExperienceLevel } from '../types';
import { Logo } from '../components/common/Logo';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Onboarding form state
  const [name, setName] = useState(user?.fullName || 'Alex Mercer');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Strength + Endurance',
    'Hypertrophy',
  ]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<TrainingDiscipline[]>([
    'Strength',
    'HYROX',
  ]);
  const [availableDays, setAvailableDays] = useState(5);
  const [sessionDuration, setSessionDuration] = useState(60);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    'Full Gym',
    'Barbell',
    'Dumbbells',
  ]);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Intermediate');

  const goalsList = [
    'Strength + Endurance',
    'Hypertrophy / Muscular Density',
    'Cardiovascular Aerobic Capacity',
    'HYROX Pacing / Functional Speed',
    'Body Composition & Fat Loss',
    'Joint Longevity & Mobility',
  ];

  const disciplinesList: TrainingDiscipline[] = [
    'Strength',
    'Calisthenics',
    'HYROX',
    'Combat Sports',
    'Yoga',
    'Mobility',
    'Zumba',
    'Home Workouts',
  ];

  const equipmentList = [
    'Full Gym',
    'Barbell',
    'Dumbbells',
    'Cables & Machines',
    'Turf & Sled',
    'Pull-Up Bar',
    'Kettlebells',
    'Minimal / Bodyweight Only',
  ];

  const toggleItem = (list: string[], item: string, setter: (val: any) => void) => {
    if (list.includes(item)) {
      if (list.length > 1) setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      fullName: name,
      fitnessGoals: selectedGoals,
      preferredTraining: selectedDisciplines,
      availableDays,
      sessionDuration,
      equipment: selectedEquipment,
      experienceLevel,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header & Step progress */}
        <div className="flex items-center justify-between">
          <Logo size="sm" showTagline={false} />
          <div className="text-xs font-mono text-slate-400">
            STEP <span className="text-eleve-lime font-bold">{step}</span> OF {totalSteps}
          </div>
        </div>

        {/* Step indicator bar */}
        <div className="w-full bg-[#1A1F2C] h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-eleve-lime transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Card Body */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-[#23293A] shadow-2xl space-y-6">
          {/* Step 1: Athlete Name & Experience */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase text-eleve-lime font-bold">
                  ATHLETE PROFILE INITIALIZATION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
                  What is your athletic identity?
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  ELEVE calibrates volume, neurological load, and recovery thresholds to your background.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
                  Preferred Call Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#151924] border border-[#282F42] rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-eleve-lime"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Training Experience Tier
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['Beginner', 'Intermediate', 'Advanced', 'Elite'] as ExperienceLevel[]).map(
                    (lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setExperienceLevel(lvl)}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          experienceLevel === lvl
                            ? 'bg-eleve-lime/10 border-eleve-lime text-white shadow-sm'
                            : 'bg-[#151924] border-[#222838] text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold font-display text-sm text-white">{lvl}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          {lvl === 'Beginner' && '0-1 yr structured training'}
                          {lvl === 'Intermediate' && '1-3 yrs progressive overload'}
                          {lvl === 'Advanced' && '3-6 yrs periodized training'}
                          {lvl === 'Elite' && '6+ yrs competitive / pro level'}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Primary Goals */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase text-eleve-lime font-bold">
                  OBJECTIVE DEFINITION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
                  What are your target outcomes?
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Select all targets that define your current training macrocycle.
                </p>
              </div>

              <div className="space-y-2.5">
                {goalsList.map((g) => {
                  const selected = selectedGoals.includes(g);
                  return (
                    <div
                      key={g}
                      onClick={() => toggleItem(selectedGoals, g, setSelectedGoals)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selected
                          ? 'bg-eleve-lime/10 border-eleve-lime text-white'
                          : 'bg-[#151924] border-[#222838] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-sm font-sans">{g}</span>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          selected
                            ? 'bg-eleve-lime border-eleve-lime text-black'
                            : 'border-slate-600'
                        }`}
                      >
                        {selected && <CheckCircle2 className="w-4 h-4 fill-black" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Preferred Disciplines */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase text-eleve-lime font-bold">
                  DISCIPLINE SELECTION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
                  Select your core disciplines
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  ELEVE supports hybrid multidisciplinary programming.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {disciplinesList.map((d) => {
                  const selected = selectedDisciplines.includes(d);
                  return (
                    <div
                      key={d}
                      onClick={() =>
                        toggleItem(selectedDisciplines, d, setSelectedDisciplines)
                      }
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selected
                          ? 'bg-eleve-lime/10 border-eleve-lime text-white font-bold'
                          : 'bg-[#151924] border-[#222838] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-sans">{d}</span>
                      {selected && <CheckCircle2 className="w-4 h-4 text-eleve-lime" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Schedule & Duration */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase text-eleve-lime font-bold">
                  TIME BUDGETING & FREQUENCY
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
                  Availability & Session Length
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  How many days per week and how many minutes per session can you execute with 100% focus?
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Available Training Days: <strong className="text-eleve-lime">{availableDays} Days / Week</strong>
                </label>
                <div className="flex gap-2">
                  {[3, 4, 5, 6, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setAvailableDays(num)}
                      className={`flex-1 py-3 rounded-xl border font-mono text-sm font-bold transition-all ${
                        availableDays === num
                          ? 'bg-eleve-lime text-black border-eleve-lime shadow-glow-lime/20'
                          : 'bg-[#151924] text-slate-400 border-[#222838] hover:text-white'
                      }`}
                    >
                      {num}d
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Target Session Duration: <strong className="text-eleve-lime">{sessionDuration} Minutes</strong>
                </label>
                <div className="flex gap-2">
                  {[30, 45, 60, 75, 90].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSessionDuration(dur)}
                      className={`flex-1 py-3 rounded-xl border font-mono text-xs font-bold transition-all ${
                        sessionDuration === dur
                          ? 'bg-eleve-lime text-black border-eleve-lime shadow-glow-lime/20'
                          : 'bg-[#151924] text-slate-400 border-[#222838] hover:text-white'
                      }`}
                    >
                      {dur}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Equipment Access */}
          {step === 5 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase text-eleve-lime font-bold">
                  HARDWARE & EQUIPMENT ACCESS
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight mt-1">
                  What equipment do you have?
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  We filter exercises so your workouts only prescribe what is available in your gym.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {equipmentList.map((eq) => {
                  const selected = selectedEquipment.includes(eq);
                  return (
                    <div
                      key={eq}
                      onClick={() =>
                        toggleItem(selectedEquipment, eq, setSelectedEquipment)
                      }
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selected
                          ? 'bg-eleve-lime/10 border-eleve-lime text-white font-bold'
                          : 'bg-[#151924] border-[#222838] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-sans">{eq}</span>
                      {selected && <CheckCircle2 className="w-4 h-4 text-eleve-lime" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-[#1C202C] flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-lime flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-7 py-3 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-lime flex items-center gap-2"
              >
                <span>Enter ELEVE OS</span>
                <Sparkles className="w-4 h-4 fill-black" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
