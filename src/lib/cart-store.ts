"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { id: string; name: string; size: string; price: number; qty: number };

type CartState = {
  items: CartItem[];
  toast: string | null;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string, size: string) => void;
  clear: () => void;
  hideToast: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      toast: null,
      add: (item) =>
        set((s) => {
          const found = s.items.find((i) => i.id === item.id && i.size === item.size);
          const items = found
            ? s.items.map((i) => (i === found ? { ...i, qty: i.qty + 1 } : i))
            : [...s.items, { ...item, qty: 1 }];
          return { items, toast: `${item.name} (${item.size}) added to cart` };
        }),
      remove: (id, size) => set((s) => ({ items: s.items.filter((i) => !(i.id === id && i.size === size)) })),
      clear: () => set({ items: [] }),
      hideToast: () => set({ toast: null }),
    }),
    { name: "kulture-cart", partialize: (s) => ({ items: s.items }) }
  )
);

export const useCartCount = () => useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
