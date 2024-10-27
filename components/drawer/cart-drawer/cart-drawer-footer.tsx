"use client";
import React from "react";
import { Button } from "../../button/button";
import { CheckCircleIcon } from "@/constants/icons/check-circle";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { Typography } from "@/components/typography/typography";
import { formatToNaira } from "@/utils/helper";
import { useCartData } from "@/hooks/use-cart-data";

export const CartDrawerFooter = () => {
  const { cartData } = useCartData();
  const calculateTotal = () => {
    return cartData?.reduce((acc, prod) => {
      return (acc += prod.price);
    }, 0);
  };
  return (
    <div className="h-[200px] bg-black-700 py-6 px-4">
      <div className="flex justify-between items-center mb-8">
        <Typography
          as="h6"
          size="h6"
          align="left"
          className="pb-2 font-bold leading-5 text-black-200"
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
          className="w-full flex items-center justify-center"
        >
          Continue shopping
        </Button>
        <Button
          color="dark"
          size="lg"
          iconR={CheckCircleIcon}
          className="w-full flex items-center justify-center"
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
};
