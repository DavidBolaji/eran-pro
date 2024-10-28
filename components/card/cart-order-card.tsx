import { IProduct } from "@/actions/get-products";

import React from "react";
import { Typography } from "../typography/typography";
import Stepper from "./product-steper";
import { formatToNaira } from "@/utils/helper";
import Image from "next/image";
import { CartDeleteButton } from "../button/cart-delete-button";

export const CartOrderCard: React.FC<{
  product: IProduct & { weight: number };
}> = ({ product }) => {
  return (
    <div className="w-full h-[152px] p-4 flex border mt-1 justify-between items-center rounded-xl">
      <div className="flex items-center gap-x-4">
        <div className="bg-black-100 w-[120px] h-[120px] rounded-xl relative">
          <Image
            priority
            src={product.img ?? ""}
            fill
            alt={product.name}
            className="object-cover w-full h-full -z-10 rounded-xl absolute"
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
