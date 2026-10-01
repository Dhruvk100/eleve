import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEleve } from '../context/EleveContext';
import { aiCoachService } from '../services/aiCoachService';
import { AIMessage } from '../types';
import { Sparkles, Send, Key, CheckCircle, Flame, Dumbbell, Shield, HelpCircle } from 'lucide-react';

export const AICoachPage: React.FC = () => {
  const { user } = useAuth();
  const { activeWorkout, nutrition, wellness } = useEleve();

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'ai_welcome',
      sender: 'assistant',
      content: `⚡ **WELCOME TO ELEVE AI COACH**

I am your dedicated athletic intelligence engine. I continually monitor your biomechanical workload, recovery parameters, and progressive overload periodization.

• **Current Streak:** ${user?.streak ?? 14} Days
• **Consistency Score:** ${user?.consistencyScore ?? 91}%
• **Sleep Logged:** ${wellness.sleepHours}h / 8.0h Target
• **Active Plan:** Hypertrophy Block (Week 5 / 8)

*Note: Running in **DEMO AI MODE**. Select any quick protocol below or enter any athletic query.*`,
      timestamp: '09:00 AM',
      quickActions: [
        'Analyze my week',
        'Suggest today’s workout',
        'Adjust my plan',
        'Explain an exercise',
        'Review my progress',
      ],
      isDemo: true,
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasLiveKey, setHasLiveKey] = useState(aiCoachService.hasRealApiKey());

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMessage: AIMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    if (user) {
      const response = await aiCoachService.generateResponse(
        text,
        {
          profile: user,
          activeWorkout,
          nutrition,
          wellness,
        },
        messages
      );

      setMessages((prev) => [...prev, response]);
    }
    setIsTyping(false);
  };

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      aiCoachService.setApiKey(apiKeyInput.trim());
      setHasLiveKey(true);
      setApiKeyModalOpen(false);
      setMessages((prev) => [
        ...prev,
        {
          id: 'ai_key_confirm',
          sender: 'assistant',
          content: '✅ Custom AI API key successfully saved. ELEVE AI Coach is now operating in **LIVE API MODE** with real-time neural inference.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemo: false,
        },
      ]);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2330] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>ELEVE AI COACH</span>
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${
                hasLiveKey
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}
            >
              {hasLiveKey ? 'LIVE AI MODE' : 'DEMO AI MODE'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
            Athletic Guidance & Periodization Intelligence
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setApiKeyModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#141722] hover:bg-[#1A1F2C] border border-[#232838] text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all"
          >
            <Key className="w-3.5 h-3.5 text-indigo-400" />
            <span>{hasLiveKey ? 'Configure API Key' : 'Connect Live AI Key'}</span>
          </button>
        </div>
      </div>

      {/* Mode Transparency Callout */}
      {!hasLiveKey && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Transparency Disclosure:</strong> Operating in clearly labeled <strong>Demo AI Mode</strong> using local contextual heuristic models. You can connect a live Google Gemini or OpenAI API key at any time.
            </span>
          </div>
        </div>
      )}

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 bg-[#0A0C11] border border-[#1E2330] rounded-2xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                {msg.sender === 'user' ? user?.fullName || 'Athlete' : 'ELEVE AI Coach'}
              </span>
              {msg.sender === 'assistant' && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                    msg.isDemo
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-indigo-500/10 text-indigo-400'
                  }`}
                >
                  {msg.isDemo ? 'Demo Mode' : 'Live Neural'}
                </span>
              )}
              <span className="text-[10px] font-mono text-slate-600">{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-eleve-lime text-black font-medium shadow-glow-lime/20 rounded-tr-none'
                  : 'bg-[#131620] border border-[#232838] text-slate-100 rounded-tl-none whitespace-pre-line'
              }`}
            >
              {msg.content}
            </div>

            {/* Quick Action Pills inside Assistant Message */}
            {msg.quickActions && msg.quickActions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2.5 max-w-2xl">
                {msg.quickActions.map((action, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={() => handleSendMessage(action)}
                    className="px-3 py-1.5 rounded-full bg-[#181C26] hover:bg-eleve-lime/10 border border-[#2B3245] hover:border-eleve-lime/40 text-xs font-mono text-slate-300 hover:text-eleve-lime transition-all flex items-center gap-1.5"
                  >
                    <span>⚡</span>
                    <span>{action}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-[#131620] border border-[#232838] rounded-xl w-32 animate-pulse">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
            <span className="text-xs font-mono text-slate-400">Synthesizing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-[#12151D] border border-[#232838] rounded-2xl p-2 focus-within:border-indigo-500 transition-colors shadow-2xl"
        >
          <input
            type="text"
            placeholder="Ask ELEVE AI Coach (e.g. 'Analyze my week', 'Explain deadlift biomechanics', 'Suggest meal')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-eleve-lime disabled:opacity-30 disabled:hover:bg-eleve-lime hover:bg-eleve-lime-hover text-black rounded-xl font-bold transition-all shadow-glow-lime"
            aria-label="Send query to AI Coach"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* API Key Connection Modal */}
      {apiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Connect Live AI API Key
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Google Gemini or OpenAI API Key
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              ELEVE never stores your API key on remote servers. The key is persisted exclusively within your browser's private local environment.
            </p>

            <input
              type="password"
              placeholder="Paste your API key (e.g. AIzaSy...)"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500 mb-4"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setApiKeyModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Save & Enable Live AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
