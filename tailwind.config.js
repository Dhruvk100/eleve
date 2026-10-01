/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        eleve: {
          bg: '#08090C',
          dark: '#0D0F14',
          card: '#12151D',
          'card-hover': '#181C26',
          surface: '#1E2330',
          border: '#232838',
          'border-light': '#2F364B',
          lime: '#CCFF00',
          'lime-hover': '#B8E600',
          'lime-dim': 'rgba(204, 255, 0, 0.12)',
          'lime-glow': 'rgba(204, 255, 0, 0.28)',
          cyan: '#00F0FF',
          indigo: '#6366F1',
          purple: '#8B5CF6',
          coral: '#FF4757',
          amber: '#FFA502',
          muted: '#94A3B8',
          subtle: '#64748B',
          light: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'glow-lime': '0 0 25px rgba(204, 255, 0, 0.25)',
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.25)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.22)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-ai': 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
        'gradient-lime': 'linear-gradient(135deg, #CCFF00 0%, #A3E635 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 2s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
