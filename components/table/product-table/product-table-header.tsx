// ProductTableHeader.tsx
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Product } from "./types";
import { CheckboxMinus } from "@/components/ui/checkboxminus";

interface ProductTableHeaderProps {
  allChecked: boolean;
  handleSort: (column: keyof Product) => void;
  toggleSelectAll: () => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof Product | null;
}

const headerList = [
  { key: "name", title: "Product name", hasSort: true },
  { key: "category", title: "Category", hasSort: true },
  { key: "price", title: "Price", hasSort: true },
  { key: "qty", title: "Stock", hasSort: true },
  { key: "promotion", title: "Promotion", hasSort: true },
  { key: "status", title: "Status", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function ProductTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: ProductTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="pl-6 h-full py-3 flex items-center">
          <CheckboxMinus checked={allChecked} onCheckedChange={toggleSelectAll} />
        </TableHead>
        {headerList.map((header) =>
          header.hasSort ? (
            <TableHead
              className="pl-6 py-3 black-300 font-bold text-sm"
              key={header.title}
            >
              <button
                onClick={() => handleSort(header.key as keyof Product)}
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

