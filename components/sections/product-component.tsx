import React, { forwardRef } from "react";
import { ProductCard } from "../card/product-card";
import { IProduct } from "@/actions/get-products";

// eslint-disable-next-line react/display-name
export const ProductComponent = forwardRef<
  HTMLDivElement,
  { products: IProduct[] }
>(({ products }, ref) => {
  return (
    <div className="py-10 pl-20">
      {/* Scrollable container with hidden scrollbar */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-scroll pr-24 scrollbar-hide"
      >
        {products.map((product: IProduct, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
});
