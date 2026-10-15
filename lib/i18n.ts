// 5 tilli interfeys: O'zbek, Rus, Ingliz, Koreys, Arab (RTL).
// Yangi matn qo'shish: avval `uz` ga kalit qo'shing — TypeScript qolgan tillarda ham shu kalitni talab qiladi.

export type Language = "uz" | "ru" | "en" | "ko" | "ar";

export const LANGUAGE_KEY = "djafariy_language";

export const LANGUAGES: { code: Language; label: string; name: string; dir: "ltr" | "rtl"; htmlLang: string }[] = [
  { code: "uz", label: "UZ", name: "O'zbekcha", dir: "ltr", htmlLang: "uz" },
  { code: "ru", label: "RU", name: "Русский", dir: "ltr", htmlLang: "ru" },
  { code: "en", label: "EN", name: "English", dir: "ltr", htmlLang: "en" },
  { code: "ko", label: "KO", name: "한국어", dir: "ltr", htmlLang: "ko" },
  { code: "ar", label: "AR", name: "العربية", dir: "rtl", htmlLang: "ar" },
];

export const isLanguage = (v: unknown): v is Language => LANGUAGES.some((l) => l.code === v);

const uz = {
  "nav.new": "Yangi kolleksiya",
  "nav.chopons": "Choponlar",
  "nav.dresses": "Ko'ylaklar",
  "nav.accessories": "Aksessuarlar",
  "nav.story": "Hikoyamiz",

  "ann.delivery": "Toshkent bo'ylab 1 kunda yetkazib berish",
  "ann.dhl": "DHL Express orqali dunyo bo'ylab 3–5 kun",
  "ann.payment": "Payme · Click · Visa orqali xavfsiz to'lov",
  "ann.handmade": "Har bir buyum — qo'l mehnati",

  "a.menu": "Menyu",
  "a.close": "Yopish",
  "a.search": "Qidiruv",
  "a.favorites": "Sevimlilar",
  "a.cart": "Savatcha",
  "a.home": "bosh sahifa",
  "a.call": "Qo'ng'iroq qilish",
  "a.instagram": "Instagram sahifamiz",
  "a.language": "Til",
  "a.currency": "Valyuta",

  "profile.my": "Mening profilim",
  "profile.saved": "Saqlangan profil",
  "profile.short": "Profil",
  "admin.panel": "Admin panel",

  "footer.about": "Nafis siluetlar, sof matolar va sokin hashamat. Har bir buyum — usta qo'li bilan yaratilgan.",
  "footer.email": "Email manzilingiz",
  "footer.subscribe": "Obuna",
  "footer.shop": "Do'kon",
  "footer.help": "Yordam",
  "footer.brand": "Brend",
  "footer.giftCards": "Sovg'a kartalari",
  "footer.delivery": "Yetkazib berish",
  "footer.returns": "Qaytarish",
  "footer.sizeGuide": "O'lchamlar jadvali",
  "footer.paymentMethods": "To'lov usullari",
  "footer.contact": "Bog'lanish",
  "footer.artisans": "Ustalarimiz",
  "footer.atelier": "Atelye",
  "footer.press": "Matbuot",
  "footer.location": "Toshkent, O'zbekiston",

  "rate.label": "Joriy kurs",
  "rate.fallback": "taxminiy kurs",
  "rate.usdNote": "USD narxlar joriy kurs bo'yicha yaxlitlangan",
  "currency.uzsSuffix": "so'm",
};

export type TranslationKey = keyof typeof uz;
type Dict = Record<TranslationKey, string>;

