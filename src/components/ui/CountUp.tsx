"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/** Counts from 0 to `to` when it scrolls into view (or whenever `to` changes). */
export function CountUp({ to, duration = 1.3 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => (el.textContent = Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref} className="tabular-nums">{to}</span>;
}