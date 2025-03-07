import { Wrapper } from "@/components/wrapper/wrapper";
import React from "react";

export default async function SingleProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-grey-200">
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
