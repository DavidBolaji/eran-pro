import { Address, Category, Image } from "@prisma/client";

export interface Order {
  id: string;
  fname: string;
  lname: string;
  phone: string;
  email?: string;
  products: {
    id: string;
    name: string;
    images: Image[];
    unit: "PER_KG" | "PER_ITEM";
    price: number;
    ProductOrder: {
     orderId: string; 
     productId: string
     weight: number;
     discount: number; // Store the discount applied at the time of order
     promotionId: string;
     code: string
    }[] | null;
  }[];
  User: {
    fname: string | null;
    lname: string | null;
    phone: string | null;
    email?: string;
  } | null;
  orderId: string;
  price?: number | null; 
  paymentType?: string;
  address?: Address | null;
  status: "PENDING" | "DELIVERED" | "CANCELED";
  createdAt: Date;
}

export interface OrderTableProps {
  initialProducts?: Order[];
  onLoadMore?: () => Promise<Order[]>;
  onSort?: (column: keyof Order, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
  categories: Pick<Category, "id" | "name">[];
}
