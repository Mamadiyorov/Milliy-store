"use client";

import { Check } from "lucide-react";
import { useStore } from "./StoreProvider";

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 animate-fadeUp items-center gap-3 bg-ink px-5 py-3 text-sm text-ivory shadow-2xl">
      <Check size={15} className="text-gold-light" /> {toast}
    </div>
  );
}
