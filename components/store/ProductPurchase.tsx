"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import type { Product, Size } from "@/lib/mockData";
import { cn, formatPrice } from "@/lib/format";
import { useStore } from "./StoreProvider";

/** Rang, o'lcham, miqdor tanlash va savatchaga qo'shish — Quick View va detal sahifasi uchun umumiy blok. */
export function ProductPurchase({
  product, onAdded, compact = false, needsSelection = false,
}: { product: Product; onAdded?: () => void; compact?: boolean; needsSelection?: boolean }) {
  const { currency, addToCart, setCartOpen, setCheckoutOpen } = useStore();
  // Rang ham, o'lcham ham mijoz tomonidan aniq tanlanishi SHART — oldindan tanlab qo'yilmaydi
  const [size, setSize] = useState<Size | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  const missing = [!color && "rang", !size && "o'lcham"].filter(Boolean).join(" va ");

  const add = (buyNow = false) => {
    if (!size || !color) {
      setSizeError(!size);
      setColorError(!color);
      return;
    }
    addToCart(product, size, color, qty);
    onAdded?.();
    if (buyNow) setCheckoutOpen(true);
    else setCartOpen(true);
  };

  return (
    <div>
      <p className="eyebrow">{product.category}</p>
      <h1 className={cn("mt-2 font-serif font-light leading-tight", compact ? "text-3xl" : "text-4xl md:text-5xl")}>{product.name}</h1>
      <p className="mt-2 text-sm text-stone-450">{product.tagline}</p>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <div className="flex text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < Math.round(product.rating) ? "fill-gold" : ""} />
          ))}
        </div>
        <span className="text-stone-450">
          {product.rating.toFixed(1)} · {product.reviews} ta sharh
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-2xl">{formatPrice(product.priceUZS, product.priceUSD, currency)}</span>
        {product.compareAtUZS && product.compareAtUSD && (
          <span className="text-sm text-stone-450 line-through">
            {formatPrice(product.compareAtUZS, product.compareAtUSD, currency)}
          </span>
        )}
      </div>

      {needsSelection && missing && (
        <div className="mt-6 border border-gold/40 bg-gold/10 px-4 py-3 text-xs leading-relaxed text-gold-dark">
          Savatchaga qo'shishdan oldin, iltimos, <b>{missing}</b>ni tanlang.
        </div>
      )}

      <div className="mt-8">
        <p className="text-[11px] uppercase tracking-[0.2em]">
          Rang: <span className="text-stone-450 normal-case tracking-normal">{color ?? "tanlanmagan"}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setColor(c.name);
                setColorError(false);
              }}
              title={c.name}
              aria-label={c.name}
              aria-pressed={color === c.name}
              className={cn(
                "h-8 w-8 rounded-full border-2 ring-offset-2 ring-offset-ivory transition",
                color === c.name ? "border-ivory ring-1 ring-ink" : "border-ivory hover:ring-1 hover:ring-ink/30",
                colorError && "ring-1 ring-[#8E2A2A]/60",
              )}
              style={{ background: c.hex }}
            />
          ))}
        </div>
        {colorError && <p className="mt-2 text-xs text-[#8E2A2A]">Iltimos, rangni tanlang</p>}
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.2em]">O'lcham</p>
          <button className="text-[11px] text-stone-450 underline underline-offset-4">O'lchamlar jadvali</button>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {(["S", "M", "L", "XL"] as Size[]).map((s) => {
            const available = product.sizes.includes(s);
            return (
              <button
                key={s}
                disabled={!available}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={cn(
                  "border py-3 text-xs transition",
                  !available && "cursor-not-allowed border-ink/10 text-ink/25 line-through",
                  available && size === s && "border-ink bg-ink text-ivory",
                  available && size !== s && (sizeError ? "border-[#8E2A2A]/50 hover:border-ink" : "border-ink/20 hover:border-ink"),
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
        {sizeError && <p className="mt-2 text-xs text-[#8E2A2A]">Iltimos, o'lchamni tanlang</p>}
      </div>

      {(sizeError || colorError) && missing && (
        <p role="alert" className="mt-6 bg-[#8E2A2A]/5 px-4 py-3 text-xs text-[#8E2A2A]">
          Savatchaga qo'shish uchun {missing}ni tanlashingiz shart.
        </p>
      )}

      <div className="mt-7 flex gap-3">
        <div className="flex items-center border border-ink/20">
          <button className="px-3 py-4" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Kamaytirish">
            <Minus size={13} />
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button className="px-3 py-4" onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Ko'paytirish">
            <Plus size={13} />
          </button>
        </div>
        <button onClick={() => add(false)} className="btn-primary flex-1">
          Savatchaga qo'shish
        </button>
      </div>
      <button onClick={() => add(true)} className="btn-outline mt-3 w-full">
        Hoziroq sotib olish
      </button>

      {product.stock < 10 && (
        <p className="mt-4 text-xs text-gold-dark">Omborda faqat {product.stock} dona qoldi</p>
      )}

      <div className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-xs text-ink/70">
        <p className="flex items-center gap-3">
          <Truck size={15} strokeWidth={1.5} /> Toshkent bo'ylab 1 kun · DHL orqali dunyo bo'ylab 3–5 kun
        </p>
        <p className="flex items-center gap-3">
          <ShieldCheck size={15} strokeWidth={1.5} /> 14 kun ichida bepul qaytarish · Haqiqiylik sertifikati
        </p>
      </div>
    </div>
  );
}
