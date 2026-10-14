"use client";

import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { USD_RATE, type Product, type Size } from "@/lib/mockData";
import { cn } from "@/lib/format";

const categories: Product["category"][] = ["Choponlar", "Ko'ylaklar", "Bosh kiyimlar", "Nimchalar", "Aksessuarlar"];
const allSizes: Size[] = ["S", "M", "L", "XL"];
const defaultImage = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80";

export function AddProductModal({ onClose, onSave }: { onClose: () => void; onSave: (p: Product) => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Product["category"]>("Choponlar");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("10");
  const [image, setImage] = useState("");
  const [sizes, setSizes] = useState<Size[]>(["S", "M", "L"]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const priceUZS = Number(price.replace(/\s/g, ""));
    if (name.trim().length < 3) return setError("Mahsulot nomini kiriting");
    if (!priceUZS || priceUZS < 1000) return setError("Narxni to'g'ri kiriting");
    if (sizes.length === 0) return setError("Kamida bitta o'lcham tanlang");

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    onSave({
      id: `p-${Date.now()}`,
      slug,
      name: name.trim(),
      category,
      tagline: description.slice(0, 60) || "Yangi mahsulot",
      description: description || "Yangi mahsulot tavsifi.",
      details: [],
      origin: "O'zbekiston",
      material: "—",
      priceUZS,
      priceUSD: Math.round(priceUZS / USD_RATE),
      images: [image || defaultImage],
      sizes,
      colors: [{ name: "Asosiy", hex: "#A8865A" }],
      badge: "Yangi",
      rating: 5,
      reviews: 0,
      stock: Number(stock) || 0,
    });
  };

  const field = "w-full rounded-xl border border-white/[0.08] bg-night-900 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-gold/60";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <form onSubmit={save} className="relative w-full max-w-2xl animate-fadeUp rounded-2xl border border-white/[0.08] bg-night-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Yangi mahsulot qo'shish</h2>
            <p className="text-xs text-zinc-500">Katalogga qo'shiladi va do'konda "Yangi" belgisi bilan chiqadi</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5" aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[180px_1fr]">
          <div className="flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/10 bg-night-900 text-zinc-500">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              <>
                <ImagePlus size={26} strokeWidth={1.5} />
                <span className="mt-2 px-4 text-center text-[11px]">Rasm havolasini kiriting</span>
              </>
            )}
          </div>

          <div className="space-y-4">
            <Label text="Mahsulot nomi">
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Masalan: Shohi Atlas Kamzul" />
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Label text="Kategoriya">
                <select className={field} value={category} onChange={(e) => setCategory(e.target.value as Product["category"])}>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Label>
              <Label text="Ombordagi soni">
                <input className={field} type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
              </Label>
            </div>
            <Label text="Narx (UZS)">
              <input className={field} inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1 250 000" />
              {Number(price.replace(/\s/g, "")) > 0 && (
                <span className="mt-1 block text-[11px] text-zinc-500">≈ ${Math.round(Number(price.replace(/\s/g, "")) / USD_RATE)}</span>
              )}
            </Label>
            <Label text="Rasm URL (Unsplash va h.k.)">
              <input className={field} value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://images.unsplash.com/…" />
            </Label>
            <Label text="O'lchamlar">
              <div className="flex gap-2">
                {allSizes.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))}
                    className={cn(
                      "h-9 w-11 rounded-lg border text-xs transition",
                      sizes.includes(s) ? "border-gold bg-gold/15 text-gold-light" : "border-white/10 text-zinc-400 hover:border-white/20",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Label>
            <Label text="Tavsif">
              <textarea className={cn(field, "min-h-[80px] resize-none")} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mato, ishlab chiqarilgan joy, xususiyatlar…" />
            </Label>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

        <div className="mt-6 flex justify-end gap-3 border-t border-white/[0.06] pt-5">
          <button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5">
            Bekor qilish
          </button>
          <button type="submit" className="rounded-xl bg-gold px-5 py-2 text-sm font-medium text-night-900 hover:bg-gold-light">
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-zinc-400">{text}</span>
      {children}
    </label>
  );
}
