import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CheckoutModal } from "@/components/store/CheckoutModal";
import { QuickViewModal } from "@/components/store/QuickViewModal";
import { Toast } from "@/components/store/Toast";

// StoreProvider endi app/layout.tsx da — do'kon va admin panel bitta global state'ni ulashadi.
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <Toast />
    </>
  );
}
