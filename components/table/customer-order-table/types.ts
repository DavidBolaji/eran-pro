import { Address, Product } from "@prisma/client";

export interface CustomerOrders {
  id: string;
  price: number,
  products: Product[],
  address: Address | null,
  createdAt: Date,
  paymentType: string,
  status: string
}

export interface CustomerOrdersTableProps {
  initialOrders?: CustomerOrders[];
  onLoadMore?: () => Promise<CustomerOrders[]>;
  onSort?: (column: keyof CustomerOrders, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
