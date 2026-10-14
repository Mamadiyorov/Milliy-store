"use client";

import { useState } from "react";
import { products, type Product } from "@/lib/mockData";
import { cn } from "@/lib/format";
import { ProductCard } from "./ProductCard";

const filters = ["Barchasi", "Choponlar", "Ko'ylaklar", "Nimchalar", "Bosh kiyimlar", "Aksessuarlar"] as const;

export function CollectionGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("Barchasi");
  const list: Product[] = active === "Barchasi" ? products : products.filter((p) => p.category === active);

  return (
    <section id="kolleksiya" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 pt-24 md:px-10">
      <div className="flex flex-col items-center text-center">
        <p className="eyebrow">Kuz-Qish 2026</p>
        <h2 className="mt-3 font-serif text-4xl font-light md:text-6xl">Milliy To'plam</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-450">
          Har bir buyum Marg'ilon, Buxoro va Namangan ustalari bilan hamkorlikda, cheklangan miqdorda yaratilgan.
        </p>
      </div>

      <div className="scrollbar-thin mt-10 flex justify-start gap-6 overflow-x-auto border-b border-ink/10 md:justify-center">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "-mb-px whitespace-nowrap border-b pb-3 text-[11px] uppercase tracking-[0.2em] transition",
              active === f ? "border-ink text-ink" : "border-transparent text-stone-450 hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div key={active} className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
