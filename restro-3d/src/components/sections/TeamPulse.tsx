'use client';

import { motion } from 'framer-motion';
import { ChefHat, Users, Wifi, Shield, Headphones } from 'lucide-react';

const staff = [
  {
    name: 'Chef Lina',
    role: 'Expo lead',
    status: 'Coordinating fire times',
    signal: 'online',
  },
  {
    name: 'Mateo',
    role: 'Lead runner',
    status: 'Delivering Garden Suite desserts',
    signal: 'in-motion',
  },
  {
    name: 'Riya',
    role: 'Sommelier',
    status: 'Pairing vintage Syrah · Chef counter VIP',
    signal: 'focus',
  },
  {
    name: 'Grace',
    role: 'Guest services',
    status: 'Escorting rooftop party',
    signal: 'online',
  },
];

const signalTone: Record<string, string> = {
  online: 'bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.5)]',
  'in-motion': 'bg-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.5)]',
  focus: 'bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.5)]',
};

export function TeamPulse() {
  return (
    <section className="mt-16 rounded-3xl border border-white/10 bg-[#0c1022]/60 p-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">Team pulse</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Service roles in sync</h3>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-white/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1">
            <Users className="h-3.5 w-3.5" />
            14 on floor
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1">
            <Wifi className="h-3.5 w-3.5" />
            Mesh stable
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1">
            <Shield className="h-3.5 w-3.5" />
            Guest privacy locked
          </span>
        </div>
      </header>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel flex flex-col gap-4 p-6">
          {staff.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.6, ease: [0.21, 0.65, 0.24, 0.99] }}
              className="flex items-center justify-between gap-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <div className="flex items-center gap-4">
                <span className={`relative inline-flex size-10 items-center justify-center rounded-2xl bg-white/10 text-white`}>
                  <ChefHat className="h-5 w-5" />
                  <span
                    className={`absolute -right-1 -top-1 inline-flex size-3 rounded-full ${signalTone[member.signal]}`}
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {member.role}
                  </p>
                </div>
              </div>
              <p className="max-w-[260px] text-sm text-white/60">{member.status}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-panel flex h-full flex-col gap-5 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Audio lanes</p>
            <h4 className="mt-2 text-lg font-semibold text-white">Channel mix</h4>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/70">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <Headphones className="h-4 w-4 text-emerald-300" />
                <span>Expo + Kitchen</span>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/50">
                Spatial
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <Headphones className="h-4 w-4 text-sky-300" />
                <span>Guest services</span>
              </div>
              <span className="text-xs text-white/50">Ambient 30%</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <Headphones className="h-4 w-4 text-amber-300" />
                <span>Mixology</span>
              </div>
              <span className="text-xs text-white/50">Synced with Chef counter</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-transparent p-5 text-sm text-white/60">
            Team radios auto-shift into whisper mode when guests are within 2m proximity.
            Override available in command center.
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamPulse;
