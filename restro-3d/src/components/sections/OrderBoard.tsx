'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Timer, Utensils, CheckCircle, Send, ConciergeBell } from 'lucide-react';
import { useOrderStore, OrderStatus } from '@/store/order-store';

const statusMeta: Record<
  OrderStatus,
  {
    title: string;
    gradient: string;
    accent: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  new: {
    title: 'Incoming',
    gradient: 'from-[#2f80ff]/35 to-[#1d2354]/75',
    accent: 'text-sky-300',
    icon: ConciergeBell,
  },
  preparing: {
    title: 'In Kitchen',
    gradient: 'from-[#ffaa4c]/35 to-[#2f1d54]/80',
    accent: 'text-amber-300',
    icon: Flame,
  },
  ready: {
    title: 'Ready',
    gradient: 'from-[#7df7d1]/30 to-[#1c433d]/75',
    accent: 'text-emerald-200',
    icon: CheckCircle,
  },
  served: {
    title: 'Served',
    gradient: 'from-[#c0c3ff]/25 to-[#20224a]/75',
    accent: 'text-indigo-200',
    icon: Utensils,
  },
};

const statusSequence: OrderStatus[] = ['new', 'preparing', 'ready', 'served'];

function formatMinutes(minutes: number) {
  if (minutes <= 0) return 'Now';
  return `${minutes} min`;
}

function timeSince(dateISOString: string) {
  const diff = Date.now() - new Date(dateISOString).getTime();
  const minutes = Math.round(diff / 60000);
  if (minutes <= 1) return 'moments ago';
  if (minutes < 60) return `${minutes}m ago`;
  const hrs = Math.floor(minutes / 60);
  return `${hrs}h ${minutes % 60}m ago`;
}

export function OrderBoard() {
  const orders = useOrderStore((state) => state.orders);
  const moveForward = useOrderStore((state) => state.moveForward);

  const grouped = useMemo(() => {
    return statusSequence.map((status) => ({
      status,
      orders: orders.filter((order) => order.status === status),
    }));
  }, [orders]);

  return (
    <section className="mt-16 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
      <div className="rounded-3xl border border-white/10 bg-white/6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">Orders</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Live order orchestration
            </h2>
          </div>
          <div className="flex gap-3 text-xs text-white/60">
            <span>Auto dispatch</span>
            <span>·</span>
            <span>Kitchen load balanced</span>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto pb-4">
          <div className="flex min-w-[980px] gap-5">
            {grouped.map(({ status, orders }, columnIndex) => {
              const meta = statusMeta[status];
              const Icon = meta.icon;
              return (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: columnIndex * 0.1 + 0.1,
                    duration: 0.7,
                    ease: [0.21, 0.65, 0.24, 0.99],
                  }}
                  className="flex-1 rounded-3xl border border-white/12 bg-[#0c1022]/70 p-5"
                >
                  <div
                    className={`glow-ring relative mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-br ${meta.gradient} px-4 py-3`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl bg-black/20 p-2 text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                          {meta.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {orders.length} {orders.length === 1 ? 'ticket' : 'tickets'}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold ${meta.accent}`}>
                      {Math.max(0, orders.length * 4)} mins load
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {orders.map((order, cardIndex) => {
                      const isFinal = order.status === 'served';
                      return (
                        <motion.article
                          key={order.id}
                          className="glass-panel relative flex flex-col gap-4 p-5"
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: columnIndex * 0.12 + cardIndex * 0.05 + 0.2,
                            duration: 0.55,
                            ease: [0.21, 0.65, 0.24, 0.99],
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {order.table}
                                <span className="ml-2 text-xs font-normal text-white/50">
                                  {order.guests} guests
                                </span>
                              </p>
                              <p className="mt-1 text-xs text-white/40">
                                {timeSince(order.startedAt)}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1 text-right text-xs text-white/60">
                              <span>#{order.id}</span>
                              <span>Total ${order.total}</span>
                              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
                                <Timer className="h-3 w-3" />
                                {formatMinutes(order.etaMinutes)}
                              </span>
                            </div>
                          </div>

                          <ul className="flex flex-col gap-1.5 text-sm text-white/70">
                            {order.items.map((item) => (
                              <li key={`${order.id}-${item.name}`} className="flex items-baseline justify-between gap-4">
                                <span className="flex items-center gap-2">
                                  <span className="text-xs text-white/40">×{item.qty}</span>
                                  {item.name}
                                </span>
                                {item.notes ? (
                                  <span className="text-xs text-white/40">{item.notes}</span>
                                ) : null}
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-2 text-xs text-white/60">
                            {order.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => moveForward(order.id)}
                            className="group inline-flex items-center justify-center gap-2 self-end rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-white/40 hover:bg-white/20 hover:text-white"
                          >
                            <Send className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                            {isFinal ? 'Completed' : 'Advance'}
                          </button>
                        </motion.article>
                      );
                    })}
                    {!orders.length && (
                      <div className="rounded-2xl border border-dashed border-white/10 bg-white/2 p-6 text-center text-sm text-white/40">
                        Relaxed pace. Incoming tickets will appear here.
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="flex h-full flex-col gap-5 rounded-3xl border border-white/10 bg-[#0c1022]/60 p-6">
        <div className="glass-panel gap-4 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Kitchen telemetry</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">Live</span>
          </div>
          <div className="flex flex-col gap-3 text-sm text-white/70">
            <div className="relative flex items-center justify-between rounded-xl bg-white/10 p-3">
              <span>Heat load</span>
              <span className="text-emerald-300">Optimal</span>
              <span className="absolute inset-x-4 bottom-1 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
            </div>
            <div className="relative flex items-center justify-between rounded-xl bg-white/10 p-3">
              <span>Fire staging</span>
              <span className="text-amber-300">+2 min</span>
              <span className="absolute inset-x-4 bottom-1 h-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-pink-400" />
            </div>
            <div className="relative flex items-center justify-between rounded-xl bg-white/10 p-3">
              <span>Runner availability</span>
              <span className="text-sky-300">3 active</span>
              <span className="absolute inset-x-4 bottom-1 h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400" />
            </div>
          </div>
        </div>

        <div className="glass-panel flex flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Course pacing</h3>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
              Auto-sync
            </span>
          </div>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            <li className="flex items-center justify-between gap-4 rounded-xl bg-white/10 px-4 py-3">
              <span>Appetizers</span>
              <span className="text-white/40">On time</span>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-xl bg-white/10 px-4 py-3">
              <span>Main Entrées</span>
              <span className="text-amber-200">+4 min</span>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-xl bg-white/10 px-4 py-3">
              <span>Desserts</span>
              <span className="text-emerald-300">-6 min</span>
            </li>
            <li className="flex items-center justify-between gap-4 rounded-xl bg-white/10 px-4 py-3">
              <span>Mixology queue</span>
              <span className="text-sky-300">2 signature drinks</span>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

export default OrderBoard;
