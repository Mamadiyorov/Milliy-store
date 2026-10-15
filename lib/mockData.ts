// DJAFARIY — demo/portfolio uchun mock ma'lumotlar.
// Barcha raqamlar va ismlar to'qima; real tizimga ulanganda API bilan almashtiriladi.

import type { Language } from "./i18n";

export type { Currency } from "./currency";
export type Size = "S" | "M" | "L" | "XL";

/** Har bir til uchun matn. O'zbekcha (uz) — asosiy; qolganlari tarjima. */
export type Localized<T> = Record<Language, T>;

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

// ---------- Mahsulot tarjimalari (RU / EN / KO / AR) ----------
// O'zbekcha matn yuqoridagi `products` ichida. Bu yerda yo'q mahsulot (masalan, admin qo'shgani) o'zbekcha ko'rinadi.

export type ProductText = Pick<Product, "name" | "tagline" | "description" | "details" | "origin" | "material">;

const productTranslations: Record<string, Partial<Record<Exclude<Language, "uz">, ProductText>>> = {
  "p-001": {
    ru: {
      name: "Шёлковый чапан из адраса",
      tagline: "Чапан из шёлка и хлопка ручного ткачества с узором абр",
      description:
        "Чапан из ткани адрас, окрашенной маргиланскими мастерами в традиционной технике абр. Современный oversize-силуэт и шёлковая подкладка делают его идеальным и для повседневного, и для праздничного образа.",
      details: [
        "50% натуральный шёлк, 50% хлопок — адрас ручного ткачества",
        "Шёлковая подкладка, потайной внутренний карман",
        "Отделка кантом (зех) ручной работы",
        "Рекомендуется только сухая чистка",
      ],
      origin: "Маргилан, Ферганская долина",
      material: "Адрас (шёлк + хлопок)",
    },
    en: {
      name: "Silk Adras Chapan",
      tagline: "Handwoven silk-cotton chapan with an ikat pattern",
      description:
        "A chapan cut from adras fabric dyed by Margilan masters using the traditional abr (ikat) technique. Its modern oversized silhouette and silk lining make it perfect for both everyday and festive wear.",
      details: [
        "50% natural silk, 50% cotton — handwoven adras",
        "Silk lining, hidden inner pocket",
        "Finished with hand-stitched zeh trim",
        "Dry clean only",
      ],
      origin: "Margilan, Fergana Valley",
      material: "Adras (silk + cotton)",
    },
    ko: {
      name: "실크 아드라스 차판",
      tagline: "이캇 문양의 수직 실크·면 차판",
      description:
        "마르길란 장인들이 전통 아브르(이캇) 기법으로 염색한 아드라스 원단으로 만든 차판입니다. 모던한 오버사이즈 실루엣과 실크 안감으로 일상복과 예복 모두에 완벽합니다.",
      details: ["천연 실크 50%, 면 50% — 수직 아드라스", "실크 안감, 숨겨진 안주머니", "수작업 제흐(zeh) 트림 장식", "드라이클리닝만 권장"],
      origin: "마르길란, 페르가나 계곡",
      material: "아드라스 (실크 + 면)",
    },
    ar: {
      name: "قفطان أدراس حريري",
      tagline: "قفطان من الحرير والقطن منسوج يدويًا بنقوش الإيكات",
      description:
        "قفطان مصنوع من قماش الأدراس الذي صبغه حرفيو مارغيلان بتقنية «أبر» (الإيكات) التقليدية. قصّته الواسعة العصرية وبطانته الحريرية تجعله مثاليًا للإطلالات اليومية والمناسبات.",
      details: ["50% حرير طبيعي و50% قطن — أدراس منسوج يدويًا", "بطانة حريرية وجيب داخلي مخفي", "حواف مطرزة يدويًا (زِه)", "يُنصح بالتنظيف الجاف فقط"],
      origin: "مارغيلان، وادي فرغانة",
      material: "أدراس (حرير + قطن)",
    },
  },
  "p-002": {
    ru: {
      name: "Платье из маргиланского атласа",
      tagline: "Лёгкое платье из хан-атласа со струящимся силуэтом",
      description:
        "Сочетание яркого атласа и минималистичного кроя. Длинные рукава, деликатные складки на талии и потайные пуговицы — изящное и удобное платье.",
      details: ["100% натуральный шёлковый атлас", "Длина миди, свободный силуэт", "Воротник на потайных пуговицах", "Ручная стирка при 30°C"],
      origin: "Маргилан, шёлковая фабрика «Ёдгорлик»",
      material: "Атлас (100% шёлк)",
    },
    en: {
      name: "Margilan Atlas Dress",
      tagline: "A light khan-atlas dress with a flowing silhouette",
      description:
        "Vibrant atlas silk meets a minimalist cut. Long sleeves, delicate waist pleats and concealed buttons make it an elegant, comfortable dress.",
      details: ["100% natural silk atlas", "Midi length, relaxed silhouette", "Concealed-button collar", "Hand wash at 30°C"],
      origin: "Margilan, Yodgorlik Silk Factory",
      material: "Atlas (100% silk)",
    },
    ko: {
      name: "마르길란 아틀라스 드레스",
      tagline: "흐르는 실루엣의 가벼운 칸아틀라스 드레스",
      description: "선명한 아틀라스 원단과 미니멀한 재단의 조화. 긴 소매, 허리의 섬세한 주름, 히든 단추로 우아하고 편안한 드레스입니다.",
      details: ["천연 실크 아틀라스 100%", "미디 길이, 여유로운 실루엣", "히든 단추 칼라", "30°C 손세탁 가능"],
      origin: "마르길란, '요드고를리크' 실크 공장",
      material: "아틀라스 (실크 100%)",
    },
    ar: {
      name: "فستان أطلس مارغيلان",
      tagline: "فستان خفيف من الخان أطلس بقصّة انسيابية",
      description: "تناغم بين قماش الأطلس الزاهي والقصّة البسيطة. أكمام طويلة وطيّات رقيقة عند الخصر وأزرار مخفية تجعله فستانًا أنيقًا ومريحًا.",
      details: ["أطلس من الحرير الطبيعي 100%", "طول متوسط (ميدي) وقصّة واسعة", "ياقة بأزرار مخفية", "يُغسل يدويًا على 30 درجة مئوية"],
      origin: "مارغيلان، مصنع «يودغورليك» للحرير",
      material: "أطلس (حرير 100%)",
    },
  },
  "p-003": {
    ru: {
      name: "Бухарская тюбетейка с золотным шитьём",
      tagline: "Коллекционная тюбетейка, вышитая вручную золотой нитью",
      description:
        "Тюбетейка, созданная по тончайшим традициям бухарской школы золотного шитья: более 40 часов ручной работы с золотыми и серебряными нитями.",
      details: ["Бархатная основа, вышивка золотой нитью", "Каждое изделие уникально и имеет номерной сертификат", "Доставляется в подарочной коробке"],
      origin: "Бухара",
      material: "Бархат, золотная нить",
    },
    en: {
      name: "Bukhara Zardozi Skullcap",
      tagline: "A collectible doppi hand-embroidered with gold thread",
      description:
        "Crafted in the finest traditions of the Bukhara zardozi school, this doppi takes more than 40 hours of handwork with gold and silver threads.",
      details: ["Velvet base, gold-thread embroidery", "Each piece is unique, with a numbered certificate", "Delivered in a gift box"],
      origin: "Bukhara",
      material: "Velvet, gold thread",
    },
    ko: {
      name: "부하라 자르도지 도피",
      tagline: "금사로 손수 수놓은 컬렉터블 도피(전통 모자)",
      description: "부하라 자르도지 자수 학파의 섬세한 전통에 따라 금사와 은사로 40시간 이상 수작업하여 완성한 도피입니다.",
      details: ["벨벳 바탕, 금사 자수", "모든 제품은 고유하며 넘버링 인증서 포함", "선물 상자에 담아 배송"],
      origin: "부하라",
      material: "벨벳, 금사",
    },
    ar: {
      name: "طاقية بخارى المطرزة بالزردوزي",
      tagline: "طاقية (دوبّي) للمقتنين مطرزة يدويًا بخيوط ذهبية",
      description: "طاقية صُنعت وفق أرقى تقاليد مدرسة الزردوزي في بخارى، وتطلّبت أكثر من 40 ساعة من العمل اليدوي بخيوط الذهب والفضة.",
      details: ["قاعدة من المخمل وتطريز بخيوط ذهبية", "كل قطعة فريدة ومرفقة بشهادة مرقّمة", "تُسلَّم في علبة هدايا"],
      origin: "بخارى",
      material: "مخمل، خيوط ذهبية",
    },
  },
  "p-004": {
    ru: {
      name: "Жилет из хан-атласа",
      tagline: "Структурированный жилет без рукавов для многослойных образов",
      description:
        "Жилет из хан-атласа в современном минималистичном крое. В сочетании с простой белой рубашкой или водолазкой добавляет городскому стилю национальный характер.",
      details: ["Верх из хан-атласа, хлопковая подкладка", "Два боковых кармана", "Застёжка на металлические крючки"],
      origin: "Наманган",
      material: "Хан-атлас",
    },
    en: {
      name: "Khan-Atlas Vest",
      tagline: "A structured sleeveless vest made for layering",
      description:
        "A vest in khan-atlas silk with a modern, minimalist cut. Worn over a simple white shirt or a turtleneck, it brings a national spirit to city style.",
      details: ["Khan-atlas outer, cotton lining", "Two side pockets", "Metal hook closure"],
      origin: "Namangan",
      material: "Khan-atlas",
    },
    ko: {
      name: "칸아틀라스 조끼",
      tagline: "레이어드를 위한 구조적인 민소매 조끼",
      description:
        "칸아틀라스 원단으로 만든 모던하고 미니멀한 재단의 조끼. 심플한 화이트 셔츠나 터틀넥과 함께 입으면 도시적인 스타일에 민족적 감성을 더합니다.",
      details: ["칸아틀라스 겉감, 면 안감", "양쪽 사이드 포켓", "메탈 훅 여밈"],
      origin: "나망간",
      material: "칸아틀라스",
    },
    ar: {
      name: "صدرية خان أطلس",
      tagline: "صدرية بلا أكمام بقصّة منظّمة مثالية للتنسيق بالطبقات",
      description:
        "صدرية مصنوعة من قماش الخان أطلس بقصّة عصرية بسيطة. عند ارتدائها فوق قميص أبيض بسيط أو كنزة بياقة عالية تضفي روحًا تراثية على الأسلوب العصري.",
      details: ["طبقة خارجية من الخان أطلس وبطانة قطنية", "جيبان جانبيان", "إغلاق بمشابك معدنية"],
      origin: "نامنغان",
      material: "خان أطلس",
    },
  },
  "p-005": {
    ru: {
      name: "Шёлковый шарф",
      tagline: "Шарф из чистого шёлка с узором абр, 180 × 70 см",
      description:
        "Лёгкий и воздушный шарф из чистого шёлка. Узоры абр окрашены вручную натуральными красителями. Можно носить на шее, на голове или как украшение сумки.",
      details: ["100% шёлк тутового шелкопряда", "Края подшиты вручную", "180 × 70 см"],
      origin: "Маргилан",
      material: "Тутовый шёлк",
    },
    en: {
      name: "Silk Scarf",
      tagline: "Pure silk ikat scarf, 180 × 70 cm",
      description:
        "A light, airy scarf in pure silk. The ikat patterns are hand-dyed with natural dyes. Wear it around the neck, as a head scarf or on a bag.",
      details: ["100% mulberry silk", "Hand-rolled edges", "180 × 70 cm"],
      origin: "Margilan",
      material: "Mulberry silk",
    },
    ko: {
      name: "실크 스카프",
      tagline: "이캇 문양의 순수 실크 스카프, 180 × 70cm",
      description: "가볍고 산뜻한 순수 실크 스카프. 이캇 문양은 천연 염료로 손수 염색했습니다. 목, 머리 또는 가방 장식으로 연출할 수 있습니다.",
      details: ["뽕나무 실크 100%", "손으로 말아 마감한 가장자리", "180 × 70cm"],
      origin: "마르길란",
      material: "뽕나무 실크",
    },
    ar: {
      name: "وشاح حريري",
      tagline: "وشاح من الحرير الخالص بنقوش الإيكات، 180 × 70 سم",
      description: "وشاح خفيف ومنعش من الحرير الخالص، نقوشه مصبوغة يدويًا بأصباغ طبيعية. يمكن ارتداؤه حول العنق أو على الرأس أو كزينة للحقيبة.",
      details: ["حرير التوت 100%", "حواف ملفوفة يدويًا", "180 × 70 سم"],
      origin: "مارغيلان",
      material: "حرير التوت",
    },
  },
  "p-006": {
    ru: {
      name: "Пальто из адраса",
      tagline: "Длинное пальто на тёплой подкладке для осени и зимы",
      description:
        "Верх из адраса и тёплая подкладка из смесовой шерсти. Длинное пальто с широким воротником и поясом, созданное для осенне-зимнего сезона.",
      details: ["Адрас + подкладка из смесовой шерсти", "С поясом", "Внутренние карманы"],
      origin: "Ташкентское ателье",
      material: "Адрас, шерсть",
    },
    en: {
      name: "Adras Coat",
      tagline: "A long, warmly lined coat for autumn–winter",
      description: "An adras outer shell with a warm wool-blend lining. A long belted coat with a wide collar, designed for the autumn–winter season.",
      details: ["Adras with wool-blend lining", "Belted", "Inner pockets"],
      origin: "Tashkent atelier",
      material: "Adras, wool",
    },
    ko: {
      name: "아드라스 코트",
      tagline: "가을·겨울용 따뜻한 안감의 롱 코트",
      description: "아드라스 겉감과 따뜻한 울 혼방 안감. 가을·겨울 시즌을 위해 디자인된 넓은 칼라와 벨트가 있는 롱 코트입니다.",
      details: ["아드라스 + 울 혼방 안감", "벨트 포함", "안주머니"],
      origin: "타슈켄트 아틀리에",
      material: "아드라스, 울",
    },
    ar: {
      name: "معطف أدراس",
      tagline: "معطف طويل ببطانة دافئة لموسم الخريف والشتاء",
      description: "طبقة خارجية من الأدراس وبطانة دافئة من مزيج الصوف. معطف طويل بياقة عريضة وحزام، صُمّم لموسم الخريف والشتاء.",
      details: ["أدراس مع بطانة من مزيج الصوف", "مع حزام", "جيوب داخلية"],
      origin: "أتيليه طشقند",
      material: "أدراس، صوف",
    },
  },
  "p-007": {
    ru: {
      name: "Пояс с золотным шитьём",
      tagline: "Широкий пояс с золотой вышивкой",
      description: "Пояс с вышивкой зардози для чапанов и платьев. Подчёркивает силуэт и делает простой образ праздничным.",
      details: ["Бархатная основа, золотная нить", "Регулируемые завязки", "Ширина: 8 см"],
      origin: "Бухара",
      material: "Бархат, золотная нить",
    },
    en: {
      name: "Zardozi Belt",
      tagline: "A wide belt with gold embroidery",
      description: "A zardozi-embroidered belt designed for chapans and dresses. It defines the silhouette and turns a simple look into a festive one.",
      details: ["Velvet base, gold thread", "Adjustable ties", "Width: 8 cm"],
      origin: "Bukhara",
      material: "Velvet, gold thread",
    },
    ko: {
      name: "자르도지 벨트",
      tagline: "금사 자수의 와이드 벨트",
      description: "차판과 드레스를 위한 자르도지 자수 벨트. 실루엣을 강조하고 심플한 룩을 화려하게 완성합니다.",
      details: ["벨벳 바탕, 금사", "조절 가능한 끈", "폭: 8cm"],
      origin: "부하라",
      material: "벨벳, 금사",
    },
    ar: {
      name: "حزام زردوزي",
      tagline: "حزام عريض بتطريز ذهبي",
      description: "حزام مطرز بالزردوزي مصمم للقفاطين والفساتين. يُبرز القوام ويحوّل الإطلالة البسيطة إلى إطلالة احتفالية.",
      details: ["قاعدة من المخمل وخيوط ذهبية", "رباط قابل للتعديل", "العرض: 8 سم"],
      origin: "بخارى",
      material: "مخمل، خيوط ذهبية",
    },
  },
  "p-008": {
    ru: {
      name: "Атласный платок",
      tagline: "Квадратный атласный платок, 90 × 90 см",
      description: "Классические атласные узоры в современной цветовой палитре. Как платок на голову, шейный шарф или украшение сумки.",
      details: ["100% шёлковый атлас", "90 × 90 см", "Края подшиты вручную"],
      origin: "Маргилан",
      material: "Шёлковый атлас",
    },
    en: {
      name: "Atlas Square Scarf",
      tagline: "Square atlas silk scarf, 90 × 90 cm",
      description: "Classic atlas patterns in a contemporary colour palette. Wear it as a head scarf, a neck scarf or a bag accent.",
      details: ["100% silk atlas", "90 × 90 cm", "Hand-rolled edges"],
      origin: "Margilan",
      material: "Silk atlas",
    },
    ko: {
      name: "아틀라스 스카프",
      tagline: "정사각형 아틀라스 스카프, 90 × 90cm",
      description: "클래식한 아틀라스 문양을 모던한 컬러 팔레트로 표현했습니다. 머리 스카프, 넥 스카프 또는 가방 장식으로 활용하세요.",
      details: ["실크 아틀라스 100%", "90 × 90cm", "손으로 말아 마감한 가장자리"],
      origin: "마르길란",
      material: "실크 아틀라스",
    },
    ar: {
      name: "منديل أطلس",
      tagline: "منديل مربع من الأطلس، 90 × 90 سم",
      description: "نقوش الأطلس الكلاسيكية بألوان عصرية. يُرتدى كغطاء للرأس أو وشاح للعنق أو زينة للحقيبة.",
      details: ["أطلس حريري 100%", "90 × 90 سم", "حواف ملفوفة يدويًا"],
      origin: "مارغيلان",
      material: "أطلس حريري",
    },
  },
};

