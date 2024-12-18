import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { PendingOrders } from "./types";
import { Button } from "@/components/button/button";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

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
            src={orders?.products ? orders.products[0]?.images[0]?.url : ""}
            alt={orders.products[0].name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-bold text-sm  black-100">{orders.products[0].name}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-satoshi font-bold font-sm black-100">{orders?.User ? orders.User?.fname : orders?.fname }</TableCell>
      <TableCell className="pl-6 py-3 font-satoshi font-bold font-sm black-100">{orders?.User ? orders.User?.phone : orders?.phone}</TableCell>
      <TableCell className="pl-6 py-3 font-satoshi font-bold font-sm black-100">{format(orders.createdAt, "MMM dd, h:maa")}</TableCell>
      <TableCell className="pl-6 py-3 font-satoshi font-bold font-sm black-100">
        <Link href={`/dashboard/orders/${orders.id}`}>
        <Button
          size="sm"
          color="light"
          className="border-0 bg-black-600 h-8 flex items-center justify-center"
        >
          View
        </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
