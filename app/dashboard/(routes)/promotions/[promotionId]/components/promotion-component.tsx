import React from "react";
import { Category, Image, Product, Promotion } from "@prisma/client";
import { PromotionDetail } from "./promotion-detail";
import { PromotionProduct } from "./promotion-product";


export const PromotionComponent = async ({
  promotion,
}: {
  promotion: Promotion & { product: (Product & {images: Image[]})[] | null } & {category: Category[] | null} | null;
}) => {

  return (
    <div className="">
      <div className="grid grid-cols-10 gap-x-6">
        <div className="lg:col-span-6 col-span-10 p-4">
          {promotion ? <PromotionDetail promotion={promotion} /> : null}
        </div>
        <div className="lg:col-span-4 lg:mr-4 col-span-10 mt-4 lg:mb-4 pb-10 lg:rounded-2xl  bg-white">
        <PromotionProduct item={promotion} />
        </div>
      </div>
    </div>
  );
};
