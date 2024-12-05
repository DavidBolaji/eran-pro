import { Typography } from "@/components/typography/typography";
import db from "@/db/db";
import { Empty } from "antd";
import React from "react";
import { UserDeliveryDetail } from "./user-delivery-detail";
import { CustomerDetailDisplay } from "@/app/dashboard/(routes)/customers/components/detail-section/customer-detail-display";
import { CartCheckoutCard } from "@/components/card/cart-checkout-card";
import { IProduct } from "@/actions/get-products";
import { UserUploadComponent } from "./user-upload-component";
import { Button } from "@/components/button/button";

export const UserInfocomponent: React.FC<{ userId: string }> = async ({
  userId,
}) => {
  const customer = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      phone: true,
      fname: true,
      lname: true,
      orders: {
        include: {
          products: {
            include: {
              images: true,
              ProductOrder: {
                select: {
                  orderId: true,
                  weight: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 2
      },
      orderAddress: true,
    },
  });

  return (
    <div className="mt-6">
      <div className="grid grid-cols-10 gap-x-6">
        <div className="lg:col-span-6 col-span-10">
          <CustomerDetailDisplay
            user={{
              fname: customer?.fname as string,
              lname: customer?.lname as string,
              email: customer?.email as string,
              phone: customer?.phone as string,
            }}
          />
        </div>
        <div className="lg:col-span-4 col-span-10 p-6 mt-6 h-[186px] bg-white rounded-2xl">
          <UserUploadComponent />
        </div>
      </div>
      <div className="grid grid-cols-10 gap-x-6">
        <div className="lg:col-span-6 col-span-10">
          <UserDeliveryDetail address={customer?.orderAddress ?? []} />
        </div>
        <div className="lg:col-span-4 col-span-10 p-6 mt-6 bg-white rounded-2xl max-h-[382px]">
          <Typography
            as="p"
            size="s1"
            align="left"
            className="mb-[14px] black-100"
          >
            Order History
          </Typography>
          <div className="space-y-3 mb-8">
            {customer?.orders?.map((order) =>
              order.products.map((product) => {
                // Find the corresponding weight from the ProductOrder relation
                const productOrder = product.ProductOrder.find(
                  (po) => order.id === po.orderId
                );
                return (
                  <CartCheckoutCard
                    key={product.id}
                    product={
                      product as unknown as IProduct & { weight: number }
                    }
                    weight={productOrder?.weight ?? 0} // Pass the weight to the component
                    black
                  />
                );
              })
            )}

            {!customer?.orders.length && <Empty />}
          </div>
          <div className="w-full flex justify-center">
          <Button
            size="lg"
            color="light"
            className="border-0 bg-black-600"
          >
            View full order history
          </Button>

          </div>
        </div>
      </div>
    </div>
  );
};
