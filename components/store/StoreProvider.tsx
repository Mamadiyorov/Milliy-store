"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  colorLabel, localizeProduct, products as seedProducts, recentOrders as seedOrders,
  type Currency, type Order, type OrderStatus, type Product, type Size,
} from "@/lib/mockData";
import {
  fallbackRate, fetchUsdRate, formatUSD, formatUZS, isFresh, readCachedRate, uzsToUSD, type UsdRate,
} from "@/lib/currency";
import {
  LANGUAGE_KEY, isLanguage, languageCurrency, languageMeta, translate, type Language, type TranslationKey,
} from "@/lib/i18n";

export interface CartItem {
  key: string;
  productId: string;
  size: Size;
  color: string;
  qty: number;
}

export type NewOrder = Omit<Order, "id" | "date" | "createdAt">;

export interface CustomerProfile {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
}

interface StoreState {
  /** Tilga bog'langan: UZ/RU → UZS, EN/KO/AR → USD. Alohida o'zgartirgich yo'q. */
  currency: Currency;
  /** 1 USD = usdRate.rate UZS (API'dan, keshdan yoki zaxira 12 800) */
  usdRate: UsdRate;
  /** Narxni tanlangan valyutada formatlaydi. USD — har bir dona narxi yaxlitlanib, keyin qty ga ko'paytiriladi. */
  money: (unitUZS: number, qty?: number) => string;
  /** Yaxlitlangan USD qiymat (savatcha/checkout jamlari uchun) */
  toUSD: (unitUZS: number) => number;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  /** Mahsulot matnlarini (nom, tavsif, ...) tanlangan tilga o'giradi */
  localize: (p: Product) => Product;
  /** Rang nomini tanlangan tilda qaytaradi (saqlanadigan kalit — o'zbekcha nom) */
  colorName: (name: string) => string;
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
  /** Kartochkadan "Savatchaga qo'shish" — Quick View'ni rang/o'lcham tanlash so'rovi bilan ochadi. */
  requestSelection: (p: Product) => void;
  quickViewNeedsSelection: boolean;
  toast: string | null;
  // Mijoz profili (LocalStorage: djafariy_customer_profile)
  profile: CustomerProfile | null;
  saveProfile: (p: CustomerProfile) => void;
  clearProfile: () => void;
  profileOpen: boolean;
  setProfileOpen: (v: boolean) => void;
  // Global ma'lumotlar (do'kon + admin panel uchun umumiy)
  products: Product[];
  addProduct: (p: Product) => void;
  orders: Order[];
  addOrder: (o: NewOrder) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
}

const StoreContext = createContext<StoreState | null>(null);
const STORAGE_KEY = "djafariy-store-v1";
const DATA_KEY = "djafariy-data-v1";
export const PROFILE_KEY = "djafariy_customer_profile";

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
  const [usdRate, setUsdRate] = useState<UsdRate>(fallbackRate);
  const [language, setLanguageState] = useState<Language>("uz");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickViewState] = useState<Product | null>(null);
  const [quickViewNeedsSelection, setQuickViewNeedsSelection] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { cart?: CartItem[] };
        if (saved.cart) setCart(saved.cart.filter((i) => getProduct(i.productId)));
      }
    } catch {}
    try {
      const savedLang = localStorage.getItem(LANGUAGE_KEY);
      if (isLanguage(savedLang)) setLanguageState(savedLang);
    } catch {}
    try {
      const rawProfile = localStorage.getItem(PROFILE_KEY);
      if (rawProfile) setProfile(JSON.parse(rawProfile));
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

    // Valyuta kursi: avval kesh (6 soat), eskirgan bo'lsa API; API ishlamasa — kesh yoki 12 800 zaxira kurs
    let cancelled = false;
    const cached = readCachedRate();
    if (cached) setUsdRate(cached);
    if (!cached || !isFresh(cached)) {
      fetchUsdRate().then((live) => {
        if (!cancelled && live) setUsdRate(live);
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart }));
    } catch {}
  }, [cart, hydrated]);

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

  const setQuickView = useCallback((p: Product | null) => {
    setQuickViewNeedsSelection(false);
    setQuickViewState(p);
  }, []);

  const requestSelection = useCallback((p: Product) => {
    setQuickViewNeedsSelection(true);
    setQuickViewState(p);
  }, []);

  const saveProfile = useCallback((p: CustomerProfile) => {
    setProfile(p);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
    } catch {}
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch {}
  }, []);

  const addToCart = useCallback((product: Product, size: Size, color: string, qty = 1) => {
    // Rang va o'lchamsiz savatchaga qo'shib bo'lmaydi
    if (!size || !color) return;
    const key = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, productId: product.id, size, color, qty }];
    });
    setToast(translate(language, "toast.added", { name: localizeProduct(product, language).name }));
  }, [language]);

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

  // Til: LocalStorage'ga saqlash va <html lang/dir> ni yangilash (AR → RTL)
  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    try {
      localStorage.setItem(LANGUAGE_KEY, l);
    } catch {}
  }, []);

  useEffect(() => {
    const meta = languageMeta(language);
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
  }, [language]);

  const t = useCallback((key: TranslationKey, vars?: Record<string, string | number>) => translate(language, key, vars), [language]);
  const localize = useCallback((p: Product) => localizeProduct(p, language), [language]);
  const colorName = useCallback((name: string) => colorLabel(name, language), [language]);
  const currency = languageCurrency(language);

  const toUSD = useCallback((unitUZS: number) => uzsToUSD(unitUZS, usdRate.rate), [usdRate.rate]);

  const money = useCallback(
    (unitUZS: number, qty = 1) =>
      currency === "UZS" ? formatUZS(unitUZS * qty, translate(language, "currency.uzsSuffix")) : formatUSD(toUSD(unitUZS) * qty),
    [currency, language, toUSD],
  );

  const value = useMemo<StoreState>(() => {
    let subtotalUZS = 0;
    let subtotalUSD = 0;
    let cartCount = 0;
    for (const item of cart) {
      const p = getProduct(item.productId);
      if (!p) continue;
      subtotalUZS += p.priceUZS * item.qty;
      subtotalUSD += toUSD(p.priceUZS) * item.qty; // har bir dona yaxlitlangan narxi — savatcha qatorlari bilan mos keladi
      cartCount += item.qty;
    }
    return {
      currency, usdRate, money, toUSD, language, setLanguage, t, localize, colorName,
      cart, cartCount, subtotalUZS, subtotalUSD,
      addToCart, updateQty, removeItem, clearCart,
      cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen, quickView, setQuickView, requestSelection, quickViewNeedsSelection, toast,
      profile, saveProfile, clearProfile, profileOpen, setProfileOpen,
      products, addProduct, orders, addOrder, setOrderStatus,
    };
  }, [
    currency, usdRate, money, toUSD, language, setLanguage, t, localize, colorName, cart, addToCart, updateQty, removeItem, clearCart, cartOpen, checkoutOpen, quickView, setQuickView, requestSelection,
    quickViewNeedsSelection, toast, profile, saveProfile, clearProfile, profileOpen, products, addProduct, orders, addOrder, setOrderStatus,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
