import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  clickable?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = true, clickable = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const content = (
    <div className="flex items-center gap-3 group select-none">
      {/* Minimal Geometric ELEVE Monogram */}
      <div className={`relative ${iconSizes[size]} bg-[#12151D] border border-[#232838] group-hover:border-eleve-lime/60 rounded-xl p-1.5 flex flex-col justify-between transition-all duration-300 shadow-sm group-hover:shadow-glow-lime/40`}>
        <div className="h-1.5 w-full bg-eleve-lime rounded-sm transition-transform duration-300 group-hover:translate-x-0.5" />
        <div className="h-1.5 w-3/4 bg-white rounded-sm transition-transform duration-300 group-hover:translate-x-1" />
        <div className="h-1.5 w-full bg-eleve-lime rounded-sm transition-transform duration-300 group-hover:translate-x-0.5" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-eleve-cyan rounded-full animate-pulse" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-[0.18em] text-white ${textSizes[size]} leading-none font-display`}>
            ELEVE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-eleve-lime" />
        </div>
        {showTagline && size !== 'sm' && (
          <span className="text-[9px] font-mono tracking-[0.22em] text-eleve-lime font-semibold uppercase mt-0.5">
            BIGGEST FITNESS REVOLUTION
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return <Link to="/" className="inline-block">{content}</Link>;
  }
  return content;
};
