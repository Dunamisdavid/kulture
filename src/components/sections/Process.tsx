"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { STEPS, type Brand } from "@/lib/data";

export function Process() {
  const [brand, setBrand] = useState<Brand>("aya");

  return (
    <section id="process" className="scroll-mt-20">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-card bg-espresso px-7 py-[52px] text-[#F7EBDD] lg:px-16 lg:py-[72px]">
          <p className="eyebrow !text-[#d6c2aa]">How it&apos;s made</p>
          <h2 className="mt-2 max-w-[640px] text-[clamp(34px,4.4vw,58px)]">Small batches, <em className="italic text-butter">slow</em> hands, cold chain all the way.</h2>

          <div role="group" aria-label="Choose a process" className="mb-[52px] mt-7 flex gap-2.5">
            {(["aya", "halo"] as Brand[]).map((b) => (
              <button key={b} aria-pressed={brand === b} onClick={() => setBrand(b)}
                className={`rounded-full border-[1.5px] px-[18px] py-[9px] text-[13px] font-semibold transition ${brand === b ? "border-butter bg-butter text-ink" : "border-white/25"}`}>
                {b === "aya" ? "Aya Tigernut" : "Halo Greek"}
              </button>
            ))}
          </div>

          <div className="relative grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            <span className="absolute inset-x-7 top-[27px] hidden h-0.5 bg-white/15 lg:block" />
            <motion.span key={brand} className="absolute left-7 top-[27px] hidden h-0.5 bg-butter lg:block"
              initial={{ width: 0 }} whileInView={{ width: "calc(100% - 56px)" }} viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.6, ease: [0.6, 0.05, 0.2, 1] }} />
            {STEPS[brand].map(([title, text], i) => (
              <motion.div key={brand + title} className="relative"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.09 }}>
                <div className="mb-[22px] grid size-14 place-items-center rounded-full border-2 border-butter bg-espresso font-display text-[22px] text-butter">0{i + 1}</div>
                <h3 className="mb-1.5 font-sans text-lg font-bold tracking-normal">{title}</h3>
                <p className="text-sm opacity-75">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}