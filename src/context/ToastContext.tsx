// ============================================================================
// ELEVE | Global Toast Notification System
// ============================================================================

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, Zap } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'info' | 'achievement' | 'error';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
      const newToast: ToastItem = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      const timer = setTimeout(() => {
        removeToast(id);
      }, toast.duration || 4500);

      return () => clearTimeout(timer);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Render Viewport */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => {
          let bgBorder = 'bg-[#141720] border-[#2A3042] text-slate-100';
          let icon = <Info className="w-5 h-5 text-eleve-cyan shrink-0" />;

          if (toast.type === 'success') {
            bgBorder = 'bg-[#111612] border-emerald-500/40 text-emerald-100';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          } else if (toast.type === 'achievement') {
            bgBorder = 'bg-[#15190B] border-eleve-lime/50 text-white shadow-glow-lime';
            icon = <Zap className="w-5 h-5 text-eleve-lime shrink-0 animate-pulse" />;
          } else if (toast.type === 'warning') {
            bgBorder = 'bg-[#1B160C] border-amber-500/40 text-amber-100';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          } else if (toast.type === 'error') {
            bgBorder = 'bg-[#1B0F12] border-rose-500/40 text-rose-100';
            icon = <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 flex items-start gap-3.5 ${bgBorder}`}
            >
              {icon}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-0.5">
                  {toast.title}
                </div>
                <div className="text-sm text-slate-100 font-medium leading-snug">
                  {toast.message}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
