import { IProduct } from "@/actions/get-products";
import Image from "next/image";
import React from "react";
import { Typography } from "../typography/typography";
import { formatToNaira } from "@/utils/helper";

export const CartCheckoutCard: React.FC<{
  product: IProduct & { weight: number };
  black?: boolean;
  weight?: number
}> = ({ product, black = false, weight }) => {
  return (
    <div className="w-full mb-4 h-[60px] p-4 flex mt-1 justify-between items-center rounded-xl px-6">
      <div className="flex items-center gap-x-4">
        <div className="bg-white w-[60px] h-[60px] rounded-xl relative">
          <Image
            priority
            src={product?.images[0]?.url ?? ""}
            fill
            alt={product.name}
            className="object-contain w-full h-full rounded-xl absolute"
          />
        </div>
        <div>
          <Typography as="p" size="s1" align="left" className={`pb-1 font-bold text-[16px] leading-6 ${black ? "black-100": "text-white"}`}>
            {product.name} ({weight ?? product?.weight}kg)
          </Typography>
          <Typography
            as="h6"
            size="h6"
            align="left"
            className={`pb-2 font-bold text-[16px] leading-6 ${black ? "black-300": "text-white"}`}
          >
            {formatToNaira(product.price)}
          </Typography>
        </div>
      </div>
    </div>
  );
};
