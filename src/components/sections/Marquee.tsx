import { Fragment } from "react";
import { Ingredient } from "@/components/art/Ingredient";

const WORDS: [string, string, string][] = [
  ["Cold-pressed ", "tigernut", ""],
  ["Strained ", "Greek", " yogurt"],
  ["No added ", "sugar", ""],
  ["Live ", "cultures", ""],
  ["Made in ", "Nigeria", ""],
];

export function Marquee() {
  const row = WORDS.map(([a, b, c], i) => (
    <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display text-[clamp(26px,3.4vw,44px)]">
      <span>{a}<em className="italic text-berry">{b}</em>{c}</span>
      <Ingredient name={i % 2 ? "strawberry" : "tigernut"} className="size-[34px]" />
    </span>
  ));
  return (
    <div className="overflow-hidden border-y border-line bg-white py-[26px]" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-12">
        {[0, 1].map((k) => <Fragment key={k}>{row}</Fragment>)}
      </div>
    </div>
  );
}
