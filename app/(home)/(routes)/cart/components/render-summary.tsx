"use client";
import { Typography } from "@/components/typography/typography";
import { useCartData } from "@/hooks/use-cart-data";
import { formatToNaira } from "@/utils/helper";
import React from "react";
import { RenderCartFooter } from "./render-cart-footer";

export const RenderSummary = () => {
  const { calculateTotal } = useCartData();
  const total = (calculateTotal() ?? 0) + 2500 

  return (
    <div className="bg-white lg:rounded-2xl">
      <Typography
        align="left"
        size="h5"
        as="h5"
        className="border-b font-bold black-100 pl-6 pt-8 pb-6"
      >
        Order Summary
      </Typography>
      <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b mb-4">
        <Typography align="left" size="h6" as="h6" className="black-200 font-bold flex">
          Subtotal
        </Typography>
        <Typography align="left" size="h6" as="h6" className="black-100 font-bold">
          {formatToNaira(calculateTotal() ?? 0, 2)}
        </Typography>
      </div>
      <div className="px-6 pt-8 pb-6 border-b border-t mb-4">
        <div className="flex items-center justify-between">
          <Typography align="left" size="h6" as="h6" className="black-200 flex">
            Delivery
          </Typography>
          <div className="">
            <Typography align="left" size="h6" as="h6" className="black-100">
              {formatToNaira(2500, 2)}
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-end w-full space-y-2">
          <Typography
            align="left"
            size="s1"
            as="p"
            className="black-300 font-normal text-base leading-5"
          >
            Delivering to Ibadan
          </Typography>
          <Typography
            align="left"
            size="h6"
            as="h6"
            className="black-100 cursor-pointer underline font-bold text-sm leading-5"
          >
            Change Address
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pt-8 bg-grey-200 pb-6 mb-4">
      <Typography align="left" size="h6" as="h6" className="black-200 flex font-bold">
          Total
        </Typography>
        <Typography align="left" size="h6" as="h6" className="black-100 font-bold">
          {formatToNaira(total, 2)}
        </Typography>
      </div>
      <RenderCartFooter />
    </div>
  );
};
