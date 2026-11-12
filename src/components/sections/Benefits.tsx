"use client";

import { useState } from "react";
import { BENEFITS } from "@/lib/data";
import { Ingredient } from "@/components/art/Ingredient";
import { Reveal } from "@/components/ui/Reveal";

export function Benefits() {
  const [active, setActive] = useState(2);
  return (
    <section className="pb-[80px] pt-5 text-center lg:pb-[110px]">
      <div className="wrap">
        <Reveal>
          <h2 className="mb-3 text-[clamp(36px,4.6vw,60px)]">Real goodness <em className="italic text-caramel">inside</em> every sip</h2>
          <p className="mx-auto mb-14 max-w-[520px] text-muted">Hover a circle to see what each drink brings to your day.</p>
        </Reveal>
        <div className="flex min-h-[250px] flex-wrap items-center justify-center gap-[clamp(12px,3vw,44px)]">
          {BENEFITS.map((b, i) => {
            const on = i === active;
            return (
              <div key={b.name} tabIndex={0} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} className="flex w-[150px] flex-col items-center gap-3.5">
                <div className={`grid place-items-center rounded-full transition-all duration-500 ${on ? "size-[124px] lg:size-40" : "size-24"}`} style={{ background: b.bg }}>
                  <Ingredient name={b.icon} className={`w-[46%] transition-transform duration-500 ${on ? "-rotate-8 scale-115" : ""}`} />
                </div>
                <b className="font-display text-[21px] font-normal">{b.name}</b>
                <small className={`min-h-[38px] max-w-[150px] text-[12.5px] text-muted transition-all duration-300 ${on ? "opacity-100" : "-translate-y-1.5 opacity-0"}`}>{b.text}</small>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}