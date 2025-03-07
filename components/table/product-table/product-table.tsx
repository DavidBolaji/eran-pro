"use client";

import * as React from "react";
import ProductTableHeader from "./product-table-header";
import ProductTableRow from "./product-table-row";
import Pagination from "../pagination";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";
import { Product, ProductTableProps } from "./types";
import {  filterProduct, loadMoreProducts } from "@/actions/get-products";
import { Empty } from "antd";
import { useDeleteModal } from "@/hooks/use-delete-modal";

export default function ProductTable({
  initialProducts = [],
  onSort,
  totalPages,
  page,
  itemsPerPage,
  categories
}: ProductTableProps) {
  const {toggleModal} = useDeleteModal()
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
    loading,
    deleteMultiple,
    handleSearch,
    hasMore
  } = useTable<Product>({
    initialItems: initialProducts,
    async onLoadMore (page: number) {
      try {
        return await loadMoreProducts({page, limit:3})
      
      } catch (error) {
        console.error('Error loading more items:', error);
        return { items: [], hasMore: false };
      }
    },
    onSort,
    onSearch(form, params) {
      filterProduct(form, params)
    },
    onFilter(form, params, path) {
      filterProduct(form, params, path)
    },
    async onDeleteMany(data) {
      toggleModal(true, "DELETE_PRODUCT", data)
    },
  });
  // min-w-[1000px]
  return (
    <div className="w-full scrollbar-hide ">
      <MainHeader
        title={"Product List"}
        name={"Add Product"}
        url={"/dashboard/products/add"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={filterProduct}
        handleSearch={handleSearch}
        categories={categories}
        action={deleteMultiple}
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
                deleteOne={(data) => toggleModal(true, "DELETE_PRODUCT", data)}
              />
            ))}
          </TableBody>
        </Table>
        {items?.length < 1 && <div className="py-8">
          <Empty />
        </div>}
      </div>

      <Pagination
        ref={ref}
        isMobile={false}
        loading={loading}
        totalPages={totalPages ?? 0}
        page={page ?? 1}
        itemsPerPage={itemsPerPage ?? 10}
        onFilter={filterProduct}
        hasMore={hasMore}
      />
    </div>
  );
}
