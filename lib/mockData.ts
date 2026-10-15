// DJAFARIY — demo/portfolio uchun mock ma'lumotlar.
// Barcha raqamlar va ismlar to'qima; real tizimga ulanganda API bilan almashtiriladi.

export type { Currency } from "./currency";
export type Size = "S" | "M" | "L" | "XL";

export const USD_RATE = 12_650; // 1 USD = 12 650 UZS (demo kurs)

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "Choponlar" | "Ko'ylaklar" | "Bosh kiyimlar" | "Nimchalar" | "Aksessuarlar";
  tagline: string;
  description: string;
  details: string[];
  origin: string;
  material: string;
  priceUZS: number;
  priceUSD: number;
  compareAtUZS?: number;
  compareAtUSD?: number;
  images: string[];
  sizes: Size[];
  colors: ProductColor[];
  badge?: "Yangi" | "Bestseller" | "Limited" | "Chegirma";
  rating: number;
  reviews: number;
  stock: number;
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "p-001",
    slug: "shoyi-adras-chopon",
    name: "Shoyi Adras Chopon",
    category: "Choponlar",
    tagline: "Abr naqshli qo'lda to'qilgan ipak-paxta chopon",
    description:
      "Marg'ilon ustalari tomonidan an'anaviy abr usulida bo'yalgan adras matodan tikilgan chopon. Zamonaviy oversize silueti va ipak astari bilan kundalik va bayramona libos sifatida mukammal.",
    details: [
      "50% tabiiy ipak, 50% paxta — qo'lda to'qilgan adras",
      "Ipak astar, yashirin ichki cho'ntak",
      "Qo'lda tikilgan jiyak (zeh) bilan bezatilgan",
      "Faqat quruq tozalash tavsiya etiladi",
    ],
    origin: "Marg'ilon, Farg'ona vodiysi",
    material: "Adras (ipak + paxta)",
    priceUZS: 2_450_000,
    priceUSD: 195,
    images: [
      img("photo-1539109136881-3be0616acf4b"),
      img("photo-1515886657613-9f3515b0c78f"),
      img("photo-1509631179647-0177331693ae"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Anor qizil", hex: "#8E2A2A" },
      { name: "Lojuvard", hex: "#23395B" },
      { name: "Zaytun", hex: "#5F6B3A" },
    ],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 128,
    stock: 14,
  },
  {
    id: "p-002",
    slug: "margilon-atlas-koylak",
    name: "Marg'ilon Atlas Ko'ylak",
    category: "Ko'ylaklar",
    tagline: "Yengil, oqimli siluetdagi xonatlas ko'ylak",
    description:
      "Yorqin atlas mato va minimalistik bichim uyg'unligi. Uzun yenglari, belidagi nozik burmalar va yashirin tugmalar bilan nafis va qulay ko'ylak.",
    details: [
      "100% tabiiy ipak atlas",
      "Midi uzunlik, erkin silue",
      "Yashirin tugmali yoqa",
      "30°C da qo'lda yuvish mumkin",
    ],
    origin: "Marg'ilon, \"Yodgorlik\" ipak fabrikasi",
    material: "Atlas (100% ipak)",
    priceUZS: 1_280_000,
    priceUSD: 102,
    compareAtUZS: 1_520_000,
    compareAtUSD: 120,
    images: [
      img("photo-1469334031218-e382a71b716b"),
      img("photo-1529139574466-a303027c1d8b"),
      img("photo-1496747611176-843222e1e57c"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Shafaq", hex: "#C76B4A" },
      { name: "Feruza", hex: "#2F7F86" },
      { name: "Oltin", hex: "#B8913F" },
    ],
    badge: "Chegirma",
    rating: 4.8,
    reviews: 96,
    stock: 22,
  },
  {
    id: "p-003",
    slug: "buxoro-zardozi-doppi",
    name: "Buxoro Zardo'zi Do'ppi",
    category: "Bosh kiyimlar",
    tagline: "Oltin ip bilan qo'lda tikilgan kolleksion do'ppi",
    description:
      "Buxoro zardo'zlik maktabining eng nozik an'analari asosida, oltin va kumush iplar bilan 40 soatdan ortiq qo'l mehnati evaziga yaratilgan do'ppi.",
    details: [
      "Baxmal asos, zarhal iplar bilan kashta",
      "Har bir dona — noyob, raqamlangan sertifikat bilan",
      "Sovg'abop qutida yetkaziladi",
    ],
    origin: "Buxoro",
    material: "Baxmal, zar ip",
    priceUZS: 650_000,
    priceUSD: 52,
    images: [
      img("photo-1576871337622-98d48d1cf531"),
      img("photo-1521369909029-2afed882baee"),
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Qora baxmal", hex: "#1C1A1A" },
      { name: "To'q yashil", hex: "#1F3A2E" },
    ],
    badge: "Limited",
    rating: 5.0,
    reviews: 54,
    stock: 6,
  },
  {
    id: "p-004",
    slug: "xonatlas-nimcha",
    name: "Xonatlas Nimcha",
    category: "Nimchalar",
    tagline: "Qatlamlash uchun yengsiz, strukturali nimcha",
    description:
      "Xonatlas matodan tikilgan, zamonaviy minimalistik kesimdagi nimcha. Oddiy oq ko'ylak yoki turtleneck bilan kiyilganda shaharcha uslubga milliy ruh beradi.",
    details: ["Xonatlas tashqi qavat, paxta astar", "Ikki yon cho'ntak", "Metall ilgakli yopilish"],
    origin: "Namangan",
    material: "Xonatlas",
    priceUZS: 890_000,
    priceUSD: 71,
    images: [
      img("photo-1485968579580-b6d095142e6e"),
      img("photo-1434389677669-e08b4cac3105"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Binafsha", hex: "#5B3A6B" },
      { name: "Qahva", hex: "#6B4A35" },
    ],
    badge: "Yangi",
    rating: 4.7,
    reviews: 41,
    stock: 18,
  },
  {
    id: "p-005",
    slug: "ipak-sharf",
    name: "Ipak Sharf",
    category: "Aksessuarlar",
    tagline: "Abr naqshli sof ipak sharf, 180 × 70 sm",
    description:
      "Yengil va havodor sof ipak sharf. Abr naqshlari tabiiy bo'yoqlar bilan qo'lda bo'yalgan. Bo'yin, bosh yoki sumka bezagi sifatida kiyish mumkin.",
    details: ["100% tut ipagi", "Qo'lda o'ralgan chetlar", "180 × 70 sm"],
    origin: "Marg'ilon",
    material: "Tut ipagi",
    priceUZS: 420_000,
    priceUSD: 34,
    images: [
      img("photo-1601924994987-69e26d50dc26"),
      img("photo-1520903920243-00d872a2d1c9"),
    ],
    sizes: ["S", "M"],
    colors: [
      { name: "Za'faron", hex: "#D19A2E" },
      { name: "Moviy", hex: "#3E6C9B" },
      { name: "Pushti", hex: "#C98A8A" },
    ],
    rating: 4.9,
    reviews: 203,
    stock: 40,
  },
  {
    id: "p-006",
    slug: "adras-palto",
    name: "Adras Palto",
    category: "Choponlar",
    tagline: "Kuz-qish uchun issiq astarli uzun palto",
    description:
      "Adras tashqi qavat va jun aralash issiq astar. Kuz-qish mavsumi uchun yaratilgan, keng yoqali va belbog'li uzun palto.",
    details: ["Adras + jun aralash astar", "Belbog' bilan", "Ichki cho'ntaklar"],
    origin: "Toshkent atelyesi",
    material: "Adras, jun",
    priceUZS: 3_150_000,
    priceUSD: 249,
    images: [
      img("photo-1483985988355-763728e1935b"),
      img("photo-1445205170230-053b83016050"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Tun ko'k", hex: "#1E2740" },
      { name: "Bordo", hex: "#5E1F2B" },
    ],
    badge: "Yangi",
    rating: 4.8,
    reviews: 37,
    stock: 9,
  },
  {
    id: "p-007",
    slug: "zardozi-kamar",
    name: "Zardo'zi Belbog'",
    category: "Aksessuarlar",
    tagline: "Zarhal kashtali keng belbog'",
    description:
      "Chopon va ko'ylaklar uchun mo'ljallangan zardo'zi kashtali belbog'. Siluetni ta'kidlaydi va oddiy obrazni bayramona qiladi.",
    details: ["Baxmal asos, zar ip", "Sozlanuvchi bog'ich", "Kenglik: 8 sm"],
    origin: "Buxoro",
    material: "Baxmal, zar ip",
    priceUZS: 540_000,
    priceUSD: 43,
    images: [
      img("photo-1490481651871-ab68de25d43d"),
      img("photo-1558769132-cb1aea458c5e"),
    ],
    sizes: ["S", "M", "L"],
    colors: [{ name: "Oltin-qora", hex: "#2A2318" }],
    rating: 4.6,
    reviews: 22,
    stock: 12,
  },
  {
    id: "p-008",
    slug: "atlas-romol",
    name: "Atlas Ro'mol",
    category: "Aksessuarlar",
    tagline: "Kvadrat atlas ro'mol, 90 × 90 sm",
    description:
      "Klassik atlas naqshlari zamonaviy ranglar palitrasida. Bosh ro'mol, bo'yin sharfi yoki sumka bezagi sifatida.",
    details: ["100% ipak atlas", "90 × 90 sm", "Qo'lda o'ralgan chetlar"],
    origin: "Marg'ilon",
    material: "Ipak atlas",
    priceUZS: 360_000,
    priceUSD: 29,
    images: [
      img("photo-1509319117193-57bab727e09d"),
      img("photo-1543076447-215ad9ba6923"),
    ],
    sizes: ["S"],
    colors: [
      { name: "Sut rang", hex: "#E9DFCF" },
      { name: "Qirmizi", hex: "#9B2C3A" },
    ],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 87,
    stock: 31,
  },
];

export const hero = {
  eyebrow: "Yangi kolleksiya",
  title: "Kuz-Qish Milliy To'plami 2026",
  subtitle: "Marg'ilon ipagi, Buxoro zardo'ziligi va zamonaviy siluetlar uyg'unligi.",
  image: img("photo-1515886657613-9f3515b0c78f", 2000),
  // Video qo'yish uchun .mp4 havolani kiriting (masalan, /videos/hero.mp4). Bo'sh bo'lsa rasm ko'rsatiladi.
  video: "",
};

export const editorial = [
  {
    title: "Abr san'ati",
    text: "Har bir ip qo'lda bog'lanib, bo'yaladi — bitta mato tayyorlanishi uchun 3 haftagacha vaqt ketadi.",
    image: img("photo-1558769132-cb1aea458c5e", 1000),
  },
  {
    title: "Zardo'zlik merosi",
    text: "Buxoro ustalari oltin ip bilan asrlar osha davom etib kelayotgan naqshlarni bugungi kunga olib kelmoqda.",
    image: img("photo-1490481651871-ab68de25d43d", 1000),
  },
];

// ---------- Dostavka ----------

export interface ShippingOption {
  id: "tashkent" | "regions" | "dhl";
  name: string;
  description: string;
  eta: string;
  priceUZS: number;
  priceUSD: number;
  international: boolean;
}

export const shippingOptions: ShippingOption[] = [
  {
    id: "tashkent",
    name: "Toshkent bo'ylab",
    description: "Kuryer orqali eshikkacha",
    eta: "1 kun",
    priceUZS: 35_000,
    priceUSD: 3,
    international: false,
  },
  {
    id: "regions",
    name: "O'zbekiston viloyatlari",
    description: "Barcha viloyat markazlariga",
    eta: "2 kun",
    priceUZS: 50_000,
    priceUSD: 4,
    international: false,
  },
  {
    id: "dhl",
    name: "DHL Global Express",
    description: "Dunyo bo'ylab, kuzatuv raqami bilan",
    eta: "3–5 kun",
    priceUZS: 35 * USD_RATE,
    priceUSD: 35,
    international: true,
  },
];

export const countries = [
  { code: "UZ", name: "O'zbekiston" },
  { code: "KZ", name: "Qozog'iston" },
  { code: "RU", name: "Rossiya" },
  { code: "TR", name: "Turkiya" },
  { code: "AE", name: "BAA (Dubay)" },
  { code: "DE", name: "Germaniya" },
  { code: "GB", name: "Buyuk Britaniya" },
  { code: "US", name: "AQSh" },
  { code: "KR", name: "Janubiy Koreya" },
];

export type PaymentMethod = "payme" | "click" | "visa";

export const paymentMethods: { id: PaymentMethod; name: string; note: string; color: string }[] = [
  { id: "payme", name: "Payme", note: "Uzcard / Humo", color: "#00CCCC" },
  { id: "click", name: "Click", note: "Uzcard / Humo", color: "#0B7AE6" },
  { id: "visa", name: "Visa / Mastercard", note: "Xalqaro kartalar", color: "#1A1F71" },
];

// ---------- Admin hisobotlari ----------

export type OrderStatus = "To'langan" | "Kutilmoqda" | "Bekor qilingan";

export interface OrderLine {
  name: string;
  size: Size;
  color: string;
  colorHex?: string;
  qty: number;
  priceUZS: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone?: string;
  location: string;
  address?: string;
  product: string; // qisqa matnli tavsif (qidiruv/eksport uchun)
  lineItems?: OrderLine[]; // har bir mahsulot: rang, o'lcham, miqdor
  items: number;
  amountUZS: number;
  method: "Payme" | "Click" | "Visa";
  status: OrderStatus;
  date: string;
  shipping?: string;
  paymentStatus?: string; // masalan: "Payme orqali to'landi"
  createdAt?: number;
}

export const adminStats = {
  totalRevenueUZS: 487_650_000,
  revenueGrowth: 18.4,
  ordersCount: 1_284,
  ordersGrowth: 12.1,
  paymeRevenueUZS: 312_400_000,
  paymeShare: 64,
  paymeSuccessRate: 98.6,
  avgOrderUZS: 1_380_000,
  conversionRate: 3.8,
  visitorsToday: 4_216,
};

export const monthlyRevenue = [
  { month: "Yan", revenue: 21_400_000, orders: 61 },
  { month: "Fev", revenue: 24_900_000, orders: 72 },
  { month: "Mar", revenue: 38_200_000, orders: 104 },
  { month: "Apr", revenue: 33_100_000, orders: 91 },
  { month: "May", revenue: 36_800_000, orders: 98 },
  { month: "Iyn", revenue: 29_500_000, orders: 83 },
  { month: "Iyl", revenue: 31_700_000, orders: 88 },
  { month: "Avg", revenue: 42_300_000, orders: 117 },
  { month: "Sen", revenue: 48_900_000, orders: 132 },
  { month: "Okt", revenue: 57_600_000, orders: 151 },
  { month: "Noy", revenue: 0, orders: 0 },
  { month: "Dek", revenue: 0, orders: 0 },
].filter((m) => m.revenue > 0);

export const paymentBreakdown = [
  { method: "Payme", share: 64, amountUZS: 312_400_000, color: "#00CCCC" },
  { method: "Click", share: 22, amountUZS: 107_300_000, color: "#3B82F6" },
  { method: "Visa", share: 14, amountUZS: 67_950_000, color: "#C9AD84" },
];

const line = (productId: string, size: Size, colorName: string, qty = 1): OrderLine => {
  const p = products.find((x) => x.id === productId)!;
  const c = p.colors.find((x) => x.name === colorName)!;
  return { name: p.name, size, color: c.name, colorHex: c.hex, qty, priceUZS: p.priceUZS };
};

export const recentOrders: Order[] = [
  { id: "#ZM-10482", customer: "Madina Karimova", email: "madina.k@mail.uz", phone: "+998 90 123 45 67", location: "Toshkent", address: "Yunusobod tumani, 4-kvartal, 12-uy, 45-xonadon", product: "Shoyi Adras Chopon", lineItems: [line("p-001", "M", "Anor qizil")], items: 1, amountUZS: 2_485_000, method: "Payme", status: "To'langan", date: "14 Okt, 14:32" },
  { id: "#ZM-10481", customer: "Aziza Rahimova", email: "aziza.r@gmail.com", phone: "+998 93 456 78 90", location: "Samarqand", address: "Registon ko'chasi, 18-uy", product: "Marg'ilon Atlas Ko'ylak", lineItems: [line("p-002", "S", "Feruza", 2)], items: 2, amountUZS: 2_610_000, method: "Click", status: "Kutilmoqda", date: "14 Okt, 13:10" },
  { id: "#ZM-10480", customer: "Emma Schneider", email: "emma.s@web.de", phone: "+49 151 2345 6789", location: "Berlin, Germaniya", address: "Torstraße 112, 10119", product: "Ipak Sharf", lineItems: [line("p-005", "S", "Za'faron", 2), line("p-005", "M", "Moviy")], items: 3, amountUZS: 1_702_750, method: "Visa", status: "To'langan", date: "14 Okt, 11:47" },
  { id: "#ZM-10479", customer: "Jasur Toshmatov", email: "jasur.t@inbox.uz", phone: "+998 91 222 33 44", location: "Buxoro", address: "Bahouddin Naqshband ko'chasi, 7-uy", product: "Buxoro Zardo'zi Do'ppi", lineItems: [line("p-003", "L", "Qora baxmal")], items: 1, amountUZS: 700_000, method: "Payme", status: "To'langan", date: "14 Okt, 10:05" },
  { id: "#ZM-10478", customer: "Layla Al-Mansouri", email: "layla@outlook.ae", phone: "+971 50 123 4567", location: "Dubay, BAA", address: "Jumeirah Beach Residence, Tower 3, Apt 1204", product: "Adras Palto", lineItems: [line("p-006", "M", "Bordo")], items: 1, amountUZS: 3_592_750, method: "Visa", status: "Kutilmoqda", date: "13 Okt, 22:18" },
  { id: "#ZM-10477", customer: "Nilufar Usmonova", email: "nilu.u@mail.ru", phone: "+998 97 555 66 77", location: "Farg'ona", address: "Mustaqillik ko'chasi, 25-uy, 8-xonadon", product: "Xonatlas Nimcha", lineItems: [line("p-004", "S", "Binafsha")], items: 1, amountUZS: 940_000, method: "Payme", status: "To'langan", date: "13 Okt, 19:42" },
  { id: "#ZM-10476", customer: "Sardor Aliyev", email: "sardor.a@gmail.com", phone: "+998 99 777 88 99", location: "Toshkent", address: "Chilonzor tumani, 9-mavze, 3-uy", product: "Zardo'zi Belbog'", lineItems: [line("p-007", "M", "Oltin-qora")], items: 1, amountUZS: 575_000, method: "Click", status: "Bekor qilingan", date: "13 Okt, 16:20" },
  { id: "#ZM-10475", customer: "Kim Soo-ah", email: "sooah.kim@naver.com", phone: "+82 10 1234 5678", location: "Seul, Koreya", address: "Gangnam-gu, Teheran-ro 152", product: "Atlas Ro'mol", lineItems: [line("p-008", "S", "Sut rang", 3), line("p-008", "S", "Qirmizi")], items: 4, amountUZS: 1_882_750, method: "Visa", status: "To'langan", date: "13 Okt, 09:58" },
];

export const recentCustomers = [
  { name: "Madina Karimova", city: "Toshkent", orders: 7, spentUZS: 11_240_000, avatar: "MK" },
  { name: "Emma Schneider", city: "Berlin", orders: 3, spentUZS: 5_870_000, avatar: "ES" },
  { name: "Aziza Rahimova", city: "Samarqand", orders: 5, spentUZS: 6_930_000, avatar: "AR" },
  { name: "Layla Al-Mansouri", city: "Dubay", orders: 2, spentUZS: 7_185_000, avatar: "LA" },
  { name: "Jasur Toshmatov", city: "Buxoro", orders: 4, spentUZS: 3_120_000, avatar: "JT" },
];

export const topRegions = [
  { name: "Toshkent", share: 46 },
  { name: "Samarqand / Buxoro", share: 18 },
  { name: "Farg'ona vodiysi", share: 14 },
  { name: "Xalqaro (DHL)", share: 22 },
];

// Real-vaqt simulyatsiyasi uchun tasodifiy yangi buyurtmalar manbasi
export const liveOrderPool = [
  { customer: "Dilnoza Yusupova", email: "dilnoza@mail.uz", location: "Toshkent", product: "Ipak Sharf" },
  { customer: "Olivia Brown", email: "olivia.b@gmail.com", location: "London, Buyuk Britaniya", product: "Shoyi Adras Chopon" },
  { customer: "Bekzod Qodirov", email: "bekzod.q@inbox.uz", location: "Namangan", product: "Xonatlas Nimcha" },
  { customer: "Aylin Yılmaz", email: "aylin.y@gmail.com", location: "Istanbul, Turkiya", product: "Marg'ilon Atlas Ko'ylak" },
  { customer: "Shahnoza Ergasheva", email: "shahnoza@mail.uz", location: "Andijon", product: "Atlas Ro'mol" },
];
