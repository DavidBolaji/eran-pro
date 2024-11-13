import { getDashboardCustomer } from "@/actions/get-customers";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";
import ViewCustomer from "../../components/view-customer";
import { EditCustomerForm } from "@/components/form/edit-customer-form";
export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { customerId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function CustomerEditPage({
  params,
  searchParams,
}: CustomerPageSearchParams) {
  const customerId = params.customerId;
  const customerRequest = getDashboardCustomer(customerId);
  console.log(searchParams)

  // Await both requests
  const [customer] = await Promise.all([
    customerRequest
  ]);

  return (
    <div>
      <div className=" lg:px-0 px-4">
        <Crumb
          crumbData={[
            {
              text: "Customers",
              href: "/dashboard/customers",
            },
            {
              text: "Active Customers",
              href: "/dashboard/customers",
            },
            {
              text: `${customer.customer?.fname} ${customer.customer?.lname}`,
              href: "",
            },
          ]}
        />
      </div>
      <ViewCustomer customer={customer?.customer} save />
      <div className="grid grid-cols-10">
        <div className="lg:col-span-6 col-span-10 w-full">
          <EditCustomerForm
            user={customer?.customer}
            address={customer.customer?.orderAddress ?? []}
          />
        </div>
      </div>
    </div>
  );
}
