"use client";

import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { getProduct, useStore } from "./StoreProvider";
import { SmartImage } from "./SmartImage";
import { formatUSD } from "@/lib/format";

const FREE_SHIPPING_UZS = 3_000_000;

export function CartDrawer() {
  const {
    cart, cartOpen, setCartOpen, currency, money, subtotalUZS, subtotalUSD, updateQty, removeItem, setCheckoutOpen, localize, colorName, t,
  } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  const progress = Math.min(100, (subtotalUZS / FREE_SHIPPING_UZS) * 100);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40 animate-fadeIn" onClick={() => setCartOpen(false)} />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-md animate-slideIn flex-col bg-ivory rtl:animate-fadeIn">
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-serif text-2xl">{t("cart.title", { n: cart.reduce((s, i) => s + i.qty, 0) })}</h2>
          <button onClick={() => setCartOpen(false)} aria-label={t("a.close")}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={36} strokeWidth={1} className="text-stone-450" />
            <p className="font-serif text-2xl">{t("cart.empty")}</p>
            <p className="text-sm text-stone-450">{t("cart.emptyText")}</p>
            <button onClick={() => setCartOpen(false)} className="btn-primary mt-4">
              {t("cart.startShopping")}
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-ink/10 px-6 py-4">
              <p className="text-xs text-ink/70">
                {progress >= 100 ? t("cart.freeShippingReached") : t("cart.freeShippingFrom", { amount: money(FREE_SHIPPING_UZS) })}
              </p>
              <div className="mt-2 h-[3px] bg-sand">
                <div className="h-full bg-gold transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className="scrollbar-thin flex-1 divide-y divide-ink/10 overflow-y-auto px-6">
              {cart.map((item) => {
                const raw = getProduct(item.productId);
                if (!raw) return null;
                const p = localize(raw);
                return (
                  <li key={item.key} className="flex gap-4 py-5">
                    <div className="h-28 w-20 shrink-0 overflow-hidden bg-sand">
                      <SmartImage src={p.images[0]} alt={p.name} className="h-full w-full" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="font-serif text-lg leading-tight">{p.name}</p>
                        <button onClick={() => removeItem(item.key)} className="text-stone-450 hover:text-ink" aria-label={t("a.remove")}>
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-stone-450">
                        {colorName(item.color)} · {item.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-ink/15">
                          <button className="px-2 py-1.5" onClick={() => updateQty(item.key, item.qty - 1)} aria-label={t("a.decrease")}>
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs">{item.qty}</span>
                          <button className="px-2 py-1.5" onClick={() => updateQty(item.key, item.qty + 1)} aria-label={t("a.increase")}>
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm">{money(p.priceUZS, item.qty)}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-ink/10 px-6 py-6">
              <div className="flex justify-between text-sm">
                <span>{t("cart.subtotal")}</span>
                <span>{currency === "UZS" ? money(subtotalUZS) : formatUSD(subtotalUSD)}</span>
              </div>
              <p className="mt-1 text-xs text-stone-450">{t("cart.shippingLater")}</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  setCheckoutOpen(true);
                }}
                className="btn-primary mt-5 w-full"
              >
                {t("cart.checkout")}
              </button>
              <div className="mt-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-stone-450">
                <span>Payme</span>·<span>Click</span>·<span>Visa</span>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
