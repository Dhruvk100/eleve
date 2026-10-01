import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Activity, Dumbbell, Sparkles, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Today', icon: LayoutDashboard },
    { to: '/track', label: 'Progress', icon: Activity },
    { to: '/coach', label: 'AI Coach', icon: Sparkles, highlight: true },
    { to: '/plans', label: 'Plans', icon: Dumbbell },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0C11]/95 backdrop-blur-xl border-t border-[#1C202C] px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative ${
                  isActive
                    ? item.highlight
                      ? 'text-indigo-400 font-bold'
                      : 'text-eleve-lime font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-lg transition-transform ${
                      item.highlight
                        ? isActive
                          ? 'bg-indigo-500/20 text-indigo-400 scale-110 shadow-glow-purple'
                          : 'bg-indigo-500/10 text-indigo-400'
                        : isActive
                        ? 'bg-eleve-lime/10 text-eleve-lime scale-105'
                        : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                    {item.label}
                  </span>
                  {isActive && (
                    <span
                      className={`absolute top-0.5 w-1 h-1 rounded-full ${
                        item.highlight ? 'bg-indigo-400' : 'bg-eleve-lime'
                      }`}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
