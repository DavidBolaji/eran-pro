import { IOrder } from "@/actions/get-customers";

import { CustomerOrderCard } from "@/components/card/customer-order-card";
import { Empty } from "antd";
import React from "react";

const UserOrderComponent: React.FC<{ initialOrders: IOrder }> = ({
  initialOrders,
}) => {
  return (
    <>
      <div className="grid lg:grid-cols-12 grid-cols-6 gap-4">
        {initialOrders?.orders?.map((order) =>
          order.products.map((product) => {
            return (
              <CustomerOrderCard
                key={product.id}
                product={product}
                order={order}
              />
            );
          })
        )}
      </div>
      {!initialOrders.orders.length ?
        <div className="flex w-full items-center justify-center"><Empty /></div>
        : null
      }
    </>
  );
};

export default UserOrderComponent;
