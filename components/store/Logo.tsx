import Image from "next/image";
import { cn } from "@/lib/format";

// public/logo.png — 4500×4500 kvadrat, shaffof fon. Atrofidagi bo'sh joyni kesib, faqat belgi + yozuvni ko'rsatamiz.
// Kontent chegaralari (rasm o'lchamiga nisbatan): x 16.9%–82.9%, y 22.4%–77.6%.
const BOX = { left: 0.169, top: 0.224, width: 0.66, height: 0.552 };

/**
 * @param width ko'rinadigan logo kengligi (px)
 * @param tone "onLight" — och fonda (header) oltin rangni to'qroq qiladi; "onDark" — asl ranglar (footer, admin).
 */
export function Logo({ width, tone = "onDark", priority, className }: { width: number; tone?: "onLight" | "onDark"; priority?: boolean; className?: string }) {
  const size = width / BOX.width;
  return (
    <span className={cn("relative block overflow-hidden", className)} style={{ width, height: size * BOX.height }}>
      <Image
        src="/logo.png"
        alt="DJAFARIY"
        width={Math.round(size)}
        height={Math.round(size)}
        priority={priority}
        className={cn("absolute max-w-none", tone === "onLight" && "brightness-[0.62] saturate-[1.8]")}
        style={{ width: size, height: size, left: -size * BOX.left, top: -size * BOX.top }}
      />
    </span>
  );
}
