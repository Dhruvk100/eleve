import React, { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subvalue?: string;
  icon?: ReactNode;
  trend?: string;
  trendUp?: boolean;
  accentColor?: 'lime' | 'cyan' | 'purple' | 'amber' | 'slate';
  progress?: number;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subvalue,
  icon,
  trend,
  trendUp = true,
  accentColor = 'lime',
  progress,
  className = '',
}) => {
  const accentStyles = {
    lime: 'text-eleve-lime border-eleve-border hover:border-eleve-lime/40',
    cyan: 'text-eleve-cyan border-eleve-border hover:border-eleve-cyan/40',
    purple: 'text-eleve-purple border-eleve-border hover:border-eleve-purple/40',
    amber: 'text-eleve-amber border-eleve-border hover:border-eleve-amber/40',
    slate: 'text-slate-300 border-eleve-border hover:border-slate-500/40',
  };

  const barStyles = {
    lime: 'bg-eleve-lime',
    cyan: 'bg-eleve-cyan',
    purple: 'bg-eleve-purple',
    amber: 'bg-eleve-amber',
    slate: 'bg-slate-300',
  };

  return (
    <div
      className={`glass-card rounded-2xl p-5 transition-all duration-300 relative overflow-hidden group ${accentStyles[accentColor]} ${className}`}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
          {label}
        </span>
        {icon && (
          <div className="p-2 rounded-xl bg-[#1A1F2C] text-slate-300 group-hover:text-white transition-colors">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-extrabold text-white font-display tracking-tight">
          {value}
        </span>
        {subvalue && (
          <span className="text-sm font-medium text-slate-400 font-mono">
            {subvalue}
          </span>
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 text-xs font-mono mt-2">
          <span className={`font-semibold ${trendUp ? 'text-emerald-400' : 'text-amber-400'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </span>
          <span className="text-slate-500">vs target</span>
        </div>
      )}

      {progress !== undefined && (
        <div className="w-full bg-[#1C202C] h-1.5 rounded-full overflow-hidden mt-3">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barStyles[accentColor]}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
};
