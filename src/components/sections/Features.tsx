"use client";

import { getProduct } from "@/lib/data";
import { useRangeFilter } from "@/lib/ui-store";
import { ProductVisual } from "@/components/art/ProductVisual";
import { Ingredient } from "@/components/art/Ingredient";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const CHECKS = [
  "Naturally creamy, with no dairy at all",
  "Sweetened only with dates and coconut",
  "High in fibre, iron and resistant starch",
];

export function Features() {
  const setFilter = useRangeFilter((s) => s.setFilter);

  return (
    <>
      {/* Aya */}
      <section id="aya" className="scroll-mt-20 pb-[80px] pt-10 lg:pb-[110px]">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative grid h-[340px] place-items-center overflow-hidden rounded-card bg-[linear-gradient(140deg,#F8E7C9,#E9B978)] sm:h-[440px]">
            <span className="absolute size-[340px] rounded-full bg-white/35" />
            <Ingredient name="tigernut" className="absolute left-[10%] top-[12%] w-[70px] animate-bob" />
            <Ingredient name="coconut" className="absolute right-[12%] top-[18%] w-20 animate-bob [animation-delay:-2s]" />
            <Ingredient name="ginger" className="absolute bottom-[10%] left-[16%] w-[60px] animate-bob [animation-delay:-4s]" />
            <Ingredient name="date" className="absolute bottom-[12%] right-[16%] w-[54px] animate-bob [animation-delay:-1s]" />
            <div className="relative w-[150px] -rotate-6 sm:w-[170px]"><ProductVisual product={getProduct("aya-ginger")} /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Aya · Tigernut drink</p>
            <h2 className="mb-[18px] mt-2 text-[clamp(36px,4.4vw,58px)]">Drink <em className="italic">real tigernut</em> every time</h2>
            <p className="mb-[26px] max-w-[440px] text-muted">Fresh tigernuts from northern farms, soaked overnight and pressed cold. No powder, no flour fillers, no preservatives.</p>
            <ul className="mb-[30px] grid gap-3">
              {CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-3 text-[15px] font-semibold">
                  <span className="grid size-[22px] flex-none place-items-center rounded-full bg-butter text-xs">✓</span>{c}
                </li>
              ))}
            </ul>
            <Button href="#range" variant="dark" onClick={() => setFilter("aya")}>Shop Aya</Button>
          </Reveal>
        </div>
      </section>

      {/* Halo */}
      <section id="halo" className="scroll-mt-20 pb-[80px] lg:pb-[110px]">
        <div className="wrap">
          <Reveal className="relative grid min-h-[400px] items-center gap-5 overflow-hidden rounded-card bg-[linear-gradient(100deg,#FFF1E6_0%,#FBD3DE_55%,#F6B9CB_100%)] px-7 py-11 lg:grid-cols-[1fr_1.1fr_.6fr] lg:px-16 lg:py-14">
            <div className="absolute -top-3.5 right-10 grid size-[110px] animate-float place-items-center overflow-hidden rounded-[22px] border-[5px] border-paper bg-sky shadow-[0_18px_30px_-18px_rgba(0,0,0,.35)]">
              <Ingredient name="blueberry" className="w-[70px]" />
            </div>
            <div>
              <p className="eyebrow !text-[#8a5b68]">Halo · Greek yogurt</p>
              <h2 className="mb-4 mt-2 text-[clamp(34px,4vw,54px)]">Indulge in <em className="italic text-berry">thick, strained</em> yogurt</h2>
              <p className="mb-[26px] max-w-[340px] text-[#5a4a50]">Cultured with live probiotics and strained until spoon-standing thick. Eat it, drink it, or blend it into smoothies.</p>
              <Button href="#range" onClick={() => setFilter("halo")}>Shop Halo</Button>
            </div>
            <div className="relative h-[300px] lg:h-[360px]">
              <div className="absolute left-1/2 top-1/2 w-[220px] -translate-x-1/2 -translate-y-1/2 -rotate-4 lg:w-[260px]"><ProductVisual product={getProduct("halo-mango")} /></div>
              <Ingredient name="mango" className="absolute left-[4%] top-[8%] w-14 animate-bob" />
              <Ingredient name="strawberry" className="absolute bottom-[8%] right-[6%] w-14 animate-bob [animation-delay:-3s]" />
            </div>
            <div className="lg:text-right">
              <div className="font-display text-[clamp(56px,6vw,88px)] leading-none"><CountUp to={15} />g</div>
              <small className="block text-[13px] font-semibold text-[#5a4a50]">protein in every 200g cup</small>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}