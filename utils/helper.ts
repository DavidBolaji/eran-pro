import { v4 as uuidv4 } from "uuid";

export function generateSixDigitCode() {
  // Generate a UUID, take the first 6 characters, and prefix with "#"
  const uniqueCode = uuidv4().replace(/-/g, "").slice(0, 6);
  return `#${uniqueCode}`;
}
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

import { parse, format } from "date-fns";
import { Order } from "@/components/table/orders-table/types";

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
  "Promotion name is required":
    "You must fill the promotion name field in order to create a promotion",
  "Promotion code is requiredd":
    "You must fill the promotion code field in order to create a promotion",
  "Promotion discount is required":
    "You must fill the promotion discount field in order to create a promotion",
  "Promotion discount must be numeric":
    "Promotion discount field can only contain numeric characters",
  "Promotion start date is required":
    "Promotion start date field must be filled in order to create a promotion",
  "Promotion end date is required":
    "Promotion end date field must be filled in order to create a promotion",
  "Promotion start time is required":
    "Promotion start time field must be filled in order to create a promotion",
  "Promotion end time is required":
    "Promotion end time field must be filled in order to create a promotion",
};

export const addWeightToProducts =  (order: Order  & {code: string[]} | null)  => {
  if (!order || !order.products) return order;
  
  let code: string[] = [];
  
  // Process each product to include the correct weight and apply discount
  const productsWithWeight = order.products.map((product) => {
    // Find the ProductOrder entry that matches the order and product
    const productOrder = product?.ProductOrder?.find(
      (po) => po.orderId === order.id && po.productId === product.id
    );
   const step = product.unit === "PER_ITEM" ? 1 : 0.5;
   const prog = (productOrder?.weight || 0) / step
    const discount = ((productOrder?.discount || 0)/100) * product.price;

    if (productOrder?.code) {
      code.push(productOrder?.code)
    }
    
    
    // Return the product with the calculated weight and total discount
    return {
      ...product,
      weight: productOrder?.weight || 0, // Default weight to 0 if not found
      discount: discount * prog,           // Combined product and promotion discount
      code: productOrder?.code,                   // Include the promotion code
    };
  });

  return {
    ...order,
    products: productsWithWeight,
    code
  };
};

  // if (productOrder?.promotionId) {
    //   const promotion = await db.promotion.findUnique({
    //     where: { id: productOrder.promotionId },
    //     select: { code: true, discount: true, status:  },
    //   });

    //   // if (promotion && promotion.status && promotion.startDate <= new Date() && promotion.endDate >= new Date()) {
    //     // If the promotion is valid, apply its discount
    //     promotionCode = promotion?.code ?? ""; // Store the promotion code
    //     totalDiscount += promotion?.discount ?? 0; // Add the promotion discount
    //   // }
    // }