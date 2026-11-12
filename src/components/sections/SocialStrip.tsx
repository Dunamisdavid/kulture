import Image from "next/image";
import { Fragment } from "react";
import { SOCIAL_TILES, getProduct } from "@/lib/data";
import { ProductVisual } from "@/components/art/ProductVisual";

const tilts = [-5, 3, -2, 6, -4, 2, -6, 4];
const isBottle = (id: string) => {
  const art = getProduct(id).art;
  return art !== "combo" && art.kind === "bottle";
};

export function SocialStrip() {
  const tiles = SOCIAL_TILES.map((t, i) => (
    <div key={i} className="relative grid h-[280px] w-[220px] flex-none place-items-center overflow-hidden rounded-[18px]" style={{ background: t.bg }}>
      {t.image ? (
        <Image src={t.image} alt={`Post by ${t.handle}`} fill sizes="220px" className="object-cover" />
      ) : t.quote ? (
        <p className="p-6 text-center font-display text-[22px] leading-[1.15] text-white">{t.quote}</p>
      ) : (
        <div className={isBottle(t.productId!) ? "w-[90px]" : "w-[170px]"} style={{ rotate: `${tilts[i]}deg` }}>
          <ProductVisual product={getProduct(t.productId!)} sizes="170px" />
        </div>
      )}
      <span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-bold">{t.handle}</span>
    </div>
  ));

  return (
    <section className="group py-[80px] lg:py-[110px]">
      <div className="wrap mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[clamp(36px,4.6vw,60px)]"><em className="italic">Sippin&apos;</em> on social</h2>
        <p className="max-w-[280px] text-sm text-muted">Tag <b>@kulturesips</b> with your Aya or Halo moment and we&apos;ll share our favourites.</p>
      </div>
      <div className="overflow-hidden py-1.5">
        <div className="flex w-max animate-marquee-slow gap-4 group-hover:[animation-play-state:paused]">
          {[0, 1].map((k) => <Fragment key={k}>{tiles}</Fragment>)}
        </div>
      </div>
    </section>
  );
}