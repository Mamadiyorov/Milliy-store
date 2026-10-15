"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { categoryLabel, type Product, type Size } from "@/lib/mockData";
import { cn } from "@/lib/format";
import { useStore } from "./StoreProvider";

/** Rang, o'lcham, miqdor tanlash va savatchaga qo'shish — Quick View va detal sahifasi uchun umumiy blok. */
export function ProductPurchase({
  product: base, onAdded, compact = false, needsSelection = false,
}: { product: Product; onAdded?: () => void; compact?: boolean; needsSelection?: boolean }) {
  const { money, addToCart, setCartOpen, setCheckoutOpen, localize, colorName, language, t } = useStore();
  const product = localize(base);
  // Rang ham, o'lcham ham mijoz tomonidan aniq tanlanishi SHART — oldindan tanlab qo'yilmaydi.
  // `color` — o'zbekcha rang nomi (savatcha/buyurtma kaliti); ekranda tarjimasi ko'rsatiladi.
  const [size, setSize] = useState<Size | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  const missing = !color && !size ? "both" : !color ? "color" : !size ? "size" : null;

  const add = (buyNow = false) => {
    if (!size || !color) {
      setSizeError(!size);
      setColorError(!color);
      return;
    }
    addToCart(base, size, color, qty);
    onAdded?.();
    if (buyNow) setCheckoutOpen(true);
    else setCartOpen(true);
  };

  return (
    <div>
      <p className="eyebrow">{categoryLabel(product.category, language)}</p>
      <h1 className={cn("mt-2 font-serif font-light leading-tight", compact ? "text-3xl" : "text-4xl md:text-5xl")}>{product.name}</h1>
      <p className="mt-2 text-sm text-stone-450">{product.tagline}</p>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <div className="flex text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < Math.round(product.rating) ? "fill-gold" : ""} />
          ))}
        </div>
        <span className="text-stone-450">
          {product.rating.toFixed(1)} · {t("product.reviews", { n: product.reviews })}
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-2xl">{money(product.priceUZS)}</span>
        {product.compareAtUZS && <span className="text-sm text-stone-450 line-through">{money(product.compareAtUZS)}</span>}
      </div>

      {needsSelection && missing && (
        <div className="mt-6 border border-gold/40 bg-gold/10 px-4 py-3 text-xs leading-relaxed text-gold-dark">{t(`select.prompt.${missing}`)}</div>
      )}

      <div className="mt-8">
        <p className="text-[11px] uppercase tracking-[0.2em]">
          {t("product.color")}: <span className="text-stone-450 normal-case tracking-normal">{color ? colorName(color) : t("product.notSelected")}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                setColor(c.name);
                setColorError(false);
              }}
              title={colorName(c.name)}
              aria-label={colorName(c.name)}
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
        {colorError && <p className="mt-2 text-xs text-[#8E2A2A]">{t("product.colorError")}</p>}
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.2em]">{t("product.size")}</p>
          <button className="text-[11px] text-stone-450 underline underline-offset-4">{t("product.sizeGuide")}</button>
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
        {sizeError && <p className="mt-2 text-xs text-[#8E2A2A]">{t("product.sizeError")}</p>}
      </div>

      {(sizeError || colorError) && missing && (
        <p role="alert" className="mt-6 bg-[#8E2A2A]/5 px-4 py-3 text-xs text-[#8E2A2A]">
          {t(`select.required.${missing}`)}
        </p>
      )}

      <div className="mt-7 flex gap-3">
        <div className="flex items-center border border-ink/20">
          <button className="px-3 py-4" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label={t("a.decrease")}>
            <Minus size={13} />
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button className="px-3 py-4" onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label={t("a.increase")}>
            <Plus size={13} />
          </button>
        </div>
        <button onClick={() => add(false)} className="btn-primary flex-1">
          {t("product.addToCart")}
        </button>
      </div>
      <button onClick={() => add(true)} className="btn-outline mt-3 w-full">
        {t("product.buyNow")}
      </button>

      {product.stock < 10 && <p className="mt-4 text-xs text-gold-dark">{t("product.lowStock", { n: product.stock })}</p>}

      <div className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-xs text-ink/70">
        <p className="flex items-center gap-3">
          <Truck size={15} strokeWidth={1.5} /> {t("product.shippingInfo")}
        </p>
        <p className="flex items-center gap-3">
          <ShieldCheck size={15} strokeWidth={1.5} /> {t("product.returnsInfo")}
        </p>
      </div>
    </div>
  );
}
