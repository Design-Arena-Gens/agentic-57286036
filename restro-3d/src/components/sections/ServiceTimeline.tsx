'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Clock3, BellRing, MapPin } from 'lucide-react';

const timeline = [
  {
    time: '6:42 PM',
    title: 'Chef counter tasting ready',
    detail: 'Notify guest Liam • align sommelier pairing in 3 minutes.',
    accent: 'emerald',
  },
  {
    time: '6:38 PM',
    title: 'Rooftop Terrace pacing +4m',
    detail: 'Fire mains for tables T4 + T5 to sync dessert reveal.',
    accent: 'amber',
  },
  {
    time: '6:33 PM',
    title: 'VIP transfer request',
    detail: 'Move party ORD-1024 to Garden Suite with privacy screens.',
    accent: 'sky',
  },
  {
    time: '6:28 PM',
    title: 'Live jazz interlude',
    detail: 'Adjust lighting to warm scene · Bar to feature smoked negroni.',
    accent: 'indigo',
  },
];

const accentColor: Record<string, string> = {
  emerald: 'from-emerald-400/60 to-emerald-500/20',
  amber: 'from-amber-400/60 to-amber-500/20',
  sky: 'from-sky-400/60 to-sky-500/20',
  indigo: 'from-indigo-400/55 to-indigo-500/20',
};

export function ServiceTimeline() {
  return (
    <section className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Service timeline
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Next 15 minutes</h3>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50">
            <Clock3 className="h-3.5 w-3.5" />
            Sync
          </span>
        </div>

        <div className="mt-7 flex flex-col gap-4">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.55, ease: [0.21, 0.65, 0.24, 0.99] }}
              className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/5 p-5"
            >
              <div
                className={`absolute inset-y-0 left-[2px] w-[210px] -skew-x-12 bg-gradient-to-r ${accentColor[item.accent]} opacity-30 blur-2xl`}
              />
              <div className="relative flex items-start justify-between gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                    {item.time}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-white/60">{item.detail}</p>
                </div>
                <ButtonGhost />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-panel flex flex-col gap-6 p-6">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Guest experience
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Moments to stage</h3>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-white/50">
            Spotlight
          </span>
        </header>

        <div className="rounded-2xl border border-white/12 bg-gradient-to-br from-white/6 via-white/4 to-transparent p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <Sparkles className="h-5 w-5 text-amber-200" />
              <span>Table Garden Suite: synchronized dessert sparklers queued.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <BellRing className="h-5 w-5 text-emerald-200" />
              <span>Runner Mateo: ready to present chef&apos;s note + wine pairing.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <MapPin className="h-5 w-5 text-sky-200" />
              <span>Wayfinding lights ready — escort route illuminated in gold.</span>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/60">
            <span>Atmospherics</span>
            <span className="text-white/40">Playlist · lighting · scent</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
              Linked
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ButtonGhost() {
  return (
    <button className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:border-white/40 hover:bg-white/20 hover:text-white">
      <span>Stage</span>
      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
    </button>
  );
}

export default ServiceTimeline;
