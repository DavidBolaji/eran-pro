// ProductTableHeader.tsx
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

import { CheckboxMinus } from "@/components/ui/checkboxminus";
import { Order } from "./types";

interface OrderTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof Order) => void;
  toggleSelectAll: () => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof Order | null;
}

const headerList = [
  { key: "name", title: "Product name", hasSort: true },
  { key: "fname", title: "Customer", hasSort: true },
  { key: "phone", title: "Phone no", hasSort: true },
  { key: "orderId", title: "Order Number", hasSort: true },
  { key: "createdAt", title: "Order date", hasSort: true },
  { key: "status", title: "Status", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function OrderTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: OrderTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="pl-6 h-full py-3 flex items-center">
          <CheckboxMinus checked={allChecked} onCheckedChange={toggleSelectAll} />
        </TableHead>
        {headerList.map((header) =>
          header.hasSort ? (
            <TableHead
              className="pl-6 py-3 black-300 font-bold text-sm text-nowrap"
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof Order)}
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