/** Mahsulotning tanlangan tildagi nusxasi (id, narx, rasm o'zgarmaydi). */
export function localizeProduct(p: Product, lang: Language): Product {
  if (lang === "uz") return p;
  const tr = productTranslations[p.id]?.[lang];
  return tr ? { ...p, ...tr } : p;
}

type Translations = Omit<Localized<string>, "uz">;

const colorNames: Record<string, Translations> = {
  "Anor qizil": { ru: "Гранатовый", en: "Pomegranate red", ko: "석류 레드", ar: "أحمر رماني" },
  Lojuvard: { ru: "Лазурит", en: "Lapis blue", ko: "라피스 블루", ar: "لازوردي" },
  Zaytun: { ru: "Оливковый", en: "Olive", ko: "올리브", ar: "زيتوني" },
  Shafaq: { ru: "Закатный", en: "Sunset", ko: "선셋", ar: "لون الشفق" },
  Feruza: { ru: "Бирюзовый", en: "Turquoise", ko: "터쿼이즈", ar: "فيروزي" },
  Oltin: { ru: "Золотой", en: "Gold", ko: "골드", ar: "ذهبي" },
  "Qora baxmal": { ru: "Чёрный бархат", en: "Black velvet", ko: "블랙 벨벳", ar: "مخمل أسود" },
  "To'q yashil": { ru: "Тёмно-зелёный", en: "Dark green", ko: "다크 그린", ar: "أخضر داكن" },
  Binafsha: { ru: "Фиолетовый", en: "Violet", ko: "바이올렛", ar: "بنفسجي" },
  Qahva: { ru: "Кофейный", en: "Coffee", ko: "커피 브라운", ar: "بنّي قهوة" },
  "Za'faron": { ru: "Шафрановый", en: "Saffron", ko: "사프란", ar: "زعفراني" },
  Moviy: { ru: "Голубой", en: "Sky blue", ko: "스카이 블루", ar: "أزرق سماوي" },
  Pushti: { ru: "Розовый", en: "Rose", ko: "로즈", ar: "وردي" },
  "Tun ko'k": { ru: "Ночной синий", en: "Midnight blue", ko: "미드나잇 블루", ar: "أزرق ليلي" },
  Bordo: { ru: "Бордовый", en: "Burgundy", ko: "버건디", ar: "عنّابي" },
  "Oltin-qora": { ru: "Золотисто-чёрный", en: "Gold-black", ko: "골드 블랙", ar: "ذهبي وأسود" },
  "Sut rang": { ru: "Молочный", en: "Milk white", ko: "밀크 화이트", ar: "أبيض حليبي" },
  Qirmizi: { ru: "Малиновый", en: "Crimson", ko: "크림슨", ar: "قرمزي" },
};

