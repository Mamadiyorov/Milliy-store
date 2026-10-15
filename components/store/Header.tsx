"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Instagram, Menu, Phone, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore } from "./StoreProvider";
import { Logo } from "./Logo";
import { ProfileModal } from "./ProfileModal";
import { cn } from "@/lib/format";
import { BRAND } from "@/lib/brand";
import type { Currency } from "@/lib/mockData";

const nav = [
  { label: "Yangi kolleksiya", href: "/#kolleksiya" },
  { label: "Choponlar", href: "/#kolleksiya" },
  { label: "Ko'ylaklar", href: "/#kolleksiya" },
  { label: "Aksessuarlar", href: "/#kolleksiya" },
  { label: "Hikoyamiz", href: "/#hikoya" },
];

const announcements = [
  "Toshkent bo'ylab 1 kunda yetkazib berish",
  "DHL Express orqali dunyo bo'ylab 3–5 kun",
  "Payme · Click · Visa orqali xavfsiz to'lov",
  "Har bir buyum — qo'l mehnati",
];

export function Header() {
  const { currency, setCurrency, cartCount, setCartOpen, profile, setProfileOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="flex items-center gap-4 bg-ink px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-ivory/80 md:px-10">
        <a href={BRAND.phoneHref} className="flex shrink-0 items-center gap-2 normal-case tracking-[0.12em] transition hover:text-gold-light" aria-label={`Qo'ng'iroq: ${BRAND.phone}`}>
          <Phone size={12} strokeWidth={1.5} />
          <span className="hidden sm:inline">{BRAND.phone}</span>
        </a>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
            {[...announcements, ...announcements].map((a, i) => (
              <span key={i} className="flex items-center gap-16">
                {a} <span className="text-gold-light">✦</span>
              </span>
            ))}
          </div>
        </div>
        <a
          href={BRAND.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 normal-case tracking-[0.12em] transition hover:text-gold-light"
          aria-label="Instagram sahifamiz"
        >
          <Instagram size={12} strokeWidth={1.5} />
          <span className="hidden sm:inline">{BRAND.instagramHandle}</span>
        </a>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled ? "border-ink/10 bg-ivory/90 backdrop-blur-md" : "border-transparent bg-ivory",
        )}
      >
        <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-20 md:px-10">
          <div className="flex items-center gap-6">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Menyu">
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <nav className="hidden items-center gap-7 lg:flex">
              {nav.map((n) => (
                <Link key={n.label} href={n.href} className="text-[11px] uppercase tracking-[0.2em] text-ink/80 transition hover:text-gold-dark">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" aria-label={`${BRAND.name} — bosh sahifa`}>
            <Logo width={68} tone="onLight" priority className="md:hidden" />
            <Logo width={88} tone="onLight" priority className="hidden md:block" />
          </Link>

          <div className="flex items-center justify-end gap-3 md:gap-5">
            <CurrencySwitch currency={currency} onChange={setCurrency} />
            <button className="hidden md:block" aria-label="Qidiruv">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="hidden md:block" aria-label="Sevimlilar">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              className="relative flex items-center gap-2"
              aria-label="Mening profilim"
              title={profile ? "Saqlangan profil" : "Mening profilim"}
            >
              <User size={18} strokeWidth={1.5} />
              <span className="hidden text-[11px] uppercase tracking-[0.2em] xl:inline">{profile ? profile.firstName : "Profil"}</span>
              {profile && <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold xl:hidden" />}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative" aria-label="Savatcha">
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40 animate-fadeIn" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[82%] max-w-sm bg-ivory p-6 animate-fadeIn">
            <div className="mb-10 flex items-center justify-between">
              <Logo width={64} tone="onLight" />
              <button onClick={() => setMobileOpen(false)} aria-label="Yopish">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {nav.map((n) => (
                <Link key={n.label} href={n.href} onClick={() => setMobileOpen(false)} className="font-serif text-2xl">
                  {n.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setProfileOpen(true);
                }}
                className="flex items-center gap-2 text-left font-serif text-2xl"
              >
                Mening profilim
              </button>
            </nav>
            <div className="mt-10 space-y-3 border-t border-ink/10 pt-6 text-sm">
              <a href={BRAND.phoneHref} className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.5} /> {BRAND.phone}
              </a>
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <Instagram size={15} strokeWidth={1.5} /> {BRAND.instagramHandle}
              </a>
              <Link href="/admin" className="block pt-4 text-xs uppercase tracking-[0.2em] text-stone-450">
                Admin panel →
              </Link>
            </div>
          </div>
        </div>
      )}

      <ProfileModal />
    </>
  );
}

function CurrencySwitch({ currency, onChange }: { currency: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="flex items-center rounded-full border border-ink/15 p-0.5 text-[10px] font-medium tracking-widest">
      {(["UZS", "USD"] as Currency[]).map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={cn(
            "rounded-full px-2.5 py-1 transition",
            currency === c ? "bg-ink text-ivory" : "text-ink/60 hover:text-ink",
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
