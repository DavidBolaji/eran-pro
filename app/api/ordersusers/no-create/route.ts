import db from "@/db/db";
import { NextResponse } from "next/server";
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
      country,
      state,
      fname,
      lname,
      phone,
      city,
      address,
      extra,
      orders,
      paymentType,
      price,
    } = await req.json();

    console.log(JSON.stringify(orders, null, 2))

    const prodIdList = orders.map((order: { id: string }) => order.id);

    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
      select: { id: true, fname: true },
    });

    const productPromotions = await db.product.findMany({
      where: { id: { in: prodIdList } },
      select: {
        id: true,
        promotion: {
          where: { productId: { not: null } }, // Check if a product-specific promotion exists
        },
        categoryId: true,
        category: {
          select: {
            id: true,
            Promotion: {
              where: { promotionType: "CATEGORY" }, // Get category promotions if available
            },
          },
        },
      },
    });

    let order: any;
    if (!existingUser) {
      order = await db.order.create({
        data: {
          email,
          fname,
          lname,
          phone,
          products: {
            connect: prodIdList.map((id: string) => ({ id })),
          },
          orderId: generateSixDigitCode(),
          paymentType: paymentType,
          price: price,
        },
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
      order = await db.order.create({
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
    }

    // Create the order address
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

    const productOrderData = prodIdList.map((id: string, idx: number) => {
      const product = orders[idx];
      // Check for order-specific promotion
      const orderPromo = product.promotion ? product.promotion : [];

      // Find the product promotion (if any)
      const productPromo = productPromotions?.find((p) => p.id === id)?.promotion[0];

      // Find category promotion (if product doesn't have a product-specific promotion)
      const categoryPromo = productPromotions?.find((p) => p.id === id)?.category.Promotion[0];      

      // Combine all applicable promotions (order-level, product-level, and category-level)
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
        weight: product.weight, // Capture the weight for each product
        promotionId: uniquePromotions.length > 0 ? uniquePromotions.map((promo) => promo.id).join(', ') : null, // Combine all promotion IDs
        discount: uniquePromotions.reduce((total, promo) => total + promo.discount, 0), // Sum all discounts
        code: uniquePromotions.map((promo) => promo.code).join(', ') || null, // Combine all promotion codes
      };
    });

    // Insert product orders with combined promotion data
    await db.productOrder.createMany({
      data: productOrderData,
    });

    return NextResponse.json({
      message: `Order created Successfully`,
    });
  } catch (error) {
    console.log("[PRODUCT_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

