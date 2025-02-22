"use server"
import db from "@/db/db";
import { Category } from "@prisma/client";
import { redirect } from "next/navigation"

export const getCategories = async (): Promise<Pick<Category, "id" | "name">[]> => {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getCategoryByQuery = async (
  search: string
): Promise<Category[]> => {
  try {
    const category = await db.category.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      
    });
    return category;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};


export const selectCategory = (formData: FormData) => {
    const catFilter = formData.getAll("Category")
    const nameFilter = formData.getAll("Name")

    const params = new URLSearchParams();

    if (catFilter) {
        params.append('category', catFilter.join(','));
    }
    if (nameFilter) {
        params.append('name', nameFilter.join(','));
    }

    if (params.toString()) {
        redirect(`/?${params.toString()}`);
    } else {
        console.log('No filters applied');
    }
}
