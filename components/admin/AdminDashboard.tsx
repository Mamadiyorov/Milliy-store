"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, Check, CreditCard, Download, LayoutDashboard, LogOut, Mail, MapPin, Menu, Package,
  Phone, Plus, Search, Settings, ShoppingCart, Store, Truck, Users, Wallet, X,
} from "lucide-react";
import { Logo } from "@/components/store/Logo";
import {
  adminStats, monthlyRevenue, paymentBreakdown, recentCustomers,
  recentOrders, topRegions, type Order, type OrderStatus, type Product,
} from "@/lib/mockData";
import { cn, formatCompactUZS, formatUZS } from "@/lib/format";
import { useStore } from "@/components/store/StoreProvider";
import { Card, MethodBadge, StatCard, StatusBadge } from "./ui";
import { RevenueChart } from "./RevenueChart";
import { AddProductModal } from "./AddProductModal";
import { SmartImage } from "@/components/store/SmartImage";

type View = "dashboard" | "orders" | "products" | "analytics";

const navItems: { id: View; label: string; icon: typeof LayoutDashboard; badge?: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Buyurtmalar", icon: ShoppingCart },
  { id: "products", label: "Mahsulotlar", icon: Package },
  { id: "analytics", label: "Analytics", icon: Activity },
];

// adminStats tarixiy ko'rsatkichlari seed buyurtmalarni ham o'z ichiga oladi —
// shuning uchun global state'dagi buyurtmalardan hisoblaganda seed qismini ayirib tashlaymiz.
const paidSum = (list: Order[], method?: Order["method"]) =>
  list.filter((o) => o.status === "To'langan" && (!method || o.method === method)).reduce((s, o) => s + o.amountUZS, 0);
const SEED_PAID = paidSum(recentOrders);
const SEED_PAYME_PAID = paidSum(recentOrders, "Payme");

