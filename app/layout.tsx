import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { CartDrawer } from "@/components/drawer/cart-drawer/cart-drawer";

export const metadata: Metadata = {
  title: "Eranpro",
  description:
    "Enjoy fresh, premium chicken delivered to your doorstep at a discount. Don't miss out – order now and savor the savings!",
};

import dynamic from "next/dynamic";
import { Overlay } from "@/components/overlay/overlay";
import { NotificationDrawer } from "@/components/drawer/notification-drawer/notification-drawer";
import { LoginModal } from "@/components/modal/login-modal/login-modal";
import { ClerkProvider } from "@clerk/nextjs";
import { CartDashboardDrawer } from "@/components/drawer/cart-drawer-dashboard/cart-drawer-dashboard";
import { ItemCategoryDrawer } from "@/components/drawer/promotion-drawer/item-promotion-drawer";
import { PromotionCategoryDrawer } from "@/components/drawer/promotion-drawer/category-promotion-drawer";
import { DeleteModal } from "@/components/modal/delete-modal/delete-modal";
const TanstackProvider = dynamic(
  () =>
    import("../tanstack/tanstack-provider").then((mod) => mod.TanstackProvider),
  {
    ssr: false,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
         
          <AntdRegistry>
            <TanstackProvider>
              {children}
              <ItemCategoryDrawer />
              <PromotionCategoryDrawer />
              <CartDashboardDrawer />
              <NotificationDrawer />
              <LoginModal />
              <CartDrawer />
              <DeleteModal />
              <Overlay />
            </TanstackProvider>
          </AntdRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
