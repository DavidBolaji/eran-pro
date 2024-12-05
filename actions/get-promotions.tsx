import db from "@/db/db";
import { Prisma } from "@prisma/client";

interface GetPromotionsParams {
    categories?: string[];
    promotionStatus?: string;
    page?: number;
    limit?: number;
    sort?: string; // default sorting field
    sortOrder?: string; // ascending or descending order
    startDate?: string;
    endDate?: string;
    searchQuery?: string;
  }

  export const getPromotionsStat = async () => {
    // Get the total count of promotions
    const all = db.promotion.count({});
  
    // Get the count of active promotions
    const active = db.promotion.count({
      where: {
        startDate: {
          lte: new Date(), // Active if today's date is greater than or equal to startDate
        },
        endDate: {
          gte: new Date(), // Active if today's date is less than or equal to endDate
        },
      },
    });
  
    // Get the count of cancelled promotions
    const cancelled = db.promotion.count({
      where: {
        endDate: {
          lt: new Date(), // Cancelled if today's date is after endDate
        },
      },
    });
  
    // Await all queries simultaneously
    const [activePromotion, allPromotion, cancelledPromotion] = await Promise.all([
      active,
      all,
      cancelled,
    ]);
  
    // Return the statistics
    return {
      activePromotion,
      allPromotion,
      cancelledPromotion,
    };
  };
  


export const getDashboardPromotion = async ({
    categories,
    promotionStatus,
    page = 1,
    limit = 7,
    sort = "createdAt", // default sorting field
    sortOrder = "asc", // ascending or descending order
    startDate,
    endDate,
    searchQuery,
  }: GetPromotionsParams) => {
    const skip = (page - 1) * limit;
  
    // Build the `where` clause conditionally

    const whereClause: Prisma.PromotionWhereInput = {
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
      // Filter users by orders containing products in specified categories (if provided)
      ...(promotionStatus?.length && {
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
          { name: { contains: searchQuery } },
          { code: { contains: searchQuery } },
        ],
      }),
    };
  
    const orderBy: Prisma.PromotionOrderByWithRelationInput =
      sort === "name"
        ?  { name: sortOrder as Prisma.SortOrder } 
        : sort === "type"
        ?  { promotionType : sortOrder as Prisma.SortOrder } 
        : sort === "endDate"
        ?  { endDate : sortOrder as Prisma.SortOrder } 
        : sort === "startDate"
        ?  { startDate : sortOrder as Prisma.SortOrder } 
        : { [sort]: sortOrder as Prisma.SortOrder };
  
    try {
      const totalItems = await db.promotion.count({ where: whereClause });
      const promotions = await db.promotion.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          promotionType: true,
          code: true,
          startDate: true,
          endDate: true,
        },
        skip,
        take: limit,
        orderBy: sort === "name" ? undefined : orderBy,
      });
      const totalPages = Math.ceil(totalItems / limit);
  
     
  
      return { promotions: promotions ?? [], totalPages };
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  export const getSinglePromotion = async (id: string) => {
    try {
      // Fetch the promotion
      const promotion = await db.promotion.findUnique({
        where: { id },
      });
  
      if (!promotion) {
        throw new Error(`Promotion with ID "${id}" not found.`);
      }
  
      // Fetch products or categories linked to the promotion
      const promotionProducts = await db.promotion.findMany({
        where: { code: promotion.code },
        select: { productId: true, categoryId: true },
      });
  
      const productIds = promotionProducts
        .filter((prod) => prod.productId)
        .map((prod) => prod.productId!);
  
      const categoryIds = promotionProducts
        .filter((prod) => prod.categoryId)
        .map((prod) => prod.categoryId!);
  
      // Fetch related products and categories in bulk
      const allProducts = productIds.length > 0
        ? await db.product.findMany({
            where: { id: { in: productIds } },
            include: {
              images: true
            }
          })
        : [];
  
      const allCategories = categoryIds.length > 0
        ? await db.category.findMany({
            where: { id: { in: categoryIds } },
          })
        : [];
  
      // Attach products and categories to the promotion object
      return {
        ...promotion,
        product: allProducts.length > 0 ? allProducts : null,
        category: allCategories.length > 0 ? allCategories : null,
      };
    } catch (error) {
      console.error(`Error fetching promotion: ${(error as Error).message}`);
      throw new Error(`Failed to fetch promotion: ${(error as Error).message}`);
    }
  };