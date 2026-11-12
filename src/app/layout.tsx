import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Toast } from "@/components/layout/Toast";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Kulture Sips — Aya Tigernut & Halo Greek Yogurt",
  description: "Cold-pressed tigernut drinks and thick strained Greek yogurt, made fresh in small batches in Nigeria.",
  openGraph: { title: "Kulture Sips", description: "Aya Tigernut & Halo Greek Yogurt, delivered cold.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
          <Toast />
        </SmoothScroll>
      </body>
    </html>
  );
}