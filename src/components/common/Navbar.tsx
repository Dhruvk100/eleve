import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useEleve } from '../../context/EleveContext';
import { Sparkles, Flame, User, Settings, LogOut, Bell, Activity } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { activeWorkout } = useEleve();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090C]/90 backdrop-blur-xl border-b border-[#1E2330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#141721] transition-colors"
            aria-label="Toggle navigation drawer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Logo size="md" />
        </div>

        {/* Center: System Status & Intelligence Shortcuts (Desktop) */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            to="/track"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-eleve-lime/10 border border-eleve-lime/30 hover:border-eleve-lime/60 text-eleve-lime text-xs font-semibold tracking-wide transition-all"
          >
            <Activity className="w-3.5 h-3.5 text-eleve-lime" />
            <span>PROGRESS & ANALYTICS</span>
          </Link>

          <Link
            to="/coach"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 hover:border-indigo-500/50 text-indigo-300 text-xs font-semibold tracking-wide transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span>ELEVE AI COACH</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          </Link>

          {activeWorkout && (
            <Link
              to="/plans"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-eleve-lime/10 border border-eleve-lime/30 text-eleve-lime text-xs font-mono font-medium hover:bg-eleve-lime/20 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-eleve-lime animate-ping" />
              <span>ACTIVE: {activeWorkout.name}</span>
            </Link>
          )}
        </div>

        {/* Right: Streak & User profile dropdown */}
        <div className="flex items-center gap-3">
          {/* Streak pill */}
          <Link
            to="/achievements"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141722] border border-[#232838] hover:border-eleve-lime/40 text-xs font-mono text-white transition-all shadow-sm"
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span className="font-bold text-eleve-lime">{user?.streak ?? 0}</span>
            <span className="text-slate-400 hidden sm:inline">DAYS</span>
          </Link>

          {/* User Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#141722] border border-transparent hover:border-[#232838] transition-all"
              aria-label="User profile menu"
            >
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                alt={user?.fullName || 'Athlete'}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
              />
              <span className="hidden sm:inline text-xs font-bold text-slate-200">
                {user?.fullName || 'Athlete'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#12151D] border border-[#252B3B] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="px-4 py-2.5 border-b border-[#1E2330]">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">
                    {user?.fullName}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {user?.email}
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/track"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-eleve-lime hover:bg-[#1A1F2C] transition-colors"
                  >
                    <Activity className="w-4 h-4 text-eleve-lime" />
                    <span>Progress & Telemetry</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#1A1F2C] transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Athlete Profile</span>
                  </Link>
                  <Link
                    to="/diary"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#1A1F2C] transition-colors"
                  >
                    <Bell className="w-4 h-4 text-slate-400" />
                    <span>Private Training Diary</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#1A1F2C] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>System Settings & Wearables</span>
                  </Link>
                </div>

                <div className="border-t border-[#1E2330] pt-1 mt-1">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-400" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
