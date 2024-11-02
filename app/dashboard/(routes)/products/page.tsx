import {  getDashboardProduct } from "@/actions/get-products";
import ProductTable from "@/components/table/product-table/product-table";
import React from "react";

export const revalidate = 0;

interface ProductOageSearchParams {
  [key: string]: string;
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: ProductOageSearchParams;
}) {
  const categories = searchParams.category?.split(",") || [];
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;
  const sort = searchParams.sort || "createdAt"; 
  const sortOrder = searchParams.sortOrder || "asc"; 
  console.log(categories);

  const data = await getDashboardProduct({
    categories: categories.map((el) => el.toLowerCase()),
    page,
    limit,
    sort,
    sortOrder
  });



  return (
    <div>
      <ProductTable
        initialProducts={data?.products ?? []}
        totalPages={data?.totalPages}
        page={page}
        itemsPerPage={limit}
      />
    </div>
  );
}
