import Link from "next/link";

type Variant = "butter" | "dark" | "ghost";

const styles: Record<Variant, { btn: string; arrow: string }> = {
  butter: { btn: "bg-butter text-ink", arrow: "bg-ink text-butter" },
  dark: { btn: "bg-ink text-white", arrow: "bg-butter text-ink" },
  ghost: { btn: "border-[1.5px] border-current bg-transparent", arrow: "" },
};

export function Button({ href, children, variant = "butter", onClick, arrow = true }: {
  href: string; children: React.ReactNode; variant?: Variant; onClick?: () => void; arrow?: boolean;
}) {
  const s = styles[variant];
  const showArrow = arrow && variant !== "ghost";
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full py-3 text-sm font-bold transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(0,0,0,.35)] ${showArrow ? "pl-[22px] pr-3.5" : "px-[22px]"} ${s.btn}`}
    >
      {children}
      {showArrow && (
        <span className={`grid size-7 place-items-center rounded-full transition-transform duration-300 group-hover:-rotate-45 ${s.arrow}`}>→</span>
      )}
    </Link>
  );
}