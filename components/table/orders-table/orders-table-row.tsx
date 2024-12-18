import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Order } from "./types";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface OrderTableRowProps {
  order: Order;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
}

export default function OrderTableRow({
  order,
  selectedItems,
  toggleSelectItem,
}: OrderTableRowProps) {
  const router = useRouter();
  return (
    <TableRow className={selectedItems.has(order.id) ? "bg-black-600" : ""}>
      <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(order.id)}
          onCheckedChange={() => toggleSelectItem(order.id)}
        />
      </TableCell>
      <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={order?.products ? order.products[0]?.images[0]?.url : ""}
            alt={order.products[0].name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-bold text-sm  black-100">
            {order.products[0].name}
          </span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-satoshi font-bold font-sm black-100">
        {order.User ? `${order.User?.fname} ${order.User?.lname}` : `${order?.fname} ${order?.lname}`}
      </TableCell>
      <TableCell className="pl-6 py-3 font-satoshi font-bold font-sm black-100">
        {order.User ? order.User?.phone : order?.phone}
      </TableCell>
      <TableCell className="py-3 font-satoshi text-center font-bold font-sm black-100">
        {order.orderId}
      </TableCell>
      <TableCell className="pl-6 py-3 font-satoshi font-bold font-sm black-100">
        {format(order.createdAt, "MMM dd, h:maa")}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
          {order.status.toLowerCase()}
        </Badge>
      </TableCell>

      <TableCell className="">
        <Button
          onClick={() => router.push(`/dashboard/orders/${order?.id}`)}
          size="sm"
          color="light"
          className="border-0 bg-black-600 hover:bg-transparent text-black h-7 flex items-center rounded-full justify-center"
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
