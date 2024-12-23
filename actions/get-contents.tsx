"use server"

import db from "@/db/db";
import { Blog, BlogCategory, BLOGSTATUS, Faq, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

interface GetContentsParams {
  status?: BLOGSTATUS[];
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export const getDashboardContents = async ({
  status,
  page = 1,
  limit = 10,
  sort = "createdAt",
  sortOrder = "asc",
  startDate,
  endDate,
  searchQuery,
}: GetContentsParams) => {
  const skip = (page - 1) * limit;

  console.log(status);
  

  const whereClause: Prisma.BlogWhereInput = {
    AND: [
      // Filter users by orders containing products in specified categories (if provided)
      ...(status?.length ? [{
        status: {
          in: status
        }
      }] : []),

      // Filter users by orders created within the date range (if provided)
      ...(startDate || endDate
        ? [{
          createdAt:
            startDate && endDate
              ? { gte: startDate, lte: endDate }
              : startDate
                ? { gte: startDate }
                : { lte: endDate },
        }]
        : []),

      // Add search query filter across multiple fields (if provided)
      ...(searchQuery ? [{
        OR: [
          { title: { contains: searchQuery } },
        ],
      }] : []),
    ]
  };


  const orderBy: Prisma.BlogOrderByWithRelationInput =
    sort === "category"
      ? { blogCategory : { name: sortOrder as Prisma.SortOrder } }
      : sort === "user" 
      ? { user : { fname: sortOrder as Prisma.SortOrder } }
      : { [sort]: sortOrder as Prisma.SortOrder };

  try {
    const totalItems = await db.blog.count({ where: whereClause });
    const blogs = await db.blog.findMany({
      where: whereClause,
      include: {
        blogCategory: true,
      },
      skip,
      take: limit,
      orderBy: orderBy
    });    

    const totalPages = Math.ceil(totalItems / limit);
    return { blogs: blogs ?? [], totalPages };
  } catch (error) {
    console.error("Error fetching customers:", (error as Error).message);
    return { customers: [], totalPages: 0 };
  }
};

export const getDashboardContentsFaq = async ({
  status,
  page = 1,
  limit = 10,
  sort = "createdAt",
  sortOrder = "asc",
  startDate,
  endDate,
  searchQuery,
}: GetContentsParams) => {
  const skip = (page - 1) * limit;

  const whereClause: Prisma.FaqWhereInput = {
    AND: [
      // Filter users by orders containing products in specified categories (if provided)
      ...(status?.length ? [{
        status: {
          in: status
        }
      }] : []),

      // Filter users by orders created within the date range (if provided)
      ...(startDate || endDate
        ? [{
          createdAt:
            startDate && endDate
              ? { gte: startDate, lte: endDate }
              : startDate
                ? { gte: startDate }
                : { lte: endDate },
        }]
        : []),

      // Add search query filter across multiple fields (if provided)
      ...(searchQuery ? [{
        OR: [
          { question: { contains: searchQuery } },
        ],
      }] : []),
    ]
  };


  const orderBy: Prisma.FaqOrderByWithRelationInput =
     sort === "user" 
      ? { user : { fname: sortOrder as Prisma.SortOrder } }
      : { [sort]: sortOrder as Prisma.SortOrder };

  try {
    const totalItems = await db.faq.count({ where: whereClause });
    const faqs = await db.faq.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: orderBy
    });    

    const totalPages = Math.ceil(totalItems / limit);
    return { faqs: faqs ?? [], totalPages };
  } catch (error) {
    console.error("Error fetching customers:", (error as Error).message);
    return { customers: [], totalPages: 0 };
  }
};

export const filterContent = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);

  // Extract filter values from the form dat
  const cStat = formData
    .getAll("Cstat[]")
    .filter((item) => typeof item === "string") as string[];

  const page = (formData.get("page") as string) || params.get("page") || "1"; // Default to page 1
  const sort = (formData.get("sort") as string) || params.get("sort") || "createdAt"; // Default to "name"
  const sortOrder =
    (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";
  const startDate = formData.get("dateFrom") as string;
  const endDate = formData.get("dateTo") as string;
  const searchQuery = params.get("searchQuery") as string;



  params.delete("pStat");
  if (cStat.length > 0) {
    cStat.forEach((stat) => params.append("pStat", stat));
    params.set("page", "1"); // Reset to page 1 if categories change
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
  const destinationPath = path ? path : "/dashboard/contents";

  // Redirect to the new URL with updated parameters
  redirect(queryString ? `${destinationPath}?${queryString}` : destinationPath);
};

export const filterContentFaq = (
  formData: FormData,
  currentParams: URLSearchParams,
  path?: string
) => {
  const params = new URLSearchParams(currentParams);

  // Extract filter values from the form dat
  const cStat = formData
    .getAll("Cstat[]")
    .filter((item) => typeof item === "string") as string[];

  const page = (formData.get("page") as string) || params.get("page") || "1"; // Default to page 1
  const sort = (formData.get("sort") as string) || params.get("sort") || "createdAt"; // Default to "name"
  const sortOrder =
    (formData.get("sortOrder") as string) || params.get("sortOrder") || "asc";
  const startDate = formData.get("dateFrom") as string;
  const endDate = formData.get("dateTo") as string;
  const searchQuery = params.get("searchQuery") as string;


  params.delete("pStat");
  if (cStat.length > 0) {
    cStat.forEach((stat) => params.append("pStat", stat));
    params.set("page", "1"); // Reset to page 1 if categories change
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
  params.delete("tab");
  const queryString = params.toString();
  const destinationPath = path ? path : "/dashboard/contents";

  console.log(queryString);
  

  // Redirect to the new URL with updated parameters
  redirect(queryString ? `${destinationPath}&${queryString}` : destinationPath);
};

export const selectContent = (formData: FormData) => {
  // const cusFilter = formData.get("Customer");
  const nameFilter = formData.getAll("Tab");

  // console.log(cusFilter?.toString());
  const params = new URLSearchParams();

  if (nameFilter) {
    params.append("tab", nameFilter.join(","));
  }

  if (params.toString()) {
    redirect(
      `/dashboard/contents?${params.toString()}`
    );
  } else {
    console.log("No filters applied");
  }
};

export const deleteBlogs = async (data: Set<string>) => {
  await db.blog.deleteMany({
    where: {
      id: {
        in: Array.from(data)
      }
    }
  })
}

export const deleteFaqs = async (data: Set<string>) => {
  await db.faq.deleteMany({
    where: {
      id: {
        in: Array.from(data)
      }
    }
  })
}

export const  getContent = async (blogId: string): Promise<Blog & {blogCategory: BlogCategory} | null> => {
  try {
    const blog = await db.blog.findUnique({
      where: {
        id: blogId,
      },
     include: {
      blogCategory: true
     }
    });
    
    return blog ?? null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
export const  getContentFaq = async (faqId: string): Promise<Faq> => {
  try {
    const faq = await db.faq.findUnique({
      where: {
        id: faqId,
      },
    });
    
    return faq ?? null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
