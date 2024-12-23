import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { Content } from "./types";
import { Button } from "@/components/button/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { BlogCategory } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

interface ContentTableRowProps {
  blog: Content & {blogCategory: BlogCategory} & {user: {fname: string}};
  selectedItems: Set<string>;
  toggleSelectItem: (id: string) => void;
  deleteOne?: (data: Set<string>) => void;
}

export default function ContentTableRow({
  blog,
  selectedItems,
  toggleSelectItem,
}: ContentTableRowProps) {
  return (
    <TableRow>
       <TableCell className="pl-6 py-3 flex mt-2 items-end h-full">
        <Checkbox
          checked={selectedItems.has(blog.id)}
          onCheckedChange={() => toggleSelectItem(blog.id)}
        />
      </TableCell>
       <TableCell className="pl-6 py-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm  black-100 truncate overflow-hidden w-64">{blog?.title}</span>
        </div>
      </TableCell>
      <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm underline">{blog?.blogCategory?.name}</TableCell>
      <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">{format(blog?.updatedAt, "MMM dd, yyyy")}</TableCell>
      {/* <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">{blog?.user?.fname}</TableCell> */}
      <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">Admin</TableCell>
      <TableCell className="pl-6 py-3 font-satoshi black-100 font-bold text-sm">
        <Badge variant="outline" className={cn("capitalize rounded-full")}>
          {blog.status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell className="pl-6 py-3">
        <Link href={`/dashboard/contents/${blog?.id}/edit`}>
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
