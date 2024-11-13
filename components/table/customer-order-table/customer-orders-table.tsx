// ProductTable.tsx
"use client";

import * as React from "react";

import { CustomerOrders, CustomerOrdersTableProps } from "./types";

import { Table, TableBody } from "@/components/ui/table";
import { useTable } from "@/hooks/use-table";
import { MainHeader } from "../main-header";
import CustomerOrdersTableHeader from "./customer-orders-table-header";
import CustomerordersTableRow from "./customer-orders-table-row";
import { filterCustomerOrder } from "@/actions/get-customers";
import { Empty } from "antd";

export default function CustomerOrdersTable({
  initialOrders,
  onLoadMore,
  onSort,
  onSearch,
}: CustomerOrdersTableProps) {
  const { items, handleSort, sortColumn, sortDirection, showFilters, setShowFilters } =
    useTable<CustomerOrders>({
      initialItems: initialOrders as CustomerOrders[],
      onLoadMore,
      onSort,
      onSearch,
      onFilter(form, params, path) {
        filterCustomerOrder(form, params, path);
      },
    });

  return (
    <div className="w-full mt-6 scrollbar-hide min-w-[1000px]">
      <MainHeader
        title={"Orders History"}
        setShowFilters={setShowFilters}
        showFilters={showFilters}
        onFilter={filterCustomerOrder}
        filter
        payment
        status
      />
      <div className="rounded-b-2xl border-t-0 bg-white overflow-hidden border relative border-[#DDEEE5]">
        <Table>
          <CustomerOrdersTableHeader
            handleSort={handleSort}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
          />
          <TableBody>
            {items.map((orders: CustomerOrders) => (
              <CustomerordersTableRow key={orders.id} orders={orders} />
            ))}
          </TableBody>
        </Table>
        {items.length < 1 && <div className="py-8">
          <Empty />
        </div>}
      </div>
    </div>
  );
}
