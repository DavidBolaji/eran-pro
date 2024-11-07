import { Image, Product } from "@prisma/client";

export interface PendingOrders {
  id: string;
  name: string;
  product?: Product & {images: Image[]}[];
  user: {
    name: string;
    phone: string;
  };
  createdAt: string;
}

export interface PendingOrdersTableProps {
  initialOrders?: PendingOrders[];
  onLoadMore?: () => Promise<PendingOrders[]>;
  onSort?: (column: keyof PendingOrders, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
