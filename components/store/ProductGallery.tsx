"use client";

import { useState } from "react";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/format";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      <div className="flex gap-3 md:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={cn("h-24 w-20 shrink-0 overflow-hidden border bg-sand transition", active === i ? "border-ink" : "border-transparent opacity-60 hover:opacity-100")}
          >
            <SmartImage src={src} alt={`${name} ${i + 1}`} className="h-full w-full" />
          </button>
        ))}
      </div>
      <div className="group relative aspect-[3/4] flex-1 overflow-hidden bg-sand">
        <SmartImage
          key={images[active]}
          src={images[active]}
          alt={name}
          className="h-full w-full animate-fadeIn transition duration-700 group-hover:scale-110"
        />
      </div>
    </div>
  );
}
