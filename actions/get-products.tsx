"use server";

import db from "@/db/db";
import { Category, Image, Prisma, Product, Promotion } from "@prisma/client";
import { redirect } from "next/navigation";
import { productQuery } from "./data";

export type IProduct = Omit<
  Product,
  "order" | "updatedAt" | "createdAt" | "categoryId"
> & {
  promotion: Pick<Promotion, "name" | "discount">[]; // Note: promotion is an array
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
  const categories = formData.getAll("categories[]").filter(item => typeof item === 'string') as string[];
  const page = (formData.get("page") as string) || "1"; // Default to page 1
  const sort = (formData.get("sort") as string) || params.get("sort") || "name"; // Default to "name"
  const sortOrder = (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const searchQuery = formData.get("searchQuery") as string;

  // Handle categories, resetting page to 1 if filters change
  const hasSelectedCategories = categories.length > 0;
  const currentCategoryFilters = params.getAll("category");

  if (hasSelectedCategories) {
    if (JSON.stringify(Array.from(categories)) !== JSON.stringify(Array.from(currentCategoryFilters))) {
      params.delete("category");
      categories.forEach((category) => params.append("category", category));
      params.set("page", "1");
    } else {
      params.set("page", page);
    }
  } else if (page) {
    params.set("page", page);
  }

  // Set sorting fields in the URL parameters
  params.set("sort", sort);
  params.set("sortOrder", sortOrder);

  // Set date range filters if provided
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  // Set search query if provided
  if (searchQuery) params.set("searchQuery", searchQuery);

  // Redirect based on the generated URL parameters
  const queryString = params.toString();
  if (queryString) {
    const destinationPath = path ? path : "/dashboard/customers";
    redirect(`${destinationPath}?${queryString}`);
  } else {
    console.log("No filters applied");
  }
};



export const resetProduct = () => {
  redirect(`/dashboard/products`);
};
