"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";


export const useCartDashboardDrawer = () => {
  const queryClient = useQueryClient();

  if (!queryClient.getQueryData(["CART_DRAWER_DASHBOARD"])) {
    queryClient.setQueryData(["CART_DRAWER_DASHBOARD"], false);
  }

  const toggleDrawer = (isOpen: boolean) => {
    queryClient.setQueryData(["CART_DRAWER_DASHBOARD"], () => isOpen);
  };

  const { data: cartDrawer } = useQuery({
    queryKey: ["CART_DRAWER_DASHBOARD"],
    queryFn: () => queryClient.getQueryData(["CART_DRAWER_DASHBOARD"]),
    staleTime: Infinity,
  });
  return { toggleDrawer, cartDrawer };
};
