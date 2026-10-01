import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const success = await signup(email, password, fullName);
    setLoading(false);

    if (success) {
      navigate('/onboarding');
    } else {
      setErrorMessage('Could not complete registration. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col justify-center items-center p-4">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-eleve-lime/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showTagline={true} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            JOIN THE BIGGEST FITNESS REVOLUTION
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#23293A] shadow-2xl space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-slate-400 uppercase mb-1 font-semibold">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Cross"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#151924] border border-[#282F42] rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 uppercase mb-1 font-semibold">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="athlete@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#151924] border border-[#282F42] rounded-xl pl-10 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-eleve-lime"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 uppercase mb-1 font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
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
              <span>{loading ? 'Creating Profile...' : 'Begin Onboarding'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#1C202C] text-center text-xs text-slate-400 font-mono">
            Already registered?{' '}
            <Link to="/login" className="text-eleve-lime font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Encrypted Session • GDPR / HIPAA Privacy Standard</span>
        </div>
      </div>
    </div>
  );
};