const ru: Dict = {
  "nav.new": "Новая коллекция",
  "nav.chopons": "Чапаны",
  "nav.dresses": "Платья",
  "nav.accessories": "Аксессуары",
  "nav.story": "Наша история",

  "ann.delivery": "Доставка по Ташкенту за 1 день",
  "ann.dhl": "Доставка по всему миру DHL Express за 3–5 дней",
  "ann.payment": "Безопасная оплата через Payme · Click · Visa",
  "ann.handmade": "Каждое изделие — ручная работа",

  "a.menu": "Меню",
  "a.close": "Закрыть",
  "a.search": "Поиск",
  "a.favorites": "Избранное",
  "a.cart": "Корзина",
  "a.home": "главная",
  "a.call": "Позвонить",
  "a.instagram": "Наш Instagram",
  "a.language": "Язык",
  "a.currency": "Валюта",

  "profile.my": "Мой профиль",
  "profile.saved": "Сохранённый профиль",
  "profile.short": "Профиль",
  "admin.panel": "Админ-панель",

  "footer.about": "Изящные силуэты, чистые ткани и тихая роскошь. Каждое изделие создано руками мастера.",
  "footer.email": "Ваш email",
  "footer.subscribe": "Подписаться",
  "footer.shop": "Магазин",
  "footer.help": "Помощь",
  "footer.brand": "Бренд",
  "footer.giftCards": "Подарочные карты",
  "footer.delivery": "Доставка",
  "footer.returns": "Возврат",
  "footer.sizeGuide": "Таблица размеров",
  "footer.paymentMethods": "Способы оплаты",
  "footer.contact": "Контакты",
  "footer.artisans": "Наши мастера",
  "footer.atelier": "Ателье",
  "footer.press": "Пресса",
  "footer.location": "Ташкент, Узбекистан",

  "rate.label": "Текущий курс",
  "rate.fallback": "ориентировочный курс",
  "rate.usdNote": "Цены в USD округлены по текущему курсу",
  "currency.uzsSuffix": "сум",
};

const en: Dict = {
  "nav.new": "New collection",
  "nav.chopons": "Chapans",
  "nav.dresses": "Dresses",
  "nav.accessories": "Accessories",
  "nav.story": "Our story",

  "ann.delivery": "1-day delivery across Tashkent",
  "ann.dhl": "Worldwide shipping via DHL Express in 3–5 days",
  "ann.payment": "Secure payment via Payme · Click · Visa",
  "ann.handmade": "Every piece is handmade",

  "a.menu": "Menu",
  "a.close": "Close",
  "a.search": "Search",
  "a.favorites": "Favorites",
  "a.cart": "Cart",
  "a.home": "home",
  "a.call": "Call us",
  "a.instagram": "Our Instagram",
  "a.language": "Language",
  "a.currency": "Currency",

  "profile.my": "My profile",
  "profile.saved": "Saved profile",
  "profile.short": "Profile",
  "admin.panel": "Admin panel",

  "footer.about": "Refined silhouettes, pure fabrics and quiet luxury. Every piece is crafted by a master artisan.",
  "footer.email": "Your email",
  "footer.subscribe": "Subscribe",
  "footer.shop": "Shop",
  "footer.help": "Help",
  "footer.brand": "Brand",
  "footer.giftCards": "Gift cards",
  "footer.delivery": "Delivery",
  "footer.returns": "Returns",
  "footer.sizeGuide": "Size guide",
  "footer.paymentMethods": "Payment methods",
  "footer.contact": "Contact",
  "footer.artisans": "Our artisans",
  "footer.atelier": "Atelier",
  "footer.press": "Press",
  "footer.location": "Tashkent, Uzbekistan",

  "rate.label": "Exchange rate",
  "rate.fallback": "approximate rate",
  "rate.usdNote": "USD prices are rounded at the current rate",
  "currency.uzsSuffix": "UZS",
};

