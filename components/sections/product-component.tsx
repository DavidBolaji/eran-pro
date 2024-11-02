import React, { forwardRef } from "react";
import { ProductCard } from "../card/product-card";
import { IProduct } from "@/actions/get-products";

// eslint-disable-next-line react/display-name
export const ProductComponent = forwardRef<
  HTMLDivElement,
  { products: IProduct[] }
>(({ products }, ref) => {
  return (
    <div className="md:py-10 md:pb-0 pb-12 md:pl-3 lg:pl-28 lg:px-0 md:px-4 px-4">
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
