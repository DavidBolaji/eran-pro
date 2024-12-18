"use client";
import { IProduct } from "@/actions/get-products";

import { CartCheckoutCard } from "@/components/card/cart-checkout-card";

import { Order } from "@/components/table/orders-table/types";
import { Typography } from "@/components/typography/typography";

import { addWeightToProducts, formatToNaira } from "@/utils/helper";
import React from "react";

export const RenderOrderCheckoutSummary: React.FC<{ order: Order | null }> = ({
  order,
}) => {
  const ordersNew = addWeightToProducts(order as unknown as Order & {code: string[]});
  console.log('[ORDERS]', ordersNew)

  const calculateTotal = () => {
    if (!ordersNew || !ordersNew.products) return 0;

    return ordersNew.products.reduce((acc, prod) => {
      const nProd = prod as unknown as IProduct & { weight: number };
      const weight = nProd?.weight || 0; // Ensure weight is always a number
      const stepValue = prod.unit === "PER_KG" ? 0.5 : 1;
      // const discount = prod.ProductOrder
      return acc + (prod.price * weight) / stepValue;
    }, 0);
  };

  const calculateTotalDiscount = () => {
    if (!ordersNew || !ordersNew.products) return 0;

    return ordersNew.products.reduce((acc, prod) => {
      
      const nProd = prod as unknown as IProduct & { discount: number };
      const discount = nProd?.discount || 0; // Ensure weight is always a number
      // const stepValue = prod.unit === "PER_KG" ? 0.5 : 1;
      return acc + discount 

    }, 0);
  };

  const totalDs = calculateTotalDiscount()
  const total = calculateTotal()
 
  


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
      {ordersNew?.products?.map((product) => (
        <CartCheckoutCard
          key={product.id}
          product={product as unknown as IProduct & { weight: number }}
        />
      ))}
      <div className="px-6 pt-8 pb-6 border-b border-[#516158] border-t mb-4">
        <div className="flex items-center justify-between">
          <Typography
            align="left"
            size="h6"
            as="h6"
            className="text-white text-[16px] leading-5 flex"
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
              {formatToNaira(total ?? 0, 2)}
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
            className="text-white text-[16px] leading-5 flex"
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
      <div className="px-6 pt-8 pb-6 border-b border-[#516158] border-t mb-4">
        <div className="flex items-center justify-between">
          <Typography
            align="left"
            size="h6"
            as="h6"
            className="text-white text-[16px] leading-5 flex-col"
          >
            <span className="font-medium text-[16px] block leading-5 mb-1">
              Promotion applied
            </span>
            <span className="font-bold text-sm block">{ordersNew?.code.join('+')}</span>
          </Typography>
          <div className="">
            <Typography
              align="left"
              size="h6"
              as="h6"
              className="text-white font-bold"
            >
              {formatToNaira(totalDs, 2)}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 pt-8 bg-black-200 pb-6 mb-4">
        <Typography align="left" size="h6" as="h6" className="text-white flex">
          Total
        </Typography>
        <Typography align="left" size="h6" as="h6" className="text-white flex flex-col">
          {formatToNaira((total + 2500 - totalDs), 2)}
          <span className="ml-2 mt-1 text-xs font-bold">
            Paid: ({formatToNaira(order?.price ?? 0, 2)})
          </span>
        </Typography>
      </div>
    </div>
  );
};