/** Rang nomi (savatchada va buyurtmada o'zbekcha kalit sifatida saqlanadi) — ko'rsatish uchun tarjima. */
export const colorLabel = (name: string, lang: Language) => (lang === "uz" ? name : colorNames[name]?.[lang] ?? name);

export type Category = Product["category"];

const categoryNames: Record<Category | "Barchasi", Translations> = {
  Barchasi: { ru: "Все", en: "All", ko: "전체", ar: "الكل" },
  Choponlar: { ru: "Чапаны", en: "Chapans", ko: "차판", ar: "القفاطين" },
  "Ko'ylaklar": { ru: "Платья", en: "Dresses", ko: "드레스", ar: "الفساتين" },
  "Bosh kiyimlar": { ru: "Головные уборы", en: "Headwear", ko: "모자", ar: "أغطية الرأس" },
  Nimchalar: { ru: "Жилеты", en: "Vests", ko: "조끼", ar: "الصدريات" },
  Aksessuarlar: { ru: "Аксессуары", en: "Accessories", ko: "액세서리", ar: "الإكسسوارات" },
};

export const categoryLabel = (c: Category | "Barchasi", lang: Language) => (lang === "uz" ? c : categoryNames[c]?.[lang] ?? c);

const badgeNames: Record<NonNullable<Product["badge"]>, Translations> = {
  Yangi: { ru: "Новинка", en: "New", ko: "신상품", ar: "جديد" },
  Bestseller: { ru: "Бестселлер", en: "Bestseller", ko: "베스트셀러", ar: "الأكثر مبيعًا" },
  Limited: { ru: "Лимитированный", en: "Limited", ko: "한정판", ar: "إصدار محدود" },
  Chegirma: { ru: "Скидка", en: "Sale", ko: "세일", ar: "تخفيض" },
};

