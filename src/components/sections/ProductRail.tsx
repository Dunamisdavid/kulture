"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRODUCTS, naira, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { useRangeFilter } from "@/lib/ui-store";
import { ProductVisual, visualWidth } from "@/components/art/ProductVisual";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "aya", label: "Aya Tigernut" },
  { id: "halo", label: "Halo Greek" },
  { id: "bundle", label: "Bundles" },
] as const;

export function ProductRail() {
  const { filter, setFilter } = useRangeFilter();
  const rail = useRef<HTMLDivElement>(null);
  const items = PRODUCTS.filter((p) => filter === "all" || p.category === filter);

  useEffect(() => { rail.current?.scrollTo({ left: 0, behavior: "smooth" }); }, [filter]);
  useDragScroll(rail);

  return (
    <section id="range" className="scroll-mt-20 py-[80px] lg:py-[110px]">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(36px,4.6vw,60px)]"><em className="italic">Discover</em> our range –</h2>
          <div role="group" aria-label="Filter products" className="flex flex-wrap gap-2.5">
            {FILTERS.map((f) => (
              <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}
                className={`rounded-full border-[1.5px] px-[18px] py-[9px] text-[13px] font-semibold transition hover:border-ink ${filter === f.id ? "border-ink bg-ink text-white" : "border-line bg-white"}`}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={rail} className="no-scrollbar relative -mx-5 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-[30px] pt-1.5">
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.06 }} className="flex-[0_0_290px] snap-start">
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-end gap-2.5">
          {[-1, 1].map((d) => (
            <button key={d} aria-label={d < 0 ? "Scroll products left" : "Scroll products right"}
              onClick={() => rail.current?.scrollBy({ left: 310 * d, behavior: "smooth" })}
              className="grid size-[46px] place-items-center rounded-full border-[1.5px] border-ink transition hover:bg-ink hover:text-white">
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [size, setSize] = useState(0);
  const chosen = p.sizes[size];

  return (
    <article className="group relative overflow-hidden rounded-[20px] border border-line bg-white transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_50px_-30px_rgba(58,36,22,.45)]">
      <div className="relative grid h-[300px] place-items-center overflow-hidden" style={{ background: p.background }}>
        <span className="absolute size-[220px] rounded-full bg-white/40 transition-transform duration-700 group-hover:scale-[1.35]" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em]">{p.tag}</span>
        <div className={`relative transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105 ${visualWidth(p)}`}>
          <ProductVisual product={p} sizes="200px" />
        </div>
      </div>
      <div className="px-[18px] pb-[18px] pt-4">
        <h3 className="mb-0.5 font-sans text-base font-bold tracking-normal">{p.name}</h3>
        <p className="mb-3.5 text-[13px] text-muted">{p.description}</p>
        <div className="flex items-center justify-between rounded-[10px] bg-butter py-1 pl-3 pr-1 text-[13px] font-bold">
          <label htmlFor={`size-${p.id}`} className="sr-only">Size for {p.name}</label>
          <select id={`size-${p.id}`} value={size} onChange={(e) => setSize(+e.target.value)} className="max-w-[120px] cursor-pointer bg-transparent font-semibold outline-none">
            {p.sizes.map((s, i) => <option key={s.label} value={i}>{s.label}</option>)}
          </select>
          <button onClick={() => add({ id: p.id, name: p.name, size: chosen.label, price: chosen.price })}
            className="rounded-lg bg-ink px-3 py-2 font-bold tabular-nums text-white transition-colors hover:bg-berry">
            {naira(chosen.price)} +
          </button>
        </div>
      </div>
    </article>
  );
}

/** Click-and-drag scrolling for mouse users (touch already swipes). */
function useDragScroll(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false, startX = 0, startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || (e.target as HTMLElement).closest("button,select")) return;
      down = true; startX = e.clientX; startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none"; el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => { if (down) el.scrollLeft = startLeft - (e.clientX - startX); };
    const onUp = () => { down = false; el.style.scrollSnapType = ""; el.style.cursor = ""; };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [ref]);
}