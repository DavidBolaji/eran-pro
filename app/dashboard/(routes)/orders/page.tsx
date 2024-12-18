import React from "react";
import { RenderDashboardcards } from "../../components/render-dashboard-cards";
import { getDashboardOrder, getOrdersStat } from "@/actions/get-orders";
import { renderOrderCard } from "@/utils/data";
import OrderTable from "@/components/table/orders-table/orders-table";
import { getCategories } from "@/actions/get-categories";
import { Order } from "@/components/table/orders-table/types";

export const revalidate = 0;

interface OrdersPageSearchParams {
  [key: string]: string;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: OrdersPageSearchParams;
}) {
  const orderStat = await getOrdersStat();
  const data = renderOrderCard(orderStat);
  const categories = Array.isArray(searchParams.category)
    ? searchParams.category
    : searchParams.category
    ? [searchParams.category]
    : [];
  const status = Array.isArray(searchParams.status)
    ? searchParams.status
    : searchParams.status
    ? [searchParams.status]
    : [];
  // const categories = searchParams.category?.split(",") || [];
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 7;
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startDate = searchParams.dateFrom || "";
  const endDate = searchParams.dateTo || "";
  const searchQuery = searchParams.searchQuery || "";

  const req = getDashboardOrder({
    categories: categories.map((el) => el.toLowerCase()),
    status: status.map((el) => el.toUpperCase()),
    page,
    limit,
    sort,
    sortOrder,
    startDate,
    endDate,
    searchQuery,
  });

  const req2 = getCategories();

  const [order, categoryList] = await Promise.all([req, req2]);

  return (
    <div className="p-4">
      <RenderDashboardcards data={data} />
      <div className="mt-10" />
      <OrderTable
        initialProducts={(order?.order as unknown as Order[]) ?? []}
        totalPages={order?.totalPages}
        page={page}
        itemsPerPage={limit}
        categories={categoryList}
      />
    </div>
  );
}