const ko: Dict = {
  "nav.new": "새 컬렉션",
  "nav.chopons": "차판",
  "nav.dresses": "드레스",
  "nav.accessories": "액세서리",
  "nav.story": "브랜드 스토리",

  "ann.delivery": "타슈켄트 시내 1일 배송",
  "ann.dhl": "DHL Express 해외 배송 3–5일",
  "ann.payment": "Payme · Click · Visa 안전 결제",
  "ann.handmade": "모든 제품은 수작업으로 제작됩니다",

  "a.menu": "메뉴",
  "a.close": "닫기",
  "a.search": "검색",
  "a.favorites": "위시리스트",
  "a.cart": "장바구니",
  "a.home": "홈",
  "a.call": "전화하기",
  "a.instagram": "인스타그램",
  "a.language": "언어",
  "a.currency": "통화",

  "profile.my": "내 프로필",
  "profile.saved": "저장된 프로필",
  "profile.short": "프로필",
  "admin.panel": "관리자 패널",

  "footer.about": "섬세한 실루엣, 순수한 원단, 조용한 럭셔리. 모든 제품은 장인의 손으로 만들어집니다.",
  "footer.email": "이메일 주소",
  "footer.subscribe": "구독",
  "footer.shop": "쇼핑",
  "footer.help": "고객 지원",
  "footer.brand": "브랜드",
  "footer.giftCards": "기프트 카드",
  "footer.delivery": "배송",
  "footer.returns": "반품",
  "footer.sizeGuide": "사이즈 가이드",
  "footer.paymentMethods": "결제 방법",
  "footer.contact": "문의하기",
  "footer.artisans": "장인 소개",
  "footer.atelier": "아틀리에",
  "footer.press": "언론 보도",
  "footer.location": "우즈베키스탄 타슈켄트",

  "rate.label": "현재 환율",
  "rate.fallback": "예상 환율",
  "rate.usdNote": "USD 가격은 현재 환율 기준으로 반올림됩니다",
  "currency.uzsSuffix": "UZS",
};

const ar: Dict = {
  "nav.new": "المجموعة الجديدة",
  "nav.chopons": "القفاطين",
  "nav.dresses": "الفساتين",
  "nav.accessories": "الإكسسوارات",
  "nav.story": "قصتنا",

  "ann.delivery": "توصيل خلال يوم واحد داخل طشقند",
  "ann.dhl": "شحن عالمي عبر DHL Express خلال 3–5 أيام",
  "ann.payment": "دفع آمن عبر Payme · Click · Visa",
  "ann.handmade": "كل قطعة مصنوعة يدويًا",

  "a.menu": "القائمة",
  "a.close": "إغلاق",
  "a.search": "بحث",
  "a.favorites": "المفضلة",
  "a.cart": "سلة التسوق",
  "a.home": "الصفحة الرئيسية",
  "a.call": "اتصل بنا",
  "a.instagram": "حسابنا على Instagram",
  "a.language": "اللغة",
  "a.currency": "العملة",

  "profile.my": "ملفي الشخصي",
  "profile.saved": "الملف المحفوظ",
  "profile.short": "الملف",
  "admin.panel": "لوحة الإدارة",

  "footer.about": "قصّات راقية، أقمشة نقية وفخامة هادئة. كل قطعة من صنع يد حرفي ماهر.",
  "footer.email": "بريدك الإلكتروني",
  "footer.subscribe": "اشترك",
  "footer.shop": "المتجر",
  "footer.help": "المساعدة",
  "footer.brand": "العلامة",
  "footer.giftCards": "بطاقات الهدايا",
  "footer.delivery": "التوصيل",
  "footer.returns": "الإرجاع",
  "footer.sizeGuide": "دليل المقاسات",
  "footer.paymentMethods": "طرق الدفع",
  "footer.contact": "اتصل بنا",
  "footer.artisans": "حرفيونا",
  "footer.atelier": "الأتيليه",
  "footer.press": "الصحافة",
  "footer.location": "طشقند، أوزبكستان",

  "rate.label": "سعر الصرف",
  "rate.fallback": "سعر تقريبي",
  "rate.usdNote": "أسعار الدولار مقرّبة حسب سعر الصرف الحالي",
  "currency.uzsSuffix": "UZS",
};

const dictionaries: Record<Language, Dict> = { uz, ru, en, ko, ar };

export function translate(lang: Language, key: TranslationKey): string {
  return dictionaries[lang][key] ?? uz[key];
}

export const languageMeta = (lang: Language) => LANGUAGES.find((l) => l.code === lang)!;
