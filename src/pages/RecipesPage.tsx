import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import { Recipe } from '../types';
import {
  Plus,
  Clock,
  Bookmark,
  X,
  Search,
  } from 'lucide-react';

export const RecipesPage: React.FC = () => {
  const { recipes, saveRecipe, createRecipe, logMeal } = useEleve();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New Recipe Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, _setNewCategory] = useState('High Protein');
  const [newPrepTime, _setNewPrepTime] = useState(15);
  const [newCalories, setNewCalories] = useState(400);
  const [newProtein, setNewProtein] = useState(40);
  const [newCarbs, setNewCarbs] = useState(35);
  const [newFat, setNewFat] = useState(10);
  const [newIngredients, setNewIngredients] = useState('Chicken breast (180g), Brown rice (150g), Broccoli (100g)');
  const [newInstructions, setNewInstructions] = useState('Season and cook chicken over medium heat.\nSteam rice and vegetables.\nCombine and serve.');

  const tags = ['All', 'High Protein', 'Post-Workout', 'Breakfast', 'Recovery', 'Quick'];

  const filtered = recipes.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === 'All' ||
      r.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));
    return matchesSearch && matchesTag;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    createRecipe({
      title: newTitle.trim(),
      category: newCategory,
      prepTimeMin: Number(newPrepTime),
      calories: Number(newCalories),
      proteinG: Number(newProtein),
      carbsG: Number(newCarbs),
      fatG: Number(newFat),
      ingredients: newIngredients
        .split(',')
        .map((i) => ({ name: i.trim(), amount: '1 serving' })),
      instructions: newInstructions
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      tags: ['High Protein', 'Custom'],
      imageUrl:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    });

    setCreateModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              HIGH-PERFORMANCE CULINARY ARCHITECTURE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Recipe Vault & Fuel Prep
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Chef-crafted athletic recipes calibrated for anabolic signaling, micronutrient density, and rapid digestive transit.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-glow-lime transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Recipe</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search recipes (e.g. Protein Bowl)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#12151E] border border-[#202534] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider shrink-0 transition-all ${
                selectedTag === t
                  ? 'bg-eleve-lime text-black'
                  : 'bg-[#12151E] text-slate-400 hover:text-white border border-[#202534]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="glass-card-hover bg-[#12151E] border border-[#202534] rounded-2xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              <div className="h-48 overflow-hidden relative cursor-pointer" onClick={() => setActiveRecipe(recipe)}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveRecipe(recipe.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
                    recipe.isSaved
                      ? 'bg-eleve-lime text-black shadow-glow-lime'
                      : 'bg-black/60 text-white hover:text-eleve-lime'
                  }`}
                  aria-label="Bookmark recipe"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>

                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-eleve-lime border border-eleve-lime/30">
                  {recipe.proteinG}g Protein • {recipe.calories} kcal
                </div>
              </div>

              <div className="p-5 space-y-3 cursor-pointer" onClick={() => setActiveRecipe(recipe)}>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{recipe.prepTimeMin} min prep</span>
                  <span>•</span>
                  <span>{recipe.category}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display group-hover:text-eleve-lime transition-colors">
                  {recipe.title}
                </h3>

                {/* Macro pill summary */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                  <div className="bg-[#151924] p-1.5 rounded-lg border border-[#232838]">
                    <span className="text-[10px] text-slate-500">PROTEIN</span>
                    <div className="text-emerald-400 font-bold">{recipe.proteinG}g</div>
                  </div>
                  <div className="bg-[#151924] p-1.5 rounded-lg border border-[#232838]">
                    <span className="text-[10px] text-slate-500">CARBS</span>
                    <div className="text-cyan-400 font-bold">{recipe.carbsG}g</div>
                  </div>
                  <div className="bg-[#151924] p-1.5 rounded-lg border border-[#232838]">
                    <span className="text-[10px] text-slate-500">FATS</span>
                    <div className="text-amber-400 font-bold">{recipe.fatG}g</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-[#1C202C] mt-2">
              <button
                onClick={() => setActiveRecipe(recipe)}
                className="text-xs font-mono text-slate-300 hover:text-white"
              >
                View Ingredients
              </button>
              <button
                onClick={() =>
                  logMeal({
                    mealType: 'Lunch',
                    title: recipe.title,
                    calories: recipe.calories,
                    proteinG: recipe.proteinG,
                    carbsG: recipe.carbsG,
                    fatG: recipe.fatG,
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-eleve-lime/20 hover:bg-eleve-lime text-eleve-lime hover:text-black font-mono text-xs font-bold transition-all"
              >
                + Log as Meal
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {activeRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#1E2330] pb-4">
              <div>
                <span className="text-xs font-mono text-eleve-lime font-bold uppercase">
                  {activeRecipe.category}
                </span>
                <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight mt-1">
                  {activeRecipe.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveRecipe(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2330]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono bg-[#161B26] p-3 rounded-xl border border-[#232838]">
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Calories</span>
                <div className="font-bold text-white text-sm">{activeRecipe.calories} kcal</div>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Protein</span>
                <div className="font-bold text-emerald-400 text-sm">{activeRecipe.proteinG}g</div>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Carbs</span>
                <div className="font-bold text-cyan-400 text-sm">{activeRecipe.carbsG}g</div>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px]">Fat</span>
                <div className="font-bold text-amber-400 text-sm">{activeRecipe.fatG}g</div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                Ingredients:
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {activeRecipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between py-1 border-b border-[#1C202C]">
                    <span>{ing.name}</span>
                    <span className="font-mono text-eleve-lime">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                Preparation Instructions:
              </h4>
              <ol className="space-y-2 text-xs text-slate-300 leading-relaxed list-decimal list-inside">
                {activeRecipe.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Create Recipe Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-lg rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E2330] pb-4">
              <h3 className="text-lg font-bold text-white font-display">Create Custom Recipe</h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 uppercase mb-1">Recipe Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anabolic Power Bowl..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-sm text-white font-sans focus:outline-none focus:border-eleve-lime"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-slate-400 uppercase mb-1">Kcal</label>
                  <input
                    type="number"
                    value={newCalories}
                    onChange={(e) => setNewCalories(Number(e.target.value))}
                    className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-2 text-center text-white"
                  />
                </div>
                <div>
                  <label className="block text-emerald-400 uppercase mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={newProtein}
                    onChange={(e) => setNewProtein(Number(e.target.value))}
                    className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-2 text-center text-white"
                  />
                </div>
                <div>
                  <label className="block text-cyan-400 uppercase mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={newCarbs}
                    onChange={(e) => setNewCarbs(Number(e.target.value))}
                    className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-2 text-center text-white"
                  />
                </div>
                <div>
                  <label className="block text-amber-400 uppercase mb-1">Fat (g)</label>
                  <input
                    type="number"
                    value={newFat}
                    onChange={(e) => setNewFat(Number(e.target.value))}
                    className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-2 text-center text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Ingredients (comma-separated)</label>
                <textarea
                  rows={2}
                  value={newIngredients}
                  onChange={(e) => setNewIngredients(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Preparation Instructions</label>
                <textarea
                  rows={3}
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-2 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-eleve-lime text-black font-extrabold uppercase tracking-wider"
                >
                  Save Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
