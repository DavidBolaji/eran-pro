import db from "@/db/db";
import { Category, Image, Product, Promotion } from "@prisma/client";

export type IProduct = Omit<
  Product,
  "order" | "updatedAt" | "createdAt" | "categoryId"
> & {
  promotion: Pick<Promotion, "name" | "discount">[]; // Note: promotion is an array
  category: Pick<Category, "name" | "id">;
  images: Pick<Image, "url">[]
};

export const productQuery = {
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
      url: true
    }
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  promotion: {
    select: {
      name: true,
      discount: true,
    },
  },
}

export const getProducts = async (categoryId: string): Promise<IProduct[]> => {
  try {
    const products = await db.product.findMany({
      where: {
        categoryId:
          categoryId === "1" || !categoryId
            ? undefined
            : categoryId,
      },
      select: productQuery
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
