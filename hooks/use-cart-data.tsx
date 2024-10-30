"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import { IProduct } from "@/actions/get-products";

export const useCartData = () => {
  const queryClient = useQueryClient();

  const addProduct = (product: IProduct & { weight: number }) => {
    queryClient.setQueryData(["CART_QTY"], 0.5);
    queryClient.setQueryData(["CART_DATA"], (prev: Product[]) => {
      const exists = prev.length;
      const exists2 = prev?.filter((el) => el.id === product.id);
      const all = exists && exists2.length;

      if (all) {
        return prev?.map((el) => {
          if (el.id === product.id) {
            return {
              ...product,
              weight: product.weight ? product.weight : 0.5,
            };
          } else {
            return el;
          }
        });
      }

      if (!exists) {
        const productData = {
          ...product,
          weight: product.weight ? product.weight : 0.5,
        };
        return [productData];
      }
      return [
        ...prev,
        { ...product, weight: product.weight ? product.weight : 0.5 },
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
      return (acc += prod.price);
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
