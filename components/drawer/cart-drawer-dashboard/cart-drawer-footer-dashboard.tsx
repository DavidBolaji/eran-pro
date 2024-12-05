"use client";
import React from "react";
import { Button } from "../../button/button";

import { useQueryClient } from "@tanstack/react-query";

export const CartDrawerDashboardFooter = () => {
  const queryClient = useQueryClient();

  

  const close = () => {
    queryClient.setQueryData(['CART_DRAWER_DASHBOARD'], () => false)
  }


  return (
    <div className="h-[96px] bg-black-700 py-6 px-4">
     
      <div className="space-y-4">
        <Button
          color="light"
          size="lg"
          onClick={() => close()}
          className="w-full flex items-center justify-center"
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
};
