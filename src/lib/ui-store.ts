"use client";

import { create } from "zustand";
import type { Category } from "./data";

/** Shared filter so buttons anywhere on the page can jump to a filtered product row. */
export const useRangeFilter = create<{ filter: Category | "all"; setFilter: (f: Category | "all") => void }>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));