import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatToNaira } from "@/utils/helper";
import Image from "next/image";
import React from "react";
import { Product } from "./types";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductTableRowProps {
  product: Product;
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
}

export default function ProductTableRow({
  product,
  selectedItems,
  toggleSelectItem,
}: ProductTableRowProps) {
  return (
    <TableRow>
      <TableCell className="pl-6 py-3">
        <Checkbox
          checked={selectedItems.has(product.id)}
          onCheckedChange={() => toggleSelectItem(product.id)}
        />
      </TableCell>
      <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={product?.images[0]?.url ?? ""}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
          <span className="font-bold text-sm  black-100">{product.name}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {product.category.name}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {formatToNaira(product.price)}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {product.stock}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        {product.promotion[0]?.code ?? "-"}
      </TableCell>
      <TableCell className="pl-6 py-3 font-bold text-sm black-100">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
          {product.status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="py-3">
        <div className="flex gap-x-3">
          <Button variant={'ghost'}>
            <Eye className="w-4 h-4 black-100" />
          </Button>
          <Button variant={'ghost'}>
            <Edit className="w-4 h-4 black-100" />
          </Button>
          <Button variant={'ghost'}>
            <Trash2 className="w-4 h-4 black-100" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
