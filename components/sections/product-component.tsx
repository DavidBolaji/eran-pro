import { Product } from "@prisma/client";
import React from "react";
import { ProductCard } from "../card/product-card";

export const ProductComponent = React.forwardRef<
  HTMLDivElement,
  { products: Product[] }
>(({ products }, ref) => {
  return (
    <div className="py-10 pl-24">
      {/* Scrollable container with hidden scrollbar */}
      <div ref={ref} className="flex gap-4 overflow-x-scroll pr-24 scrollbar-hide">
        {products.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
});
