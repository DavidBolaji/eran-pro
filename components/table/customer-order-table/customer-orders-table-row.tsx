import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { CustomerOrders } from "./types";
import { Button } from "@/components/button/button";
import Image from "next/image";
import { formatToNaira } from "@/utils/helper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CustomerOrdersTableRowProps {
  orders: CustomerOrders;
}

export default function CustomerordersTableRow({
  orders,
}: CustomerOrdersTableRowProps) {
  return (
    <TableRow>
       <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={orders.products[0].img ?? ""}
            alt={orders.products[0].name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-bold text-sm  black-100">{orders.products[0].name}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3">{orders.id}</TableCell>
      <TableCell className="pl-6 py-3">{formatToNaira(orders.price)}</TableCell>
      <TableCell className="pl-6 py-3">{orders.createdAt.toString()}</TableCell>
      <TableCell className="pl-6 py-3">{orders.paymentType}</TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
          {orders.status.toLowerCase()}
        </Badge>
      </TableCell>
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
