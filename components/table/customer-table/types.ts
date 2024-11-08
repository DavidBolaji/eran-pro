import { Category } from "@prisma/client";

export interface Customer {
  id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  totalOrders: number;
  lastOrderDate: Date;
  orders: {
    id: string;
    createdAt: Date;
  }[];
  status: string;
}

export interface CustomerTableProps {
    initialCustomers?: Customer[];
    onLoadMore?: () => Promise<Customer[]>;
    onSort?: (column: keyof Customer, direction: "asc" | "desc") => void;
    onSearch?: (query: string) => void;
    onFilter?: (filters: unknown) => void;
    totalPages?: number;
    page?: number;
    itemsPerPage?: number
    categories: Pick<Category, "id" | "name">[]
  }