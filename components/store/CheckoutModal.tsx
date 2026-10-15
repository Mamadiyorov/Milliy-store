"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, CreditCard, Globe, Loader2, Lock, MapPin, Truck, X } from "lucide-react";
import { countries, paymentMethods, shippingOptions, type OrderLine, type PaymentMethod, type ShippingOption } from "@/lib/mockData";
import { cn, formatUSD, formatUZS } from "@/lib/format";
import { getProduct, useStore, type CustomerProfile, type NewOrder } from "./StoreProvider";
import { SmartImage } from "./SmartImage";

const FREE_SHIPPING_UZS = 3_000_000;

type Stage = "form" | "processing" | "success";

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
}

const initialForm: FormState = { firstName: "", lastName: "", phone: "+998 ", email: "", country: "UZ", city: "", address: "" };

export function CheckoutModal() {
  const {
    checkoutOpen, setCheckoutOpen, cart, currency, money, toUSD, usdRate, subtotalUZS, subtotalUSD, clearCart, addOrder, profile, saveProfile,
  } = useStore();
  const [form, setForm] = useState<FormState>(initialForm);
  const [shipping, setShipping] = useState<ShippingOption["id"]>("tashkent");
  const [payment, setPayment] = useState<PaymentMethod>("payme");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [stage, setStage] = useState<Stage>("form");
  const [orderId, setOrderId] = useState("");
  const [paidTotal, setPaidTotal] = useState("");

  const isDomestic = form.country === "UZ";
  const available = shippingOptions.filter((s) => s.international === !isDomestic);

  useEffect(() => {
    if (!available.some((s) => s.id === shipping)) setShipping(available[0].id);
    // Xalqaro buyurtmalarda Visa tavsiya etiladi
    if (!isDomestic && payment !== "visa") setPayment("visa");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.country]);

  // Saqlangan profil bo'lsa — checkout ochilganda formani avtomatik to'ldiramiz
  useEffect(() => {
    if (!checkoutOpen || stage !== "form" || !profile) return;
    setForm({ ...initialForm, ...profile });
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutOpen]);

  useEffect(() => {
    if (!checkoutOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkoutOpen]);

  const selectedShipping = shippingOptions.find((s) => s.id === shipping)!;
  const freeShipping = shipping === "tashkent" && subtotalUZS >= FREE_SHIPPING_UZS;
  const shipUZS = freeShipping ? 0 : selectedShipping.priceUZS;
  const shipUSD = toUSD(shipUZS);
  const totalUZS = subtotalUZS + shipUZS;
  const totalUSD = subtotalUSD + shipUSD; // yaxlitlangan qatorlar yig'indisi — ekrandagi raqamlar bilan mos
  const fmt = (uzs: number, usd: number) => (currency === "UZS" ? money(uzs) : formatUSD(usd));

  const payLabel = useMemo(() => {
    if (payment === "payme") return "Payme orqali to'lash";
    if (payment === "click") return "Click orqali to'lash";
    return "Visa / Mastercard bilan to'lash";
  }, [payment]);

  if (!checkoutOpen) return null;

  const close = () => {
    setCheckoutOpen(false);
    if (stage === "success") {
      setStage("form");
      setForm(initialForm);
    }
  };

  const update = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof FormState)[] = ["firstName", "lastName", "phone", "city", "address"];
    const next: Partial<Record<keyof FormState, boolean>> = {};
    for (const k of required) if (form[k].trim().length < 2) next[k] = true;
    if (form.phone.replace(/\D/g, "").length < 9) next.phone = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    // Buyurtma obyektini submit paytidagi savatcha holatidan yig'amiz
    const methodName = paymentMethods.find((m) => m.id === payment)!.name;
    const countryName = countries.find((c) => c.code === form.country)?.name ?? form.country;
    const lineItems: OrderLine[] = cart.flatMap((item) => {
      const p = getProduct(item.productId);
      if (!p) return [];
      const hex = p.colors.find((c) => c.name === item.color)?.hex;
      return [{ name: p.name, size: item.size, color: item.color, colorHex: hex, qty: item.qty, priceUZS: p.priceUZS }];
    });
    const customer: CustomerProfile = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      country: form.country,
      city: form.city.trim(),
      address: form.address.trim(),
    };
    const newOrder: NewOrder = {
      customer: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      phone: customer.phone,
      location: isDomestic ? customer.city : `${customer.city}, ${countryName}`,
      address: customer.address,
      product: lineItems.map((l) => `${l.name} (${l.size}, ${l.color})${l.qty > 1 ? ` ×${l.qty}` : ""}`).join(", "),
      lineItems,
      items: cart.reduce((n, i) => n + i.qty, 0),
      amountUZS: totalUZS,
      method: payment === "payme" ? "Payme" : payment === "click" ? "Click" : "Visa",
      status: "To'langan",
      paymentStatus: `${methodName} orqali to'landi`,
      shipping: selectedShipping.name,
    };

    setPaidTotal(fmt(totalUZS, totalUSD));
    setStage("processing");
    setTimeout(() => {
      const saved = addOrder(newOrder);
      saveProfile(customer); // keyingi xarid uchun eslab qolamiz (djafariy_customer_profile)
      setOrderId(saved.id.replace("#", ""));
      setStage("success");
      clearCart();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-0 md:items-center md:p-6">
      <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm animate-fadeIn" onClick={stage === "processing" ? undefined : close} />

      <div className="relative w-full max-w-6xl animate-fadeUp bg-ivory md:max-h-[94vh] md:overflow-y-auto">
        {stage !== "processing" && (
          <button onClick={close} className="absolute right-5 top-5 z-10" aria-label="Yopish">
            <X size={20} strokeWidth={1.5} />
          </button>
        )}

        {stage === "processing" && <ProcessingScreen payment={payment} total={paidTotal} />}
        {stage === "success" && <SuccessScreen orderId={orderId} name={form.firstName} total={paidTotal} eta={selectedShipping.eta} onClose={close} />}

        {stage === "form" && (
          <form onSubmit={submit} className="grid md:grid-cols-[1.25fr_1fr]">
            <div className="p-6 md:p-10">
              <p className="eyebrow">Xavfsiz checkout</p>
              <h2 className="mt-2 font-serif text-4xl font-light">Buyurtmani rasmiylashtirish</h2>
              {profile ? (
                <p className="mt-3 text-xs text-gold-dark">✓ Ma'lumotlar saqlangan profilingizdan avtomatik to'ldirildi. Kerak bo'lsa, o'zgartiring.</p>
              ) : (
                <p className="mt-3 text-xs text-stone-450">Ma'lumotlaringiz keyingi xaridlar uchun shu brauzerda saqlanadi.</p>
              )}

              <Section icon={<MapPin size={15} />} title="Mijoz ma'lumotlari">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input label="Ism" value={form.firstName} error={errors.firstName} onChange={(v) => update("firstName", v)} placeholder="Madina" />
                  <Input label="Familiya" value={form.lastName} error={errors.lastName} onChange={(v) => update("lastName", v)} placeholder="Karimova" />
                  <Input label="Telefon" value={form.phone} error={errors.phone} onChange={(v) => update("phone", v)} placeholder="+998 90 123 45 67" />
                  <Input label="Email (ixtiyoriy)" value={form.email} onChange={(v) => update("email", v)} placeholder="siz@mail.uz" type="email" />
                </div>
              </Section>

              <Section icon={<Globe size={15} />} title="Yetkazib berish manzili">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-ink/70">Mamlakat</span>
                    <select value={form.country} onChange={(e) => update("country", e.target.value)} className="field appearance-none">
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Input
                    label={isDomestic ? "Shahar / Viloyat" : "Shahar"}
                    value={form.city}
                    error={errors.city}
                    onChange={(v) => update("city", v)}
                    placeholder={isDomestic ? "Toshkent" : "Berlin"}
                  />
                  <div className="sm:col-span-2">
                    <Input label="Manzil" value={form.address} error={errors.address} onChange={(v) => update("address", v)} placeholder="Ko'cha, uy, xonadon" />
                  </div>
                </div>
              </Section>

              <Section icon={<Truck size={15} />} title="Dostavka usuli">
                <div className="space-y-2">
                  {shippingOptions.map((s) => {
                    const disabled = !available.includes(s);
                    const isFree = s.id === "tashkent" && subtotalUZS >= FREE_SHIPPING_UZS;
                    return (
                      <label
                        key={s.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-4 border px-4 py-4 transition",
                          shipping === s.id ? "border-ink bg-white" : "border-ink/15 hover:border-ink/40",
                          disabled && "pointer-events-none opacity-35",
                        )}
                      >
                        <input type="radio" name="shipping" className="sr-only" checked={shipping === s.id} onChange={() => setShipping(s.id)} disabled={disabled} />
                        <Radio checked={shipping === s.id} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{s.name}</p>
                          <p className="text-xs text-stone-450">
                            {s.description} · {s.eta}
                          </p>
                        </div>
                        <span className="text-sm">
                          {isFree ? <span className="text-gold-dark">Bepul</span> : money(s.priceUZS)}
                        </span>
                      </label>
                    );
                  })}
                  {!isDomestic && <p className="text-xs text-stone-450">Xalqaro buyurtmalar faqat DHL Global Express orqali yuboriladi.</p>}
                </div>
              </Section>

              <Section icon={<CreditCard size={15} />} title="To'lov turi">
                <div className="grid gap-2 sm:grid-cols-3">
                  {paymentMethods.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={cn(
                        "flex flex-col items-start gap-2 border px-4 py-4 text-left transition",
                        payment === m.id ? "border-ink bg-white" : "border-ink/15 hover:border-ink/40",
                      )}
                    >
                      <div className="flex w-full items-center justify-between">
                        <PaymentLogo id={m.id} />
                        <Radio checked={payment === m.id} />
                      </div>
                      <span className="text-[11px] text-stone-450">{m.note}</span>
                    </button>
                  ))}
                </div>
              </Section>
            </div>

            <aside className="border-t border-ink/10 bg-sand/60 p-6 md:border-l md:border-t-0 md:p-10">
              <h3 className="font-serif text-2xl">Buyurtmangiz</h3>
              {cart.length === 0 ? (
                <p className="mt-6 text-sm text-stone-450">Savatcha bo'sh. Avval mahsulot qo'shing.</p>
              ) : (
                <ul className="mt-6 space-y-4">
                  {cart.map((item) => {
                    const p = getProduct(item.productId);
                    if (!p) return null;
                    return (
                      <li key={item.key} className="flex items-center gap-4">
                        <div className="relative h-20 w-16 shrink-0 bg-sand">
                          <SmartImage src={p.images[0]} alt={p.name} className="h-full w-full" />
                          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] text-ivory">{item.qty}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-serif text-lg leading-tight">{p.name}</p>
                          <p className="text-xs text-stone-450">
                            {item.color} · {item.size}
                          </p>
                        </div>
                        <span className="text-sm">{money(p.priceUZS, item.qty)}</span>
                      </li>
                    );
                  })}
                </ul>
              )}

              <dl className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-sm">
                <Row label="Oraliq summa" value={fmt(subtotalUZS, subtotalUSD)} />
                <Row label={`Dostavka (${selectedShipping.name})`} value={freeShipping ? "Bepul" : fmt(shipUZS, shipUSD)} />
                <div className="flex justify-between border-t border-ink/10 pt-4 text-lg">
                  <dt className="font-serif text-xl">Jami</dt>
                  <dd className="font-medium">{fmt(totalUZS, totalUSD)}</dd>
                </div>
              </dl>
              {currency === "USD" && (
                <p className="mt-3 text-[11px] leading-relaxed text-stone-450">
                  USD narxlar 1 USD = {formatUZS(usdRate.rate)} kursi bo'yicha yaxlitlangan{!usdRate.live && " (taxminiy kurs)"}. To'lov{" "}
                  {formatUZS(totalUZS)} miqdorida amalga oshiriladi.
                </p>
              )}

              <button
                type="submit"
                disabled={cart.length === 0}
                className={cn(
                  "mt-8 flex w-full items-center justify-center gap-2 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition disabled:cursor-not-allowed disabled:opacity-40",
                  payment === "payme" && "bg-[#00BABA] hover:bg-[#00A3A3]",
                  payment === "click" && "bg-[#0B7AE6] hover:bg-[#0967C2]",
                  payment === "visa" && "bg-[#1A1F71] hover:bg-[#12164F]",
                )}
              >
                <Lock size={14} /> {payLabel}
              </button>
              <p className="mt-3 text-center text-[11px] text-stone-450">
                To'lov 256-bit SSL orqali himoyalangan. Demo rejim — haqiqiy pul yechilmaydi.
              </p>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h3 className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]">
        {icon} {title}
      </h3>
      {children}
    </section>
  );
}

