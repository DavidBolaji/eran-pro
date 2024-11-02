"use client";
import React from "react";
import RevenueChart from "./revenue-chart";
import { MeatCard, SideCards } from "./side-cards";
import FilterComponent from "./filter-component";
import { useCartData } from "@/hooks/use-cart-data";

export const RenderRevenueProduct = () => {
  const { cartData } = useCartData();
  return (
    <div className="grid grid-cols-12 gap-x-6 mt-6">
      <RevenueChart />
      <div className="col-span-4">
        <SideCards
          title="Popular products"
          filter={<FilterComponent />}
          body={
            <div className="space-y-3">
              {cartData?.map((data) => (
                <MeatCard
                  key={data.id}
                  title={data.name}
                  img={data.img as string}
                  order={153}
                />
              ))}
            </div>
          }
        />
      </div>
    </div>
  );
};