export function AdminDashboard() {
  const { orders, products: productList, addProduct, setOrderStatus } = useStore();
  const [view, setView] = useState<View>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [visitors, setVisitors] = useState(adminStats.visitorsToday);
  const [now, setNow] = useState<Date | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedOrder = orders.find((o) => o.id === selectedId) ?? null;
  const closeDetails = useCallback(() => setSelectedId(null), []);

  const markPaid = (order: Order) => {
    if (order.status !== "Kutilmoqda") return;
    setOrderStatus(order.id, "To'langan");
  };

  useEffect(() => {
    setNow(new Date());
    const clock = setInterval(() => setNow(new Date()), 1000);
    const visitorsTick = setInterval(() => setVisitors((v) => v + Math.floor(Math.random() * 4)), 2500);
    return () => {
      clearInterval(clock);
      clearInterval(visitorsTick);
    };
  }, []);

  // Do'kondan yangi zakaz tushganda (shu yoki boshqa tabda) bildirishnoma ko'rsatish
  const lastOrderId = useRef(orders[0]?.id);
  useEffect(() => {
    const latest = orders[0];
    if (!latest || latest.id === lastOrderId.current) return;
    lastOrderId.current = latest.id;
    if (latest.createdAt && Date.now() - latest.createdAt < 15_000) {
      setNotice(`Yangi buyurtma: ${latest.customer} — ${formatUZS(latest.amountUZS)}`);
    }
  }, [orders]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const pendingCount = orders.filter((o) => o.status === "Kutilmoqda").length;
  const navWithBadges = navItems.map((n) => (n.id === "orders" && pendingCount ? { ...n, badge: String(pendingCount) } : n));

  const stats = useMemo(
    () => ({
      revenue: adminStats.totalRevenueUZS - SEED_PAID + paidSum(orders),
      orders: adminStats.ordersCount - recentOrders.length + orders.length,
      payme: adminStats.paymeRevenueUZS - SEED_PAYME_PAID + paidSum(orders, "Payme"),
    }),
    [orders],
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/[0.06] bg-night-900 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 leading-none">
            <Logo width={52} />
            <span className="text-[9px] uppercase tracking-[0.4em] text-gold-light">Admin</span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <nav className="mt-6 flex-1 space-y-1 px-3">
          <p className="px-3 pb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Asosiy</p>
          {navWithBadges.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => {
                setView(id);
                setSidebarOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                view === id ? "bg-white/[0.07] text-white" : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200",
              )}
            >
              <Icon size={17} strokeWidth={1.75} className={view === id ? "text-gold-light" : ""} />
              {label}
              {badge && <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400">{badge}</span>}
            </button>
          ))}
          <p className="px-3 pb-2 pt-6 text-[10px] uppercase tracking-[0.2em] text-zinc-600">Tizim</p>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/[0.03]">
            <Users size={17} strokeWidth={1.75} /> Mijozlar
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/[0.03]">
            <Settings size={17} strokeWidth={1.75} /> Sozlamalar
          </button>
          <Link href="/" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/[0.03]">
            <Store size={17} strokeWidth={1.75} /> Do'konni ochish
          </Link>
        </nav>

        <div className="m-3 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#00CCCC]/10 to-transparent p-4">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Payme Merchant API
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">Ulangan · {adminStats.paymeSuccessRate}% muvaffaqiyat</p>
        </div>

        <div className="flex items-center gap-3 border-t border-white/[0.06] p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-xs font-semibold text-gold-light">DA</div>
          <div className="flex-1">
            <p className="text-sm text-white">Djafariy Admin</p>
            <p className="text-[11px] text-zinc-500">Bosh menejer</p>
          </div>
          <LogOut size={16} className="text-zinc-500" />
        </div>
      </aside>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-night-900/80 px-4 backdrop-blur-md md:px-8">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Menyu">
            <Menu size={20} />
          </button>
          <div className="hidden flex-1 items-center gap-2 rounded-xl border border-white/[0.06] bg-night-800 px-3 py-2 md:flex md:max-w-sm">
            <Search size={15} className="text-zinc-500" />
            <input placeholder="Buyurtma, mijoz yoki mahsulot qidirish…" className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-600" />
            <kbd className="rounded border border-white/10 px-1.5 text-[10px] text-zinc-500">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="hidden text-xs tabular-nums text-zinc-500 sm:block">
              {now ? now.toLocaleString("uz-UZ", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" }) : " "}
            </span>
            <button className="relative rounded-xl border border-white/[0.06] p-2" aria-label="Bildirishnomalar">
              <Bell size={16} />
              {pendingCount > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold" />}
            </button>
            <button onClick={() => setAddOpen(true)} className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-sm font-medium text-night-900 transition hover:bg-gold-light">
              <Plus size={16} /> <span className="hidden sm:inline">Mahsulot qo'shish</span>
            </button>
          </div>
        </header>

        <main className="space-y-6 p-4 md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-white">{navItems.find((n) => n.id === view)!.label}</h1>
              <p className="mt-1 text-sm text-zinc-500">Xush kelibsiz! Bugungi do'kon ko'rsatkichlari real vaqtda yangilanmoqda.</p>
            </div>
            <div className="flex gap-2">
              <select className="rounded-xl border border-white/[0.06] bg-night-800 px-3 py-2 text-sm text-zinc-300 outline-none">
                <option>So'nggi 30 kun</option>
                <option>Bu yil</option>
                <option>Bugun</option>
              </select>
              <button className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-night-800 px-3 py-2 text-sm text-zinc-300">
                <Download size={15} /> Eksport
              </button>
            </div>
          </div>

          {(view === "dashboard" || view === "analytics") && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Umumiy tushum" value={formatUZS(stats.revenue)} delta={adminStats.revenueGrowth} hint="o'tgan oyga nisbatan" icon={<Wallet size={18} />} live />
              <StatCard label="Buyurtmalar soni" value={stats.orders.toLocaleString("ru-RU")} delta={adminStats.ordersGrowth} hint={`${pendingCount} ta kutilmoqda`} icon={<ShoppingCart size={18} />} accent="#60A5FA" />
              <StatCard
                label="Payme orqali to'lovlar"
                value={formatUZS(stats.payme)}
                hint={`Ulush ${adminStats.paymeShare}% · ${adminStats.paymeSuccessRate}% muvaffaqiyat`}
                icon={<CreditCard size={18} />}
                accent="#00CCCC"
                live
              />
              <StatCard label="O'rtacha chek" value={formatUZS(adminStats.avgOrderUZS)} delta={-2.3} hint={`Konversiya ${adminStats.conversionRate}%`} icon={<ArrowUpRight size={18} />} accent="#A78BFA" />
            </div>
          )}

          {view === "dashboard" && (
            <>
              <div className="grid gap-4 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <ChartHeader total={monthlyRevenue.reduce((s, m) => s + m.revenue, 0)} />
                  <div className="mt-6">
                    <RevenueChart data={monthlyRevenue} />
                  </div>
                </Card>
                <PaymentsCard />
              </div>
              <div className="grid gap-4 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <OrdersTable orders={orders.slice(0, 7)} title="So'nggi buyurtmalar" onSeeAll={() => setView("orders")} onSelect={(o) => setSelectedId(o.id)} />
                </Card>
                <CustomersCard />
              </div>
            </>
          )}

          {view === "orders" && (
            <Card>
              <OrdersTable
                orders={orders}
                title={`Barcha buyurtmalar (${orders.length})`}
                onSelect={(o) => setSelectedId(o.id)}
                onMarkPaid={(order) => {
                  markPaid(order);
                  setNotice(`${order.id} to'langan deb belgilandi`);
                }}
              />
            </Card>
          )}

          {view === "products" && <ProductsView products={productList} onAdd={() => setAddOpen(true)} />}

          {view === "analytics" && (
            <div className="grid gap-4 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <ChartHeader total={monthlyRevenue.reduce((s, m) => s + m.revenue, 0)} />
                <div className="mt-6">
                  <RevenueChart data={monthlyRevenue} height={320} />
                </div>
              </Card>
              <div className="space-y-4">
                <Card>
                  <p className="text-sm font-medium text-white">Hududlar bo'yicha savdo</p>
                  <div className="mt-5 space-y-4">
                    {topRegions.map((r) => (
                      <div key={r.name}>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-300">{r.name}</span>
                          <span className="tabular-nums text-zinc-500">{r.share}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-white/5">
                          <div className="h-full rounded-full bg-gold-light" style={{ width: `${r.share}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <p className="text-sm font-medium text-white">Bugungi tashrifchilar</p>
                  <p className="mt-2 text-3xl font-semibold tabular-nums text-white">{visitors.toLocaleString("ru-RU")}</p>
                  <p className="mt-1 text-xs text-emerald-400">● {Math.round(visitors / 38)} kishi hozir saytda</p>
                </Card>
              </div>
              <div className="xl:col-span-3">
                <PaymentsCard horizontal />
              </div>
            </div>
          )}
        </main>
      </div>

      {addOpen && (
        <AddProductModal
          onClose={() => setAddOpen(false)}
          onSave={(p) => {
            addProduct(p);
            setAddOpen(false);
            setView("products");
            setNotice(`"${p.name}" katalogga qo'shildi`);
          }}
        />
      )}

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeDetails}
          onMarkPaid={(order) => {
            markPaid(order);
            setNotice(`${order.id} to'langan deb belgilandi`);
          }}
        />
      )}

      {notice && (
        <div className="fixed bottom-6 right-6 z-50 flex animate-fadeUp items-center gap-3 rounded-xl border border-white/10 bg-night-600 px-4 py-3 text-sm text-white shadow-2xl">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Check size={14} />
          </span>
          {notice}
        </div>
      )}
    </div>
  );
}

function ChartHeader({ total }: { total: number }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-white">Oylik tushum grafigi</p>
        <p className="mt-1 text-xs text-zinc-500">Yanvar – Oktabr 2026</p>
      </div>
      <div className="text-right">
        <p className="text-xl font-semibold tabular-nums text-white">{formatCompactUZS(total)} so'm</p>
        <p className="text-xs text-emerald-400">+18.4% yillik o'sish</p>
      </div>
    </div>
  );
}

