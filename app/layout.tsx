import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { StoreProvider } from "@/components/store/StoreProvider";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "DJAFARIY — Nafis milliy kiyimlar",
  description: "Marg'ilon ipagi, Buxoro zardo'ziligi va zamonaviy siluetlar. Kuz-Qish Milliy To'plami 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
