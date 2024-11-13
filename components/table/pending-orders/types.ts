import { Image } from "@prisma/client";

export interface PendingOrders {
  id: string;
  products: {
    name: string;
    images: Image[];
  }[];
  User: {
    fname: string | null;
    lname: string | null;
    phone: string | null;
  };
  createdAt: Date;
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
