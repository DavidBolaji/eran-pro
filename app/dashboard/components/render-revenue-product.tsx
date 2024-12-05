import React from "react";
import RevenueChart from "./revenue-chart";
import { MeatCard, SideCards } from "./side-cards";
import FilterComponent from "./filter-component";
import db from "@/db/db";
import { Empty } from "antd";
import { getMonthlyRevenue } from "@/actions/get-orders";

export const RenderRevenueProduct = async () => {
  // Fetch products grouped by order count in descending order
  const productOrderResult = db.productOrder.groupBy({
    by: ["productId"],
    _count: {
      productId: true,
    },
    orderBy: {
      _count: {
        productId: "desc",
      },
    },
    take: 5,
  });

  const result = getMonthlyRevenue()

  const [popularProductsData, monthlyRevenue] = await Promise.all([productOrderResult, result])

  // Map products to include product details like name and image
  const popularProducts = await Promise.all(
    popularProductsData.map(async (product) => {
      const productDetails = await db.product.findUnique({
        where: { id: product.productId },
        select: {
          id: true,
          name: true,
          images: { select: { url: true }, take: 1 }, // Get the first image
        },
      });
      return { ...productDetails, orderCount: product._count.productId };
    })
  );

  return (
    <div className="grid grid-cols-12 gap-x-6 mt-6">
      <RevenueChart monthlyRevenue={monthlyRevenue} />
      <div className="lg:col-span-4 col-span-12 lg:mt-0 mt-6">
        <SideCards
          title="Popular products"
          filter={<FilterComponent />}
          body={
            popularProducts.length < 1 ? (
              <div>
                <Empty />
              </div>
            ) : (
              <div className="space-y-3">
                {popularProducts?.map((data) => (
                  <MeatCard
                    key={data.id}
                    title={data.name as string}
                    img={data?.images ? data?.images[0]?.url : ""}
                    order={data.orderCount}
                  />
                ))}
              </div>
            )
          }
        />
      </div>
    </div>
  );
};
