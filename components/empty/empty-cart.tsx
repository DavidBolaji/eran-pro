"use client"
import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";

export const EmptyCart:React.FC<{close: () => void}> = ({close}) => {
  return (
    <div className="h-5/6 max-w-[390px] flex-col flex items-center justify-center w-full mx-auto">
      <Typography as="h6" size="h6" align="center" className="pb-2">
        Your Cart is Empty 🛒
      </Typography>
      <span className="text-center text-base mb-6 flex items-center justify-center font-medium font-satoshi leading-5 text-black-100">
        Looks like you haven&apos;t added anything yet! Explore our premium
        meats and find the perfect cuts to fill your cart.
      </span>
      <Button color="light" size="lg" onClick={close}>
        Continue shopping
      </Button>
    </div>
  );
};
