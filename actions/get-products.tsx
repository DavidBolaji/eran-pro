"use server";

import db from "@/db/db";
import { Category, Image, Prisma, Product, Promotion } from "@prisma/client";
import { redirect } from "next/navigation";
import { productQuery } from "./data";

export type IProduct = Omit<
  Product,
  "order" | "updatedAt" | "createdAt" | "categoryId"
> & {
  promotion: Pick<Promotion, "name" | "discount" | "startDate" | "endDate" | "id">[]; // Note: promotion is an array
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
  searchQuery?: string; // ascending or descending order
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
    return productsWithPromotions;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const  getProduct = async (productId: string): Promise<IProduct | null> => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        img: true,
        price: true,
        qty: true,
        stock: true,
        unit: true,
        status: true,
        images: {
          select: {
            url: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            Promotion: {
              where: {
                promotionType: "CATEGORY",
              },
              select: {
                id: true,
                name: true,
                code: true,
                discount: true
              },
            }
          },
        },
        promotion: {
          select: {
            id: true,
            name: true,
            discount: true,
            startDate: true,
            endDate: true
          },
        },
      },
    });

    const categoryPromotions = product?.category?.Promotion || [];
    const productPromotions = product?.promotion || [];
    const allPromotions = [...categoryPromotions, ...productPromotions];

    const newProduct = {
      ...product,
      promotion: allPromotions
    } as unknown as IProduct


    return newProduct ?? null;
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
  searchQuery = "", // ascending or descending order
}: GetProductsParams) => {
  const skip = (page - 1) * limit;
  // Build the `where` clause conditionally
  const whereClause: Prisma.ProductWhereInput = {};

  if (categories &&
    categories.length > 0 && searchQuery &&
    searchQuery.length > 0) {

     whereClause.AND = [
    {
      category: {
        name: {
          in: categories,
        },
      },
    },
    {
      name: {
        contains: searchQuery,
      },
    },
  ];

  } else if (
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
  else if (
    searchQuery &&
    searchQuery.length > 0
  ) {
    whereClause.name = {
      contains: searchQuery,
    };
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    sort === "category"
      ? { category: { name: sortOrder as Prisma.SortOrder } }
      : sort === "promotion" ?{ promotion: { _count: sortOrder as Prisma.SortOrder } }
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
            Promotion: {
              where: {
                promotionType: "CATEGORY",
              },
              select: {
                code: true,
                discount: true
              },
            }
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


    const finalProducts = products.map(product => {
      const categoryPromotions = product.category?.Promotion || [];
      const productPromotions = product.promotion || [];
      const allPromotions = [...categoryPromotions, ...productPromotions];

      return {
        ...product,
        promotion: allPromotions,
      };
    });

    return { products: finalProducts ?? [], totalPages };
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
  const searchQuery = params.get("searchQuery") as string;
  const cat = params.getAll("category") as  unknown as (string | string[]);
 
 // Handle categories - Add or remove based on selection
 params.delete("category");
  if (categories.length > 0) {
    categories.forEach((category) => params.append("category", category));
    params.set("page", "1"); // Reset to page 1 if categories change
  } else {
    if(cat) {
      (cat as string[]).forEach((el) => 
        params.append("category", el as string)
      )
    }
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

export const loadMoreProducts = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  const skip = (page - 1) * limit;

  try {
    // Count total items for determining `hasMore`
    const totalItems = await db.product.count();

    // Fetch the products for the given page and limit
    const products = await db.product.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" }, // Sort by creation date in descending order
      select: {
        id: true,
        name: true,
        category: {
          select: {
            id: true,
            name: true,
            Promotion: {
              where: { promotionType: "CATEGORY" },
              select: {
                code: true,
                discount: true,
              },
            },
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
    });

    // Determine if there are more items to load
    const hasMore = skip + products.length < totalItems;

    // Normalize promotions to include both category and product-level promotions
    const finalProducts = products.map((product) => {
      const categoryPromotions = product.category?.Promotion || [];
      const productPromotions = product.promotion || [];
      const allPromotions = [...categoryPromotions, ...productPromotions];

      return {
        ...product,
        promotion: allPromotions,
      };
    });

    return { items: finalProducts, hasMore };
  } catch (error) {
    console.error("Error loading more products:", error);
    return { items: [], hasMore: false };
  }
};


export const resetProduct = () => {
  redirect(`/dashboard/products`);
};

export const deleteProducts = async (data: Set<string>) => {
  await db.product.deleteMany({
    where: {
      id: {
        in: Array.from(data)
      }
    }
  })
  await db.image.deleteMany({
    where: {
      productId: {
        in: Array.from(data)
      }
    }
  })
}
