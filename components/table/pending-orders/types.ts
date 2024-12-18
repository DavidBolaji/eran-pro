import { Image } from "@prisma/client";

export interface PendingOrders {
  id: string;
  email: string;
  fname: string;
  lname: string;
  phone: string;
  products: {
    id: string;
    name: string;
    images: Image[];
  }[];
  User: {
    fname: string | null;
    lname: string | null;
    phone: string | null;
    pic: string | null
  } | null;
  createdAt: Date;
}

export interface PendingOrdersTableProps {
  initialOrders?: PendingOrders[] | [];
  onLoadMore?: () => Promise<PendingOrders[]>;
  onSort?: (column: keyof PendingOrders, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
