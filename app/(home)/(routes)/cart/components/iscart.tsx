"use client";
import { useCartData } from "@/hooks/use-cart-data";
import { useNotification } from "@/hooks/use-notification";
import { paystackKey } from "@/hooks/use-paystack";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Iscart = () => {
  const { cartData } = useCartData();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toggleNotification } = useNotification();

  useEffect(() => {
    if (!cartData || cartData?.length < 1) {
      router.push("/");
      toggleNotification({
        type: "info",
        title: "Cart is Empty",
        message: "Add items to cart to visit cart or checkout page",
        show: true,
      });
    }
   
  }, [cartData, router, toggleNotification]);

  useEffect(() => {
    queryClient.setQueryData(["PAYSTACK_MODAL"], () => ({
      amount: 0 * 100,
      email: "",
      shown: false,
      publicKey: paystackKey,
      reference: Date.now().toString(),
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};
