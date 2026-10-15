"use client";

import Link from "next/link";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/mockData";
import { cn } from "@/lib/format";
import { useStore } from "./StoreProvider";
import { SmartImage } from "./SmartImage";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { money, requestSelection, setQuickView } = useStore();
  const [liked, setLiked] = useState(false);

  return (
    <article className="group animate-fadeUp" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <SmartImage
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          />
          <SmartImage
            src={product.images[1] ?? product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full scale-105 opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 bg-ivory/95 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.2em]">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setLiked((v) => !v)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 opacity-0 transition group-hover:opacity-100"
          aria-label="Sevimlilarga"
        >
          <Heart size={14} strokeWidth={1.5} className={cn(liked && "fill-[#8E2A2A] text-[#8E2A2A]")} />
        </button>

        {/* Kartochkada rang/o'lcham tanlanmagan — savatga to'g'ridan-to'g'ri emas, Quick View'da tanlash so'raladi */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => requestSelection(product)}
            title="Rang va o'lchamni tanlash"
            className="flex flex-1 items-center justify-center gap-2 bg-ink py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ivory transition hover:bg-gold-dark"
          >
            <ShoppingBag size={13} /> Savatchaga qo'shish
          </button>
          <button
            onClick={() => setQuickView(product)}
            className="flex w-11 items-center justify-center bg-ivory text-ink transition hover:bg-sand"
            aria-label="Tezkor ko'rish"
            title="Quick View"
          >
            <Eye size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-450">{product.category}</p>
          <Link href={`/product/${product.slug}`} className="mt-1 block font-serif text-xl leading-tight hover:text-gold-dark">
            {product.name}
          </Link>
        </div>
        <div className="flex gap-1 pt-1">
          {product.colors.map((c) => (
            <span key={c.name} title={c.name} className="h-3 w-3 rounded-full border border-ink/10" style={{ background: c.hex }} />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2 text-sm">
        <span>{money(product.priceUZS)}</span>
        {product.compareAtUZS && (
          <span className="text-xs text-stone-450 line-through">
            {money(product.compareAtUZS)}
          </span>
        )}
      </div>
    </article>
  );
}
