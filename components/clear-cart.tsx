"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const ClearCart = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.setQueryData(["CART_DATA"], []);
    queryClient.invalidateQueries({
      queryKey: ["USER"],
    });
  }, [queryClient]);
  return null;
};