function PaymentsCard({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <Card>
      <p className="text-sm font-medium text-white">To'lov tizimlari</p>
      <p className="mt-1 text-xs text-zinc-500">Tushum taqsimoti</p>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full">
        {paymentBreakdown.map((p) => (
          <div key={p.method} style={{ width: `${p.share}%`, background: p.color }} />
        ))}
      </div>
      <div className={cn("mt-6 gap-4", horizontal ? "grid sm:grid-cols-3" : "space-y-4")}>
        {paymentBreakdown.map((p) => (
          <div key={p.method} className="flex items-center justify-between rounded-xl bg-white/[0.02] p-3">
            <div className="flex items-center gap-3">
              <span className="h-8 w-1 rounded-full" style={{ background: p.color }} />
              <div>
                <p className="text-sm text-white">{p.method}</p>
                <p className="text-[11px] text-zinc-500">{p.share}% ulush</p>
              </div>
            </div>
            <p className="text-sm tabular-nums text-zinc-300">{formatCompactUZS(p.amountUZS)}</p>
          </div>
        ))}
      </div>
      {!horizontal && (
        <div className="mt-5 rounded-xl border border-[#00CCCC]/20 bg-[#00CCCC]/5 p-3 text-xs text-zinc-400">
          <span className="font-medium text-[#00CCCC]">Payme:</span> oxirgi tranzaksiya 2 daqiqa oldin · webhook faol
        </div>
      )}
    </Card>
  );
}

