"use client";

import * as React from "react";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import { Table, TableBody } from "@/components/ui/table";

import { filterCustomer } from "@/actions/get-customers";
import CustomerTableHeader from "./customer-table-header";
import { Customer, CustomerTableProps } from "./types";
import Pagination from "../pagination";
import CustomerTableRow from "./customer-table-row";

export default function CustomerTable({
  initialCustomers = [],
  onLoadMore,
  onSort,
  onSearch,
  totalPages,
  page,
  itemsPerPage,
  categories
}: CustomerTableProps) {
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
  } = useTable<Customer>({
    initialItems: initialCustomers,
    onLoadMore,
    onSort,
    onSearch,
    onFilter(form, params, path) {
        filterCustomer(form, params, path)
    },
  });

  return (
    <div className="w-full">
      <MainHeader
        title={"Customer List"}
        name={"Add Customer"}
        url={"/dashboard/customers/add"}
        setShowFilters={setShowFilters}
        onFilter={filterCustomer}
        showFilters={showFilters}
        categories={categories}
        filter
        calender
        search
        more
      />
      <div className="rounded-b-2xl border-t-0 bg-white overflow-hidden border border-[#DDEEE5]">
        <Table>
          <CustomerTableHeader
            handleSort={handleSort}
            allChecked={allChecked}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
            toggleSelectAll={toggleSelectAll}
          />
          <TableBody>
            {items.map((customer: Customer) => (
              <CustomerTableRow
                key={customer.id}
                customer={customer}
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
        onFilter={filterCustomer}
      />
    </div>
  );
}
