"use client";

import React from "react";

import { Typography } from "../typography/typography";
import { formatToNaira } from "@/utils/helper";
import Image from "next/image";
import classNames from "classnames";
import { Button } from "../button/button";
import { ICON } from "@/constants/icon";
import { useCartData } from "@/hooks/use-cart-data";
import { IProduct } from "@/actions/get-products";
import SkeletonAvatar from "antd/es/skeleton/Avatar";
import SkeletonInput from "antd/es/skeleton/Input";
import SkeletonButton from "antd/es/skeleton/Button";

export const CartProductDashboardCard: React.FC<{
  product?: IProduct & { weight: number } | null;
  border?: boolean;
  light?: boolean;
  loading?: boolean;
}> = ({ product, border = false, light = false, loading = false }) => {
  const { addProduct } = useCartData();

  const cartOrderStyles = classNames(
    "w-full h-[120px] p-4 flex justify-between items-center rounded-xl mb-6",
    {
      "border border-[#DDEEE5]": border,
      "bg-white": light,
    }
  );

  if (loading) {
    return (
      <div className={"w-full h-[120px] p-4 flex items-center gap-x-4 rounded-xl mb-6"}>
        <SkeletonAvatar active size={120} shape="square" />
        <div className="flex-col flex">
            <SkeletonInput active size="default" style={{ width: "50%", marginBottom:8 }} />
            <SkeletonInput active size="default" style={{ width: "40%", marginBottom:8 }} />
          <SkeletonButton active size="default" shape="round" style={{ width: "100px" }} />
        </div>
      </div>
    );
  }

  return (
    <div className={cartOrderStyles}>
      <div className="flex items-center gap-x-4">
        <div className="bg-white w-[120px] h-[120px] rounded-xl relative">
          <Image
            priority
            src={product?.images[0]?.url ?? ""}
            fill
            alt={product?.name || "Product Image"}
            className="object-contain w-full h-full p-2 rounded-xl absolute"
          />
        </div>
        <div>
          <Typography as="p" size="s1" align="left" className="pb-2">
            {product?.name}
          </Typography>
          <Typography
            as="h6"
            size="h6"
            align="left"
            className="pb-2 font-bold leading-7"
          >
            {formatToNaira(product?.price || 0)}
          </Typography>
          <Button
            size="lg"
            color="light"
            iconR={() => <ICON.ShoppingCartIcon size="14" />}
            className="border-0 bg-black-600 h-9 text-black"
            onClick={() => addProduct(product!)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};
