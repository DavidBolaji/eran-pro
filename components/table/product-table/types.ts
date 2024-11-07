import { Category } from "@prisma/client";

export interface Product {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  qty: number;
  stock: boolean;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  promotion: { code: string; discount: number }[];
  images: { url: string }[];
}

export interface ProductTableProps {
  initialProducts?: Product[];
  onLoadMore?: () => Promise<Product[]>;
  onSort?: (column: keyof Product, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number
  categories: Pick<Category, "id" | "name">[]
}
