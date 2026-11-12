"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Brand } from "@/lib/data";
import { getProduct } from "@/lib/data";
import { ProductVisual } from "@/components/art/ProductVisual";
import { Ingredient, type IngredientName } from "@/components/art/Ingredient";
import { Button } from "@/components/ui/Button";
import { useRangeFilter } from "@/lib/ui-store";
import { CountUp } from "@/components/ui/CountUp";

const WORLDS = {
  aya: {
    bg: "radial-gradient(120% 90% at 85% 30%, #FFE7B8 0%, #F3C987 38%, #D99A57 100%)",
    ink: "#2B1A10", accent: "#7A3E1D",
    title: ["Creamy", "tigernut", ", poured cold."],
    copy: "Aya is pressed from soaked tigernuts, sweetened only with dates and blended in small batches for that rich, nutty kunun aya taste.",
    stat: { n: 100, unit: "%", label: "plant-based, dairy-free and lactose-free" },
    mini: { icon: "tigernut" as IngredientName, title: "Tigernut + Date", sub: "Bestseller" },
    product: "aya-classic",
    floaters: [
      { name: "tigernut", cls: "left-[4%] top-[8%] w-[70px]" },
      { name: "date", cls: "right-[6%] top-[20%] w-14" },
      { name: "coconut", cls: "left-[10%] bottom-[12%] w-[90px]" },
      { name: "tigernut", cls: "right-[34%] bottom-[4%] w-[58px]" },
    ],
  },
  halo: {
    bg: "radial-gradient(120% 90% at 85% 30%, #FFFFFF 0%, #FBD9E3 40%, #C9DDF2 100%)",
    ink: "#1F2340", accent: "#D8436C",
    title: ["Thick, strained", "Greek", " goodness."],
    copy: "Halo is cultured slowly and strained three times, so every spoon is thick, tangy and packed with protein. Swirl it, sip it, top it.",
    stat: { n: 15, unit: "g", label: "protein in every 200g cup" },
    mini: { icon: "strawberry" as IngredientName, title: "Strawberry Swirl", sub: "New flavour" },
    product: "halo-strawberry",
    floaters: [
      { name: "strawberry", cls: "left-[6%] top-[10%] w-[70px]" },
      { name: "blueberry", cls: "right-[4%] top-[16%] w-12" },
      { name: "honey", cls: "left-[2%] bottom-[16%] w-20" },
      { name: "mint", cls: "right-[38%] bottom-[4%] w-16" },
    ],
  },
} as const;

const ORDER: Brand[] = ["aya", "halo"];
const ease = [0.7, 0, 0.2, 1] as const;

