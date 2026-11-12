"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCartCount } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-hydrated";
import { Button } from "@/components/ui/Button";

const LINKS = [
  { href: "#range", label: "Shop all" },
  { href: "#aya", label: "Aya Tigernut" },
  { href: "#halo", label: "Halo Greek" },
  { href: "#process", label: "How it's made" },
  { href: "#love", label: "Reviews" },
];

export function Nav() {
  const count = useCartCount();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mounted = useHydrated(); // cart count comes from localStorage

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b bg-paper/80 backdrop-blur-md transition-colors ${scrolled ? "border-line" : "border-transparent"}`}>
      <div className="wrap flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="font-display text-[28px] font-semibold tracking-[-0.03em]" aria-label="Kulture home">
          kulture<span className="text-berry">.</span>
        </Link>

        <ul className="hidden gap-[30px] text-sm font-semibold lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3.5">
          <Link href="/cart" aria-label={`Cart, ${count} items`} className="relative grid size-[42px] place-items-center rounded-full border-[1.5px] border-line bg-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" /><path d="M9 7V6a3 3 0 0 1 6 0v1" /></svg>
            <motion.b key={count} initial={{ scale: 1.4 }} animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-berry px-1 text-[11px] text-white">
              {mounted ? count : 0}
            </motion.b>
          </Link>
          <div className="hidden sm:block"><Button href="#range">Sip now</Button></div>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Menu"
            className="grid size-[42px] place-items-center rounded-full bg-ink text-white lg:hidden">
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-current transition ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-current transition ${open ? "top-[5px] -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden">
            <ul className="wrap flex flex-col py-4">
              {LINKS.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-display text-3xl">{l.label}</a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}