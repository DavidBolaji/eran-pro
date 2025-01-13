"use client";
import React from "react";
import { Button } from "../../button/button";
import { CheckCircleIcon } from "@/constants/icons/check-circle";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { Typography } from "@/components/typography/typography";
import { formatToNaira } from "@/utils/helper";
import { useCartData } from "@/hooks/use-cart-data";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const CartDrawerFooter = () => {
  const { calculateTotal } = useCartData();
  const queryClient = useQueryClient();
  const router = useRouter();

  

  const navigate = () => {
    close();
    router.push("/cart");
  };

  const close = () => {
    queryClient.setQueryData(['CART_DRAWER'], () => false)
  }


  return (
    <div className="h-[220px] bg-black-700 py-6 px-4 ">
      <div className="flex justify-between items-center mb-8">
        <Typography
          as="h6"
          size="h6"
          align="left"
          className="pb-2 font-bold leading-5 black-200"
        >
          Subtotal
        </Typography>
        <Typography
          as="h6"
          size="h6"
          align="left"
          className="pb-2 font-bold leading-7"
        >
          {formatToNaira(calculateTotal() ?? 0)}
        </Typography>
      </div>
      <div className="space-y-4">
        <Button
          color="light"
          size="lg"
          iconR={ShoppingCartIcon}
          onClick={() => close()}
          className="w-full flex items-center justify-center"
        >
          Continue shopping
        </Button>
        <Button
          color="dark"
          size="lg"
          iconR={CheckCircleIcon}
          onClick={navigate}
          className="w-full flex items-center justify-center"
        >
          Proceed to Cart
        </Button>
      </div>
    </div>
  );
};
