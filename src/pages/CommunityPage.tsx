import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEleve } from '../context/EleveContext';
import {
  Heart,
  MessageSquare,
  Share2,
  Send,
  Trophy,
  Dumbbell,
  Flag,
  } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const { communityPosts, createCommunityPost, likeCommunityPost, addCommentToPost } = useEleve();

  const [postText, setPostText] = useState('');
  const [includeWorkoutSummary, setIncludeWorkoutSummary] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    createCommunityPost(
      postText.trim(),
      includeWorkoutSummary
        ? {
            name: 'Pull Hypertrophy & Back Density',
            discipline: 'Strength',
            durationMin: 60,
            volumeKg: 1240,
            prCount: 1,
          }
        : undefined,
      includeWorkoutSummary ? 'Barrier Shattered' : undefined
    );

    setPostText('');
    setIncludeWorkoutSummary(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInput[postId];
    if (!text || !text.trim()) return;

    addCommentToPost(postId, text.trim());
    setCommentInput({ ...commentInput, [postId]: '' });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              GLOBAL ATHLETIC ARENA
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            ELEVE Community Feed
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Connect with verified hybrid athletes, share verified lift telemetry, and exchange periodization strategy.
          </p>
        </div>
      </div>

      {/* Create Post Card */}
      <div className="glass-card rounded-2xl p-5 border border-[#222838] space-y-4">
        <div className="flex items-start gap-3">
          <img
            src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
            alt={user?.fullName || 'Athlete'}
            className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
          />
          <div className="flex-1">
            <textarea
              rows={3}
              placeholder="Broadcast a workout PR, training observation, or recovery reflection to the arena..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full bg-[#151924] border border-[#282F42] rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#1C202C]">
          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeWorkoutSummary}
              onChange={(e) => setIncludeWorkoutSummary(e.target.checked)}
              className="rounded accent-eleve-lime w-4 h-4"
            />
            <span className="flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-eleve-lime" />
              <span>Attach today's workout summary (1,240 kg Volume & PR)</span>
            </span>
          </label>

          <button
            onClick={handlePostSubmit}
            disabled={!postText.trim()}
            className="px-6 py-2.5 rounded-xl bg-eleve-lime disabled:opacity-40 hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-lime flex items-center justify-center gap-2"
          >
            <span>Broadcast Post</span>
          </button>
        </div>
      </div>

      {/* Community Posts Feed */}
      <div className="space-y-6">
        {communityPosts.map((post) => (
          <div
            key={post.id}
            className="glass-card rounded-2xl p-6 border border-[#222838] space-y-4"
          >
            {/* Author bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm font-display">
                      {post.authorName}
                    </span>
                    {post.authorRole && (
                      <span className="px-2 py-0.2 rounded text-[9px] font-mono uppercase bg-[#1A1F2C] text-slate-300 border border-[#2B3245]">
                        {post.authorRole}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">{post.createdAt}</div>
                </div>
              </div>

              <button className="text-slate-500 hover:text-slate-300 p-1" title="Report Content">
                <Flag className="w-4 h-4" />
              </button>
            </div>

            {/* Post Content */}
            <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {/* Attached Workout Card */}
            {post.workoutSummary && (
              <div className="rounded-xl p-4 bg-[#141824] border border-[#262D3E] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-eleve-lime">
                    <Dumbbell className="w-4 h-4" />
                    <span>{post.workoutSummary.name}</span>
                  </div>
                  {post.achievementBadge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      <span>{post.achievementBadge}</span>
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center pt-1">
                  <div className="bg-[#171B26] p-2 rounded-lg">
                    <span className="text-slate-500 text-[10px]">DURATION</span>
                    <div className="font-bold text-white mt-0.5">
                      {post.workoutSummary.durationMin} Min
                    </div>
                  </div>
                  <div className="bg-[#171B26] p-2 rounded-lg">
                    <span className="text-slate-500 text-[10px]">VOLUME LOAD</span>
                    <div className="font-bold text-eleve-lime mt-0.5">
                      {post.workoutSummary.volumeKg.toLocaleString()} kg
                    </div>
                  </div>
                  <div className="bg-[#171B26] p-2 rounded-lg">
                    <span className="text-slate-500 text-[10px]">NEW PRS</span>
                    <div className="font-bold text-amber-400 mt-0.5">
                      {post.workoutSummary.prCount || 1}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Optional Image */}
            {post.imageUrl && (
              <div className="rounded-xl overflow-hidden max-h-80 border border-[#202534]">
                <img
                  src={post.imageUrl}
                  alt="Post visual"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Action Bar (Like, Comment, Share) */}
            <div className="pt-3 border-t border-[#1C202C] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => likeCommunityPost(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.isLiked ? 'text-rose-500 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span>{post.likesCount}</span>
                </button>

                <button
                  onClick={() =>
                    setActiveCommentPostId(
                      activeCommentPostId === post.id ? null : post.id
                    )
                  }
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} Comments</span>
                </button>
              </div>

              <button className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {/* Expandable Comment Thread */}
            {activeCommentPostId === post.id && (
              <div className="pt-3 border-t border-[#1C202C] space-y-3">
                {/* Existing comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="space-y-2">
                    {post.comments.map((c) => (
                      <div
                        key={c.id}
                        className="bg-[#151924] rounded-xl p-3 flex items-start gap-2.5 text-xs"
                      >
                        <img
                          src={c.authorAvatar}
                          alt={c.authorName}
                          className="w-6 h-6 rounded-md object-cover mt-0.5"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{c.authorName}</span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {c.createdAt}
                            </span>
                          </div>
                          <p className="text-slate-300 mt-0.5">{c.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add comment input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add athletic feedback or comment..."
                    value={commentInput[post.id] || ''}
                    onChange={(e) =>
                      setCommentInput({ ...commentInput, [post.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    className="flex-1 bg-[#151924] border border-[#282F42] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="p-2 rounded-xl bg-eleve-lime text-black font-bold hover:bg-eleve-lime-hover transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
