"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useStore } from "./StoreProvider";
import { ProductPurchase } from "./ProductPurchase";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/format";

export function QuickViewModal() {
  const { quickView: product, setQuickView } = useStore();
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setQuickView(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, setQuickView]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fadeIn" onClick={() => setQuickView(null)} />
      <div className="relative grid max-h-[92vh] w-full max-w-5xl animate-fadeUp overflow-y-auto bg-ivory md:grid-cols-2">
        <button onClick={() => setQuickView(null)} className="absolute right-4 top-4 z-10 rounded-full bg-ivory/90 p-2" aria-label="Yopish">
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="bg-sand">
          <div className="aspect-[3/4] overflow-hidden">
            <SmartImage key={product.images[active]} src={product.images[active]} alt={product.name} className="h-full w-full animate-fadeIn" />
          </div>
          <div className="flex gap-2 p-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                className={cn("h-20 w-16 overflow-hidden border transition", active === i ? "border-ink" : "border-transparent opacity-60")}
              >
                <SmartImage src={src} alt="" className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-10">
          <ProductPurchase product={product} compact onAdded={() => setQuickView(null)} />
          <Link
            href={`/product/${product.slug}`}
            onClick={() => setQuickView(null)}
            className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] underline underline-offset-4"
          >
            To'liq ma'lumot →
          </Link>
        </div>
      </div>
    </div>
  );
}
