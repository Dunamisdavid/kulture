"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { REVIEWS } from "@/lib/data";

function usePerView() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const set = () => setN(mq.matches ? 1 : 3);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return n;
}

export function Testimonials() {
  const perView = usePerView();
  const pages = Math.ceil(REVIEWS.length / perView);
  const [page, setPage] = useState(0);
  const current = Math.min(page, pages - 1);

  useEffect(() => {
    const t = setTimeout(() => setPage((p) => (p + 1) % pages), 5500);
    return () => clearTimeout(t);
  }, [page, pages]);

  return (
    <section id="love" className="scroll-mt-20 pb-[80px] lg:pb-[110px]">
      <div className="wrap">
        <div className="overflow-hidden rounded-card bg-[linear-gradient(180deg,#FDE3EA_0%,#FBEFF2_100%)] px-5 pb-9 pt-12 text-center lg:px-12 lg:pb-12 lg:pt-16">
          <h2 className="mb-10 text-[clamp(34px,4.2vw,54px)]">Our people <em className="italic text-berry">love us</em></h2>
          <div className="overflow-hidden">
            <motion.div className="flex" animate={{ x: `-${current * 100}%` }} transition={{ duration: 0.8, ease: [0.6, 0.05, 0.2, 1] }}>
              {REVIEWS.map((r) => (
                <div key={r.name} className="flex-none px-2.5" style={{ width: `${100 / perView}%` }}>
                  <article className="flex h-full flex-col gap-3 rounded-[20px] bg-white p-[26px] text-left">
                    <h3 className="text-[22px]">{r.title}</h3>
                    <p className="flex-1 text-[14.5px] text-[#4d4540]">{r.body}</p>
                    <div className="flex items-center gap-3 border-t border-line pt-3.5">
                      <span className="grid size-10 place-items-center rounded-full font-extrabold text-white" style={{ background: r.color }}>{r.name[0]}</span>
                      <div className="flex-1 text-[13px] leading-tight"><b className="block text-sm">{r.name}</b>{r.city}</div>
                      <span className="rounded-full bg-butter px-2.5 py-0.5 text-[13px] font-bold">5.0 ★</span>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mt-7 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button key={i} aria-label={`Show reviews page ${i + 1}`} aria-current={i === current}
                onClick={() => setPage(i)}
                className={`h-[9px] rounded-full transition-all duration-300 ${i === current ? "w-[30px] bg-ink" : "w-[9px] bg-black/20"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}