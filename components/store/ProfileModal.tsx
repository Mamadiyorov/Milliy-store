"use client";

import { useEffect, useState } from "react";
import { Check, UserRound, X } from "lucide-react";
import { countries } from "@/lib/mockData";
import { cn } from "@/lib/format";
import { useStore, type CustomerProfile } from "./StoreProvider";

const empty: CustomerProfile = { firstName: "", lastName: "", phone: "+998 ", email: "", country: "UZ", city: "", address: "" };

/** "Mening profilim" — checkout'da saqlangan mijoz ma'lumotlarini ko'rish va tahrirlash. */
export function ProfileModal() {
  const { profileOpen, setProfileOpen, profile, saveProfile, clearProfile } = useStore();
  const [form, setForm] = useState<CustomerProfile>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerProfile, boolean>>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!profileOpen) return;
    setForm(profile ?? empty);
    setErrors({});
    setSaved(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setProfileOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // Formani faqat modal ochilganda to'ldiramiz — saqlashdan keyin qayta tiklanmasin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileOpen]);

  if (!profileOpen) return null;

  const update = (k: keyof CustomerProfile, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
    setSaved(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof CustomerProfile, boolean>> = {};
    for (const k of ["firstName", "lastName", "city", "address"] as const) if (form[k].trim().length < 2) next[k] = true;
    if (form.phone.replace(/\D/g, "").length < 9) next.phone = true;
    setErrors(next);
    if (Object.keys(next).length) return;
    saveProfile({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim(), city: form.city.trim(), address: form.address.trim() });
    setSaved(true);
  };

  const remove = () => {
    clearProfile();
    setForm(empty);
    setSaved(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-fadeIn" onClick={() => setProfileOpen(false)} />
      <form onSubmit={submit} className="relative max-h-[92vh] w-full max-w-lg animate-fadeUp overflow-y-auto bg-ivory p-6 md:p-10">
        <button type="button" onClick={() => setProfileOpen(false)} className="absolute right-5 top-5" aria-label="Yopish">
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-gold-dark">
            <UserRound size={18} strokeWidth={1.5} />
          </span>
          <div>
            <p className="eyebrow">Mening profilim</p>
            <h2 className="font-serif text-3xl font-light">{profile ? `${profile.firstName} ${profile.lastName}` : "Saqlangan profil"}</h2>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone-450">
          {profile
            ? "Bu ma'lumotlar keyingi xaridlarda checkout formasini avtomatik to'ldiradi. Ular faqat shu brauzerda saqlanadi."
            : "Hozircha profil saqlanmagan. Birinchi xaridingizda kiritgan ma'lumotlaringiz shu yerda saqlanadi — yoki hozir to'ldiring."}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Field label="Ism" value={form.firstName} error={errors.firstName} onChange={(v) => update("firstName", v)} />
          <Field label="Familiya" value={form.lastName} error={errors.lastName} onChange={(v) => update("lastName", v)} />
          <Field label="Telefon" value={form.phone} error={errors.phone} onChange={(v) => update("phone", v)} />
          <Field label="Email (ixtiyoriy)" value={form.email} onChange={(v) => update("email", v)} type="email" />
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
          <Field label="Shahar / Viloyat" value={form.city} error={errors.city} onChange={(v) => update("city", v)} />
          <div className="sm:col-span-2">
            <Field label="Manzil" value={form.address} error={errors.address} onChange={(v) => update("address", v)} placeholder="Ko'cha, uy, xonadon" />
          </div>
        </div>

        <button type="submit" className="btn-primary mt-8 w-full">
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={14} /> Saqlandi
            </span>
          ) : (
            "Saqlash"
          )}
        </button>
        {profile && (
          <button type="button" onClick={remove} className="mt-3 w-full text-[11px] uppercase tracking-[0.2em] text-stone-450 underline underline-offset-4 hover:text-[#8E2A2A]">
            Profilni o'chirish
          </button>
        )}
      </form>
    </div>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; error?: boolean; placeholder?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-ink/70">{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={cn("field", error && "border-[#8E2A2A] bg-[#8E2A2A]/5")} />
      {error && <span className="mt-1 block text-[11px] text-[#8E2A2A]">Ushbu maydonni to'ldiring</span>}
    </label>
  );
}
