/* All site content lives here. Later this can move to Sanity without changing components. */

export type Brand = "aya" | "halo";
export type Category = Brand | "bundle";

export type BottleArt = { kind: "bottle"; flavor: string; liquid: string; cap: string; label: string; accent: string };
export type CupArt = { kind: "cup"; flavor: string; lid: string; band: string; accent: string };
export type ProductArt = BottleArt | CupArt;

export type Product = {
  id: string;
  category: Category;
  name: string;
  description: string;
  tag: string;
  background: string;
  /** Real photo in /public/images/products. If missing, the drawn illustration is used. */
  image?: string;
  art: ProductArt | "combo";
  sizes: { label: string; price: number }[];
};

export const BRANDS = {
  aya: { name: "Aya Tigernut", short: "Aya" },
  halo: { name: "Halo Greek", short: "Halo" },
} as const;

export const PRODUCTS: Product[] = [
  { id: "aya-classic", category: "aya", name: "Aya Classic Date", description: "Tigernut, dates, coconut", tag: "Bestseller",
    background: "linear-gradient(160deg,#F7DDB0,#D99A57)", image: undefined,
    art: { kind: "bottle", flavor: "Classic Date", liquid: "#D9B07A", cap: "#3A2416", label: "#FFF6E6", accent: "#7A3E1D" },
    sizes: [{ label: "350ml", price: 2500 }, { label: "1 litre", price: 6000 }] },
  { id: "halo-strawberry", category: "halo", name: "Halo Strawberry", description: "Greek yogurt, real fruit", tag: "New",
    background: "linear-gradient(160deg,#FFE3EA,#F49AB2)",
    art: { kind: "cup", flavor: "Strawberry", lid: "#F2C3D0", band: "#D8436C", accent: "#D8436C" },
    sizes: [{ label: "200g", price: 3200 }, { label: "500g", price: 7000 }] },
  { id: "aya-coconut", category: "aya", name: "Aya Coconut Cream", description: "Tigernut, toasted coconut", tag: "Creamy",
    background: "linear-gradient(160deg,#FFF6E8,#E9D3B0)",
    art: { kind: "bottle", flavor: "Coconut Cream", liquid: "#EADAC0", cap: "#7A3E1D", label: "#FFFFFF", accent: "#3A2416" },
    sizes: [{ label: "350ml", price: 2700 }, { label: "1 litre", price: 6500 }] },
  { id: "halo-honey", category: "halo", name: "Halo Honey", description: "Greek yogurt, raw honey", tag: "Classic",
    background: "linear-gradient(160deg,#FFF3C9,#F6C850)",
    art: { kind: "cup", flavor: "Honey", lid: "#FFE7A3", band: "#D99A1E", accent: "#B57A0E" },
    sizes: [{ label: "200g", price: 3000 }, { label: "500g", price: 6800 }] },
  { id: "aya-ginger", category: "aya", name: "Aya Ginger Spice", description: "Tigernut, fresh ginger, clove", tag: "Warming",
    background: "linear-gradient(160deg,#FFD9B8,#E98A4A)",
    art: { kind: "bottle", flavor: "Ginger Spice", liquid: "#E2B56E", cap: "#B5541E", label: "#FFF2DD", accent: "#B5541E" },
    sizes: [{ label: "350ml", price: 2600 }, { label: "1 litre", price: 6200 }] },
  { id: "halo-berry", category: "halo", name: "Halo Wild Berry", description: "Greek yogurt, blueberry, blackberry", tag: "Antioxidant",
    background: "linear-gradient(160deg,#E2E6FB,#9EA6E6)",
    art: { kind: "cup", flavor: "Wild Berry", lid: "#CFD8F2", band: "#5B4FB4", accent: "#5B4FB4" },
    sizes: [{ label: "200g", price: 3400 }, { label: "500g", price: 7400 }] },
  { id: "aya-pineapple", category: "aya", name: "Aya Pineapple Kick", description: "Tigernut, pineapple, lime", tag: "Zesty",
    background: "linear-gradient(160deg,#FFF4C2,#F2C95C)",
    art: { kind: "bottle", flavor: "Pineapple", liquid: "#F2C95C", cap: "#2F7D4A", label: "#FFFBEA", accent: "#2F7D4A" },
    sizes: [{ label: "350ml", price: 2600 }, { label: "1 litre", price: 6200 }] },
  { id: "halo-mango", category: "halo", name: "Halo Mango", description: "Greek yogurt, ripe mango", tag: "Sunny",
    background: "linear-gradient(160deg,#FFE9C4,#F6A84A)",
    art: { kind: "cup", flavor: "Mango", lid: "#FFE2A8", band: "#E8892B", accent: "#E8892B" },
    sizes: [{ label: "200g", price: 3200 }, { label: "500g", price: 7000 }] },
  { id: "aya-cocoa", category: "aya", name: "Aya Cocoa Nib", description: "Tigernut, Nigerian cocoa", tag: "Rich",
    background: "linear-gradient(160deg,#E7CFB8,#8A5A3B)",
    art: { kind: "bottle", flavor: "Cocoa Nib", liquid: "#8A5A3B", cap: "#1E1A17", label: "#F5E6D3", accent: "#5A3420" },
    sizes: [{ label: "350ml", price: 2800 }, { label: "1 litre", price: 6800 }] },
  { id: "halo-plain", category: "halo", name: "Halo Plain Strained", description: "Unsweetened, 10% fat", tag: "Pure",
    background: "linear-gradient(160deg,#F4F8FD,#C9DDF2)",
    art: { kind: "cup", flavor: "Plain", lid: "#E6EEF8", band: "#1F2A44", accent: "#1F2A44" },
    sizes: [{ label: "200g", price: 2800 }, { label: "500g", price: 6200 }, { label: "1kg", price: 11500 }] },
  { id: "both-worlds", category: "bundle", name: "The Both Worlds Box", description: "6 Aya + 6 Halo, mixed flavours", tag: "Save 12%",
    background: "linear-gradient(120deg,#E9B978 0%,#E9B978 50%,#F49AB2 50%,#F49AB2 100%)",
    art: "combo", sizes: [{ label: "12 pack", price: 33000 }] },
  { id: "aya-weekly", category: "bundle", name: "Aya Weekly Fridge Pack", description: "7 × 350ml, choose flavours", tag: "Subscribe",
    background: "linear-gradient(160deg,#F7DDB0,#C9813A)",
    art: { kind: "bottle", flavor: "Weekly 7", liquid: "#D9B07A", cap: "#3A2416", label: "#FFF6E6", accent: "#7A3E1D" },
    sizes: [{ label: "7 pack", price: 16500 }] },
];

