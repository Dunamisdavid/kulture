const COLS = [
  { title: "Shop", links: ["Aya Tigernut", "Halo Greek", "Bundles", "Subscriptions"] },
  { title: "About", links: ["Our story", "How it's made", "Reviews", "Stockists"] },
  { title: "Help", links: ["Delivery areas", "Storage tips", "Returns", "FAQ"] },
];

export function Footer() {
  return (
    <footer className="mt-[110px] bg-espresso pb-8 pt-20 text-[#E8D9C6]">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-3.5 font-display text-[40px] font-semibold tracking-[-0.03em] text-white">kulture<span className="text-butter">.</span></div>
            <p className="max-w-[280px] text-sm opacity-75">Home of Aya Tigernut and Halo Greek Yogurt. Made fresh in small batches in Nigeria.</p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white">{c.title}</h4>
              <ul className="grid gap-2.5 text-sm opacity-80">
                {c.links.map((l) => <li key={l}><a href="#" className="hover:text-butter">{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white">Contact</h4>
            <ul className="grid gap-2.5 text-sm opacity-80">
              <li>hello@kulturesips.ng</li>
              <li>+234 800 000 0000</li>
              <li><a href="https://instagram.com/" className="hover:text-butter">Instagram</a></li>
              <li><a href="https://tiktok.com/" className="hover:text-butter">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div aria-hidden="true" className="mb-5 mt-14 overflow-hidden whitespace-nowrap font-display text-[clamp(80px,17vw,260px)] leading-[0.8] tracking-[-0.05em] text-white/5">kulture.</div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-[13px] opacity-70">
          <span>© 2026 Kulture Sips. All rights reserved.</span>
          <span>NAFDAC Reg. No: 00-0000 (Aya) · 00-0000 (Halo)</span>
        </div>
      </div>
    </footer>
  );
}