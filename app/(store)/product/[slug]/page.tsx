import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { products } from "@/lib/mockData";
import { ProductGallery } from "@/components/store/ProductGallery";
import { ProductPurchase } from "@/components/store/ProductPurchase";
import { ProductCard } from "@/components/store/ProductCard";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product ? `${product.name} — DJAFARIY` : "Mahsulot topilmadi" };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.badge)).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-10">
      <nav className="flex items-center gap-2 py-6 text-[11px] uppercase tracking-[0.15em] text-stone-450">
        <Link href="/" className="hover:text-ink">Bosh sahifa</Link>
        <ChevronRight size={12} />
        <Link href="/#kolleksiya" className="hover:text-ink">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductPurchase key={product.id} product={product} />

          <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
            <details open className="group py-5">
              <summary className="flex cursor-pointer list-none justify-between text-[11px] uppercase tracking-[0.2em]">
                Tavsif <span className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">{product.description}</p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none justify-between text-[11px] uppercase tracking-[0.2em]">
                Tarkibi va parvarish <span className="transition group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-ink/70">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none justify-between text-[11px] uppercase tracking-[0.2em]">
                Kelib chiqishi <span className="transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink/70">
                {product.origin} · Material: {product.material}
              </p>
            </details>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="text-center font-serif text-4xl font-light">Sizga yoqishi mumkin</h2>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
