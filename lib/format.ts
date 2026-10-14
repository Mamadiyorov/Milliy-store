import type { Currency } from "./mockData";

export function formatUZS(value: number) {
  return `${Math.round(value).toLocaleString("ru-RU").replace(/,/g, " ")} so'm`;
}

export function formatUSD(value: number) {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: value % 1 === 0 ? 0 : 2 })}`;
}

export function formatPrice(uzs: number, usd: number, currency: Currency) {
  return currency === "UZS" ? formatUZS(uzs) : formatUSD(usd);
}

export function formatCompactUZS(value: number) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} mlrd`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} mln`;
  if (value >= 1_000) return `${Math.round(value / 1_000)} ming`;
  return String(value);
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
