'use client';

import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero';
import { OrderBoard } from '@/components/sections/OrderBoard';
import { ServiceTimeline } from '@/components/sections/ServiceTimeline';
import { TeamPulse } from '@/components/sections/TeamPulse';

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[1320px] flex-col gap-16 px-6 pb-24 pt-16 md:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#5a5cff]/20 blur-[180px]" />
        <div className="absolute right-0 top-1/4 h-[420px] w-[320px] rounded-full bg-[#ffaa4c]/20 blur-[160px]" />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.21, 0.65, 0.24, 0.99] }}
        className="sticky top-10 z-20 flex items-center justify-between rounded-full border border-white/10 bg-[#05060f]/60 px-6 py-3 backdrop-blur-xl"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">
          LumenPlate
        </span>
        <div className="flex items-center gap-3 text-xs text-white/50">
          <span>Version 2.3</span>
          <span className="size-1 rounded-full bg-white/30" />
          <span>Command center stable</span>
        </div>
      </motion.nav>

      <Hero />
      <OrderBoard />
      <ServiceTimeline />
      <TeamPulse />

      <footer className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 text-xs text-white/40 md:flex-row md:px-10">
        <span>© {new Date().getFullYear()} LumenPlate Restaurants. All signals encrypted.</span>
        <div className="flex items-center gap-3">
          <span>Privacy</span>
          <span className="size-1 rounded-full bg-white/20" />
          <span>Support</span>
          <span className="size-1 rounded-full bg-white/20" />
          <span>Status</span>
        </div>
      </footer>
    </main>
  );
}
