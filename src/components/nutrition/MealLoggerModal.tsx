import React, { useState } from 'react';
import { MealType } from '../../types';
import { useEleve } from '../../context/EleveContext';
import { X, Apple, Plus } from 'lucide-react';

interface MealLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MealLoggerModal: React.FC<MealLoggerModalProps> = ({ isOpen, onClose }) => {
  const { logMeal } = useEleve();

  const [title, setTitle] = useState('');
  const [mealType, setMealType] = useState<MealType>('Lunch');
  const [calories, setCalories] = useState(450);
  const [proteinG, setProteinG] = useState(35);
  const [carbsG, setCarbsG] = useState(45);
  const [fatG, setFatG] = useState(12);
  const [itemsText, setItemsText] = useState('Chicken breast, basmati rice, steamed greens');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    logMeal({
      mealType,
      title: title.trim(),
      calories: Number(calories),
      proteinG: Number(proteinG),
      carbsG: Number(carbsG),
      fatG: Number(fatG),
      items: itemsText.split(',').map((s) => s.trim()).filter(Boolean),
    });

    onClose();
  };

  const mealTypes: MealType[] = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Pre-Workout',
    'Post-Workout',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-[#1E2330] flex items-center justify-between bg-[#151924]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-eleve-lime/10 text-eleve-lime">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base font-display">Log Nutrition Entry</h3>
              <p className="text-xs text-slate-400 font-mono">Real-time macronutrient calibration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1E2330] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
              Meal Type
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {mealTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMealType(type)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    mealType === type
                      ? 'bg-eleve-lime text-black font-bold border-eleve-lime'
                      : 'bg-[#181C26] text-slate-300 border-[#282F42] hover:bg-[#202534]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-semibold">
              Title / Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Protein Bowl, Salmon & Quinoa..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
                Calories (kcal)
              </label>
              <input
                type="number"
                min="0"
                required
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
                className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-sm text-white font-mono text-center focus:outline-none focus:border-eleve-lime"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-emerald-400 mb-1 font-semibold">
                Protein (g)
              </label>
              <input
                type="number"
                min="0"
                required
                value={proteinG}
                onChange={(e) => setProteinG(Number(e.target.value))}
                className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-sm text-white font-mono text-center focus:outline-none focus:border-eleve-lime"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-cyan-400 mb-1 font-semibold">
                Carbs (g)
              </label>
              <input
                type="number"
                min="0"
                required
                value={carbsG}
                onChange={(e) => setCarbsG(Number(e.target.value))}
                className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-sm text-white font-mono text-center focus:outline-none focus:border-eleve-lime"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-amber-400 mb-1 font-semibold">
                Fats (g)
              </label>
              <input
                type="number"
                min="0"
                required
                value={fatG}
                onChange={(e) => setFatG(Number(e.target.value))}
                className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-sm text-white font-mono text-center focus:outline-none focus:border-eleve-lime"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
              Ingredients / Items (comma separated)
            </label>
            <textarea
              rows={2}
              value={itemsText}
              onChange={(e) => setItemsText(e.target.value)}
              className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-glow-lime flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Log Meal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
