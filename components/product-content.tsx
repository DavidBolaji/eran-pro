"use client";
import { Button } from "@/components/button/button";
import React, { useState } from "react";
import { ProductButton } from "./button/product-button";
import { IProduct } from "@/actions/get-products";

export const ProductContent: React.FC<{
  product: IProduct & { weight: number }
}> = ({ product }) => {
  const [tab, setTab] = useState("descriptions");

  return (
    <div>
      {["descriptions", "reviews"].map((el) => (
        <Button
          key={el}
          onClick={() => setTab(el)}
          round={false}
          size="lg"
          color={tab === el ? "dark" : "light"}
          className="inline-block text-nowrap text-[14px] mr-2.5 h-12 rounded-2xl md:px-6 px-3 text-xs"
        >
          <span className="font-bold capitalize">{el}</span>
        </Button>
      ))}
      <div className="my-6">
        <span className="font-medium text-base black-100 leading-5 inline-block max-w-[558px]">
          {tab === "descriptions" && product.description}
        </span>
      </div>
      <ProductButton product={product} />
    </div>
  );
};
