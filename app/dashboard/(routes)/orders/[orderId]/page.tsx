// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Crumb } from "@/components/crumb/crumb";

import React from "react";
import ViewOrder from "./components/view-order";
import { getSingleOrder } from "@/actions/get-orders";
import { OrderComponent } from "./components/order-component";
import { Order } from "@/components/table/orders-table/types";

export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { orderId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function CustomerOrderPage({
  params,
}: CustomerPageSearchParams) {
  const orderId = params.orderId;

  const order = await getSingleOrder(orderId);

  return (
    <div>
      <div className="p-4">
        <Crumb
          crumbData={[
            {
              text: "Dashboard",
              href: "/dashboard",
            },
            {
              text: "Orders",
              href: "/dashboard/orders",
            },
            {
              text: "Pending",
              href: "#",
            },
            {
              text: `${order?.orderId}`,
              href: "",
            },
          ]}
        />
      </div>
      <div className="px-4">
        <ViewOrder order={order as unknown as Order ?? null} />
      </div>
     
      <OrderComponent order={order as unknown as Order ?? null} />
    </div>
  );
}
