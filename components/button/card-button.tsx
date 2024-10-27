"use client";
import React from "react";
import { Button } from "./button";
import { ShoppingCartIcon } from "@/constants/icons/shopping-cart";
import { ArrowUpRightIcon } from "@/constants/icons/arrow-up-right";
import { useCartData } from "@/hooks/use-cart-data";
import { IProduct } from "@/actions/get-products";

export const CardButton: React.FC<{ product: IProduct }> = ({ product }) => {
  const { addProduct } = useCartData();

  const handleAdd = () => {
    addProduct(product);
  };
  return (
    <>
      <Button
        onClick={handleAdd}
        iconR={ShoppingCartIcon}
        type="button"
        size="lg"
        color="light"
      >
        Add To Cart
      </Button>
      <Button iconR={ArrowUpRightIcon} type="button" size="lg" color="dark">
        Buy Now
      </Button>
    </>
  );
};
