import { getCategories } from "@/actions/get-categories";
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
  const categories = Array.isArray(searchParams.category)
  ? searchParams.category
  : searchParams.category
  ? [searchParams.category]
  : []; // Ensure categories is always an array
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 7;
  const sort = searchParams.sort || "createdAt"; 
  const sortOrder = searchParams.sortOrder || "asc"; 
  const searchQuery = searchParams.searchQuery || ""; 
  

  const req = getDashboardProduct({
    categories: categories.map((el) => el.toLowerCase()),
    page,
    limit,
    sort,
    sortOrder,
    searchQuery
  });

  const req2 = getCategories() 

  const [data, categoryList] = await Promise.all([req, req2])



  return (
    <div className="p-4">
      <ProductTable
        initialProducts={data?.products ?? []}
        totalPages={data?.totalPages}
        page={page}
        itemsPerPage={limit}
        categories={categoryList}
      />
    </div>
  );
}
