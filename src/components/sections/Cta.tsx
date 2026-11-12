"use client";

import { useState } from "react";
import { getProduct } from "@/lib/data";
import { ProductVisual } from "@/components/art/ProductVisual";

export function Cta() {
  const [plan, setPlan] = useState<"once" | "sub">("sub");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNote("Enter a valid email address, like name@example.com.");
      return;
    }
    // TODO: POST to /api/subscribe (Resend / Mailchimp)
    setNote(`Thanks! ${email} is on the ${plan === "sub" ? "subscription" : "launch"} list.`);
    setEmail("");
  }

  return (
    <section>
      <div className="wrap grid gap-5 lg:grid-cols-2">
        <div className="flex min-h-[440px] min-w-0 flex-col justify-between rounded-card bg-[linear-gradient(160deg,#7A3E1D,#3A2416)] px-[26px] py-9 text-[#FBEBD5] sm:p-14">
          <div>
            <h2 className="text-[clamp(36px,4.4vw,58px)]">Ready to taste <em className="italic text-butter">both worlds?</em></h2>
            <p className="mb-7 mt-4 max-w-[380px] opacity-80">Get a weekly fridge drop of Aya and Halo, delivered cold. Pause or skip any week.</p>
          </div>
          <div>
            <div role="group" aria-label="Order type" className="mb-[18px] inline-flex flex-wrap rounded-[18px] bg-white/10 p-[5px] sm:rounded-full">
              {([["once", "One-time order"], ["sub", "Subscribe & save 10%"]] as const).map(([id, label]) => (
                <button key={id} aria-pressed={plan === id} onClick={() => setPlan(id)}
                  className={`rounded-full px-4 py-2 text-[13px] font-bold ${plan === id ? "bg-[#FBEBD5] text-espresso" : ""}`}>{label}</button>
              ))}
            </div>
            <form onSubmit={submit} noValidate className="flex gap-1.5 rounded-full bg-white p-1.5">
              <label htmlFor="cta-email" className="sr-only">Email address</label>
              <input id="cta-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" autoComplete="email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-ink outline-none" />
              <button type="submit" className="whitespace-nowrap rounded-full bg-butter px-4 py-3 text-sm font-bold text-ink sm:px-5">Join the list</button>
            </form>
            <p role="status" className="mt-3 min-h-5 text-[13px] text-butter">{note}</p>
          </div>
        </div>

        <div className="relative grid min-h-[440px] place-items-end overflow-hidden rounded-card bg-blush">
          <div aria-hidden="true" className="absolute inset-x-0 top-[18px] text-center font-display text-[clamp(80px,11vw,170px)] leading-[0.85] tracking-[-0.04em] text-berry/15">SIP<br />SPOON</div>
          <div className="relative flex origin-bottom scale-[.72] items-end gap-1.5 pb-2.5 sm:scale-100 sm:pb-10">
            <div className="w-[110px] translate-y-2.5 -rotate-8"><ProductVisual product={getProduct("aya-cocoa")} /></div>
            <div className="z-[2] w-[200px]"><ProductVisual product={getProduct("halo-honey")} /></div>
            <div className="w-[110px] translate-y-2.5 rotate-8"><ProductVisual product={getProduct("aya-pineapple")} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}