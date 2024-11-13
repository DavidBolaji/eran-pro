import React from "react";
import { SelectedCustomerButtons } from "./select-customer-buttons";
import { IUser } from "@/actions/get-customers";
import { Category } from "@prisma/client";
import { DetailComponent } from "./detail-section/detail-component";
import CustomerOrdersTable from "@/components/table/customer-order-table/customer-orders-table";

interface ICustomerComponent {
  customerName: string;
  categories: Pick<Category, "id" | "name">[];
  customer: IUser | null;
}

export const CustomerComponent: React.FC<ICustomerComponent> = ({
  customerName,
  customer,
}) => {
  return (
    <div className="">
      <div className="md:my-0 my-6 ml-0.5 lg:px-0 overflow-x-scroll scrollbar-hide">
        <SelectedCustomerButtons
          customers={[
            { name: "Details", id: "details", key: customer!.id },
            { name: "Order History", id: "order", key: customer!.id },
          ]}
          initialCustomerName={customerName}
        />
      </div>
      {customerName === "Details" ? (
        <DetailComponent customerId={customer?.id as string} />
      ) : (
        <CustomerOrdersTable initialOrders={customer?.orders ?? []} />
      )}
    </div>
  );
};
