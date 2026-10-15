"use client";

import { useState } from "react";
import { categoryLabel, collectionIntro, products, type Category, type Product } from "@/lib/mockData";
import { cn } from "@/lib/format";
import { ProductCard } from "./ProductCard";
import { useStore } from "./StoreProvider";

const filters: (Category | "Barchasi")[] = ["Barchasi", "Choponlar", "Ko'ylaklar", "Nimchalar", "Bosh kiyimlar", "Aksessuarlar"];

export function CollectionGrid() {
  const { language } = useStore();
  const [active, setActive] = useState<(typeof filters)[number]>("Barchasi");
  const list: Product[] = active === "Barchasi" ? products : products.filter((p) => p.category === active);
  const intro = collectionIntro[language];

  return (
    <section id="kolleksiya" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 pt-24 md:px-10">
      <div className="flex flex-col items-center text-center">
        <p className="eyebrow">{intro.eyebrow}</p>
        <h2 className="mt-3 font-serif text-4xl font-light md:text-6xl">{intro.title}</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-450">{intro.text}</p>
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
            {categoryLabel(f, language)}
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
