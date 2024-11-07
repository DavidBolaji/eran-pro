import { IProduct } from "@/actions/get-products";

import React from "react";
import { Typography } from "../typography/typography";
import Stepper from "./product-steper";
import { formatToNaira } from "@/utils/helper";
import Image from "next/image";
import { CartDeleteButton } from "../button/cart-delete-button";
import classNames from "classnames";

export const CartOrderCard: React.FC<{
  product: IProduct & { weight: number };
  border?: boolean;
  light?: boolean
}> = ({ product, border = false, light = false }) => {
  const cartOrderStyles = classNames("w-full h-[152px] p-4 flex mt-1 justify-between items-center rounded-xl", 
    {
      "border border-[#DDEEE5]": border
    },
    {
      "bg-white": light
    }
  )
  return (
    <div className={cartOrderStyles}>
      <div className="flex items-center gap-x-4">
        <div className="bg-white w-[120px] h-[120px] rounded-xl relative">
          <Image
            priority
            src={product?.images[0]?.url ?? ""}
            fill
            alt={product.name}
            className="object-contain w-full h-full rounded-xl absolute"
          />
        </div>
        <div>
          <Typography as="p" size="s1" align="left" className="pb-2">
            {product.name}
          </Typography>
          <Typography as="h6" size="h6" align="left" className="pb-2 font-bold leading-7">
            {formatToNaira(product.price)}
          </Typography>
          <Stepper weight={product.weight} product={product} />
        </div>
      </div>
      <CartDeleteButton productId={product.id} />
    </div>
  );
};
