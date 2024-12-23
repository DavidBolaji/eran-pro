// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { SelectedUserButtons } from "./selected-user-buttons";
import { UserInfocomponent } from "./user-info-component";
import { IUser } from "@/actions/get-customers";
import UserOrderComponent from "./user-order-component";

interface ICustomerComponent {
  customerName: string;
  customer: IUser | null;
}

export const UserDetailComponent: React.FC<ICustomerComponent> = ({
  customerName,
  customer,
}) => {
  return (
    <div className="lg:px-0 px-4">
      <div className="md:my-0 ml-0.5 flex md:justify-start justify-center lg:px-0 overflow-x-scroll scrollbar-hide">
        <SelectedUserButtons
          customers={[
            { name: "Details", id: "details", key: customer!.id },
            { name: "Order History", id: "order", key: customer!.id },
          ]}
          initialCustomerName={customerName}
        />
      </div>
      {customerName === "Details" ? (
        <UserInfocomponent userId={customer?.id as string} />
      ) : (
        <div className="mt-8">
          <UserOrderComponent
            initialOrders={{ orders: customer?.orders ?? [] }}
          />
        </div>
      )}
    </div>
  );
};
