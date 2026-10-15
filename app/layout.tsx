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
  applicationName: "DJAFARIY",
  // Sayt manzili (OG rasmlar uchun to'liq URL). Deploy'da NEXT_PUBLIC_SITE_URL ni o'rnating.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  // Belgilar public/logo.png dan yasalgan (chig'anoq belgisi, to'q fonda):
  //  /favicon.ico (16/32/48) — brauzer tabi va Google qidiruvi; /icon.png (512) va /apple-icon.png (180) — app/ ichida.
  // Diqqat: `icons` berilsa Next app/icon.png ni avtomatik ulamaydi, shuning uchun hammasi shu yerda sanab o'tilgan.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "DJAFARIY",
    description: "Marg'ilon ipagi, Buxoro zardo'ziligi va zamonaviy siluetlar.",
    images: [{ url: "/logo.png", width: 4500, height: 4500, alt: "DJAFARIY" }],
    siteName: "DJAFARIY",
    type: "website",
  },
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