export const badgeLabel = (b: NonNullable<Product["badge"]>, lang: Language) => (lang === "uz" ? b : badgeNames[b][lang]);

// ---------- Bosh sahifa matnlari ----------

export const hero = {
  image: img("photo-1515886657613-9f3515b0c78f", 2000),
  // Video qo'yish uchun .mp4 havolani kiriting (masalan, /videos/hero.mp4). Bo'sh bo'lsa rasm ko'rsatiladi.
  video: "",
  text: {
    uz: {
      eyebrow: "Yangi kolleksiya",
      title: "Kuz-Qish Milliy To'plami 2026",
      subtitle: "Marg'ilon ipagi, Buxoro zardo'ziligi va zamonaviy siluetlar uyg'unligi.",
      cta: "Kolleksiyani ko'rish",
      places: "Marg'ilon · Buxoro · Toshkent",
    },
    ru: {
      eyebrow: "Новая коллекция",
      title: "Национальная коллекция Осень-Зима 2026",
      subtitle: "Маргиланский шёлк, бухарское золотное шитьё и современные силуэты в гармонии.",
      cta: "Смотреть коллекцию",
      places: "Маргилан · Бухара · Ташкент",
    },
    en: {
      eyebrow: "New collection",
      title: "Autumn–Winter National Collection 2026",
      subtitle: "Margilan silk, Bukhara gold embroidery and modern silhouettes in harmony.",
      cta: "View the collection",
      places: "Margilan · Bukhara · Tashkent",
    },
    ko: {
      eyebrow: "새 컬렉션",
      title: "2026 가을·겨울 내셔널 컬렉션",
      subtitle: "마르길란 실크, 부하라 금사 자수, 그리고 모던한 실루엣의 조화.",
      cta: "컬렉션 보기",
      places: "마르길란 · 부하라 · 타슈켄트",
    },
    ar: {
      eyebrow: "المجموعة الجديدة",
      title: "المجموعة التراثية لخريف وشتاء 2026",
      subtitle: "تناغم بين حرير مارغيلان وتطريز بخارى الذهبي والقصّات العصرية.",
      cta: "عرض المجموعة",
      places: "مارغيلان · بخارى · طشقند",
    },
  } satisfies Localized<{ eyebrow: string; title: string; subtitle: string; cta: string; places: string }>,
};

