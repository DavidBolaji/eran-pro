import { filterProduct } from "@/actions/get-products";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useInView } from "react-intersection-observer";

export const useTable = <T extends { id: string }>({
  initialItems,
  onLoadMore,
  onSearch,
}: {
  initialItems: T[];
  onLoadMore?: () => Promise<T[]>;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  onSearch?: (query: string) => void;
}) => {
  const searchParams = useSearchParams();
  // Use generic type T for items
  const [items, setItems] = React.useState<T[]>(initialItems);
  const [sortColumn, setSortColumn] = React.useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [loading, setLoading] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(
    new Set()
  );
  const [showFilters, setShowFilters] = React.useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const { ref, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    if (inView && !loading && onLoadMore) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, loading, onLoadMore]);

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const loadMore = async () => {
    if (!onLoadMore) return;
    setLoading(true);
    try {
      const newItems = await onLoadMore();
      setItems((prev) => [...prev, ...newItems]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (column: keyof T) => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(direction);
    // Create a new URLSearchParams instance and add sort params
    const params = new URLSearchParams(
      searchParams as unknown as Record<string, string>
    );

    params.set("sort", column as string);
    params.set("sortOrder", direction);

    filterProduct(new FormData(), params);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((item) => item.id)));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const allChecked = selectedItems.size === items.length;

  return {
    items,
    toggleSelectItem,
    toggleSelectAll,
    handleSearch,
    handleSort,
    isMobile,
    ref,
    showFilters,
    setShowFilters,
    selectedItems,
    sortDirection,
    allChecked,
    sortColumn,
    loading,
  };
};
