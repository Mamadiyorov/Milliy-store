"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  products as seedProducts, recentOrders as seedOrders,
  type Currency, type Order, type OrderStatus, type Product, type Size,
} from "@/lib/mockData";

export interface CartItem {
  key: string;
  productId: string;
  size: Size;
  color: string;
  qty: number;
}

export type NewOrder = Omit<Order, "id" | "date" | "createdAt">;

interface StoreState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cart: CartItem[];
  cartCount: number;
  subtotalUZS: number;
  subtotalUSD: number;
  addToCart: (product: Product, size: Size, color: string, qty?: number) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  toast: string | null;
  // Global ma'lumotlar (do'kon + admin panel uchun umumiy)
  products: Product[];
  addProduct: (p: Product) => void;
  orders: Order[];
  addOrder: (o: NewOrder) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
}

const StoreContext = createContext<StoreState | null>(null);
const STORAGE_KEY = "zarboft-store-v1";
const DATA_KEY = "zarboft-data-v1";

const MONTHS = ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"];

function formatOrderDate(d: Date) {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${hh}:${mm}`;
}

function nextOrderId(orders: Order[]) {
  const max = orders.reduce((m, o) => Math.max(m, Number(o.id.replace(/\D/g, "")) || 0), 10_000);
  return `#ZM-${max + 1}`;
}

export function getProduct(id: string) {
  return seedProducts.find((p) => p.id === id);
}

function readData(): { orders?: Order[]; products?: Product[] } {
  try {
    const raw = localStorage.getItem(DATA_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("UZS");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { cart?: CartItem[]; currency?: Currency };
        if (saved.cart) setCart(saved.cart.filter((i) => getProduct(i.productId)));
        if (saved.currency) setCurrency(saved.currency);
      }
    } catch {}
    const data = readData();
    if (data.orders) setOrders(data.orders);
    if (data.products) setProducts(data.products);
    setHydrated(true);

    // Boshqa tabda (masalan, do'kon ↔ admin) o'zgarish bo'lsa — darhol sinxronlash
    const onStorage = (e: StorageEvent) => {
      if (e.key !== DATA_KEY) return;
      const next = readData();
      if (next.orders) setOrders(next.orders);
      if (next.products) setProducts(next.products);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, currency }));
    } catch {}
  }, [cart, currency, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(DATA_KEY, JSON.stringify({ orders, products }));
    } catch {}
  }, [orders, products, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addToCart = useCallback((product: Product, size: Size, color: string, qty = 1) => {
    const key = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, productId: product.id, size, color, qty }];
    });
    setToast(`${product.name} savatchaga qo'shildi`);
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))));
  }, []);

  const removeItem = useCallback((key: string) => setCart((prev) => prev.filter((i) => i.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const addProduct = useCallback((p: Product) => setProducts((prev) => [p, ...prev]), []);

  const addOrder = useCallback(
    (input: NewOrder) => {
      // Boshqa tabdagi eng so'nggi buyurtmalarni ham hisobga olib ID beramiz
      const current = readData().orders ?? orders;
      const now = new Date();
      const order: Order = { ...input, id: nextOrderId(current), date: formatOrderDate(now), createdAt: now.getTime() };
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    [orders],
  );

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const value = useMemo<StoreState>(() => {
    let subtotalUZS = 0;
    let subtotalUSD = 0;
    let cartCount = 0;
    for (const item of cart) {
      const p = getProduct(item.productId);
      if (!p) continue;
      subtotalUZS += p.priceUZS * item.qty;
      subtotalUSD += p.priceUSD * item.qty;
      cartCount += item.qty;
    }
    return {
      currency, setCurrency, cart, cartCount, subtotalUZS, subtotalUSD,
      addToCart, updateQty, removeItem, clearCart,
      cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen, quickView, setQuickView, toast,
      products, addProduct, orders, addOrder, setOrderStatus,
    };
  }, [currency, cart, addToCart, updateQty, removeItem, clearCart, cartOpen, checkoutOpen, quickView, toast, products, addProduct, orders, addOrder, setOrderStatus]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
