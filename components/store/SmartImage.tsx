"use client";

import { useState } from "react";
import { cn } from "@/lib/format";

/** Rasm yuklanmasa, nafis gradient zaxira ko'rsatadi (demo barqarorligi uchun). */
export function SmartImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("flex items-center justify-center bg-gradient-to-br from-sand via-[#e3d5bf] to-[#cdb898]", className)}
      >
        <span className="px-4 text-center font-serif text-lg italic text-ink/50">{alt}</span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={cn("object-cover", className)} />;
}
