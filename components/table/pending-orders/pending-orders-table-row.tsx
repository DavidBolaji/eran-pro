import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { PendingOrders } from "./types";
import { Button } from "@/components/button/button";
import Image from "next/image";

interface PendingOrdersTableRowProps {
  orders: PendingOrders;
}

export default function PendingordersTableRow({
  orders,
}: PendingOrdersTableRowProps) {
  return (
    <TableRow>
       <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={orders?.product ? orders.product[0]?.images[0]?.url ?? "": ""}
            alt={orders.name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-bold text-sm  black-100">{orders.name}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3">{orders.user.name}</TableCell>
      <TableCell className="pl-6 py-3">{orders.user.phone}</TableCell>
      <TableCell className="pl-6 py-3">{orders.createdAt}</TableCell>
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
