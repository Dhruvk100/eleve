import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEleve } from '../context/EleveContext';
import { Star, Plus, CheckCircle, X } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { user } = useAuth();
  const { reviews, addReview} = useEleve();

  const [filterType, setFilterType] = useState<string>('All');
  const [modalOpen, setModalOpen] = useState(false);

  // New review form
  const [targetType, setTargetType] = useState<'Product' | 'Coach' | 'Exercise' | 'Plan'>('Product');
  const [targetName, setTargetName] = useState('ELEVE Isolate Matrix 100');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const types = ['All', 'Product', 'Coach', 'Exercise', 'Plan'];

  const filtered =
    filterType === 'All' ? reviews : reviews.filter((r) => r.targetType === filterType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    addReview({
      targetType,
      targetId: 'target_' + Date.now(),
      targetName,
      authorName: user?.fullName || 'Alex Mercer',
      authorAvatar: user?.avatarUrl,
      rating,
      title: title.trim(),
      body: body.trim(),
    });

    setTitle('');
    setBody('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              ATHLETE FEEDBACK & COMMUNITY CONSENSUS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Reviews & Ratings
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Unfiltered performance reviews on supplements, coaching protocols, exercise mechanics, and periodized workout plans.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-glow-lime transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 ${
              filterType === t
                ? 'bg-eleve-lime text-black shadow-sm'
                : 'bg-[#12151E] text-slate-400 hover:text-white border border-[#202534]'
            }`}
          >
            {t}s
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filtered.map((rev) => (
          <div
            key={rev.id}
            className="glass-card rounded-2xl p-6 border border-[#222838] space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#181C26] text-eleve-lime border border-[#2B3245]">
                  {rev.targetType}: {rev.targetName}
                </span>
                <span className="text-xs font-mono text-slate-500">{rev.createdAt}</span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rev.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-display">
                "{rev.title}"
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {rev.body}
              </p>
            </div>

            <div className="pt-2 border-t border-[#1C202C] text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Review by <strong className="text-white">{rev.authorName}</strong></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified ELEVE Athlete</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1E2330] pb-4">
              <h3 className="text-lg font-bold text-white font-display">Submit Platform Review</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 uppercase mb-1">Target Category</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value as any)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                >
                  <option value="Product">Product / Supplement</option>
                  <option value="Coach">Coach Guidance</option>
                  <option value="Exercise">Exercise Mechanics</option>
                  <option value="Plan">Workout Plan</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Subject Name</label>
                <input
                  type="text"
                  required
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className="p-1 text-amber-400"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          starVal <= rating ? 'fill-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-white font-bold ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Transformative bar path feedback..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1">Feedback Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detailed breakdown of efficacy, taste, coaching interaction, or results..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-3 text-white text-xs font-sans"
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
                  className="px-6 py-2.5 rounded-xl bg-eleve-lime text-black font-extrabold uppercase tracking-wider"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
