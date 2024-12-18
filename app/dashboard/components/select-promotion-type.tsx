"use client"
import { IProduct } from "@/actions/get-products";
import { CartOrderCard } from "@/components/card/cart-order-card";
import { EmptyCart } from "@/components/empty/empty-cart";
import { Promotion } from "@/components/table/promotions-table/types";
import { Typography } from "@/components/typography/typography";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import React from "react";


export const SelectPromotionType = () => {
  const queryClient = useQueryClient();

  const [{data: path}, {data: selectItem}, {data: catItem}] = useQueries({
    queries: [
      {
        queryKey: ["CREATE_PROMOTION"],
        queryFn: () =>
          queryClient.getQueryData(["CREATE_PROMOTION"]) as Promotion & {
            type: string;
          },
      },
      {
        queryKey: ["SELECT_ITEM"],
        queryFn: () =>
          queryClient.getQueryData(["SELECT_ITEM"]) as (IProduct & {
            weight: number;
          })[],
      },
      {
        queryKey: ["SELECT_CATEGORY"],
        queryFn: () =>
          queryClient.getQueryData(["SELECT_CATEGORY"]) as {
            label: string;
            value: string;
            key: string;
          }[] ?? [],
      }
    ]
  })


  const getRender = () => {
    if (path?.type?.toLocaleLowerCase() !== "category") {

      return selectItem?.length ? (
        selectItem?.map((d) => {
          return (
            <div key={d.id} className=" mb-6">
              <CartOrderCard product={d} remove />
            </div>
          );
        })
      ) : (
        <EmptyCart
          promotion="Select promotion type"
          close={() => {}}
          dashboard
        />
      );
    } else {
      console.log('CATEGORY')
      return catItem?.length ? (
        catItem?.map((d) => {
          return (
            <div key={d.key} className="flex items-center space-x-2 h-10">
              <Checkbox id={d.key} checked={true} />
              <label htmlFor={d.key} className="text-sm leading-5 font-medium">
                <span>
                  <Typography
                    size="s1"
                    as="p"
                    align="left"
                    className="black-300 font-satoshi font-bold text-[16px] leading-6 inline-block"
                  >
                    {d.label}
                  </Typography>
                </span>
              </label>
            </div>
          );
        })
      ) : (
        <EmptyCart
          promotion="Select promotion type"
          close={() => {}}
          dashboard
        />
      );
    }
  };
  return getRender();
}
