import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { PendingOrders } from "./types";
import { Button } from "@/components/button/button";

interface PendingOrdersTableRowProps {
  product: PendingOrders;
}

export default function PendingordersTableRow({
  product,
}: PendingOrdersTableRowProps) {
  return (
    <TableRow>
      <TableCell className="pl-6 py-3">{product.name}</TableCell>
      <TableCell className="pl-6 py-3">{product.user.name}</TableCell>
      <TableCell className="pl-6 py-3">{product.user.phone}</TableCell>
      <TableCell className="pl-6 py-3">{product.createdAt}</TableCell>
      <TableCell className="pl-6 py-3">
        <Button
          size="sm"
          color="light"
          className="border-0 bg-black-600 h-8 flex items-center justify-center"
        >
          view
        </Button>
      </TableCell>
    </TableRow>
  );
}
