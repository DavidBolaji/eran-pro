"use server";
import db from "@/db/db";
import { Prisma } from "@prisma/client";
import { startOfYear, endOfYear, format } from "date-fns";
import { redirect } from "next/navigation";

interface GetOrdersParams {
  categories?: string[];
  page?: number;
  limit?: number;
  sort?: string; // default sorting field
  sortOrder?: string; // ascending or descending order
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export async function getMonthlyRevenue() {
  // Get the start and end of the current year
  const startOfCurrentYear = startOfYear(new Date());
  const endOfCurrentYear = endOfYear(new Date());

  // Aggregate revenue by month
  const rawData = await db.order.groupBy({
    by: ["createdAt"],
    _sum: {
      price: true,
    },
    where: {
      createdAt: {
        gte: startOfCurrentYear,
        lte: endOfCurrentYear,
      },
    },
  });

  // Initialize an array with months and zero revenue
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: format(new Date(2024, i, 1), "MMM"), // Adjust year dynamically if needed
    revenue: 0,
  }));

  // Map raw data to the corresponding month
  rawData.forEach(({ createdAt, _sum }) => {
    const monthIndex = new Date(createdAt).getMonth();
    if (_sum.price) {
      months[monthIndex].revenue += _sum.price;
    }
  });

  return months;
}

export const filterPendingOrders = (
  formData: FormData,
  currentParams: URLSearchParams
) => {
  const params = new URLSearchParams(currentParams);
  console.log("[PAZAMS]", params);

  const sort =
    (formData.get("sort") as string) || params.get("sort") || "createdAt"; // Default to "name"
  const sortOrder =
    (formData.get("sortOrder") as string) || params.get("sortOrder") || "desc";

  // Set the sorting fields in the URL parameters
  if (sort) params.set("sort", sort);
  if (sortOrder) params.set("sortOrder", sortOrder);

  if (params.toString()) {
    redirect(`/dashboard?${params.toString()}`);
  } else {
    console.log("No filters applied");
  }
};

export const getOrdersStat = async () => {
  const orders = await db.order.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const result = {
    totalPending: 0,
    totalCompleted: 0,
    totalCanceled: 0,
  };

  // Map the results to the output structure
  orders.forEach((order) => {
    if (order.status === "PENDING") result.totalPending = order._count.status;
    if (order.status === "DELIVERED")
      result.totalCompleted = order._count.status;
    if (order.status === "CANCELED") result.totalCanceled = order._count.status;
  });

  return result;
};

export const filterOrder = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);

  // Extract filter values from the form data
  const categories = formData
    .getAll("Categories[]")
    .filter((item) => typeof item === "string") as string[];
  const page = (formData.get("page") as string) || params.get("page") || "1"; // Default to page 1
  const sort = (formData.get("sort") as string) || params.get("sort") || "name"; // Default to "name"
  const sortOrder =
    (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";
  const startDate = formData.get("dateFrom") as string;
  const endDate = formData.get("dateTo") as string;
  const searchQuery = formData.get("searchQuery") as string;

  // Handle categories - Add or remove based on selection
  params.delete("category");
  if (categories.length > 0) {
    categories.forEach((category) => params.append("category", category));
    params.set("page", "1"); // Reset to page 1 if categories change
  }

  // Handle page - Maintain page if unchanged, reset to 1 otherwise
  if (
    categories.length === 0 &&
    startDate === undefined &&
    endDate === undefined &&
    !searchQuery
  ) {
    params.delete("page"); // Remove if no filters are applied
  } else {
    params.set("page", page);
  }

  // Set sorting fields in the URL parameters
  params.set("sort", sort);
  params.set("sortOrder", sortOrder);

  // Handle date range filters
  if (startDate) {
    params.set("dateFrom", startDate);
  } else {
    params.delete("dateFrom");
  }
  if (endDate) {
    params.set("dateTo", endDate);
  } else {
    params.delete("dateTo");
  }

  // Handle search query
  if (searchQuery) {
    params.set("searchQuery", searchQuery);
  } else {
    params.delete("searchQuery");
  }

  // Generate the final query string
  const queryString = params.toString();
  const destinationPath = path ? path : "/dashboard/orders";

  // Redirect to the new URL with updated parameters
  redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};

export const getDashboardOrder = async ({
  categories,
  page = 1,
  limit = 7,
  sort = "createdAt", // default sorting field
  sortOrder = "asc", // ascending or descending order
  startDate,
  endDate,
  searchQuery,
}: GetOrdersParams) => {
  const skip = (page - 1) * limit;

  // Build the `where` clause conditionally
  console.log("[START_DATE]", startDate);
  console.log("[END_DATE]", endDate);
  const whereClause: Prisma.OrderWhereInput = {
    // Filter users by orders containing products in specified categories (if provided)
    ...(categories?.length && {
      products: {
        some: {
          category: {
            name: {
              in: categories,
            },
          },
        },
      },
    }),

    // Filter users by orders created within the date range (if provided)
    ...(startDate || endDate
      ? {
          createdAt:
            startDate && endDate
              ? { gte: startDate, lte: endDate }
              : startDate
              ? { gte: startDate }
              : { lte: endDate },
        }
      : {}),

    // Add search query filter across multiple fields (if provided)
    ...(searchQuery && {
      OR: [
        { orderId: { contains: searchQuery } },
        { User: { fname: { contains: searchQuery } } },
      ],
    }),
  };

  const orderBy: Prisma.OrderOrderByWithRelationInput =
    sort === "fname"
      ? { User: { fname: sortOrder as Prisma.SortOrder } }
      : sort === "phone"
      ? { User: { phone: sortOrder as Prisma.SortOrder } }
      : { [sort]: sortOrder as Prisma.SortOrder };

  try {
    const totalItems = await db.order.count({ where: whereClause });
    let orders = await db.order.findMany({
      where: whereClause,
      select: {
        id: true,
        orderId: true,
        products: {
          select: {
            id: true,
            name: true,
            images: true,
          },
        },
        User: {
          select: {
            fname: true,
            lname: true,
            phone: true,
          },
        },
        createdAt: true,
        status: true,
      },
      skip,
      take: limit,
      orderBy: sort === "name" ? undefined : orderBy,
    });
    const totalPages = Math.ceil(totalItems / limit);

    if (sort === "name") {
      orders = orders.map((order) => ({
        ...order, // Keep other order properties intact
        products: order.products.sort((a, b) => {
          const nameA = a.name?.toLowerCase() || "";
          const nameB = b.name?.toLowerCase() || "";

          return sortOrder === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        }),
      }));
    }

    return { order: orders ?? [], totalPages };
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const getSingleOrder = async (id: string) => {
  try {
    const order = await db.order.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        orderId: true,
        products: {
          select: {
            id: true,
            name: true,
            images: true,
            unit: true,
            price: true,
            ProductOrder: {
              select: {
                orderId: true,
                productId: true,
                weight: true,
              },
            },
          },
        },
        price: true,
        address: true,
        paymentType: true,
        User: {
          select: {
            fname: true,
            lname: true,
            phone: true,
          },
        },
        createdAt: true,
        status: true,
      },
    });
    return order
  } catch (error) {
    console.log((error as Error).message);
  }
};