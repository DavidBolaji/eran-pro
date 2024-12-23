// PendingOrdersTableHeader.tsx
import React from 'react'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Content } from './types'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CheckboxMinus } from '@/components/ui/checkboxminus';


interface PendingOrdersTableHeaderProps {
  allChecked: boolean;
  toggleSelectAll: () => void;
  handleSort: (column: keyof Content, path?: string) => void;
  sortDirection: "asc" | "desc";
  sortColumn: keyof Content | null;
}

const headerList = [
  { key: "title", title: "Title", hasSort: true },
  { key: "category", title: "Category", hasSort: true },
  { key: "updatedAt", title: "Last edited", hasSort: true },
  { key: "user", title: "Created by", hasSort: true },
  { key: "status", title: "Status", hasSort: true },
  { key: "actions", title: "", hasSort: false },
];

export default function ContentTableHeader({
  allChecked,
  toggleSelectAll,
  handleSort,
  sortDirection,
  sortColumn,
}: PendingOrdersTableHeaderProps) {
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
                onClick={() => handleSort(header.key as keyof Content)}
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

