import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, Bookmark, Share2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: 'Periodization' | 'Biomechanics' | 'Nutrition' | 'Recovery';
  readTimeMin: number;
  summary: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
}

export const LearningCenterPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'art_1',
      title: 'The Mathematics of Progressive Overload: Mechanical Tension vs Volume',
      category: 'Periodization',
      readTimeMin: 6,
      summary: 'Why tracking mechanical tonnage (Sets x Reps x Load) within a 2-3 RIR buffer produces superior hypertrophic stimulus over mindless fatigue chasing.',
      author: 'Dr. Harrison Vance, Ph.D.',
      date: 'Sep 24, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      content: `Mechanical tension is the undisputed primary driver of skeletal muscle hypertrophy. When actin and myosin cross-bridges generate force against external resistance, mechanosensors on muscle cell membranes (costameres) transduce mechanical force into chemical signaling cascades—specifically the phosphorylation of p70S6K and the mammalian target of rapamycin (mTORC1).

To maximize this stimulus across your training week:
1. Standardize your range of motion and cadence. A 100kg squat with 3-second descent produces significantly greater peak torque than a bouncing 110kg half-squat.
2. Maintain proximity to failure (RPE 7.5 to 9.5). Training with 1-2 reps in reserve engages high-threshold motor units without incurring irreversible central nervous fatigue.
3. Track volume load mathematically. If your session volume progresses from 12,000 kg to 14,000 kg over an 8-week block while keeping technique rigid, adaptation is guaranteed.`
    },
    {
      id: 'art_2',
      title: 'Slow-Wave Sleep & Central Nervous Recovery in Hybrid Athletes',
      category: 'Recovery',
      readTimeMin: 5,
      summary: 'How non-REM Stage 3/4 sleep dictates somatic tissue repair, human growth hormone (HGH) secretion, and cardiac autonomic regulation.',
      author: 'Aria Solis, FRC',
      date: 'Sep 20, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80',
      content: `During non-REM deep sleep, blood supply to muscles increases substantially, allowing cellular repair and immune modulation. Over 95% of the daily pulse of human growth hormone is secreted during the first two slow-wave sleep cycles.

For athletes averaging under 6 hours of sleep, heart rate variability (HRV) typically drops by 15-25ms, signaling sympathetic over-dominance.

Protocol recommendations:
• Magnesium Bisglycinate chelate 30-45 minutes before bedtime.
• Eliminate blue wavelength light emissions past 9:00 PM.
• Maintain ambient room temperatures between 18°C - 19.5°C (64°F - 67°F) to trigger core temperature decline.`
    },
    {
      id: 'art_3',
      title: 'Sled Propulsion & Lactate Clearing: The HYROX Engine',
      category: 'Biomechanics',
      readTimeMin: 7,
      summary: 'Mastering the kinetic angle of attack, cadence efficiency, and aerobic threshold buffering during heavy sled pushes and pulls.',
      author: 'Marcus Thorne, HYROX Master Lead',
      date: 'Sep 16, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
      content: `The sled push is unique because it incurs minimal eccentric tissue damage, allowing high-frequency stimulus. However, friction coefficient plays an exponential role.

When the sled is stationary, static friction (μs) is nearly double kinetic friction (μk). Halting every 5 meters wastes massive amounts of ATP-CP. Lock in a forward 45° torso angle, pin the arms against the posts or drive with straight levers, and maintain unrelenting cadence.`
    }
  ];

  const categories = ['All', 'Periodization', 'Biomechanics', 'Recovery', 'Nutrition'];

  const filtered =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              ELEVE KNOWLEDGE VAULT
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Learning Center
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Evidence-based athletic masterclasses, biomechanical deep-dives, and nutritional protocols.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              selectedCategory === c
                ? 'bg-eleve-lime text-black'
                : 'bg-[#12151E] text-slate-400 hover:text-white border border-[#202534]'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            className="glass-card-hover bg-[#12151E] border border-[#202534] rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 overflow-hidden relative">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-eleve-lime font-mono text-[10px] font-bold uppercase border border-eleve-lime/30">
                  {art.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.readTimeMin} min read</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>

                <h3 className="text-base font-bold text-white font-display group-hover:text-eleve-lime transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs font-mono text-eleve-lime font-bold">
              <span>Read Masterclass</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#1E2330] pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-eleve-lime/20 text-eleve-lime">
                  {activeArticle.category} • {activeArticle.readTimeMin} MIN READ
                </span>
                <h2 className="text-2xl font-black text-white font-display mt-2 uppercase tracking-tight">
                  {activeArticle.title}
                </h2>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  By {activeArticle.author} • {activeArticle.date}
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-3 py-1.5 rounded-lg bg-[#181C26] text-slate-400 hover:text-white text-xs font-mono"
              >
                Close
              </button>
            </div>

            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
