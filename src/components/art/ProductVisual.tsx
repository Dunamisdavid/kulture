import Image from "next/image";
import type { Product, ProductArt as Art } from "@/lib/data";
import { getProduct } from "@/lib/data";
import { ProductArt } from "./ProductArt";

/**
 * Shows the real product photo when `product.image` is set,
 * otherwise falls back to the drawn bottle/cup.
 * Photos: transparent PNG/WebP cutouts in /public/images/products, ~1500px tall.
 */
export function ProductVisual({ product, className = "", sizes = "300px", priority = false }: {
  product: Product; className?: string; sizes?: string; priority?: boolean;
}) {
  if (product.image) {
    return (
      <div className={`relative aspect-[2/5] ${className}`}>
        <Image src={product.image} alt={product.name} fill sizes={sizes} priority={priority} className="object-contain drop-shadow-xl" />
      </div>
    );
  }
  if (product.art === "combo") {
    return (
      <div className={`flex items-end gap-0.5 ${className}`}>
        <div className="w-[72px] -rotate-6"><ProductArt art={getProduct("aya-classic").art as Art} /></div>
        <div className="w-[150px]"><ProductArt art={getProduct("halo-strawberry").art as Art} /></div>
      </div>
    );
  }
  return <div className={className}><ProductArt art={product.art} /></div>;
}

/** Width that suits each product shape. */
export const visualWidth = (p: Product) =>
  p.art === "combo" ? "" : p.art.kind === "bottle" ? "w-24" : "w-[190px]";