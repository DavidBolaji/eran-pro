// utils/getQueryParams.ts
export const getQueryCategoryParams = (url: string) => {
  const urlObj = new URL(url);
  const category = urlObj.searchParams.get("category");
  const name = urlObj.searchParams.get("name");

  return { category, name };
};

export const formatToNaira = (amount: number, dp?: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: dp ?? 0,
  }).format(amount);
};

import { parse, format } from 'date-fns';

export function formatDate(dateString: string) {
  // Parse the date string (MM/dd/yyyy format)
  const parsedDate = parse(dateString, "MM/dd/yyyy", new Date());
  
  // Format the parsed date as "dd MMMM, yyyy"
  return format(parsedDate, "do MMM, yyyy");
}

export const errorMessage = {
  "Description is required":
    "You must fill the category description field in order to create a category",
  "Category name is required":
    "You must fill the category name field in order to create a category",
  "Product category is required": "Product must belong to a category",
  "Product name is required":
    "You must fill the product name field in order to create a product",
  "Product description is required":
    "You must fill the product description field in order to create a product",
  "Product quantity is required":
    "You must fill the product quantity field in order to create a product",
  "Product price is required":
    "You must fill the product price field in order to create a product",
  "Product quantity must be number":
    "Product quantity field can only contain numeric characters",
  "Product price must be number":
    "Product price field can only contain numeric characters",
};
