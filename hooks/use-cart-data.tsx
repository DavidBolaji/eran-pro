"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import { IProduct } from "@/actions/get-products";
// import { useCallback, useMemo } from "react";

export const useCartData = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["CART_DATA"])) {
    queryClient.setQueryData(["CART_DATA"], []);
  }

  const addProduct = (product: IProduct) => {
    queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
      const productData = { ...product, weight: 0.5 };
      if (!prev?.length) {
        return [productData];
      } else {
        return [...prev, productData];
      }
    });
  };


  const deleteProduct = (productId: string) => {
    queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
      const newCart = prev.filter((product) => product.id !== productId);
      return newCart;
    });
  };

  const { data: cartData } = useQuery({
    queryKey: ["CART_DATA"],
    queryFn: () =>
      (queryClient.getQueryData(["CART_DATA"]) as (IProduct & {
        weight: number;
      })[]) || [],
    staleTime: Infinity,
  });
  return { addProduct, cartData, deleteProduct };
};
