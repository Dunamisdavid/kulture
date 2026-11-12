"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart-store";

export function Toast() {
  const toast = useCart((s) => s.toast);
  const hide = useCart((s) => s.hideToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(hide, 2200);
    return () => clearTimeout(t);
  }, [toast, hide]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center">
      <AnimatePresence>
        {toast && (
          <motion.div key={toast} initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }}
            className="flex items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            <span className="text-butter">✓</span>{toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}