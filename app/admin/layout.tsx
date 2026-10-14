import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — ZARBOFT • MILLIY",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-night-900 font-sans text-zinc-200">{children}</div>;
}
