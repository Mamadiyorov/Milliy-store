import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/lib/mockData";
import { ProductDetail } from "@/components/store/ProductDetail";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} — DJAFARIY` : "Mahsulot topilmadi",
    description: product?.tagline,
    openGraph: product ? { images: [product.images[0]] } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Matnlar tanlangan tilga mos ravishda mijoz tomonda ko'rsatiladi
  return <ProductDetail product={product} />;
}
