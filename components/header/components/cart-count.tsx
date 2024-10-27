import { useCartData } from "@/hooks/use-cart-data";
import React from "react";

export const CartCount = () => {
  const {cartData} = useCartData()
  return (
    <span className="w-6 h-6 text-white rounded-full font-thin flex items-center justify-center bg-green">
      {cartData?.length ?? 0}
    </span>
  );
};
