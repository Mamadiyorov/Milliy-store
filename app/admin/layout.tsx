import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — DJAFARIY",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin panel faqat o'zbekcha — do'konda AR (RTL) tanlansa ham chapdan-o'ngga qoladi
  return (
    <div dir="ltr" className="min-h-screen bg-night-900 font-sans text-zinc-200">
      {children}
    </div>
  );
}
