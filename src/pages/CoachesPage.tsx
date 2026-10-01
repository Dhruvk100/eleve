import React, { useState } from 'react';
import { useEleve } from '../context/EleveContext';
import { Coach } from '../types';
import {
  UserCheck,
  Star,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  X,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const CoachesPage: React.FC = () => {
  const { coaches, bookCoachSession, coachBookings } = useEleve();
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenBooking = (coach: Coach) => {
    setSelectedCoach(coach);
    setSelectedSlot(coach.availableSlots[0] || '10:00 AM');
    setModalOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoach) return;

    bookCoachSession(
      selectedCoach.id,
      bookingDate,
      selectedSlot,
      bookingNotes
    );

    setModalOpen(false);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1E2330] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-eleve-lime/10 text-eleve-lime border border-eleve-lime/30">
              ELITE ATHLETIC CONSULTANCY
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
              DEMO BOOKING ENGINE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
            Coaches & Biomechanics Experts
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Book 1-on-1 virtual kinematic audits, periodization consultations, and HYROX competition strategy sessions.
          </p>
        </div>
      </div>

      {/* Demo Booking Notice */}
      <div className="p-3.5 rounded-xl bg-[#141722] border border-[#232838] flex items-center gap-3 text-xs text-slate-300">
        <ShieldAlert className="w-4 h-4 text-eleve-cyan shrink-0" />
        <div>
          <strong className="text-white uppercase font-mono tracking-wider">Demo Booking Notice:</strong> Coach booking operates as an interactive prototype flow. Sessions booked update your schedule immediately without charging your payment instrument.
        </div>
      </div>

      {/* Active Bookings Banner */}
      {coachBookings.length > 0 && (
        <div className="rounded-2xl p-5 bg-[#141824] border border-[#232838] space-y-3">
          <div className="text-xs font-mono uppercase text-eleve-lime font-bold tracking-wider">
            Your Upcoming Scheduled Consultations ({coachBookings.length})
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {coachBookings.map((b) => (
              <div
                key={b.id}
                className="bg-[#171B26] p-4 rounded-xl border border-[#262D3E] flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-white text-sm">{b.coachName}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {b.scheduledDate} at {b.timeSlot} • {b.sessionType}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coaches.map((coach) => (
          <div
            key={coach.id}
            className="glass-card rounded-2xl p-6 border border-[#222838] flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={coach.avatarUrl}
                  alt={coach.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/10"
                />
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {coach.name}
                  </h3>
                  <div className="text-xs text-eleve-lime font-mono font-semibold">
                    {coach.specialization}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{coach.rating}</span>
                    <span className="text-slate-500">({coach.reviewsCount})</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {coach.bio}
              </p>

              {/* Credentials tags */}
              <div className="flex flex-wrap gap-1.5">
                {coach.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="px-2 py-0.5 rounded bg-[#171B26] text-slate-300 text-[10px] font-mono border border-[#282F42]"
                  >
                    {cred}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-[#1C202C] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Hourly Rate:</span>
                <span className="text-white font-bold text-sm">${coach.hourlyRate} / hr</span>
              </div>
            </div>

            <button
              onClick={() => handleOpenBooking(coach)}
              className="w-full py-2.5 rounded-xl bg-eleve-lime hover:bg-eleve-lime-hover text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-glow-lime flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Guidance Session [Demo]</span>
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {modalOpen && selectedCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#12151E] border border-[#262C3D] w-full max-w-md rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#1E2330] pb-4">
              <div>
                <span className="text-xs font-mono text-eleve-lime font-bold uppercase">
                  Schedule Consultation [DEMO]
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-0.5">
                  Book with {selectedCoach.name}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 uppercase mb-1 font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1 font-semibold">
                  Select Available Time Slot
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl px-3 py-2 text-white"
                >
                  {selectedCoach.availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 uppercase mb-1 font-semibold">
                  Biomechanics Audit Focus / Lift Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Review squat bottom sticking point and deadlift lockout video..."
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full bg-[#181C26] border border-[#282F42] rounded-xl p-3 text-white text-xs font-sans"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-eleve-lime text-black font-extrabold uppercase tracking-wider shadow-glow-lime"
                >
                  Confirm Demo Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
