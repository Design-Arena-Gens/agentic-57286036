'use client';

import { create } from 'zustand';

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'served';

export interface OrderItem {
  name: string;
  qty: number;
  notes?: string;
}

export interface Order {
  id: string;
  table: string;
  guests: number;
  startedAt: string;
  etaMinutes: number;
  priority: 'standard' | 'vip';
  tags: string[];
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

const statusFlow: OrderStatus[] = ['new', 'preparing', 'ready', 'served'];

const now = new Date();

const sampleOrders: Order[] = [
  {
    id: 'ORD-1024',
    table: 'A3',
    guests: 2,
    startedAt: new Date(now.getTime() - 6 * 60 * 1000).toISOString(),
    etaMinutes: 12,
    priority: 'vip',
    tags: ['Allergy: Nuts', 'Sommelier pairing'],
    status: 'new',
    total: 128,
    items: [
      { name: 'Smoked Burrata', qty: 1, notes: 'Extra basil oil' },
      { name: 'Firewood Ribeye', qty: 2, notes: 'Medium rare' },
    ],
  },
  {
    id: 'ORD-1025',
    table: 'Terrace 5',
    guests: 4,
    startedAt: new Date(now.getTime() - 14 * 60 * 1000).toISOString(),
    etaMinutes: 6,
    priority: 'standard',
    tags: ['Course: Main', 'Wine pairing'],
    status: 'preparing',
    total: 212,
    items: [
      { name: 'Charred Octopus', qty: 2 },
      { name: 'Truffle Risotto', qty: 3 },
    ],
  },
  {
    id: 'ORD-1026',
    table: 'Chef Counter',
    guests: 1,
    startedAt: new Date(now.getTime() - 24 * 60 * 1000).toISOString(),
    etaMinutes: 2,
    priority: 'vip',
    tags: ['Chef tasting', 'Photography'],
    status: 'ready',
    total: 186,
    items: [
      { name: 'Chef Tasting Flight', qty: 1 },
      { name: 'Smoked Negroni', qty: 1, notes: 'Tableside smoke' },
    ],
  },
  {
    id: 'ORD-1027',
    table: 'Garden 2',
    guests: 3,
    startedAt: new Date(now.getTime() - 38 * 60 * 1000).toISOString(),
    etaMinutes: 0,
    priority: 'standard',
    tags: ['Dessert course'],
    status: 'served',
    total: 94,
    items: [
      { name: 'Flambé Pineapple', qty: 2 },
      { name: 'Basque Cheesecake', qty: 1 },
    ],
  },
  {
    id: 'ORD-1028',
    table: 'Mezzanine 1',
    guests: 6,
    startedAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
    etaMinutes: 9,
    priority: 'standard',
    tags: ['Family style'],
    status: 'new',
    total: 268,
    items: [
      { name: 'Heirloom Flatbread', qty: 3 },
      { name: 'Aged Parmesan Gnocchi', qty: 2 },
    ],
  },
];

type OrderStore = {
  orders: Order[];
  moveForward: (id: string) => void;
  setStatus: (id: string, status: OrderStatus) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
  orders: sampleOrders,
  moveForward: (id) =>
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.id !== id) return order;
        const currentIndex = statusFlow.indexOf(order.status);
        const nextStatus = statusFlow[Math.min(currentIndex + 1, statusFlow.length - 1)];
        return { ...order, status: nextStatus };
      }),
    })),
  setStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order,
      ),
    })),
}));

export const orderStatusFlow = statusFlow;