export const collectionIntro: Localized<{ eyebrow: string; title: string; text: string }> = {
  uz: {
    eyebrow: "Kuz-Qish 2026",
    title: "Milliy To'plam",
    text: "Har bir buyum Marg'ilon, Buxoro va Namangan ustalari bilan hamkorlikda, cheklangan miqdorda yaratilgan.",
  },
  ru: {
    eyebrow: "Осень-Зима 2026",
    title: "Национальная коллекция",
    text: "Каждое изделие создано ограниченным тиражом в сотрудничестве с мастерами Маргилана, Бухары и Намангана.",
  },
  en: {
    eyebrow: "Autumn–Winter 2026",
    title: "The National Collection",
    text: "Every piece is made in limited numbers in collaboration with artisans from Margilan, Bukhara and Namangan.",
  },
  ko: {
    eyebrow: "2026 가을·겨울",
    title: "내셔널 컬렉션",
    text: "모든 제품은 마르길란, 부하라, 나망간 장인들과 협업하여 한정 수량으로 제작됩니다.",
  },
  ar: {
    eyebrow: "خريف وشتاء 2026",
    title: "المجموعة التراثية",
    text: "كل قطعة تُصنع بكميات محدودة بالتعاون مع حرفيي مارغيلان وبخارى ونامنغان.",
  },
};