function Input({
  label, value, onChange, placeholder, error, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; error?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-ink/70">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn("field", error && "border-[#8E2A2A] bg-[#8E2A2A]/5")}
      />
      {error && <span className="mt-1 block text-[11px] text-[#8E2A2A]">Ushbu maydonni to'ldiring</span>}
    </label>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span className={cn("flex h-4 w-4 items-center justify-center rounded-full border", checked ? "border-ink" : "border-ink/30")}>
      {checked && <span className="h-2 w-2 rounded-full bg-ink" />}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink/70">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function PaymentLogo({ id }: { id: PaymentMethod }) {
  if (id === "payme")
    return (
      <span className="text-lg font-bold tracking-tight">
        <span className="text-[#00BABA]">pay</span>
        <span className="text-ink">me</span>
      </span>
    );
  if (id === "click")
    return (
      <span className="flex items-center gap-1 text-lg font-bold text-[#0B7AE6]">
        <span className="h-3 w-3 rounded-full border-[3px] border-[#0B7AE6]" /> click
      </span>
    );
  return <span className="text-lg font-black italic tracking-tight text-[#1A1F71]">VISA</span>;
}

function ProcessingScreen({ payment, total }: { payment: PaymentMethod; total: string }) {
  const name = paymentMethods.find((m) => m.id === payment)!.name;
  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center gap-6 p-10 text-center">
      <div className="scale-150">
        <PaymentLogo id={payment} />
      </div>
      <Loader2 size={34} strokeWidth={1.5} className="animate-spin text-gold" />
      <div>
        <p className="font-serif text-3xl">{name} orqali to'lov amalga oshirilmoqda…</p>
        <p className="mt-2 text-sm text-stone-450">Summa: {total}. Iltimos, sahifani yopmang.</p>
      </div>
    </div>
  );
}

function SuccessScreen({ orderId, name, total, eta, onClose }: { orderId: string; name: string; total: string; eta: string; onClose: () => void }) {
  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center p-10 text-center">
      <div className="flex h-16 w-16 animate-fadeUp items-center justify-center rounded-full bg-[#2F7F5F] text-white">
        <Check size={30} />
      </div>
      <p className="eyebrow mt-8">To'lov muvaffaqiyatli</p>
      <h2 className="mt-3 font-serif text-4xl font-light md:text-5xl">Rahmat, {name}!</h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
        Buyurtmangiz <b>#{orderId}</b> qabul qilindi. To'langan summa: <b>{total}</b>. Taxminiy yetkazib berish muddati — {eta}. Tasdiqlash SMS va
        emailingizga yuborildi.
      </p>
      <button onClick={onClose} className="btn-primary mt-10">
        Xaridni davom ettirish
      </button>
    </div>
  );
}
