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

interface GetProductsParams {
  categories?: string[];
  page?: number;
  limit?: number;
  sort?: string, // default sorting field
  sortOrder?: string, // ascending or descending order
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

export const seedProductDb = async () => {
  await db.product.createMany({
    data: [
      {
        name: "Chicken Breast",
        categoryId: "a4822405-3c08-4e44-b4dc-6cfff9d03ea6",
        description: "Chicken Breast",
        img: "https://avatar.iran.liara.run/public/30",
        stock: true,
        status: "ACTIVE",
        price: 7500,
      },
      {
        name: "Briskets",
        categoryId: "694d65ff-fd3d-495e-abe9-7a875b4754fc",
        description: "Briskets cow",
        img: "https://avatar.iran.liara.run/public/30",
        stock: true,
        status: "ACTIVE",
        price: 7500,
      },
      {
        name: "Chicken Wings",
        categoryId: "a4822405-3c08-4e44-b4dc-6cfff9d03ea6",
        description: "Chicken Wings description",
        img: "https://avatar.iran.liara.run/public/30",
        stock: true,
        status: "ACTIVE",
        price: 7500,
      },
      {
        name: "Goat head",
        categoryId: "70f979d6-fea6-4ed6-8d1d-dd1fd0144892",
        description: "Goat description",
        img: "https://avatar.iran.liara.run/public/30",
        stock: true,
        status: "ACTIVE",
        price: 7500,
      },
    ],
  });
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

  const orderBy: Prisma.ProductOrderByWithRelationInput = sort === "category"
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

export const filterProduct = (formData: FormData, currentParams: URLSearchParams) => {
  const params = new URLSearchParams(currentParams);
  const prodFilter = formData.getAll("Categories[]");
  const page = formData.get("page") as string;  // Cast to string if necessary
  const sort = (formData.get("sort") as string) || params.get("sort") || "name";  // Default to "name"
  const sortOrder = (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";

  // Handle page and category filters as before
  const hasSelectedFilters = prodFilter.length > 0;
  const currentCategoryFilters = params.getAll("category");

  if (!hasSelectedFilters && page) {
    params.set("page", page);
  }

  if (hasSelectedFilters) {
    if (JSON.stringify(Array.from(prodFilter)) !== JSON.stringify(Array.from(currentCategoryFilters))) {
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
    redirect(`/dashboard/products?${params.toString()}`);
  } else {
    console.log("No filters applied");
  }
};



export const resetProduct = (
) => {
  redirect(`/dashboard/products`);
};
