import { getCategories } from "@/actions/get-categories";
import { getDashboardCustomer } from "@/actions/get-customers";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";
import ViewCustomer from "../components/view-customer";
import { CustomerComponent } from "../components/customer-component";

export const revalidate = 0;

interface CustomerPageSearchParams {
  params: { customerId: string };
  searchParams: { [key: string]: string | undefined };
}

export default async function CustomerPage({
  params,
  searchParams
}: CustomerPageSearchParams) {
  const customerId = params.customerId;
  const customerRequest = getDashboardCustomer(customerId);
  const custormerName = searchParams?.tab;

  const categoryRequest = getCategories();

  // Await both requests
  const [customer, categories] = await Promise.all([
    customerRequest,
    categoryRequest,
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
      <ViewCustomer customer={customer?.customer}  />
      <CustomerComponent
        categories={categories}
        customerName={custormerName ? custormerName : "Details"}
        customer={customer.customer}
      />

    </div>
  );
}
