// ProductTable.tsx
"use client";

import * as React from "react";

import Pagination from "../pagination";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";
import { Order, OrderTableProps } from "./types";
import { filterOrder } from "@/actions/get-orders";
import OrderTableHeader from "./orders-table-header";
import OrderTableRow from "./orders-table-row";

export default function OrderTable({
  initialProducts = [],
  onLoadMore,
  onSort,
  onSearch,
  totalPages,
  page,
  itemsPerPage,
  categories
}: OrderTableProps) {
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
  } = useTable<Order>({
    initialItems: initialProducts,
    onLoadMore,
    onSort,
    onSearch,
    onFilter(form, params) {
      filterOrder(form, params, "/dashboard/orders")
    },
  });

  return (
    <div className="w-full scrollbar-hide min-w-[1000px]">
      <MainHeader
        title={"Orders"}
        name={"Create New Order"}
        url={"/dashboard/orders/add"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={(form, params) => filterOrder(form, params, `/dashboard/orders`)}
        filter
        calender
        categories={categories}
        search
        more
      />
      <div className="rounded-b-2xl border-t-0 bg-white scrollbar-hide  border border-[#DDEEE5]">
        <Table className=''>
          <OrderTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((order: Order) => (
              <OrderTableRow
                key={order.id}
                order={order}
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
        onFilter={(form, params) => filterOrder(form, params, "/dashboard/orders")}
      />
    </div>
  );
}
