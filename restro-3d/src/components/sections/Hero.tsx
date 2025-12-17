'use client';

import { motion } from 'framer-motion';
import RestaurantScene from '@/components/three/RestaurantScene';

const highlights = [
  {
    label: 'Avg. turn time',
    value: '38m',
    delta: '-12%',
    tone: 'positive',
  },
  {
    label: 'Kitchen load',
    value: '68%',
    delta: '+6%',
    tone: 'warn',
  },
  {
    label: 'Tables occupied',
    value: '24 / 28',
    delta: '+3',
    tone: 'neutral',
  },
];

const motionConfig = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.21, 0.65, 0.24, 0.99] as const },
};

export function Hero() {
  return (
    <section className="relative isolate grid gap-10 lg:grid-cols-[1.15fr_1fr] xl:grid-cols-[1.1fr_1fr]">
      <div className="relative z-10 flex flex-col gap-10">
        <motion.div {...motionConfig}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            LumenPlate Command Center
          </span>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-tight text-white md:text-6xl">
            Orchestrate every table with immersive spatial awareness.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
            Blend data-rich dashboards with a cinematic 3D dining floor. Track orders,
            coordinate courses, and keep teams in sync — all in one elegant portal
            designed for fast decision-making.
          </p>
        </motion.div>

        <motion.div
          {...motionConfig}
          transition={{ ...motionConfig.transition, delay: 0.1 }}
          className="card-grid"
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="glass-panel relative flex flex-col gap-3 p-6 text-white"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/55">
                {item.label}
              </span>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-semibold md:text-4xl">{item.value}</span>
                <span
                  className={`text-xs font-semibold uppercase tracking-tight ${
                    item.tone === 'positive'
                      ? 'text-emerald-300'
                      : item.tone === 'warn'
                        ? 'text-amber-300'
                        : 'text-white/60'
                  }`}
                >
                  {item.delta}
                </span>
              </div>
              <div className="text-sm text-white/50">
                {item.tone === 'positive'
                  ? 'Guests seated faster than peak hours.'
                  : item.tone === 'warn'
                    ? 'Chefs at capacity — consider staggering fire times.'
                    : 'Floor humming; maintain current pacing.'}
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        {...motionConfig}
        transition={{ ...motionConfig.transition, delay: 0.16 }}
        className="relative"
      >
        <div className="absolute -left-12 -top-12 h-72 w-72 rounded-full bg-[#5b6cff]/30 blur-3xl" />
        <div className="absolute -right-12 bottom-0 h-64 w-64 rounded-full bg-[#ffaa4c]/25 blur-3xl" />
        <RestaurantScene />
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/4 px-6 py-4 text-sm text-white/70">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Live view</p>
            <p className="mt-1 font-medium text-white">Floor sync at 0.5s latency</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-semibold uppercase text-white/70">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,255,128,0.8)]" />
              Stable
            </span>
            <span className="text-white/40">Kitchen feed · Table sensors · POS sync</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
