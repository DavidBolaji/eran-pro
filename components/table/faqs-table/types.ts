import { Faq } from "@prisma/client";

export type Content = Faq

export interface ContentFaqTableProps {
  initialContent?: Content[];
  onLoadMore?: () => Promise<Content[]>;
  onSort?: (column: keyof Content, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: unknown) => void;
  totalPages?: number;
  page?: number;
  itemsPerPage?: number;
}
