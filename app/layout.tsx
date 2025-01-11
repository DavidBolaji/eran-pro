
import { AntdRegistry } from "@ant-design/nextjs-registry";

import { CartDrawer } from "@/components/drawer/cart-drawer/cart-drawer";
import { Metadata } from "next";
import Pwa from "@/components/pwa";

export const metadata: Metadata = {
  title: "Eranpro",
  description:
    "Enjoy fresh, premium chicken delivered to your doorstep at a discount. Don't miss out – order now and savor the savings!",
};

import dynamic from "next/dynamic";
import { Overlay } from "@/components/overlay/overlay";
import { NotificationDrawer } from "@/components/drawer/notification-drawer/notification-drawer";
import { LoginModal } from "@/components/modal/login-modal/login-modal";

import { CartDashboardDrawer } from "@/components/drawer/cart-drawer-dashboard/cart-drawer-dashboard";
import { ItemCategoryDrawer } from "@/components/drawer/promotion-drawer/item-promotion-drawer";
import { PromotionCategoryDrawer } from "@/components/drawer/promotion-drawer/category-promotion-drawer";
import { DeleteModal } from "@/components/modal/delete-modal/delete-modal";

import "./globals.css";
import UIProvider from "@/tanstack/ui-provider";

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
    <html lang="en">
      <body>
        <UIProvider>
          <Pwa />
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
        </UIProvider>
      </body>
    </html>
  );
}
