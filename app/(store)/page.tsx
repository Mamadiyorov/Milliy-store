"use client";

import Link from "next/link";
import { Gem, Globe, Scissors, Truck } from "lucide-react";
import { Hero } from "@/components/store/Hero";
import { CollectionGrid } from "@/components/store/CollectionGrid";
import { SmartImage } from "@/components/store/SmartImage";
import { useStore } from "@/components/store/StoreProvider";
import { editorial, perks, products, story } from "@/lib/mockData";

const perkIcons = [Scissors, Gem, Truck, Globe];
const statNumbers = ["38", "12+", "4 200"];

export default function HomePage() {
  const { language, localize, t } = useStore();
  const featured = localize(products[0]);
  const s = story[language];

  return (
    <>
      <Hero />

      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 px-4 py-10 md:grid-cols-4 md:px-10">
          {perks[language].map(({ title, text }, i) => {
            const Icon = perkIcons[i];
            return (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <Icon size={20} strokeWidth={1.25} className="text-gold-dark" />
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em]">{title}</p>
                <p className="text-xs text-stone-450">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <CollectionGrid />

      <section id="hikoya" className="mx-auto mt-28 max-w-[1440px] scroll-mt-24 px-4 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="aspect-[4/5] overflow-hidden bg-sand">
            <SmartImage src={featured.images[1]} alt={featured.name} className="h-full w-full transition duration-1000 hover:scale-105" />
          </div>
          <div className="md:pe-10">
            <p className="eyebrow">{t("nav.story")}</p>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight md:text-6xl">
              {s.before}
              <em className="text-gold-dark">{s.accent}</em>
              {s.after}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ink/70 md:text-base">{s.body}</p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {statNumbers.map((n, i) => (
                <div key={n}>
                  <p className="font-serif text-3xl md:text-4xl">{n}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-stone-450">{s.stats[i]}</p>
                </div>
              ))}
            </div>
            <Link href={`/product/${featured.slug}`} className="btn-outline mt-10">
              {s.cta.replace("{name}", featured.name)}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 grid max-w-[1440px] gap-4 px-4 md:grid-cols-2 md:px-10">
        {editorial.map((e) => {
          const text = e.text[language];
          return (
            <div key={e.image} className="group relative aspect-[4/3] overflow-hidden bg-ink">
              <SmartImage src={e.image} alt={text.title} className="h-full w-full opacity-80 transition duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-ivory md:p-10">
                <h3 className="font-serif text-3xl md:text-4xl">{text.title}</h3>
                <p className="mt-3 max-w-md text-sm text-ivory/80">{text.text}</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}
