import { IProduct } from "@/actions/get-products";

import React from "react";
import { Typography } from "../typography/typography";
import Stepper from "./product-steper";
import { formatToNaira } from "@/utils/helper";
import Image from "next/image";
import { CartDeleteButton } from "../button/cart-delete-button";
import classNames from "classnames";
import { endOfToday, isAfter, isBefore, startOfToday } from "date-fns";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";


export const CartOrderCard: React.FC<{
  product: IProduct & { weight: number } | null;
  border?: boolean;
  light?: boolean;
  remove?: boolean
  loading?: boolean
}> = ({ product, border = false, light = false, remove = false, loading = false }) => {
  const cartOrderStyles = classNames("w-full p-4 flex mt-1 justify-between items-center rounded-xl", 
    {
      "border border-[#DDEEE5]": border
    },
    {
      "bg-white": light
    },
    {
      "h-[152px]":!remove 
    },
    {
      "h-[60px]":remove 
    }
  )

  if (loading) {
    return (
      <div className={cartOrderStyles}>
        <SkeletonAvatar active size={120} shape="square" />
        <div className="flex-1 ml-4">
          <SkeletonInput active size="large" style={{ width: "70%" }} />
          <SkeletonInput active size="default" style={{ width: "50%", marginTop: 8 }} />
          {!remove && <SkeletonInput active size="small" style={{ width: "40%", marginTop: 8 }} />}
        </div>
      </div>
    );
  }
  return (
    <div className={cartOrderStyles}>
      <div className="flex items-center gap-x-4">
        <div className={`rounded-xl relative ${!remove ? "h-[120px] w-[120px]": "h-[80px] w-[120px] -ml-10" } `}>
          <Image
            priority
            src={product?.images[0]?.url ?? ""}
            fill
            alt={product?.name ?? ""}
            className="object-contain p-3 w-full h-full rounded-xl absolute"
          />
        </div>
        <div>
          <Typography as="p" size="s1" align="left" className="pb-2">
            {product?.name}
          </Typography>
          <Typography as="h6" size="h6" align="left" className="pb-2 font-bold leading-7">
          {product?.promotion?.length &&
            isBefore(new Date(product?.promotion[0].startDate), endOfToday()) &&
            isAfter(new Date(product?.promotion[0].endDate), startOfToday())
              ? ` ₦${(
                  (1 - product.promotion[0]?.discount / 100) *
                  product.price
                ).toLocaleString()}`
              : `${formatToNaira(product?.price ?? 0)}`}
            {/* {formatToNaira(product.price)} */}
          </Typography>
          {!remove && <Stepper weight={product?.weight ?? 0} product={product ?? null} />}
        </div>
      </div>
      {!remove && <CartDeleteButton productId={product?.id ?? ""} />}
    </div>
  );
};
