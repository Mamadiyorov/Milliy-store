import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hero } from "@/lib/mockData";
import { SmartImage } from "./SmartImage";

export function Hero() {
  return (
    <section className="relative h-[calc(100svh-6rem)] min-h-[560px] overflow-hidden bg-ink">
      <div className="absolute inset-0 animate-kenburns">
        {hero.video ? (
          <video
            className="h-full w-full object-cover"
            src={hero.video}
            poster={hero.image}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <SmartImage src={hero.image} alt={hero.title} className="h-full w-full" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-16 md:px-10 md:pb-24">
        <p className="animate-fadeUp text-[11px] uppercase tracking-luxe text-gold-light">{hero.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-fadeUp font-serif text-5xl font-light leading-[1.05] text-ivory [animation-delay:120ms] md:text-7xl lg:text-8xl">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-lg animate-fadeUp text-sm leading-relaxed text-ivory/80 [animation-delay:240ms] md:text-base">
          {hero.subtitle}
        </p>
        <div className="mt-10 flex animate-fadeUp flex-wrap gap-4 [animation-delay:360ms]">
          <Link href="#kolleksiya" className="inline-flex items-center gap-3 bg-ivory px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition hover:bg-gold-light">
            Kolleksiyani ko'rish <ArrowRight size={14} />
          </Link>
          <Link href="#hikoya" className="inline-flex items-center gap-3 border border-ivory/60 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ivory transition hover:bg-ivory hover:text-ink">
            Hikoyamiz
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden text-right text-[10px] uppercase tracking-[0.3em] text-ivory/60 md:block">
        Marg'ilon · Buxoro · Toshkent
      </div>
    </section>
  );
}
