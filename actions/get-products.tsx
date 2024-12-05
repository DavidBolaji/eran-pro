"use server";

import db from "@/db/db";
import { Category, Image, Prisma, Product, Promotion } from "@prisma/client";
import { redirect } from "next/navigation";
import { productQuery } from "./data";

export type IProduct = Omit<
  Product,
  "order" | "updatedAt" | "createdAt" | "categoryId"
> & {
  promotion: Pick<Promotion, "name" | "discount" | "startDate" | "endDate">[]; // Note: promotion is an array
  category: Pick<Category, "name" | "id">;
  images: Pick<Image, "url">[];
};

export type ICreateProduct = {
  name: string;
  description: string;
  price: number;
  qty: number;
  stock: boolean;
  unit: string;
  images: string[];
  categoryId: string;
};

interface GetProductsParams {
  categories?: string[];
  page?: number;
  limit?: number;
  sort?: string; // default sorting field
  sortOrder?: string; // ascending or descending order
}

export const getProducts = async (categoryId: string): Promise<IProduct[]> => {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId: categoryId === "1" || !categoryId ? undefined : categoryId,
      },
      select: productQuery,
    });

    // Fetch promotions for each product
    const productsWithPromotions = await Promise.all(
      products.map(async (product) => {
        // Fetch promotion by category
        const categoryPromotion = await db.promotion.findFirst({
          where: {
            categoryId: product.category.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        // Fetch promotion by product ID
        const productPromotions = await db.promotion.findMany({
          where: {
            productId: product.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        // Combine promotions and sort by createdAt descending
        const allPromotions = [
          ...(categoryPromotion ? [categoryPromotion] : []),
          ...productPromotions,
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return {
          ...product,
          promotion: allPromotions,
        };
      })
    );

    console.log(JSON.stringify(productsWithPromotions, null, 2));
    return productsWithPromotions;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const getProductsByQuery = async (
  search: string
): Promise<IProduct[]> => {
  try {
    const products = await db.product.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      select: productQuery,
    });
    return products;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getDashboardProduct = async ({
  categories,
  page = 1,
  limit = 10,
  sort = "createdAt", // default sorting field
  sortOrder = "asc", // ascending or descending order
}: GetProductsParams) => {
  const skip = (page - 1) * limit;
  // Build the `where` clause conditionally
  const whereClause: Prisma.ProductWhereInput = {};

  if (
    categories &&
    categories.length > 0 &&
    categories[0].trim().length !== 0
  ) {
    whereClause.category = {
      name: {
        in: categories,
      },
    };
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "category"
      ? { category: { name: sortOrder as Prisma.SortOrder } }
      : { [sort]: sortOrder as Prisma.SortOrder };

  try {
    const totalItems = await db.product.count({ where: whereClause });
    const products = await db.product.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        price: true,
        stock: true,
        qty: true,
        promotion: {
          select: {
            code: true,
            discount: true,
          },
        },
        status: true,
        img: true,
        images: {
          select: {
            url: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy,
    });
    const totalPages = Math.ceil(totalItems / limit);

    return { products: products ?? [], totalPages };
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const filterProduct = (
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
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
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
    params.set("startDate", startDate);
  } else {
    params.delete("startDate");
  }
  if (endDate) {
    params.set("endDate", endDate);
  } else {
    params.delete("endDate");
  }

  // Handle search query
  if (searchQuery) {
    params.set("searchQuery", searchQuery);
  } else {
    params.delete("searchQuery");
  }

  // Generate the final query string
  const queryString = params.toString();
  const destinationPath = path ? path : "/dashboard/products";

  // Redirect to the new URL with updated parameters
  redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};

export const resetProduct = () => {
  redirect(`/dashboard/products`);
};
