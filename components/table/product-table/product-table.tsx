// ProductTable.tsx
"use client";

import * as React from "react";
import ProductTableHeader from "./product-table-header";
import ProductTableRow from "./product-table-row";
import Pagination from "../pagination";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";
import { Product, ProductTableProps } from "./types";
import { filterProduct } from "@/actions/get-products";

export default function ProductTable({
  initialProducts = [],
  onLoadMore,
  onSort,
  onSearch,
  totalPages,
  page,
  itemsPerPage,
  categories
}: ProductTableProps) {
  const {
    items,
    showFilters,
    setShowFilters,
    ref,
    allChecked,
    handleSort,
    sortColumn,
    sortDirection,
    toggleSelectAll,
    toggleSelectItem,
    selectedItems,
    isMobile,
    loading,
  } = useTable<Product>({
    initialItems: initialProducts,
    onLoadMore,
    onSort,
    onSearch,
    onFilter(form, params, path) {
      filterProduct(form, params, path)
    },
  });

  return (
    <div className="w-full scrollbar-hide min-w-[1000px]">
      <MainHeader
        title={"Product List"}
        name={"Add Product"}
        url={"/dashboard/products/add"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={filterProduct}
        categories={categories}
        filter
        search
        more
      />
      <div className="rounded-b-2xl border-t-0 bg-white scrollbar-hide  border border-[#DDEEE5]">
        <Table className=''>
          <ProductTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((product: Product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        ref={ref}
        isMobile={isMobile}
        loading={loading}
        totalPages={totalPages ?? 0}
        page={page ?? 1}
        itemsPerPage={itemsPerPage ?? 10}
        onFilter={filterProduct}
      />
    </div>
  );
}
