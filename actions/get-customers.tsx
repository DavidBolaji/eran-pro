"use server";

import db from "@/db/db";
import {
  Address,
  Image,
  Order,
  Prisma,
  Product,
  ProductOrder,
  User,
} from "@prisma/client";
import { redirect } from "next/navigation";

export type CustomerProduct = (Pick<Product, "id" | "price" | "name"> & { images: Image[] } & {
  ProductOrder: Pick<ProductOrder, "weight" | "orderId">[];
})

export type CustomerOrder = (Pick<
  Order,
  "id" | "price" | "createdAt" | "paymentType" | "status" | "orderId"
> & { address: Address | null } & {
  products: CustomerProduct[];
})

export interface IOrder {
  orders: CustomerOrder[];
}

export type IUser = Omit<
  User,
  "password" | "createdAt" | "updatedAt" | "status"
> & IOrder & { orderAddress: Address[] };

export type ICustomer = {
  customer: IUser | null;
  totalOrders: number;
  totalAmountSpent: number;
  totalItems: number
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
    // Filter users by orders containing products in specified categories (if provided)
    ...(categories?.length && {
      orders: {
        some: {
          products: {
            some: {
              category: {
                name: { in: categories },
              },
            },
          },
        },
      },
    }),
  
    // Filter users by orders created within the date range (if provided)
    ...(startDate || endDate
      ? {
          orders: {
            some: {
              createdAt:
                startDate && endDate
                  ? { gte: startDate, lte: endDate }
                  : startDate
                  ? { gte: startDate }
                  : { lte: endDate },
            },
          },
        }
      : {}),
  
    // Add search query filter across multiple fields (if provided)
    ...(searchQuery && {
      OR: [
        { fname: { contains: searchQuery } },
        { lname: { contains: searchQuery } },
        { email: { contains: searchQuery } },
        { phone: { contains: searchQuery } },
      ],
    }),
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
        pic: true,
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
      orderBy: sort === "lastOrderDate" ? undefined : orderBy,
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
    console.error("Error fetching customers:", (error as Error).message);
    return { customers: [], totalPages: 0 };
  }
};


export const filterCustomer = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);

  // Extract form data
  const prodFilter = formData.getAll("Categories[]");
  const page = formData.get("page") as string;
  const sort = (formData.get("sort") as string) || params.get("sort") || "fname";
  const sortOrder =
    (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";

  const dateFrom = formData.get("dateFrom") as string;
  const dateTo = formData.get("dateTo") as string;

  const hasSelectedFilters = prodFilter.length > 0;

  // Handle date range filters
  if (dateFrom) {
    params.set("dateFrom", dateFrom);
  } else {
    params.delete("dateFrom");
  }

  if (dateTo) {
    params.set("dateTo", dateTo);
  } else {
    params.delete("dateTo");
  }

  // Handle category filters
  if (hasSelectedFilters) {
    params.delete("category"); // Remove existing category filters
    prodFilter.forEach((filter) => {
      params.append("category", filter as string);
    });
    params.set("page", "1"); // Reset page to 1 when filters change
  } else {
    params.delete("category"); // Remove all category filters
  }

  // Handle pagination and sorting
  if (page) {
    params.set("page", page);
  } else {
    params.delete("page");
  }

  if (sort) {
    params.set("sort", sort);
  } else {
    params.delete("sort");
  }

  if (sortOrder) {
    params.set("sortOrder", sortOrder);
  } else {
    params.delete("sortOrder");
  }

  // Check if there are any parameters left
  const newQuery = params.toString();
  if (newQuery) {
    const redirectPath = path
      ? `${path}?${newQuery}`
      : `/dashboard/customers?${newQuery}`;
    redirect(redirectPath);
  } else {
    // Redirect to the base path if no parameters exist
    const redirectPath = path || "/dashboard/customers";
    redirect(redirectPath);
  }
};



