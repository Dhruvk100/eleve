import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import { ProductItem } from '../types';
import {
  ShoppingBag,
  Star,
  ShieldAlert,
  CheckCircle,
  X,
  FileText,
  AlertTriangle,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products } = useEleve();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

  const categories = ['All', 'Protein', 'Creatine', 'Recovery'];

  const filtered =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              SUPPLEMENTATION & FUEL SCIENCE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Product Formulations & Biometrics
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Pharmaceutical-grade third-party tested athletic supplements. Full transparency, zero fillers, zero guaranteed medical claims.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 ${
                selectedCategory === c
                  ? 'bg-eleve-lime text-black shadow-sm'
                  : 'bg-[#12151E] text-slate-400 hover:text-white border border-[#202534]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Compliance Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-[#141722] border border-[#232838] flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200 uppercase font-mono tracking-wider">
            Regulatory Compliance Notice:
          </strong>{' '}
          Statements regarding dietary supplements have not been evaluated by the FDA or EFSA and are not intended to diagnose, treat, cure, or prevent any disease or health condition. Always consult your medical physician prior to beginning any intense ergogenic or dietary protocol.
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.id}
            className="glass-card-hover bg-[#12151E] border border-[#202534] rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer"
            onClick={() => setActiveProduct(prod)}
          >
            <div>
              <div className="h-56 overflow-hidden relative bg-[#0D0F15]">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-eleve-lime font-mono text-[10px] font-bold uppercase border border-eleve-lime/30">
                  {prod.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold">{prod.rating}</span>
                  <span className="text-slate-500">({prod.reviewsCount} reviews)</span>
                </div>

                <h3 className="text-lg font-bold text-white font-display group-hover:text-eleve-lime transition-colors">
                  {prod.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {prod.subtitle}
                </p>

                <div className="text-xl font-mono font-black text-white pt-2">
                  ${prod.price.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-[#1C202C] mt-2 flex items-center justify-between text-xs font-mono text-eleve-lime font-bold">
              <span>View Ingredients & Safety</span>
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#1E2330] pb-4">
              <div>
                <span className="text-xs font-mono text-eleve-lime font-bold uppercase">
                  {activeProduct.category} • Certified Batch
                </span>
                <h2 className="text-2xl font-black text-white font-display uppercase tracking-tight mt-1">
                  {activeProduct.name}
                </h2>
                <div className="text-sm font-mono text-slate-400 mt-0.5">
                  ${activeProduct.price.toFixed(2)} USD • {activeProduct.rating} ★ ({activeProduct.reviewsCount} reviews)
                </div>
              </div>
              <button
                onClick={() => setActiveProduct(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2330]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Ingredients */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-eleve-lime font-bold tracking-wider">
                Full Composition & Ingredients:
              </h4>
              <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                {activeProduct.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Considerations */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Athletic Usage Considerations:
              </h4>
              <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                {activeProduct.considerations.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Safety notes */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Safety & Cautionary Guidance:</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {activeProduct.safetyNotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
