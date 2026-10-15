"use client";

import { LANGUAGES, languageCurrency } from "@/lib/i18n";
import { cn } from "@/lib/format";
import { useStore } from "./StoreProvider";

/** Minimalistik til tanlagich: UZ | RU | EN | KO | AR */
export function LanguageSwitch({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const { language, setLanguage, t } = useStore();
  return (
    // Tanlagich tartibi RTL rejimida ham o'zgarmasin
    <div dir="ltr" role="group" aria-label={t("a.language")} className={cn("flex items-center text-[10px] font-medium tracking-[0.15em]", className)}>
      {LANGUAGES.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className={cn("px-1", tone === "dark" ? "text-ivory/25" : "text-ink/20")}>|</span>}
          <button
            onClick={() => setLanguage(l.code)}
            lang={l.htmlLang}
            title={`${l.name} · ${languageCurrency(l.code)}`}
            aria-pressed={language === l.code}
            className={cn(
              "px-0.5 transition",
              language === l.code
                ? tone === "dark" ? "text-gold-light" : "text-ink underline underline-offset-4"
                : tone === "dark" ? "text-ivory/55 hover:text-ivory" : "text-ink/45 hover:text-ink",
            )}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
