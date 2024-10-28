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

// Import your component with SSR disabled
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
        <AntdRegistry>
          <TanstackProvider>
            {children}
            <CartDrawer />
          </TanstackProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
