"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getProduct } from "@/lib/data";
import { ProductVisual } from "@/components/art/ProductVisual";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The "video" effect: a small rounded window grows to full screen as you scroll.
 * To use a real video, put a file in /public/videos/pour.mp4 and set VIDEO_SRC.
 */
const VIDEO_SRC: string | null = null; // e.g. "/videos/pour.mp4"

export function ExpandReveal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      defaults: { ease: "none" },
    });
    tl.fromTo(".xr-frame", { clipPath: "inset(22% 26% round 36px)" }, { clipPath: "inset(0% 0% round 0px)", duration: 0.7 }, 0)
      .fromTo(".xr-title", { scale: 0.6 }, { scale: 1, duration: 0.7 }, 0)
      .fromTo(".xr-prod", { yPercent: 60 }, { yPercent: 0, duration: 0.7 }, 0)
      .fromTo(".xr-label", { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
      .fromTo(".xr-copy", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0.45)
      .to({}, { duration: 0.3 }); // hold at full size
  }, { scope: root });

  return (
    <section ref={root} className="relative h-[260vh]" aria-label="Made slow, poured fresh">
      <div className="sticky top-0 grid h-screen place-items-center overflow-hidden">
        <div className="xr-label absolute left-5 top-[calc(22%-44px)] text-[13px] font-bold uppercase tracking-[0.14em] lg:left-[26%]">Scroll to pour ↓</div>

        <div className="xr-frame absolute inset-0 bg-[linear-gradient(115deg,#3A2416_0%,#7A3E1D_34%,#D8436C_66%,#F8D5DF_100%)] [clip-path:inset(22%_26%_round_36px)]">
          {VIDEO_SRC
            ? <video className="absolute inset-0 size-full object-cover" src={VIDEO_SRC} autoPlay muted loop playsInline />
            : <LiquidCanvas />}

          <div className="xr-prod absolute -bottom-[4%] left-[8%] w-[clamp(110px,13vw,190px)] -rotate-10">
            <ProductVisual product={getProduct("aya-coconut")} />
          </div>
          <div className="xr-prod absolute -bottom-[4%] right-[6%] w-[clamp(170px,20vw,300px)] rotate-8">
            <ProductVisual product={getProduct("halo-berry")} />
          </div>

          <div className="absolute inset-0 grid place-items-center p-5 text-center text-white">
            <div>
              <h2 className="xr-title text-[clamp(42px,7vw,110px)]">Made <em className="italic text-butter">slow.</em><br />Poured fresh.</h2>
              <p className="xr-copy mx-auto mt-[18px] max-w-[520px] text-[17px]">
                Two family recipes, one cold room. Tigernuts soak overnight, yogurt cultures for twelve hours, and both reach you within 72 hours of being made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Moving liquid waves and bubbles drawn on a canvas. */
function LiquidCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const cx = cv.getContext("2d")!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const size = () => {
      const d = Math.min(2, window.devicePixelRatio || 1);
      cv.width = cv.offsetWidth * d; cv.height = cv.offsetHeight * d;
      cx.setTransform(d, 0, 0, d, 0, 0);
    };
    size();
    window.addEventListener("resize", size);

    const bubbles = Array.from({ length: 38 }, () => ({ x: Math.random(), y: Math.random(), r: 2 + Math.random() * 7, s: 0.0006 + Math.random() * 0.0016 }));
    const layers = [
      { c: "rgba(255,246,230,.16)", a: 28, f: 0.0016, sp: 0.0006, y: 0.58 },
      { c: "rgba(248,213,223,.22)", a: 22, f: 0.0022, sp: -0.0008, y: 0.66 },
      { c: "rgba(255,252,246,.30)", a: 18, f: 0.0012, sp: 0.0011, y: 0.76 },
    ];

    let raf = 0;
    const draw = (t: number) => {
      const w = cv.offsetWidth, h = cv.offsetHeight;
      cx.clearRect(0, 0, w, h);
      for (const L of layers) {
        cx.beginPath(); cx.moveTo(0, h);
        for (let x = 0; x <= w; x += 12) {
          cx.lineTo(x, h * L.y + Math.sin(x * L.f + t * L.sp) * L.a + Math.sin(x * L.f * 2.3 - t * L.sp * 1.4) * L.a * 0.4);
        }
        cx.lineTo(w, h); cx.closePath(); cx.fillStyle = L.c; cx.fill();
      }
      for (const b of bubbles) {
        b.y -= b.s;
        if (b.y < -0.05) { b.y = 1.05; b.x = Math.random(); }
        cx.beginPath(); cx.arc(b.x * w + Math.sin(t * 0.001 + b.r) * 8, b.y * h, b.r, 0, Math.PI * 2);
        cx.fillStyle = "rgba(255,255,255,.18)"; cx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 size-full" />;
}