export function Hero() {
  const setFilter = useRangeFilter((s) => s.setFilter);
  const [world, setWorld] = useState<Brand>("aya");
  const [manual, setManual] = useState(false);
  const w = WORLDS[world];
  const btnRefs = useRef<Record<Brand, HTMLButtonElement | null>>({ aya: null, halo: null });
  const [knob, setKnob] = useState({ left: 5, width: 0 });

  const measure = useCallback(() => {
    const b = btnRefs.current[world];
    if (b) setKnob({ left: b.offsetLeft, width: b.offsetWidth });
  }, [world]);

  useEffect(() => { measure(); }, [measure]);
  useEffect(() => {
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // auto-rotate; slows down after the visitor picks one
  useEffect(() => {
    const t = setTimeout(() => setWorld((x) => (x === "aya" ? "halo" : "aya")), manual ? 12000 : 7000);
    return () => clearTimeout(t);
  }, [world, manual]);

  return (
    <section className="pb-10 pt-[18px]">
      <div className="wrap">
        <div
          className="relative grid min-h-[600px] items-center overflow-hidden rounded-card px-7 pb-[90px] pt-10 transition-[background] duration-1000 lg:grid-cols-[1.05fr_1fr] lg:py-14 lg:pl-16 lg:pr-14"
          style={{ background: w.bg, color: w.ink }}
        >
          <HeroRibbon color={w.ink} />

          {/* copy */}
          <div className="relative z-[3]">
            <div role="group" aria-label="Choose a drink" className="relative mb-7 inline-flex rounded-full bg-white/55 p-[5px] backdrop-blur">
              <motion.span className="absolute inset-y-[5px] rounded-full" style={{ background: w.ink }}
                animate={{ left: knob.left, width: knob.width }} transition={{ duration: 0.55, ease }} />
              {ORDER.map((b) => (
                <button key={b} ref={(el) => { btnRefs.current[b] = el; }}
                  aria-pressed={world === b}
                  onClick={() => { setWorld(b); setManual(true); }}
                  className={`relative z-[1] rounded-full px-[18px] py-[9px] text-[13px] font-bold transition-colors duration-300 ${world === b ? "text-white" : ""}`}>
                  {b === "aya" ? "Aya Tigernut" : "Halo Greek"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={world} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5 }}>
                <h1 className="mb-[22px] text-[44px] sm:text-[clamp(44px,6.2vw,84px)]">
                  {w.title[0]} <em className="italic" style={{ color: w.accent }}>{w.title[1]}</em>{w.title[2]}
                </h1>
                <p className="mb-8 max-w-[420px] text-[17px] opacity-85">{w.copy}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-3.5">
              <Button href="#range" onClick={() => setFilter(world)}>Shop {world === "aya" ? "Aya" : "Halo"}</Button>
              <Button href="#process" variant="ghost">How it&apos;s made</Button>
            </div>
          </div>

          {/* product stage */}
          <div className="relative z-[2] h-[360px] sm:h-[420px] lg:h-[520px]" aria-hidden="true">
            <AnimatePresence>
              {w.floaters.map((f, i) => (
                <motion.div key={world + i} className={`absolute ${f.cls}`}
                  initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}>
                  <Ingredient name={f.name} className="w-full animate-bob" style={{ animationDelay: `${-i * 1.5}s` }} />
                </motion.div>
              ))}
            </AnimatePresence>
            <AnimatePresence>
              <motion.div key={world}
                className={`absolute left-1/2 top-1/2 ${world === "aya" ? "w-[150px] sm:w-[190px]" : "w-[230px] sm:w-[300px]"}`}
                initial={{ x: "-50%", y: "120%", rotate: world === "aya" ? 30 : -30, opacity: 0 }}
                animate={{ x: "-50%", y: world === "aya" ? "-50%" : "-44%", rotate: world === "aya" ? -8 : 4, opacity: 1 }}
                exit={{ x: "-50%", y: "120%", rotate: world === "aya" ? -30 : 30, opacity: 0 }}
                transition={{ duration: 1, ease }}>
                <ProductVisual product={getProduct(w.product)} priority sizes="300px" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* mini badge */}
          <div className="absolute right-10 top-9 z-[3] hidden items-center gap-2.5 rounded-[18px] bg-white/70 py-2 pl-2 pr-3.5 text-xs font-bold backdrop-blur lg:flex">
            <span className="grid size-11 place-items-center rounded-xl bg-white"><Ingredient name={w.mini.icon} className="w-[30px]" /></span>
            <span>{w.mini.title}<br /><span className="font-medium opacity-70">{w.mini.sub}</span></span>
          </div>

          {/* stat */}
          <div className="absolute bottom-6 right-6 z-[3] text-right lg:bottom-9 lg:right-10">
            <div className="font-display text-[42px] leading-none sm:text-[56px]">
              <CountUp key={world} to={w.stat.n} />{w.stat.unit}
            </div>
            <small className="ml-auto block max-w-[130px] text-xs font-semibold opacity-75">{w.stat.label}</small>
          </div>

          {/* progress */}
          <div className="absolute bottom-[30px] left-7 z-[3] flex gap-2 lg:left-16">
            {ORDER.map((b) => (
              <span key={b} className="h-1 w-[38px] overflow-hidden rounded-sm bg-black/15">
                {world === b && <i key={world + String(manual)} className="block h-full w-0 animate-fill" style={{ background: w.ink, animationDuration: manual ? "12s" : "7s" }} />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Text that slides along a curved ribbon (desktop only). */
function HeroRibbon({ color }: { color: string }) {
  const ref = useRef<SVGTextPathElement>(null);
  useEffect(() => {
    let off = 0, raf = 0;
    const loop = () => {
      off = (off - 0.06) % 50;
      ref.current?.setAttribute("startOffset", `${off}%`);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const text = "COLD-PRESSED TIGERNUT ✦ STRAINED GREEK YOGURT ✦ NO ADDED SUGAR ✦ MADE IN NIGERIA ✦ ";
  return (
    <svg className="pointer-events-none absolute inset-0 z-[1] hidden size-full lg:block" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true">
      <path id="hero-rib" d="M-40 650 C 260 640, 480 560, 640 450 S 940 170, 1260 130" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="34" strokeLinecap="round" />
      <text dy="5" fontSize="15" fontWeight="700" letterSpacing=".06em" fill={color} className="transition-[fill] duration-700">
        <textPath ref={ref} href="#hero-rib">{text.repeat(3)}</textPath>
      </text>
    </svg>
  );
}