export const BENEFITS = [
  { icon: "leaf", name: "Plant-based", text: "Aya is 100% dairy-free and lactose-free.", bg: "#DDF0DC" },
  { icon: "gut", name: "Probiotic", text: "Halo carries live cultures for a happy gut.", bg: "#FBD9E3" },
  { icon: "protein", name: "Protein", text: "15g in every 200g cup of Halo.", bg: "#F3E4C8" },
  { icon: "tigernut", name: "Fibre", text: "Tigernuts are rich in resistant starch and fibre.", bg: "#F7E1C4" },
  { icon: "drop", name: "Calcium", text: "Halo supports strong bones and teeth.", bg: "#D6E6F5" },
  { icon: "bolt", name: "Energy", text: "Natural sugars from dates, never refined sugar.", bg: "#FFF0B8" },
] as const;

export const STEPS: Record<Brand, [string, string][]> = {
  aya: [
    ["Source", "Fresh tigernuts from farms in the north, sorted by hand."],
    ["Soak", "An overnight soak softens the nuts for a creamier press."],
    ["Press", "Blended with dates and coconut, then cold-pressed and strained."],
    ["Chill", "Bottled at 4°C and delivered within 72 hours."],
  ],
  halo: [
    ["Culture", "Fresh milk is warmed and cultured with live probiotics."],
    ["Set", "Left for twelve hours to develop its tang and body."],
    ["Strain", "Strained three times until thick enough to hold a spoon."],
    ["Chill", "Topped with real fruit, sealed and chilled at 4°C."],
  ],
};

export const REVIEWS = [
  { title: "Tastes like home", body: "The Aya Classic Date tastes exactly like the kunun aya my mum used to make, just smoother. I buy the litre now.", name: "Amaka O.", city: "Lagos", color: "#C9813A" },
  { title: "Proper thick yogurt", body: "Halo Plain is the first Greek yogurt here that is actually strained. My smoothies have never been this good.", name: "Tunde A.", city: "Abuja", color: "#5B4FB4" },
  { title: "My office snack", body: "I keep the Mango cups in the office fridge. 15g of protein and it doesn't taste like a health product.", name: "Zainab M.", city: "Kano", color: "#E8892B" },
  { title: "Ginger Spice is a mood", body: "That ginger kick in the morning wakes me up better than coffee. Delivery came cold too.", name: "Chidi E.", city: "Port Harcourt", color: "#B5541E" },
  { title: "Lactose-free win", body: "I can't do dairy, so Aya is my milk now. I pour Coconut Cream over cereal every day.", name: "Fola B.", city: "Ibadan", color: "#3E9E4C" },
  { title: "Both Worlds Box", body: "We got the mixed box for a family weekend and it was gone by Sunday. Kids fought over the strawberry.", name: "Ngozi I.", city: "Enugu", color: "#D8436C" },
];

export const SOCIAL_TILES: { bg: string; handle: string; quote?: string; productId?: string; image?: string }[] = [
  { bg: "linear-gradient(160deg,#F7DDB0,#D99A57)", handle: "@amaka.eats", productId: "aya-classic" },
  { bg: "#D8436C", handle: "@halolove", quote: "“Thick enough to hold my spoon upright.”" },
  { bg: "linear-gradient(160deg,#E2E6FB,#9EA6E6)", handle: "@fitwithtunde", productId: "halo-berry" },
  { bg: "linear-gradient(160deg,#FFF4C2,#F2C95C)", handle: "@sunday.brunch", productId: "aya-pineapple" },
  { bg: "#3A2416", handle: "@kunun.club", quote: "“Kunun aya, but make it premium.”" },
  { bg: "linear-gradient(160deg,#FFE9C4,#F6A84A)", handle: "@zee.snacks", productId: "halo-mango" },
  { bg: "linear-gradient(160deg,#E7CFB8,#8A5A3B)", handle: "@cocoa.girl", productId: "aya-cocoa" },
  { bg: "linear-gradient(160deg,#FFF3C9,#F6C850)", handle: "@honeyandoats", productId: "halo-honey" },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id)!;
export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");