export const perks: Localized<{ title: string; text: string }[]> = {
  uz: [
    { title: "Qo'l mehnati", text: "Har bir buyum usta qo'lida tikiladi" },
    { title: "Sof ipak", text: "Marg'ilon tut ipagi va zar iplar" },
    { title: "1 kunda", text: "Toshkent bo'ylab tezkor yetkazish" },
    { title: "Dunyo bo'ylab", text: "DHL Express orqali 3–5 kun" },
  ],
  ru: [
    { title: "Ручная работа", text: "Каждое изделие шьётся руками мастера" },
    { title: "Чистый шёлк", text: "Маргиланский тутовый шёлк и золотые нити" },
    { title: "За 1 день", text: "Быстрая доставка по Ташкенту" },
    { title: "По всему миру", text: "DHL Express за 3–5 дней" },
  ],
  en: [
    { title: "Handmade", text: "Every piece is sewn by a master's hand" },
    { title: "Pure silk", text: "Margilan mulberry silk and gold threads" },
    { title: "In 1 day", text: "Fast delivery across Tashkent" },
    { title: "Worldwide", text: "3–5 days with DHL Express" },
  ],
  ko: [
    { title: "수작업", text: "모든 제품을 장인이 직접 바느질합니다" },
    { title: "순수 실크", text: "마르길란 뽕나무 실크와 금사" },
    { title: "1일 배송", text: "타슈켄트 시내 빠른 배송" },
    { title: "전 세계 배송", text: "DHL Express 3–5일" },
  ],
  ar: [
    { title: "صناعة يدوية", text: "كل قطعة تُخاط بيد حرفي ماهر" },
    { title: "حرير خالص", text: "حرير التوت من مارغيلان وخيوط الذهب" },
    { title: "خلال يوم", text: "توصيل سريع داخل طشقند" },
    { title: "إلى العالم", text: "خلال 3–5 أيام عبر DHL Express" },
  ],
};

