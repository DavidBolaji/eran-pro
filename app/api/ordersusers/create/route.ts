import db from "@/db/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateSixDigitCode } from "@/utils/helper";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      phone,
      fname,
      lname,
      country,
      state,
      city,
      address,
      extra,
      orders,
      paymentType,
      price,
    } = await req.json();

    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
      select: { fname: true, id: true },
    });

    const hash = await bcrypt.hash(password, 10);
    const prodIdList = orders.map((order: { id: string }) => order.id);

    // Fetch the promotions associated with each product and its category
    const productsWithPromotions = await db.product.findMany({
      where: { id: { in: prodIdList } },
      select: {
        id: true,
        promotion: {
          where: { productId: { not: null } }, // Product-specific promotion
        },
        categoryId: true,
        category: {
          select: {
            id: true,
            Promotion: {
              where: { promotionType: "CATEGORY" }, // Category-specific promotion
            },
          },
        },
      },
    });

    if (!existingUser) {
      const users = await db.user.create({
        data: {
          fname,
          lname,
          email,
          password: hash,
          phone,
        },
      });
      const order = await db.order.create({
        data: {
          userId: users.id,
          products: {
            connect: prodIdList.map((id: string) => ({ id })),
          },
          orderId: generateSixDigitCode(),
          paymentType: paymentType,
          price: price,
        },
      });

      await db.address.create({
        data: {
          address: address,
          active: true,
          state,
          city,
          country,
          info: extra,
          userId: users.id,
          orderId: order.id,
        },
      });

      // Create product orders with promotions
      const productOrderData = prodIdList.map((id: string, idx: number) => {
        const product = orders[idx]; // Get the product data for this index

        // Check for product-specific promotion
        const productPromo = productsWithPromotions.find((p) => p.id === id)?.promotion[0];

        // Check for category-specific promotion (if no product-specific promotion is found)
        const categoryPromo = productsWithPromotions.find((p) => p.id === id)?.category.Promotion[0];

        // Check if the product in the order already has a promotion attached
        const orderPromo = product.promotion ? product.promotion : [];

        // Combine both the promotion from the order (if any) with the product- or category-specific promotions
        // Apply both if both exist
        const promotions = [orderPromo[0], productPromo, categoryPromo].filter(Boolean); // Filter out null/undefined promotions

        // Extract promotion codes from the promotions and remove duplicates
        const uniqueCodes = [...new Set(promotions.map((promo) => promo.code))];

        // Filter the promotions with unique codes
        const uniquePromotions = promotions.filter((promo, index, self) => {
          return uniqueCodes.includes(promo.code) &&
            self.findIndex((p) => p.code === promo.code) === index;
        });


        return {
          orderId: order.id,
          productId: id,
          weight: product.weight,
          promotionId: uniquePromotions.length > 0 ? uniquePromotions.map((promo) => promo.id).join(', ') : null, // Store all promotion IDs
          discount: uniquePromotions.reduce((total, promo) => total + promo.discount, 0), // Sum the discounts
          code: uniquePromotions.map((promo) => promo.code).join(', ') || null, // Concatenate promotion codes
        };
      });

      await db.productOrder.createMany({
        data: productOrderData,
      });
    } else {
      if (!existingUser?.fname) {
        await db.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            fname,
            lname,
            phone,
          },
        });
      }
      const order = await db.order.create({
        data: {
          userId: existingUser?.id,
          products: {
            connect: prodIdList.map((id: string) => ({ id })),
          },
          orderId: generateSixDigitCode(),
          paymentType: paymentType,
          price: price,
        },
      });

      await db.address.create({
        data: {
          address: address,
          active: true,
          state,
          city,
          country,
          info: extra,
          userId: existingUser?.id,
          orderId: order.id,
        },
      });

      // Create product orders with promotions
      const productOrderData = prodIdList.map((id: string, idx: number) => {
        const product = orders[idx]; // Get the product data for this index

        // Check for product-specific promotion
        const productPromo = productsWithPromotions.find((p) => p.id === id)?.promotion[0];

        // Check for category-specific promotion (if no product-specific promotion is found)
        const categoryPromo = productsWithPromotions.find((p) => p.id === id)?.category.Promotion[0];

        // Check if the product in the order already has a promotion attached
        const orderPromo = product.promotion ? product.promotion : [];
        // Combine both the promotion from the order (if any) with the product- or category-specific promotions
        // Apply both if both exist
        const promotions = [orderPromo[0], productPromo, categoryPromo].filter(Boolean); // Filter out null/undefined promotions
        // Extract promotion codes from the promotions and remove duplicates
        const uniqueCodes = [...new Set(promotions.map((promo) => promo.code))];

        // Filter the promotions with unique codes
        const uniquePromotions = promotions.filter((promo, index, self) => {
          return uniqueCodes.includes(promo.code) &&
            self.findIndex((p) => p.code === promo.code) === index;
        });


        return {
          orderId: order.id,
          productId: id,
          weight: product.weight,
          promotionId: uniquePromotions.length > 0 ? uniquePromotions.map((promo) => promo.id).join(', ') : null, // Store all promotion IDs
          discount: uniquePromotions.reduce((total, promo) => total + promo.discount, 0), // Sum the discounts
          code: uniquePromotions.map((promo) => promo.code).join(', ') || null, // Concatenate promotion codes
        };
      });

      await db.productOrder.createMany({
        data: productOrderData,
      });
    }

    return NextResponse.json({
      message: `Order created successfully`,
    });
  } catch (error) {
    console.log("[PRODUCT_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}