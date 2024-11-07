// PendingOrdersTableHeader.tsx
import React from 'react'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PendingOrders } from './types'
import { ChevronDown, ChevronUp } from 'lucide-react'


interface PendingOrdersTableHeaderProps {
  handleSort: (column: keyof PendingOrders, path?: string) => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof PendingOrders | null;
}

const headerList = [
  { key: "name", title: "Product name", hasSort: true },
  { key: "customer", title: "Customer", hasSort: true },
  { key: "phone", title: "Phone no", hasSort: true },
  { key: "order", title: "Order date", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function PendingOrdersTableHeader({
  handleSort,
  sortDirection,
  sortColumn,
}: PendingOrdersTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        {headerList.map((header) =>
          header.hasSort ? (
            <TableHead
              className="pl-6 py-3 black-300 font-bold text-sm"
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof PendingOrders, '/dashboard')}
                className="flex items-center gap-1"
              >
                {header.title}
                {sortColumn === header.key ? (
                  sortDirection === "asc" ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )
                ) : (
                  <ChevronDown className="h-4 w-4 opacity-50" />
                )}
              </button>
            </TableHead>
          ) : (
            <TableHead key={header.title}>{header.title}</TableHead>
          )
        )}
      </TableRow>
    </TableHeader>
  );
}

