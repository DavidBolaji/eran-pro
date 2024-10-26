// ShoppingSection.tsx (Server Component)
import React from "react";
import { Wrapper } from "../wrapper/wrapper";
import { Typography } from "../typography/typography";
import { getCategories } from "@/actions/get-categories";

import { headers } from "next/headers";
import { SelectedCategoryButtons } from "./select-category-button";
import { ProductComponent } from "./product-component";
import { ShoppingComponent } from "./shopping-component";

const products: any = [
  {
    id: "1",
    name: "Chicken Breast",
    category: {
      name: "Chicken",
    },
    price: 7500,
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Briskets",
    category: { name: "Cow" },
    price: 7500,
    isOnSale: false,
  },
  {
    id: 3,
    name: "Chicken Wings",
    category: {
      name: "Chicken",
    },
    price: 7500,
    isOnSale: false,
  },
  {
    id: 4,
    name: "Goat head",
    category: {
      name: "Goat",
    },
    price: 7500,
    isOnSale: false,
  },
];

export const ShoppingSection = async () => {
  const categories = await getCategories();
  const query = new URLSearchParams(headers().get("referer")?.split("?")[1]);
  const categoryName = query.get("name") || "All Categories";

  return (
    <>
      <Wrapper>
        <Typography as="h4" size="h4" align="left">
          Shop by Meat Category: Find Your Perfect Cut 🍗🥩
        </Typography>
        <Typography as="p" size="s1" align="left" className="pb-10">
          Discover fresh, top-quality chicken, turkey, beef, and goat. Browse
          and order the perfect cut for any meal!
        </Typography>
      </Wrapper>
      <ShoppingComponent
        categories={categories}
        categoryName={categoryName}
        products={products}
      />
    </>
  );
};
