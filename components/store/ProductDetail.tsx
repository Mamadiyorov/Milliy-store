"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categoryLabel, products, type Product } from "@/lib/mockData";
import { ProductGallery } from "./ProductGallery";
import { ProductPurchase } from "./ProductPurchase";
import { ProductCard } from "./ProductCard";
import { useStore } from "./StoreProvider";

/** Mahsulot sahifasining tanlangan tilga moslashadigan qismi. */
export function ProductDetail({ product: base }: { product: Product }) {
  const { language, localize, t } = useStore();
  const product = localize(base);
  const related = products.filter((p) => p.id !== base.id && (p.category === base.category || p.badge)).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-10">
      <nav className="flex items-center gap-2 py-6 text-[11px] uppercase tracking-[0.15em] text-stone-450">
        <Link href="/" className="hover:text-ink">
          {t("product.home")}
        </Link>
        <ChevronRight size={12} className="rtl:rotate-180" />
        <Link href="/#kolleksiya" className="hover:text-ink">
          {categoryLabel(product.category, language)}
        </Link>
        <ChevronRight size={12} className="rtl:rotate-180" />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductPurchase key={product.id} product={base} />

          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            <details open className="group py-5">
              <summary className="flex cursor-pointer list-none justify-between text-[11px] uppercase tracking-[0.2em]">
                {t("product.description")} <span className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{product.description}</p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none justify-between text-[11px] uppercase tracking-[0.2em]">
                {t("product.composition")} <span className="transition group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-4 list-disc space-y-1.5 ps-5 text-sm text-ink/70">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none justify-between text-[11px] uppercase tracking-[0.2em]">
                {t("product.origin")} <span className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink/70">
                {product.origin} · {t("product.material")}: {product.material}
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="text-center font-serif text-4xl font-light">{t("product.related")}</h2>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
