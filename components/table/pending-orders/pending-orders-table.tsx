'use client'

import * as React from 'react'
import PendingOrdersTableHeader from './pending-orders-table-header'

import { PendingOrders, PendingOrdersTableProps } from './types'
import PendingordersTableRow from './pending-orders-table-row'
import { Table, TableBody } from '@/components/ui/table'
import { useTable } from '@/hooks/use-table'
import { MainHeader } from '../main-header'
import { Empty } from 'antd'
import { filterPendingOrders } from '@/actions/get-orders'


export default function PendingOrdersTable({
  initialOrders,
  onLoadMore,
  onSort,
}:  PendingOrdersTableProps) {
  const {
    items,
    handleSort,
    sortColumn,
    sortDirection,
  } = useTable<PendingOrders>({
    initialItems: initialOrders as PendingOrders[],
    onLoadMore,
    onSort,
    onFilter(form, params) {
      filterPendingOrders(form, params)
  },
  });

  return (
    <div className="w-full scrollbar-hide lg:min-w-0 min-w-[1000px]">
      <MainHeader
        title={"Pending Orders"}
        name={"Create New Order"}
        url={"/dashboard/orders/add"}
        onFilter={() => {}}
      />
      <div className="rounded-b-2xl border-t-0 bg-white overflow-hidden border border-[#DDEEE5]">
        <Table>
          <PendingOrdersTableHeader
            handleSort={handleSort}
            sortDirection={sortDirection}
            sortColumn={sortColumn}
          />
          <TableBody>
            {items.map((orders: PendingOrders) => (
              <PendingordersTableRow
                key={orders.id}
                orders={orders}
              />
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
