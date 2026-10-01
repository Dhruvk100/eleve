import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { Lock, Mail, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginAsDemoUser, resetPassword, isSupabaseLive } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const success = await login(email || 'athlete@eleve.fit', password || 'password');
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setMessage('Failed to authenticate. Please check your credentials.');
    }
  };

  const handleDemoLogin = () => {
    loginAsDemoUser();
    navigate('/');
  };

  const handleReset = async () => {
    if (!email) {
      setMessage('Please enter your email above to receive a recovery token.');
      return;
    }
    const res = await resetPassword(email);
    setMessage(res.message);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col justify-center items-center p-4">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-eleve-lime/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showTagline={true} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            ENTER THE OPERATING SYSTEM
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#23293A] shadow-2xl space-y-5">
          {message && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              {message}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 uppercase mb-1 font-semibold">
                Athlete Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#151924] border border-[#282F42] rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
                  placeholder="athlete@eleve.fit"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400 uppercase font-semibold">Password</label>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-eleve-lime hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#151924] border border-[#282F42] rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-lime flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to ELEVE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-2">
            <button
              onClick={handleDemoLogin}
              type="button"
              className="w-full py-2.5 rounded-xl bg-[#171B26] hover:bg-[#202534] border border-[#2B3245] text-xs font-mono text-eleve-lime font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-eleve-lime" />
              <span>Instant Athlete Access (Clean Slate • Zero Stats)</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#1C202C] text-center text-xs text-slate-400 font-mono">
            New to the revolution?{' '}
            <Link to="/signup" className="text-eleve-lime font-bold hover:underline">
              Create Athlete Profile
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Supabase RLS Protected • Zero Third-Party Tracker Leak</span>
        </div>
      </div>
    </div>
  );
};
