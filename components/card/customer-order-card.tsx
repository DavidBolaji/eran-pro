import { CustomerOrder, CustomerProduct } from "@/actions/get-customers";
import Image from "next/image";
import React from "react";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import { formatToNaira } from "@/utils/helper";
import { format } from "date-fns";

export const CustomerOrderCard: React.FC<{
  product: CustomerProduct;
  order: CustomerOrder;
}> = ({ product, order }) => {
  return (
    <div className="col-span-6 bg-white rounded-2xl border-[#DDEEE5] border">
      <div className="flex justify-between p-4 items-center capitalize">
        <span className="px-2 py-1 border rounded-full text-xs capitalize">{order.status.toLowerCase()}</span>
        <span className="font-satoshi font-medium text-xs leading-4">{format(order.createdAt, "MMM dd, yyyy")}</span>
      </div>
      <div className="px-4 flex items-center gap-x-4 border-t border-b border-[#DDEEE5]">
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={88}
          height={88}
          className="border-[#DDEEE5] border rounded-2xl p-1 h-20 my-8"
        />
        <div>
          <Typography as="h6" size="h6" align="left" className="mb-1 font-bold">
            {product.name}
          </Typography>
          <div className="flex gap-x-2">
            <Typography
              as="p"
              size="s1"
              align="left"
              className="font-medium text-sm black-300"
            >
              Order no:
            </Typography>
            <Typography
              as="h6"
              size="h6"
              align="left"
              className="font-bold black-100 text-sm"
            >
              {order.orderId}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <Typography as="h6" size="h6" align="left" className="font-bold">
          {formatToNaira(product.price)}
        </Typography>
        <Typography
          as="h6"
          size="h6"
          align="left"
          className="font-bold text-sm"
        >
          {order.paymentType} (Paystack)
        </Typography>
        <Button size="lg" color="light" className="border-0 md:flex hidden bg-black-600 h-9 items-center justify-center">
          Order Again
        </Button>
      </div>
      <div className="md:hidden flex w-full items-center py-4 justify-center border-t border-[#DDEEE5]">
      <Button size="lg" color="light" className="border-0 bg-black-600 h-9 items-center justify-center">
          Order Again
        </Button>
      </div>
    </div>
  );
};
