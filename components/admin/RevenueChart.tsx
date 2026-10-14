"use client";

import { useState } from "react";
import { cn, formatCompactUZS, formatUZS } from "@/lib/format";

interface Point {
  month: string;
  revenue: number;
  orders: number;
}

/** Kutubxonasiz, yengil ustunli grafik — hover qilinganda tooltip ko'rsatadi. */
export function RevenueChart({ data, height = 260 }: { data: Point[]; height?: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.revenue)) * 1.1;
  const ticks = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="relative" style={{ height }}>
      <div className="absolute inset-0 bottom-6 left-12 flex flex-col justify-between">
        {ticks.map((t) => (
          <div key={t} className="relative border-t border-dashed border-white/[0.06]">
            <span className="absolute -left-12 -top-2 w-10 text-right text-[10px] tabular-nums text-zinc-600">{formatCompactUZS(max * t).replace(" mln", "M")}</span>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bottom-6 left-12 flex items-end gap-2 sm:gap-3">
        {data.map((d, i) => {
          const isLast = i === data.length - 1;
          return (
            <div
              key={d.month}
              className="relative flex h-full flex-1 cursor-pointer items-end"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <div
                className={cn(
                  "w-full rounded-t-md transition-all duration-500",
                  isLast ? "bg-gradient-to-t from-gold-dark to-gold-light" : "bg-white/10",
                  hover === i && !isLast && "bg-white/25",
                )}
                style={{ height: `${(d.revenue / max) * 100}%` }}
              />
              {hover === i && (
                <div className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-night-600 px-3 py-2 text-xs shadow-xl" style={{ bottom: `${(d.revenue / max) * 100}%` }}>
                  <p className="font-medium text-white">{d.month} 2026</p>
                  <p className="mt-1 tabular-nums text-gold-light">{formatUZS(d.revenue)}</p>
                  <p className="text-zinc-400">{d.orders} ta buyurtma</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 left-12 flex gap-2 sm:gap-3">
        {data.map((d) => (
          <span key={d.month} className="flex-1 text-center text-[10px] text-zinc-500">
            {d.month}
          </span>
        ))}
      </div>
    </div>
  );
}