function CustomersCard() {
  return (
    <Card>
      <p className="text-sm font-medium text-white">So'nggi xaridorlar</p>
      <ul className="mt-5 space-y-4">
        {recentCustomers.map((c) => (
          <li key={c.name} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-xs font-semibold text-gold-light">{c.avatar}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white">{c.name}</p>
              <p className="text-[11px] text-zinc-500">
                {c.city} · {c.orders} ta buyurtma
              </p>
            </div>
            <p className="text-xs tabular-nums text-zinc-300">{formatCompactUZS(c.spentUZS)}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** Buyurtma qatorlari: mahsulot nomi + rang (namuna bilan) + o'lcham + miqdor. */
function LineItems({ order, detailed = false }: { order: Order; detailed?: boolean }) {
  if (!order.lineItems?.length) {
    return (
      <span className="text-zinc-300">
        {order.product}
        {order.items > 1 && <span className="text-zinc-500"> ×{order.items}</span>}
      </span>
    );
  }
  return (
    <ul className={cn(detailed ? "space-y-3" : "space-y-1.5")}>
      {order.lineItems.map((l, i) => (
        <li key={i} className={cn(detailed && "flex items-center justify-between gap-4 rounded-xl bg-white/[0.03] p-3")}>
          <div>
            <p className="text-zinc-200">
              {l.name}
              {l.qty > 1 && <span className="text-zinc-500"> ×{l.qty}</span>}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white/[0.05] px-1.5 py-0.5 text-zinc-300">
                <span className="h-2.5 w-2.5 rounded-full ring-1 ring-white/20" style={{ background: l.colorHex ?? "#888" }} />
                {l.color}
              </span>
              <span className="rounded-md bg-gold/15 px-1.5 py-0.5 font-semibold text-gold-light">O'lcham: {l.size}</span>
            </div>
          </div>
          {detailed && <p className="shrink-0 text-sm tabular-nums text-zinc-300">{formatUZS(l.priceUZS * l.qty)}</p>}
        </li>
      ))}
    </ul>
  );
}

function OrderDetailsModal({ order, onClose, onMarkPaid }: { order: Order; onClose: () => void; onMarkPaid: (o: Order) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-xl animate-fadeUp overflow-y-auto rounded-2xl border border-white/10 bg-night-800 p-6">
        <button onClick={onClose} className="absolute right-4 top-4 text-zinc-500 hover:text-white" aria-label="Yopish">
          <X size={18} />
        </button>
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-lg text-white">{order.id}</p>
          <StatusBadge status={order.status} />
        </div>
        <p className="mt-1 text-xs text-zinc-500">{order.date}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Detail icon={<Users size={14} />} label="Mijoz" value={order.customer} />
          <Detail icon={<Phone size={14} />} label="Telefon" value={order.phone ? <a href={`tel:${order.phone.replace(/\s/g, "")}`} className="hover:underline">{order.phone}</a> : "—"} />
          <Detail icon={<Mail size={14} />} label="Email" value={order.email || "—"} />
          <Detail icon={<Truck size={14} />} label="Dostavka" value={order.shipping ?? "—"} />
          <div className="sm:col-span-2">
            <Detail icon={<MapPin size={14} />} label="Yetkazib berish manzili" value={[order.location, order.address].filter(Boolean).join(", ")} />
          </div>
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-wider text-zinc-500">Mahsulotlar · rang va o'lcham</p>
        <div className="mt-3">
          <LineItems order={order} detailed />
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div>
            <MethodBadge method={order.method} />
            {order.paymentStatus && <p className="mt-1 text-[11px] text-emerald-400/80">{order.paymentStatus}</p>}
          </div>
          <p className="text-xl font-semibold tabular-nums text-white">{formatUZS(order.amountUZS)}</p>
        </div>
        {order.status === "Kutilmoqda" && (
          <button onClick={() => onMarkPaid(order)} className="mt-5 w-full rounded-xl bg-gold py-2.5 text-sm font-medium text-night-900 hover:bg-gold-light">
            To'langan deb belgilash
          </button>
        )}
      </div>
    </div>
  );
}

function Detail({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <p className="flex items-center gap-1.5 text-[11px] text-zinc-500">
        {icon} {label}
      </p>
      <p className="mt-1 break-words text-sm text-zinc-200">{value}</p>
    </div>
  );
}

function OrdersTable({
  orders, title, onSeeAll, onMarkPaid, onSelect,
}: { orders: Order[]; title: string; onSeeAll?: () => void; onMarkPaid?: (order: Order) => void; onSelect: (order: Order) => void }) {
  const [filter, setFilter] = useState<"Barchasi" | OrderStatus>("Barchasi");
  const shown = useMemo(() => (filter === "Barchasi" ? orders : orders.filter((o) => o.status === filter)), [orders, filter]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-white">{title}</p>
        <div className="flex items-center gap-1 rounded-xl bg-white/[0.03] p-1 text-xs">
          {(["Barchasi", "To'langan", "Kutilmoqda", "Bekor qilingan"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn("rounded-lg px-3 py-1.5 transition", filter === f ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:text-zinc-300")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11px] uppercase tracking-wider text-zinc-500">
              <th className="py-3 pr-4 font-medium">Buyurtma</th>
              <th className="py-3 pr-4 font-medium">Mijoz · telefon · manzil</th>
              <th className="py-3 pr-4 font-medium">Mahsulot · rang · o'lcham</th>
              <th className="py-3 pr-4 font-medium">To'lov</th>
              <th className="py-3 pr-4 font-medium">Summa</th>
              <th className="py-3 pr-4 font-medium">Status</th>
              {onMarkPaid && <th className="py-3 font-medium" />}
            </tr>
          </thead>
          <tbody>
            {shown.map((o) => (
              <tr
                key={o.id + o.date}
                onClick={() => onSelect(o)}
                className="cursor-pointer border-b border-white/[0.04] align-top transition hover:bg-white/[0.02]"
                title="Buyurtma tafsilotlari"
              >
                <td className="py-3.5 pr-4">
                  <p className="font-mono text-xs text-white">{o.id}</p>
                  <p className="text-[11px] text-zinc-500">{o.date}</p>
                </td>
                <td className="max-w-[280px] py-3.5 pr-4">
                  <p className="text-zinc-200">{o.customer}</p>
                  {o.phone && <p className="mt-0.5 text-[11px] tabular-nums text-zinc-300">{o.phone}</p>}
                  <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{[o.location, o.address].filter(Boolean).join(", ")}</p>
                </td>
                <td className="max-w-[300px] py-3.5 pr-4">
                  <LineItems order={o} />
                  {o.shipping && <p className="mt-1 text-[11px] text-zinc-500">Dostavka: {o.shipping}</p>}
                </td>
                <td className="py-3.5 pr-4">
                  <MethodBadge method={o.method} />
                  {o.paymentStatus && <p className="mt-0.5 text-[11px] text-emerald-400/80">{o.paymentStatus}</p>}
                </td>
                <td className="py-3.5 pr-4 tabular-nums text-white">{formatUZS(o.amountUZS)}</td>
                <td className="py-3.5 pr-4">
                  <StatusBadge status={o.status} />
                </td>
                {onMarkPaid && (
                  <td className="py-3.5 text-right">
                    {o.status === "Kutilmoqda" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkPaid(o);
                        }}
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-[11px] text-zinc-300 hover:bg-white/5">
                        To'langan deb belgilash
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">Bu statusdagi buyurtmalar yo'q</p>}
      </div>
      {onSeeAll && (
        <button onClick={onSeeAll} className="mt-4 text-xs text-gold-light hover:underline">
          Barcha buyurtmalarni ko'rish →
        </button>
      )}
    </div>
  );
}

function ProductsView({ products, onAdd }: { products: Product[]; onAdd: () => void }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <button
        onClick={onAdd}
        className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 text-zinc-500 transition hover:border-gold/50 hover:text-gold-light"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04]">
          <Plus size={22} />
        </span>
        <span className="text-sm">Yangi mahsulot qo'shish</span>
      </button>
      {products.map((p) => (
        <Card key={p.id} className="overflow-hidden p-0">
          <div className="relative aspect-[4/3] bg-night-700">
            <SmartImage src={p.images[0]} alt={p.name} className="h-full w-full" />
            {p.badge && <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] text-white backdrop-blur">{p.badge}</span>}
          </div>
          <div className="p-4">
            <p className="text-[11px] text-zinc-500">{p.category}</p>
            <p className="mt-0.5 font-medium text-white">{p.name}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="tabular-nums text-gold-light">{formatUZS(p.priceUZS)}</span>
              <span className={cn("text-xs", p.stock < 10 ? "text-amber-400" : "text-zinc-500")}>{p.stock} dona</span>
            </div>
            <div className="mt-3 flex gap-1.5">
              {p.sizes.map((s) => (
                <span key={s} className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
