import { getCategories } from "@/actions/get-categories";
import { getDashboardCustomer } from "@/actions/get-customers";
import { Crumb } from "@/components/crumb/crumb";

import React from "react";

export const revalidate = 0;

interface CustomerPageSearchParams {
  [key: string]: string;
}

export default async function CustomerPage({
  searchParams,
}: {
  searchParams: CustomerPageSearchParams;
}) {
  // const categories = searchParams.category?.split(",") || [];
  const customerId = searchParams.customerId;
  // const page = parseInt(searchParams.page) || 1;
  // const limit = parseInt(searchParams.limit) || 10;
  // const sort = searchParams.sort || "createdAt";
  // const sortOrder = searchParams.sortOrder || "asc";
  // const startDate = searchParams.startDate || "";
  // const endDate = searchParams.endDate || "";
  // const searchQuery = searchParams.searchQuery || "";

  // Fetch customer data and category list
  // const customerRequest = getDashboardCustomers({
  //   categories: categories.map((el) => el.toLowerCase()),
  //   page,
  //   limit,
  //   sort,
  //   sortOrder,
  //   startDate,
  //   endDate,
  //   searchQuery,
  // });
  const customerRequest = getDashboardCustomer(customerId);

  const categoryRequest = getCategories();

  // Await both requests
  const [customer] = await Promise.all([
    customerRequest,
    categoryRequest,
  ]);

  return (
    <div>
       <div className="py-10 lg:px-0 px-4">
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
     
    </div>
  );
}
