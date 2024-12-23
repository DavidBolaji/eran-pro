// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { dashboardCard } from "@/utils/data";

import db from "@/db/db";
import { endOfDay, startOfYear } from "date-fns";
import { Prisma } from "@prisma/client";
import { RenderDashboardcards } from "../../components/render-dashboard-cards";
import { RenderRevenueProduct } from "../../components/render-revenue-product";
import { RenderProductOrder } from "../../components/render-product-order";

interface DashboardSearchParams {
  [key: string]: string;
}
export const revalidate = 0;

export default async function Dashboard({
  searchParams,
}: {
  searchParams: DashboardSearchParams;
}) {
  const sort = searchParams.sort || "createdAt";
  const sortOrder = searchParams.sortOrder || "asc";
  const startOfCurrentYear = startOfYear(new Date());
  const todayEndOfDay = endOfDay(new Date());

  const total = db.order.aggregate({
    _sum: {
      price: true,
    },
    where: {
      createdAt: {
        gte: startOfCurrentYear,
        lte: todayEndOfDay,
      },
    },
  });
  const pending = db.order.count({
    where: {
      status: "PENDING",
    },
  });
  const completed = db.order.count({
    where: {
      status: "DELIVERED",
    },
  });

  const [amount, pendingOrders, completedOrders] = await Promise.all([
    total,
    pending,
    completed,
  ]);

  const data = {
    amount: amount?._sum?.price ?? 0,
    pendingOrders,
    completedOrders,
  };

  return (
    <div className="bg-grey-200 p-4">
      <RenderDashboardcards data={dashboardCard(data)} />
      <RenderRevenueProduct />
      <RenderProductOrder sort={sort} sortOrder={sortOrder as unknown as Prisma.SortOrder} />
    </div>
  );
}
