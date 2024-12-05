import React, { forwardRef } from "react";
import { ProductCard } from "../card/product-card";
import { IProduct } from "@/actions/get-products";
//md:pl-6 pl-4 lg:pl-32
// eslint-disable-next-line react/display-name
export const ProductComponent = forwardRef<
  HTMLDivElement,
  { products: IProduct[] }
>(({ products }, ref) => {
  return (
    <div className="md:py-10 max-w-[1130px] mx-auto pl-4">
      {/* Scrollable container with hidden scrollbar */}
      <div
        ref={ref}
        className="flex gap-4 overflow-x-scroll pr-24 scrollbar-hide relative"
      >
        {products.map((product: IProduct, index: number) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
});
