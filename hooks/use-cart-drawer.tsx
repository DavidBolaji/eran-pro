"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useCartDrawer = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["CART_DRAWER"])) {
    queryClient.setQueryData(["CART_DRAWER"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["CART_DRAWER"], () => isOpen);
  };

  const { data: cartDrawer } = useQuery({
    queryKey: ["CART_DRAWER"],
    queryFn: () => queryClient.getQueryData(["CART_DRAWER"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, cartDrawer };
};
