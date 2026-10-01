import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  BookOpen,
  Sparkles,
  Activity,
  Apple,
  UtensilsCrossed,
  Users,
  Trophy,
  Award,
  ShoppingBag,
  Star,
  UserCheck,
  BookMarked,
  User,
  Settings,
  Flame,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sections = [
    {
      title: 'OPERATING CORE',
      links: [
        { to: '/', label: 'Today Dashboard', icon: LayoutDashboard },
        { to: '/plans', label: 'Workout Plans', icon: Dumbbell },
        { to: '/exercises', label: 'Exercise Library', icon: BookOpen },
        { to: '/track', label: 'Fitness Tracking', icon: Activity },
      ],
    },
    {
      title: 'INTELLIGENCE',
      links: [
        { to: '/coach', label: 'ELEVE AI Coach', icon: Sparkles, badge: 'AI' },
        { to: '/learn', label: 'Learning Center', icon: BookOpen },
      ],
    },
    {
      title: 'FUEL & BODY',
      links: [
        { to: '/nutrition', label: 'Nutrition & Macros', icon: Apple },
        { to: '/recipes', label: 'Recipe Vault', icon: UtensilsCrossed },
        { to: '/diary', label: 'Personal Diary', icon: BookMarked, badge: 'Private' },
      ],
    },
    {
      title: 'ARENA & MOMENTUM',
      links: [
        { to: '/community', label: 'Community Feed', icon: Users },
        { to: '/challenges', label: 'Active Challenges', icon: Flame },
        { to: '/ranking', label: 'Leaderboard', icon: Trophy },
        { to: '/achievements', label: 'Achievements', icon: Award },
      ],
    },
    {
      title: 'ECOSYSTEM',
      links: [
        { to: '/coaches', label: 'Coach Directory', icon: UserCheck },
        { to: '/products', label: 'Product Info', icon: ShoppingBag },
        { to: '/reviews', label: 'Reviews', icon: Star },
        { to: '/profile', label: 'Athlete Profile', icon: User },
        { to: '/settings', label: 'Settings & Wearables', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-[#0A0C11] border-r border-[#1B1F2B] transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="py-5 px-3 space-y-6">
          {sections.map((section, idx) => (
            <div key={idx}>
              <div className="px-3 mb-2 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase">
                {section.title}
              </div>
              <nav className="space-y-0.5">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                          isActive
                            ? 'bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30 font-bold shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-[#141722]'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{link.label}</span>
                      </div>
                      {link.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase bg-[#1A1F2C] text-slate-300 border border-[#2B3245]">
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}

          {/* Philosophy Footer in Sidebar */}
          <div className="p-3 mx-1 rounded-xl bg-[#12151D] border border-[#1E2330] text-center">
            <div className="text-[10px] font-mono text-eleve-lime uppercase tracking-widest font-bold">
              ELEVE PHILOSOPHY
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1 tracking-wider">
              TRAIN • FUEL • RECOVER • EVOLVE
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
