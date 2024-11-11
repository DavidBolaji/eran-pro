import { getCategories } from "@/actions/get-categories";
import { getDashboardCustomers } from "@/actions/get-customers";
import CustomerTable from "@/components/table/customer-table/customer-table";
import { dummyCustomers } from "@/components/table/customer-table/customer-table-data";
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
  const categories = searchParams.category?.split(",") || [];
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startDate = searchParams.startDate || "";
  const endDate = searchParams.endDate || "";
  const searchQuery = searchParams.searchQuery || "";

  // Fetch customer data and category list
  const customerRequest = getDashboardCustomers({
    categories: categories.map((el) => el.toLowerCase()),
    page,
    limit,
    sort,
    sortOrder,
    startDate,
    endDate,
    searchQuery,
  });

  const categoryRequest = getCategories();

  // Await both requests
  const [data, categoryList] = await Promise.all([
    customerRequest,
    categoryRequest,
  ]);

  return (
    <div>
      <CustomerTable
        initialCustomers={data?.customers ?? dummyCustomers ?? []}
        totalPages={data?.totalPages}
        page={page}
        itemsPerPage={limit}
        categories={categoryList}
      />
    </div>
  );
}
