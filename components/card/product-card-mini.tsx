import React from "react";
import { Typography } from "../typography/typography";
import { IProduct } from "@/actions/get-products";
import Image from "next/image";
import { CardButton } from "../button/card-button";
import { endOfToday, isAfter, isBefore, startOfToday } from "date-fns";


export const ProductCardMini: React.FC<{
  product: IProduct & {weight?: number};
}> = ({ product }) => {
  const isOnSale = product.status === "ACTIVE";
  return (
    <div
      key={product.id}
      className="min-h-[401px] pb-4 col-span-2 border relative rounded-2xl bg-white shadow-md shrink-0"
    >
      {isOnSale && (
        <div className="bg-red-100 pl-4 flex items-center text-xs font-extrabold text-white top-5 h-8 w-20 absolute rounded-e-2xl">
          On Sale!
        </div>
      )}
      <div className="h-44 relative flex items-center justify-center bg-white rounded-t-2xl mb-4 overflow-hidden">
        <Image width={328} height={256} src={product?.images[0]?.url ?? ""} priority className="object-contain p-2 absolute w-full h-64" alt={product.name} />
      </div>
      <div className="px-4">
        <div className="text-sm mb-2 inline-block px-2 py-1 rounded-full border-black-100 text-gray-500 border">
          <Typography as="p" size="c1" align="center">
            {product.category.name}
          </Typography>
        </div>
        <Typography as="p" size="s1" align="left" className="mb-2">
          {product.name}
        </Typography>

        <div className="flex">
        {product?.promotion?.length &&
          isBefore(new Date(product?.promotion[0]?.startDate), endOfToday()) &&
          isAfter(new Date(product?.promotion[0]?.endDate), startOfToday()) ? <div className="text-lg font-bold">
          <Typography
            as="h6"
            size="h6"
            align="left"
            className="inline-block black-300 mr-2 line-through"
          >
            ₦{product.price.toLocaleString()}
          </Typography>
        </div>: null}
        <div className="text-lg font-bold">
          <Typography
            as="h6"
            size="h6"
            align="left"
            className="inline-block black-100 mr-2"
          >
           {product?.promotion?.length &&
            isBefore(new Date(product?.promotion[0].startDate), endOfToday()) &&
            isAfter(new Date(product?.promotion[0].endDate), startOfToday())
              ? ` ₦${(
                  (1 - product.promotion[0]?.discount / 100) *
                  product.price
                ).toLocaleString()}`
              : `₦${product.price.toLocaleString()}`}
          </Typography>
        </div>
        </div>
        <div className="mt-4 space-y-3 w-full">
          <CardButton product={product} />
        </div>
      </div>
    </div>
  );
};

