import Link from "next/link";
import { Instagram, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Logo } from "./Logo";

const cols = [
  { title: "Do'kon", links: ["Yangi kolleksiya", "Choponlar", "Ko'ylaklar", "Aksessuarlar", "Sovg'a kartalari"] },
  { title: "Yordam", links: ["Yetkazib berish", "Qaytarish", "O'lchamlar jadvali", "To'lov usullari", "Bog'lanish"] },
  { title: "Brend", links: ["Hikoyamiz", "Ustalarimiz", "Atelye", "Matbuot"] },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ivory">
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" aria-label={`${BRAND.name} — bosh sahifa`} className="inline-block">
              <Logo width={140} />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
              Nafis siluetlar, sof matolar va sokin hashamat. Har bir buyum — usta qo'li bilan yaratilgan.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={BRAND.phoneHref} className="flex items-center gap-3 text-ivory/80 transition hover:text-gold-light">
                <Phone size={15} strokeWidth={1.5} /> {BRAND.phone}
              </a>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ivory/80 transition hover:text-gold-light"
              >
                <Instagram size={15} strokeWidth={1.5} /> {BRAND.instagramHandle}
              </a>
            </div>
            <form className="mt-8 flex max-w-sm border-b border-ivory/30">
              <input placeholder="Email manzilingiz" className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-ivory/40" />
              <button type="button" className="text-[11px] uppercase tracking-[0.2em] text-gold-light">
                Obuna
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gold-light">{c.title}</p>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link href="/" className="text-sm text-ivory/70 transition hover:text-ivory">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 md:flex-row">
          <p>
            © 2026 {BRAND.name}. Toshkent, O'zbekiston. ·{" "}
            <Link href="/admin" className="hover:text-ivory/70">
              Admin panel
            </Link>
          </p>
          <p className="tracking-[0.2em]">PAYME · CLICK · VISA · MASTERCARD · DHL EXPRESS</p>
        </div>
      </div>
    </footer>
  );
}