/** "Hikoyamiz" bo'limi. Sarlavha: before + <em>accent</em> + after */
export const story: Localized<{ before: string; accent: string; after: string; body: string; stats: [string, string, string]; cta: string }> = {
  uz: {
    before: "Meros — ",
    accent: "zamonaviy",
    after: " talqinda",
    body: "DJAFARIY — nafislik, sokin hashamat va hunarmandchilikka hurmat. Biz o'zbek hunarmandchiligining eng nafis an'analarini — abr bo'yoqlari, atlas to'qimachiligi va zardo'zlikni — minimalistik, kundalik kiyiladigan siluetlarga aylantiramiz.",
    stats: ["Usta-hunarmand", "Mamlakatga yetkazish", "Mamnun mijozlar"],
    cta: "{name}ni ko'rish",
  },
  ru: {
    before: "Наследие в ",
    accent: "современном",
    after: " прочтении",
    body: "DJAFARIY — это изящество, тихая роскошь и уважение к ремеслу. Мы превращаем тончайшие традиции узбекского ремесла — окрашивание абр, ткачество атласа и золотное шитьё — в минималистичные силуэты на каждый день.",
    stats: ["Мастеров-ремесленников", "Стран доставки", "Довольных клиентов"],
    cta: "Смотреть: {name}",
  },
  en: {
    before: "Heritage, ",
    accent: "reimagined",
    after: " for today",
    body: "DJAFARIY stands for refinement, quiet luxury and respect for craft. We turn the finest traditions of Uzbek craftsmanship — abr dyeing, atlas weaving and zardozi embroidery — into minimalist silhouettes made for everyday wear.",
    stats: ["Master artisans", "Countries we ship to", "Happy customers"],
    cta: "View the {name}",
  },
  ko: {
    before: "",
    accent: "현대적으로",
    after: " 재해석한 유산",
    body: "DJAFARIY는 섬세함, 조용한 럭셔리, 그리고 장인정신에 대한 존중을 의미합니다. 우리는 아브르 염색, 아틀라스 직조, 자르도지 자수 등 우즈베키스탄 공예의 가장 섬세한 전통을 일상에서 입을 수 있는 미니멀한 실루엣으로 재탄생시킵니다.",
    stats: ["장인", "배송 국가", "만족한 고객"],
    cta: "{name} 보기",
  },
  ar: {
    before: "الإرث ",
    accent: "بروح عصرية",
    after: "",
    body: "DJAFARIY تعني الرقيّ والفخامة الهادئة واحترام الحِرفة. نحوّل أرقى تقاليد الحِرف الأوزبكية — صباغة «أبر» ونسج الأطلس وتطريز الزردوزي — إلى قصّات بسيطة تُرتدى كل يوم.",
    stats: ["حرفيًا ماهرًا", "دولة نشحن إليها", "عميل سعيد"],
    cta: "عرض {name}",
  },
};

