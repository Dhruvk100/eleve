import React from 'react';

interface ProgressRingProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  strokeColor?: string;
  glowColor?: string;
  bgColor?: string;
  children?: React.ReactNode;
  animate?: boolean;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 110,
  strokeWidth = 9,
  strokeColor = '#CCFF00',
  bgColor = '#1E2330',
  children,
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          stroke={bgColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Value with soft rounded caps */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Central content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
};
