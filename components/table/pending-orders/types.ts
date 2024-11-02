export interface PendingOrders {
    id: string;
    name: string; 
    user: {
      name: string;
      phone: string;
    };
    createdAt: string;
  }

  export interface PendingOrdersTableProps {
    initialProducts?: PendingOrders[]
    onLoadMore?: () => Promise<PendingOrders[]>
    onSort?: (column: keyof PendingOrders, direction: 'asc' | 'desc') => void
    onSearch?: (query: string) => void
    onFilter?: (filters: any) => void
  }