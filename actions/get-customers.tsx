"use server";

import db from "@/db/db";
import { Category, Image, Prisma, Product, Promotion } from "@prisma/client";
import { redirect } from "next/navigation";

export type ICustomer = Omit<
  Product,
  "order" | "updatedAt" | "createdAt" | "categoryId"
> & {
  promotion: Pick<Promotion, "name" | "discount">[]; // Note: promotion is an array
  category: Pick<Category, "name" | "id">;
  images: Pick<Image, "url">[];
};


interface GetCustomersParams {
  categories?: string[];
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export const getDashboardCustomers = async ({
  categories,
  page = 1,
  limit = 10,
  sort = "createdAt",
  sortOrder = "asc",
  startDate,
  endDate,
  searchQuery,
}: GetCustomersParams) => {
  const skip = (page - 1) * limit;


  const whereClause: Prisma.UserWhereInput = {
    orders: {
      some: {
        products: {
          some: {
            category: {
              name: {
                in: categories?.length ? categories : undefined,
              },
            },
          },
        },
        createdAt:
          startDate && endDate
            ? { gte: startDate, lte: endDate }
            : startDate
            ? { gte: startDate }
            : endDate
            ? { lte: endDate }
            : undefined,
      },
    },
    OR: searchQuery
      ? [
          { fname: { contains: searchQuery } },
          { lname: { contains: searchQuery } },
          { email: { contains: searchQuery } },
          { phone: { contains: searchQuery } },
        ]
      : undefined,
  };

  const orderBy: Prisma.UserOrderByWithRelationInput =
    sort === "totalOrders"
      ? { orders: { _count: sortOrder as Prisma.SortOrder } }
      : { [sort]: sortOrder as Prisma.SortOrder };

  try {
    const totalItems = await db.user.count({ where: whereClause });
    const users = await db.user.findMany({
      where: whereClause,
      select: {
        id: true,
        fname: true,
        lname: true,
        email: true,
        phone: true,
        orders: {
          select: {
            id: true,
            createdAt: true,
          },
        },
        status: true,
      },
      skip,
      take: limit,
      orderBy: sort === "lastOrderDate" ? undefined : orderBy, // Skip Prisma ordering for `lastOrderDate`
    });

    // Calculate total order count and last order date for each user
    const customers = users.map((user) => ({
      ...user,
      totalOrders: user.orders.length,
      lastOrderDate: user.orders.reduce(
        (latest, order) =>
          order.createdAt > latest ? order.createdAt : latest,
        new Date(0)
      ),
    }));

    // Sort by lastOrderDate if specified
    if (sort === "lastOrderDate") {
      customers.sort((a, b) => {
        const dateA = a.lastOrderDate;
        const dateB = b.lastOrderDate;
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });
    }

    const totalPages = Math.ceil(totalItems / limit);
    return { customers: customers ?? [], totalPages };
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const filterCustomer = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);
  const prodFilter = formData.getAll("Categories[]");
  const page = formData.get("page") as string; // Cast to string if necessary
  const sort = (formData.get("sort") as string) || params.get("sort") || "name"; // Default to "name"
  const sortOrder =
    (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";

  // Handle page and category filters as before
  const hasSelectedFilters = prodFilter.length > 0;
  const currentCategoryFilters = params.getAll("category");

  if (!hasSelectedFilters && page) {
    params.set("page", page);
  }

  if (hasSelectedFilters) {
    if (
      JSON.stringify(Array.from(prodFilter)) !==
      JSON.stringify(Array.from(currentCategoryFilters))
    ) {
      params.delete("category");
      params.append("category", prodFilter.join(","));
      params.set("page", "1");
    } else {
      params.set("page", page ? page.toString() : "1");
    }
  }

  // Set the sorting fields in the URL parameters
  if (sort) params.set("sort", sort);
  if (sortOrder) params.set("sortOrder", sortOrder);

  if (params.toString()) {
    if (path) {
      redirect(`${path}?${params.toString()}`);
    } else {
      redirect(`/dashboard/customers?${params.toString()}`);
    }
  } else {
    console.log("No filters applied");
  }
};

export const resetProduct = () => {
  redirect(`/dashboard/products`);
};
