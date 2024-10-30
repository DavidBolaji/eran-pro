"use client";
import { Button } from "@/components/button/button";
import { CartCheckoutCard } from "@/components/card/cart-checkout-card";
import { PromoForm } from "@/components/form/promo-form";
import { PaymentMethod } from "@/components/payment-method";
import { Typography } from "@/components/typography/typography";
import { CheckCircleIcon } from "@/constants/icons/check-circle";
import { useCartData } from "@/hooks/use-cart-data";
import { formatToNaira } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

export const RenderSummaryCheckout = () => {
  const { calculateTotal, cartData } = useCartData();
  const total = (calculateTotal() ?? 0) + 2500;
  const router = useRouter();

  const prefetch = useCallback(() => {
    router.prefetch("/success");
  }, []);

  useEffect(() => {
    prefetch();
  }, []);

  const navigateTo = () => {
    router.push("/success");
  };

  return (
    <div className="bg-black-100 lg:rounded-2xl ">
      <Typography
        align="left"
        size="h5"
        as="h5"
        className="text-white font-bold pt-8 px-6 pb-6"
      >
        Order Summary
      </Typography>
      {cartData?.map((product) => (
        <CartCheckoutCard key={product.id} product={product} />
      ))}
      <div className="px-6 pt-8 pb-6 border-b border-[#516158] border-t mb-4">
        <div className="flex items-center justify-between">
          <Typography
            align="left"
            size="h6"
            as="h6"
            className="text-white text-base leading-5 flex"
          >
            Subtotal
          </Typography>
          <div className="">
            <Typography
              align="left"
              size="h6"
              as="h6"
              className="text-white font-bold"
            >
              {formatToNaira(calculateTotal() ?? 0, 2)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="px-6 pt-8 pb-6 border-b border-[#516158] border-t mb-4">
        <div className="flex items-center justify-between">
          <Typography
            align="left"
            size="h6"
            as="h6"
            className="text-white text-base leading-5 flex"
          >
            Delivery
          </Typography>
          <div className="">
            <Typography
              align="left"
              size="h6"
              as="h6"
              className="text-white font-bold"
            >
              {formatToNaira(2500, 2)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pt-8 bg-black-200 pb-6 mb-4">
        <Typography align="left" size="h6" as="h6" className="text-white flex">
          Total
        </Typography>
        <Typography align="left" size="h6" as="h6" className="text-white">
          {formatToNaira(total, 2)}
        </Typography>
      </div>
      <div className="px-6">
        <PromoForm />
        <div className="pt-6">
          <Typography
            align="left"
            size="s1"
            as="p"
            className="font-bold text-sm tracking-tight black-500 mb-2"
          >
            Select payment method
          </Typography>
          <PaymentMethod />
        </div>
      </div>
      <div className="px-6 pt-8">
        <Button
          size="lg"
          color="light"
          className="border-0 bg-black-600 black-100 w-full flex items-center justify-center"
          iconR={CheckCircleIcon}
          onClick={navigateTo}
        >
          Complete order
        </Button>
      </div>
    </div>
  );
};