export const filterCustomerOrder = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  // Extract base path and query string from the provided path
  const [basePath, existingQueryString] = path?.split("?") || ["/dashboard/customers", ""];
  const params = new URLSearchParams(existingQueryString || currentParams.toString());

  // Extract filters from the formData
  const paymentFilters = formData.getAll("Payment[]").filter(item => typeof item === "string") as string[];
  const statusFilters = formData.getAll("Status[]").filter(item => typeof item === "string") as string[];

  const page = formData.get("page") as string || params.get("page") || "1"; // Default to page 1
  const sort = formData.get("sort") as string || params.get("sort") || "name"; // Default to "name"
  const sortOrder = formData.get("sortOrder") as string || params.get("sortOrder") || "asc";

  // Handle payment filters
  params.delete("payment");
  paymentFilters.forEach((payment) => params.append("payment", payment));

  // Handle status filters
  params.delete("status");
  statusFilters.forEach((status) => params.append("status", status));

  // Handle page parameter
  if (paymentFilters.length === 0 && statusFilters.length === 0) {
    params.delete("page"); // Remove page if no filters are applied
  } else {
    params.set("page", page);
  }

  // Set sorting fields in the URL parameters
  params.set("sort", sort);
  params.set("sortOrder", sortOrder);

  // Generate the final query string
  const queryString = params.toString();

  // Redirect to the new URL with updated parameters
  redirect(queryString ? `${basePath}?${queryString}` : basePath);
};


export const resetProduct = () => {
  redirect(`/dashboard/products`);
};

export const getDashboardCustomer = async (
  id: string,
  sort: string = "createdAt",
  sortOrder: "asc" | "desc" = "asc",
  filters: { category?: string[]; status?: string[] } = {}
): Promise<ICustomer> => {
  const { category = [], status = [] } = filters;

  console.log('[CATEGORY]', category)
  console.log('[STATUS]', status)

  // Build Prisma query filters for orders
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const orderFilters: any = {};

  if (category.length > 0) {
    orderFilters.paymentType = { in: category };
  }

  if (status.length > 0) {
    orderFilters.status = { in: status.map(el => el.toUpperCase()) };
  }

  // Fetch the customer with applied filters and sorting
  const totalItems = await db.order.count({ where: orderFilters });
  const customer = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fname: true,
      lname: true,
      email: true,
      phone: true,
      pic: true,
      orders: {
        where: orderFilters,
        orderBy: sort === "name" ? undefined : { [sort]: sortOrder },
        select: {
          id: true,
          price: true,
          products: {
            select: {
              id: true,
              images: true,
              name: true,
              price: true,
              ProductOrder: {
                select: {
                  orderId: true,
                  weight: true,
                },
              },
            },
          },
          address: true,
          createdAt: true,
          paymentType: true,
          status: true,
          orderId: true,
        },
      },
      orderAddress: true,
    },
  });

  if (!customer) {
    return {
      totalOrders: 0,
      totalAmountSpent: 0,
      customer: null,
      totalItems:0
    };
  }

  // If sorting by name, sort programmatically by the name of the first product
  if (sort === "name") {
    customer.orders = customer.orders.sort((a, b) => {
      const nameA = a.products[0]?.name?.toLowerCase() || "";
      const nameB = b.products[0]?.name?.toLowerCase() || "";

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
  }

  const totalAmountSpent = customer.orders.reduce((acc, cur) => acc + cur.price, 0);

  return {
    totalOrders: customer.orders.length,
    totalAmountSpent,
    customer,
    totalItems
  };
};



export const selectCustomer = (formData: FormData) => {
  const cusFilter = formData.get("Customer");
  const nameFilter = formData.getAll("Tab");

  console.log(cusFilter?.toString());

  const params = new URLSearchParams();

  if (nameFilter) {
    params.append("tab", nameFilter.join(","));
  }

  if (params.toString()) {
    redirect(
      `/dashboard/customers/${cusFilter?.toString()}?${params.toString()}`
    );
  } else {
    console.log("No filters applied");
  }
};

export const selectUser = (formData: FormData) => {
  const cusFilter = formData.get("User");
  const nameFilter = formData.getAll("Tab");

  console.log(cusFilter?.toString());

  const params = new URLSearchParams();

  if (nameFilter) {
    params.append("tab", nameFilter.join(","));
  }

  if (params.toString()) {
    redirect(`/orders/${cusFilter?.toString()}?${params.toString()}`);
  } else {
    console.log("No filters applied");
  }
};
