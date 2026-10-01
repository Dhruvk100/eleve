import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEleve } from '../context/EleveContext';
import {
  Settings,
  Activity,
  Radio,
  Apple,
  Disc,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  Shield,
  Sliders,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, isSupabaseLive } = useAuth();
  const { connectedDevices, toggleDeviceConnection, syncDevice } = useEleve();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'Apple Health':
        return <Apple className="w-5 h-5 text-white" />;
      case 'Garmin':
        return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'Google Fit / Health Connect':
        return <Radio className="w-5 h-5 text-rose-400" />;
      case 'Whoop':
        return <Disc className="w-5 h-5 text-eleve-lime" />;
      default:
        return <Activity className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              SYSTEM CONFIGURATION & HARDWARE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Settings & Connected Wearables
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Pair external biometric sensors, wearable continuous telemetry, and configure ELEVE operating parameters.
          </p>
        </div>
      </div>

      {/* Backend Connection Status Card */}
      <div className="glass-card rounded-2xl p-5 border border-[#222838] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl border ${
              isSupabaseLive
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
            }`}
          >
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-sm font-display">
                {isSupabaseLive ? 'Supabase PostgreSQL Cloud Active' : 'Persistent Storage (Demo Store Active)'}
              </h3>
              <span
                className={`px-2 py-0.2 rounded text-[9px] font-mono uppercase font-bold ${
                  isSupabaseLive
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}
              >
                {isSupabaseLive ? 'Live RLS' : 'Zero-Config Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {isSupabaseLive
                ? 'Authenticated via VITE_SUPABASE_URL and secure Row Level Security.'
                : 'All workout logs, meals, and PRs persist in browser localStorage.'}
            </p>
          </div>
        </div>
      </div>

      {/* Wearables Integration Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white font-display uppercase tracking-wide">
              Connected Wearables & Telemetry
            </h2>
            <p className="text-xs text-slate-400">
              Biometric syncing with Apple Watch, Garmin, Health Connect, and Whoop.
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
            DEMO INTEGRATION
          </span>
        </div>

        {/* Demo Wearable Notice */}
        <div className="p-3.5 rounded-xl bg-[#141722] border border-[#232838] flex items-center gap-3 text-xs text-slate-300">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <strong className="text-white uppercase font-mono tracking-wider">Demo Wearable Bridge:</strong> Real-time hardware hooks are simulated via synthetic OAuth handshakes. Toggling Connect or Sync updates your active metrics immediately.
          </div>
        </div>

        {/* Device Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connectedDevices.map((dev) => (
            <div
              key={dev.provider}
              className={`glass-card rounded-2xl p-5 border flex flex-col justify-between space-y-4 transition-all ${
                dev.isConnected ? 'border-eleve-lime/40' : 'border-[#222838] opacity-75'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#161B26] border border-[#262D3E]">
                    {getProviderIcon(dev.provider)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-display">
                      {dev.provider}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">
                      {dev.deviceName}
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 ${
                    dev.isConnected
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#181C26] text-slate-500 border border-[#282F42]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      dev.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                    }`}
                  />
                  <span>{dev.isConnected ? 'Connected' : 'Not Connected'}</span>
                </span>
              </div>

              {dev.isConnected && dev.lastSync && (
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Last biometrics pull:</span>
                  <span className="text-eleve-lime font-bold">{dev.lastSync}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#1C202C] flex items-center gap-3">
                {dev.isConnected ? (
                  <>
                    <button
                      onClick={() => syncDevice(dev.provider)}
                      className="flex-1 py-2 rounded-xl bg-[#161A24] hover:bg-[#202534] border border-[#262D3E] text-xs font-mono text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-eleve-lime" />
                      <span>Sync Now</span>
                    </button>
                    <button
                      onClick={() => toggleDeviceConnection(dev.provider)}
                      className="px-4 py-2 rounded-xl text-xs font-mono text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => toggleDeviceConnection(dev.provider)}
                    className="w-full py-2.5 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-lime"
                  >
                    Connect Device [Demo]
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operating Preferences */}
      <div className="glass-card rounded-2xl p-6 border border-[#222838] space-y-4">
        <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">
          ELEVE Operating Preferences
        </h3>

        <div className="space-y-3 text-xs font-mono">
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#161A24] border border-[#232838] cursor-pointer">
            <div>
              <div className="font-bold text-white">Push Notifications & Biometric Alerts</div>
              <div className="text-slate-400 text-[11px]">Receive hydration reminders and recovery warnings</div>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="accent-eleve-lime w-4 h-4 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#161A24] border border-[#232838] cursor-pointer">
            <div>
              <div className="font-bold text-white">Haptic & Audio Cadence Feedback</div>
              <div className="text-slate-400 text-[11px]">Audio ticks during eccentric workout tempo countdowns</div>
            </div>
            <input
              type="checkbox"
              checked={hapticFeedback}
              onChange={(e) => setHapticFeedback(e.target.checked)}
              className="accent-eleve-lime w-4 h-4 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
