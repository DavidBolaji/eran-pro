import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Header2 } from "@/components/header/header2";
import { Wrapper } from "@/components/wrapper/wrapper";
import React from "react";

export default async function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:bg-white bg-grey-200">
      <Header2 />
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </div>
  );
}
