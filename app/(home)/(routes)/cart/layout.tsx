import { Wrapper } from "@/components/wrapper/wrapper";
import React from "react";
import { Iscart } from "./components/iscart";

export default async function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-grey-200">
      <Iscart />
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
