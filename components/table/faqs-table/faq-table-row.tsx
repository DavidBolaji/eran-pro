import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Content } from "./types";
import { Button } from "@/components/button/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";

interface ContentFaqTableRowProps {
  faq: Content;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
  deleteOne?: (data: Set<string>) => void;
}

export default function ContentTableRow({
  faq,
  selectedItems,
  toggleSelectItem,
  deleteOne
}: ContentFaqTableRowProps) {
  return (
    <TableRow>
       <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(faq.id)}
          onCheckedChange={() => toggleSelectItem(faq.id)}
        />
      </TableCell>
       <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm  black-100 truncate overflow-hidden w-64">{faq?.question}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">{format(faq?.updatedAt, "MMM dd, yyyy")}</TableCell>
      {/* <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">{blog?.user?.fname}</TableCell> */}
      <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">Admin</TableCell>
      <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
          {faq.status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="pl-6 py-3">
        <Link href={`/dashboard/contents/faq/${faq?.id}/edit`}>
        <Button
          size="sm"
          color="light"
          className="border-0 bg-black-600 h-8 flex items-center justify-center"
        >
          Edit
        </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
