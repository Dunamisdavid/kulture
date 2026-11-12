import { useId } from "react";
import type { BottleArt, CupArt, ProductArt as Art } from "@/lib/data";
import { Ingredient } from "./Ingredient";

function Bottle({ a }: { a: BottleArt }) {
  const g = useId();
  const body = "M46 38h28v16c0 10 16 20 20 30 4 8 6 14 6 24v168c0 10-6 16-16 16H36c-10 0-16-6-16-16V108c0-10 2-16 6-24 4-10 20-20 20-30z";
  return (
    <svg viewBox="0 0 120 300" role="img" aria-label={`Aya ${a.flavor} tigernut drink`} className="w-full h-auto">
      <defs>
        <linearGradient id={g} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".18" />
          <stop offset=".35" stopColor="#fff" stopOpacity=".25" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="294" rx="44" ry="5" fill="#000" opacity=".15" />
      <rect x="40" y="6" width="40" height="32" rx="6" fill={a.cap} />
      {Array.from({ length: 7 }, (_, i) => <rect key={i} x={43 + i * 5.2} y="10" width="2" height="24" rx="1" fill="#fff" opacity=".18" />)}
      <path d={body} fill={a.liquid} />
      <path d={body} fill={`url(#${g})`} />
      <rect x="20" y="132" width="80" height="118" fill={a.label} />
      <rect x="20" y="132" width="80" height="6" fill={a.accent} />
      <rect x="20" y="244" width="80" height="6" fill={a.accent} />
      <text x="60" y="172" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontSize="30" fontStyle="italic" fill={a.accent}>aya</text>
      <text x="60" y="186" textAnchor="middle" fontFamily="var(--font-manrope), sans-serif" fontSize="6.5" fontWeight="800" letterSpacing="1.6" fill={a.accent}>TIGERNUT DRINK</text>
      <svg x="48" y="194" width="24" height="24" viewBox="0 0 100 100"><Ingredient name="tigernut" /></svg>
      <text x="60" y="236" textAnchor="middle" fontFamily="var(--font-manrope), sans-serif" fontSize="7.5" fontWeight="700" fill="#1E1A17">{a.flavor}</text>
      <rect x="28" y="96" width="6" height="190" rx="3" fill="#fff" opacity=".28" />
    </svg>
  );
}

function Cup({ a }: { a: CupArt }) {
  const g = useId();
  const body = "M18 42 L34 166 q2 12 16 12 h100 q14 0 16-12 L182 42z";
  return (
    <svg viewBox="0 0 200 190" role="img" aria-label={`Halo ${a.flavor} Greek yogurt`} className="w-full h-auto">
      <defs>
        <linearGradient id={g} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".12" />
          <stop offset=".3" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".16" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="182" rx="70" ry="6" fill="#000" opacity=".14" />
      <path d={body} fill="#FFFDF8" />
      <path d="M26 92 L172 92 L165 146 L35 146z" fill={a.band} />
      <path d={body} fill={`url(#${g})`} />
      <ellipse cx="100" cy="40" rx="86" ry="18" fill={a.lid} />
      <ellipse cx="100" cy="36" rx="86" ry="18" fill={a.lid} />
      <ellipse cx="100" cy="36" rx="70" ry="12" fill="#fff" opacity=".35" />
      <text x="100" y="40" textAnchor="middle" fontFamily="var(--font-manrope), sans-serif" fontSize="8" fontWeight="800" letterSpacing="2" fill={a.accent} opacity=".8">STRAINED · 200g</text>
      <text x="100" y="80" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontSize="30" fontStyle="italic" fill={a.accent}>halo</text>
      <text x="100" y="116" textAnchor="middle" fontFamily="var(--font-manrope), sans-serif" fontSize="8" fontWeight="800" letterSpacing="2.4" fill="#fff">GREEK YOGURT</text>
      <text x="100" y="134" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontSize="14" fill="#fff">{a.flavor}</text>
      <text x="100" y="162" textAnchor="middle" fontFamily="var(--font-manrope), sans-serif" fontSize="7" fontWeight="700" fill="#6F655D">15g PROTEIN · LIVE CULTURES</text>
    </svg>
  );
}

export function ProductArt({ art }: { art: Art }) {
  return art.kind === "bottle" ? <Bottle a={art} /> : <Cup a={art} />;
}