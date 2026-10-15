// Valyuta kursi (USD → UZS): API'dan avtomatik olish, keshlash va USD narxlarni chiroyli yaxlitlash.

export type Currency = "UZS" | "USD";

/** API ishlamay qolsa ishlatiladigan zaxira kurs. */
export const FALLBACK_USD_RATE = 12_800;

const RATE_APIS = [
  { url: "https://open.er-api.com/v6/latest/USD", name: "open.er-api.com" },
  { url: "https://api.exchangerate-api.com/v4/latest/USD", name: "exchangerate-api.com" },
];

const CACHE_KEY = "djafariy_usd_rate";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 soat
const TIMEOUT_MS = 6000;

export interface UsdRate {
  rate: number; // 1 USD = rate UZS
  source: string; // API nomi yoki "fallback"
  fetchedAt: number;
  live: boolean;
}

export const fallbackRate = (): UsdRate => ({ rate: FALLBACK_USD_RATE, source: "fallback", fetchedAt: 0, live: false });

// Noto'g'ri javoblardan himoya: UZS kursi shu oraliqda bo'lishi kerak
const isSaneRate = (r: unknown): r is number => typeof r === "number" && Number.isFinite(r) && r > 5_000 && r < 50_000;

export function readCachedRate(): UsdRate | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as UsdRate;
    return isSaneRate(cached.rate) ? cached : null;
  } catch {
    return null;
  }
}

export const isFresh = (r: UsdRate) => Date.now() - r.fetchedAt < CACHE_TTL_MS;

/** API'lardan navbat bilan kursni oladi; hammasi ishlamasa — null. */
export async function fetchUsdRate(): Promise<UsdRate | null> {
  for (const api of RATE_APIS) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(api.url, { signal: ctrl.signal, cache: "no-store" });
      if (!res.ok) continue;
      const data = (await res.json()) as { rates?: Record<string, number> };
      const rate = data.rates?.UZS;
      if (!isSaneRate(rate)) continue;
      const result: UsdRate = { rate, source: api.name, fetchedAt: Date.now(), live: true };
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(result));
      } catch {}
      return result;
    } catch {
      // keyingi API'ni sinab ko'ramiz
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

/**
 * USD narxni "chiroyli" songa yaxlitlaydi:
 *  - $20 va undan yuqori: eng yaqin 5 ga karrali ($97 → $95, $98 → $100, $193 → $195)
 *  - $20 dan kichik (dostavka kabi): eng yaqin butun dollar (min $1), aks holda $2.7 → $5 bo'lib qolardi
 */
export function roundUSD(usd: number): number {
  if (usd <= 0) return 0;
  if (usd < 20) return Math.max(1, Math.round(usd));
  return Math.round(usd / 5) * 5;
}

/** UZS narxni joriy kurs bo'yicha yaxlitlangan USD'ga o'giradi. */
export const uzsToUSD = (uzs: number, rate: number) => roundUSD(uzs / rate);

export function formatUZS(value: number, suffix = "so'm") {
  return `${Math.round(value).toLocaleString("ru-RU").replace(/,/g, " ")} ${suffix}`;
}

export function formatUSD(value: number) {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