export const editorial: { image: string; text: Localized<{ title: string; text: string }> }[] = [
  {
    image: img("photo-1558769132-cb1aea458c5e", 1000),
    text: {
      uz: { title: "Abr san'ati", text: "Har bir ip qo'lda bog'lanib, bo'yaladi — bitta mato tayyorlanishi uchun 3 haftagacha vaqt ketadi." },
      ru: { title: "Искусство абр", text: "Каждая нить связывается и окрашивается вручную — на создание одного полотна уходит до 3 недель." },
      en: { title: "The art of ikat", text: "Every thread is hand-tied and dyed — a single bolt of fabric takes up to three weeks to make." },
      ko: { title: "아브르의 예술", text: "모든 실을 손으로 묶고 염색합니다 — 원단 한 필을 완성하는 데 최대 3주가 걸립니다." },
      ar: { title: "فن الإيكات (أبر)", text: "كل خيط يُربط ويُصبغ يدويًا — وقد يستغرق إعداد قطعة قماش واحدة ما يصل إلى ثلاثة أسابيع." },
    },
  },
  {
    image: img("photo-1490481651871-ab68de25d43d", 1000),
    text: {
      uz: { title: "Zardo'zlik merosi", text: "Buxoro ustalari oltin ip bilan asrlar osha davom etib kelayotgan naqshlarni bugungi kunga olib kelmoqda." },
      ru: { title: "Наследие золотного шитья", text: "Бухарские мастера переносят в наши дни узоры, веками создававшиеся золотой нитью." },
      en: { title: "The zardozi heritage", text: "Bukhara's masters bring centuries-old gold-thread patterns into the present day." },
      ko: { title: "자르도지의 유산", text: "부하라 장인들이 수 세기 동안 이어온 금사 문양을 오늘날로 이어가고 있습니다." },
      ar: { title: "إرث الزردوزي", text: "يحمل حرفيو بخارى نقوشًا ذهبية متوارثة عبر القرون إلى يومنا هذا." },
    },
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

/** Dostavka matnlari tarjimasi (buyurtmada admin uchun o'zbekcha `name` saqlanadi). */
const shippingTexts: Record<ShippingOption["id"], Omit<Localized<Pick<ShippingOption, "name" | "description" | "eta">>, "uz">> = {
  tashkent: {
    ru: { name: "По Ташкенту", description: "Курьером до двери", eta: "1 день" },
    en: { name: "Within Tashkent", description: "Courier to your door", eta: "1 day" },
    ko: { name: "타슈켄트 시내", description: "택배 기사 문 앞 배송", eta: "1일" },
    ar: { name: "داخل طشقند", description: "توصيل بالمندوب حتى الباب", eta: "يوم واحد" },
  },
  regions: {
    ru: { name: "Регионы Узбекистана", description: "Во все областные центры", eta: "2 дня" },
    en: { name: "Regions of Uzbekistan", description: "To all regional centres", eta: "2 days" },
    ko: { name: "우즈베키스탄 지방", description: "모든 주 중심 도시로 배송", eta: "2일" },
    ar: { name: "مناطق أوزبكستان", description: "إلى جميع المراكز الإقليمية", eta: "يومان" },
  },
  dhl: {
    ru: { name: "DHL Global Express", description: "По всему миру, с трек-номером", eta: "3–5 дней" },
    en: { name: "DHL Global Express", description: "Worldwide, with a tracking number", eta: "3–5 days" },
    ko: { name: "DHL Global Express", description: "전 세계 배송, 운송장 번호 제공", eta: "3–5일" },
    ar: { name: "DHL Global Express", description: "إلى جميع أنحاء العالم مع رقم تتبع", eta: "3–5 أيام" },
  },
};

export function localizeShipping(s: ShippingOption, lang: Language): ShippingOption {
  return lang === "uz" ? s : { ...s, ...shippingTexts[s.id][lang] };
}

const countryNames: Record<string, Translations> = {
  UZ: { ru: "Узбекистан", en: "Uzbekistan", ko: "우즈베키스탄", ar: "أوزبكستان" },
  KZ: { ru: "Казахстан", en: "Kazakhstan", ko: "카자흐스탄", ar: "كازاخستان" },
  RU: { ru: "Россия", en: "Russia", ko: "러시아", ar: "روسيا" },
  TR: { ru: "Турция", en: "Türkiye", ko: "튀르키예", ar: "تركيا" },
  AE: { ru: "ОАЭ (Дубай)", en: "UAE (Dubai)", ko: "아랍에미리트 (두바이)", ar: "الإمارات (دبي)" },
  DE: { ru: "Германия", en: "Germany", ko: "독일", ar: "ألمانيا" },
  GB: { ru: "Великобритания", en: "United Kingdom", ko: "영국", ar: "المملكة المتحدة" },
  US: { ru: "США", en: "USA", ko: "미국", ar: "الولايات المتحدة" },
  KR: { ru: "Южная Корея", en: "South Korea", ko: "대한민국", ar: "كوريا الجنوبية" },
};

export const countryLabel = (code: string, lang: Language) => {
  const uz = countries.find((c) => c.code === code)?.name ?? code;
  return lang === "uz" ? uz : countryNames[code]?.[lang] ?? uz;
};

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

const internationalCards: Localized<string> = {
  uz: "Xalqaro kartalar",
  ru: "Международные карты",
  en: "International cards",
  ko: "해외 카드",
  ar: "البطاقات الدولية",
};

export const paymentNote = (id: PaymentMethod, lang: Language) => (id === "visa" ? internationalCards[lang] : "Uzcard / Humo");

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
