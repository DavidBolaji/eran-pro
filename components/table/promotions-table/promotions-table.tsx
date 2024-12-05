// ProductTable.tsx
"use client";

import * as React from "react";

import Pagination from "../pagination";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";
import {  PromotionTableProps, Promotion } from "./types";
import { filterOrder } from "@/actions/get-orders";
import PromotionsTableHeader from "./promotions-table-header";
import PromotionTableRow from "./promotions-table-row";
import { Empty } from "antd";

export default function PromotionsTable({
  initialPromotions = [],
  onLoadMore,
  onSort,
  onSearch,
  totalPages,
  page,
  itemsPerPage,
  // categories
}: PromotionTableProps) {
  
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
  } = useTable<Promotion>({
    initialItems: initialPromotions,
    onLoadMore,
    onSort,
    onSearch,
    onFilter(form, params) {
      filterOrder(form, params, "/dashboard/promotions")
    },
  });

  return (
    <div className="w-full scrollbar-hide min-w-[1000px]">
      <MainHeader
        title={"Promotions"}
        name={"Create New Promotion"}
        url={"/dashboard/promotions/add"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={(form, params) => filterOrder(form, params, `/dashboard/orders`)}
        filter
        calender
        // categories={categories}
        search
        more
      />
      <div className="rounded-b-2xl border-t-0 bg-white scrollbar-hide  border border-[#DDEEE5]">
        <Table className=''>
          <PromotionsTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items?.length ? items?.map((promotion: Promotion) => (
              <PromotionTableRow
                key={promotion.id}
                promotion={promotion}
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
              />
            )): null}
          </TableBody>
        </Table>
        {items?.length < 1 && <div className="py-8">
          <Empty />
        </div>}
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
