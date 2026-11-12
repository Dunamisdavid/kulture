"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { naira } from "@/lib/data";
import { useHydrated } from "@/lib/use-hydrated";

const WHATSAPP_NUMBER = "2348000000000"; // business number, international format without +

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const mounted = useHydrated();

  const list = mounted ? items : [];
  const total = list.reduce((n, i) => n + i.price * i.qty, 0);
  const message = encodeURIComponent(
    "Hello Kulture, I'd like to order:\n" +
      list.map((i) => `• ${i.qty} × ${i.name} (${i.size}) — ${naira(i.price * i.qty)}`).join("\n") +
      `\nTotal: ${naira(total)}`
  );

  return (
    <section className="wrap min-h-[60vh] py-16">
      <h1 className="mb-8 text-[clamp(40px,5vw,64px)]">Your <em className="italic text-berry">cart</em></h1>

      {list.length === 0 ? (
        <p className="text-muted">Your cart is empty. <Link href="/#range" className="font-bold text-ink underline">Browse the range</Link>.</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-line rounded-[20px] border border-line bg-white">
            {list.map((i) => (
              <li key={i.id + i.size} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <b className="block">{i.name}</b>
                  <span className="text-sm text-muted">{i.size} · Qty {i.qty}</span>
                </div>
                <div className="flex items-center gap-4">
                  <b className="tabular-nums">{naira(i.price * i.qty)}</b>
                  <button onClick={() => remove(i.id, i.size)} className="text-sm text-berry underline">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-[20px] bg-espresso p-6 text-[#F7EBDD]">
            <div className="mb-6 flex justify-between text-lg"><span>Total</span><b className="tabular-nums">{naira(total)}</b></div>
            {/* TODO: replace with Paystack checkout */}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
              className="mb-3 block rounded-full bg-butter py-3 text-center font-bold text-ink">Order on WhatsApp</a>
            <button onClick={clear} className="w-full text-sm underline opacity-70">Clear cart</button>
          </aside>
        </div>
      )}
    </section>
  );
}