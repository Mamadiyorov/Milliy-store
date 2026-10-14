"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import type { OrderStatus } from "@/lib/mockData";
import { cn } from "@/lib/format";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-2xl border border-white/[0.06] bg-night-800 p-5", className)}>{children}</div>;
}

export function StatCard({
  label, value, delta, icon, hint, live, accent = "#C9AD84",
}: { label: string; value: string; delta?: number; icon: React.ReactNode; hint?: string; live?: boolean; accent?: string }) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.12] blur-2xl" style={{ background: accent }} />
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${accent}1F`, color: accent }}>
          {icon}
        </div>
        {live && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        )}
      </div>
      <p className="mt-5 text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-white transition-all">{value}</p>
      <div className="mt-3 flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span className={cn("flex items-center gap-1 font-medium", up ? "text-emerald-400" : "text-rose-400")}>
            {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {up ? "+" : ""}
            {delta.toFixed(1)}%
          </span>
        )}
        {hint && <span className="text-zinc-500">{hint}</span>}
      </div>
    </Card>
  );
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    "To'langan": "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
    Kutilmoqda: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
    "Bekor qilingan": "bg-rose-500/10 text-rose-400 ring-rose-500/20",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset", styles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function MethodBadge({ method }: { method: "Payme" | "Click" | "Visa" }) {
  const color = method === "Payme" ? "#00CCCC" : method === "Click" ? "#3B82F6" : "#C9AD84";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300">
      <span className="h-2 w-2 rounded-sm" style={{ background: color }} />
      {method}
    </span>
  );
}
