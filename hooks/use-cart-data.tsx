"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import { IProduct } from "@/actions/get-products";
import { endOfToday, isAfter, isBefore, startOfToday } from "date-fns";

export const useCartData = () => {
  const queryClient = useQueryClient();

  const addProduct = (product: IProduct & { weight: number }) => {
    const stepValue = product.unit === "PER_KG" ? 0.5 : 1;
    queryClient.setQueryData(["CART_QTY"], stepValue);
    queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
      const exists = prev.length;
      const exists2 = prev?.filter((el) => el.id === product.id);
      const all = exists && exists2.length;

      if (all) {
        return prev?.map((el) => {
          if (el.id === product.id) {
            return {
              ...product,
              weight: product.weight ? product.weight : stepValue,
            };
          } else {
            return el;
          }
        });
      }

      if (!exists) {
        const productData = {
          ...product,
          weight: product.weight ? product.weight : stepValue,
        };
        return [productData];
      }
      return [
        ...prev,
        { ...product, weight: product.weight ? product.weight : stepValue },
      ];
    });
  };

  const deleteProduct = (productId: string) => {
    queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
      const newCart = prev.filter((product) => product.id !== productId);
      return newCart;
    });
  };

  const calculateTotal = () => {

    return cartData?.reduce((acc, prod) => {
      
      const stepValue = prod.unit === "PER_KG" ? 0.5 : 1;
      if (
        prod?.promotion?.length &&
        isBefore(new Date(prod?.promotion[0].startDate), endOfToday()) &&
        isAfter(new Date(prod?.promotion[0].endDate), startOfToday())
      ) {
        return (acc += ((1 - prod.promotion[0]?.discount / 100) * prod.price * prod.weight) / stepValue);
      }
      return (acc += (prod.price * prod.weight) / stepValue);
    }, 0);
  };

  const { data: cartData } = useQuery({
    queryKey: ["CART_DATA"],
    queryFn: () =>
      (queryClient.getQueryData(["CART_DATA"]) as (IProduct & {
        weight: number;
      })[]) || [],
    staleTime: Infinity,
  });
  return { addProduct, cartData, deleteProduct, calculateTotal };
};
