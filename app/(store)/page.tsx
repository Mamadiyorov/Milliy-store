import Link from "next/link";
import { Gem, Globe, Scissors, Truck } from "lucide-react";
import { Hero } from "@/components/store/Hero";
import { CollectionGrid } from "@/components/store/CollectionGrid";
import { SmartImage } from "@/components/store/SmartImage";
import { editorial, products } from "@/lib/mockData";

const perks = [
  { icon: Scissors, title: "Qo'l mehnati", text: "Har bir buyum usta qo'lida tikiladi" },
  { icon: Gem, title: "Sof ipak", text: "Marg'ilon tut ipagi va zar iplar" },
  { icon: Truck, title: "1 kunda", text: "Toshkent bo'ylab tezkor yetkazish" },
  { icon: Globe, title: "Dunyo bo'ylab", text: "DHL Express orqali 3–5 kun" },
];

export default function HomePage() {
  const featured = products[0];

  return (
    <>
      <Hero />

      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 px-4 py-10 md:grid-cols-4 md:px-10">
          {perks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-2 text-center">
              <Icon size={20} strokeWidth={1.25} className="text-gold-dark" />
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em]">{title}</p>
              <p className="text-xs text-stone-450">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <CollectionGrid />

      <section id="hikoya" className="mx-auto mt-28 max-w-[1440px] scroll-mt-24 px-4 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="aspect-[4/5] overflow-hidden bg-sand">
            <SmartImage src={featured.images[1]} alt={featured.name} className="h-full w-full transition duration-1000 hover:scale-105" />
          </div>
          <div className="md:pr-10">
            <p className="eyebrow">Hikoyamiz</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
              Meros — <em className="text-gold-dark">zamonaviy</em> talqinda
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ink/70 md:text-base">
              ZARBOFT — fors tilidan &laquo;oltin to'qilgan&raquo; degan ma'noni anglatadi. Biz o'zbek hunarmandchiligining eng nafis an'analarini — abr bo'yoqlari,
              atlas to'qimachiligi va zardo'zlikni — minimalistik, kundalik kiyiladigan siluetlarga aylantiramiz.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {[
                ["38", "Usta-hunarmand"],
                ["12+", "Mamlakatga yetkazish"],
                ["4 200", "Mamnun mijozlar"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-serif text-3xl md:text-4xl">{n}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-stone-450">{l}</p>
                </div>
              ))}
            </div>
            <Link href={`/product/${featured.slug}`} className="btn-outline mt-10">
              {featured.name}ni ko'rish
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 grid max-w-[1440px] gap-4 px-4 md:grid-cols-2 md:px-10">
        {editorial.map((e) => (
          <div key={e.title} className="group relative aspect-[4/3] overflow-hidden bg-ink">
            <SmartImage src={e.image} alt={e.title} className="h-full w-full opacity-80 transition duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-ivory md:p-10">
              <h3 className="font-serif text-3xl md:text-4xl">{e.title}</h3>
              <p className="mt-3 max-w-md text-sm text-ivory/80">{e.text}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
