import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ExpandReveal } from "@/components/sections/ExpandReveal";
import { ProductRail } from "@/components/sections/ProductRail";
import { Benefits } from "@/components/sections/Benefits";
import { Features } from "@/components/sections/Features";
import { Process } from "@/components/sections/Process";
import { SocialStrip } from "@/components/sections/SocialStrip";
import { Testimonials } from "@/components/sections/Testimonials";
import { Cta } from "@/components/sections/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ExpandReveal />
      <ProductRail />
      <Benefits />
      <Features />
      <Process />
      <SocialStrip />
      <Testimonials />
      <Cta />
    </>
  );
}