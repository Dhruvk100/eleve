import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { MobileNav } from '../components/common/MobileNav';

export const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col font-sans">
      {/* Sticky Top Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex-1 flex w-full">
        {/* Responsive Desktop Sidebar & Mobile Drawer */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-64 flex flex-col min-w-0 pb-20 lg:pb-12">
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>

          {/* Platform Footer */}
          <footer className="mt-auto border-t border-[#161A24] py-8 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-widest font-display">ELEVE</span>
                <span className="text-slate-600">|</span>
                <span className="font-mono text-eleve-lime">BIGGEST FITNESS REVOLUTION</span>
              </div>
              <div className="font-mono text-[11px] text-slate-400">
                TRAIN. FUEL. RECOVER. EVOLVE.
              </div>
              <div className="text-[11px] text-slate-500">
                &copy; {new Date().getFullYear()} ELEVE OS. Production-Grade Athletic Prototype.
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};
