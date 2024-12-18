import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { generateSixDigitCode } from "@/utils/helper";
import { authMiddleware } from "../../middleware";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function handler(id: string, req: NextRequest) {
  try {
    console.log("[USER_IDDD]", id);
    const {
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
      default: defaultVal,
      save,
      id: newId,
    } = await req.json();

    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { id: id as string },
      select: { fname: true, id: true },
    });

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

    await db.$transaction(async (tx) => {
      // Update user details if not found
      if (!existingUser?.fname) {
        await tx.user.update({
          where: { id: existingUser?.id },
          data: { fname, lname, phone },
        });
      }

      // Create the order with associated products
      const order = await tx.order.create({
        data: {
          userId: existingUser?.id,
          products: { connect: prodIdList.map((id: string) => ({ id })) },
          orderId: generateSixDigitCode(),
          paymentType,
          price,
          address: newId
            ? {
              connect: {
                id: newId,
              },
            }
            : undefined,
        },
      });

      // Handle address creation and active status based on `save` and `defaultVal`
      let newAddress;
      if (save || defaultVal) {
        newAddress = await tx.address.create({
          data: {
            address,
            active: true,
            state,
            city,
            country,
            info: extra,
            userId: existingUser?.id,
            orderId: order.id,
          },
        });

        // Set the new address as the default if `defaultVal` is true
        if (defaultVal) {
          await tx.address.updateMany({
            where: { userId: existingUser?.id },
            data: { active: false },
          });
          await tx.address.update({
            where: { id: newAddress.id },
            data: { active: true },
          });
        }
      } else {
        if (!newId) {
          await tx.address.create({
            data: {
              address,
              active: true,
              state,
              city,
              country,
              info: extra,
              orderId: order.id,
            },
          });
        }
      }

      // Create product orders and apply promotions (if any)
      const productOrderData = prodIdList.map((id: string, idx: number) => {
        const product = orders[idx]; // Get the product data for this index
        // Check for product-specific promotion
        const productPromo = productsWithPromotions.find((p) => p.id === id)?.promotion[0];

        // Check for category-specific promotion (if no product-specific promotion is found)
        const categoryPromo = productsWithPromotions.find((p) => p.id === id)?.category.Promotion[0];

        // Check if the product in the order already has a promotion attached
        const orderPromo = product.promotion ? product.promotion : [];


        // Combine both the promotion from the order (if any) with the product- or category-specific promotions
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

      // Insert product orders with promotion data
      await tx.productOrder.createMany({
        data: productOrderData,
      });
    });

    return NextResponse.json({ message: `Order created Successfully` });
  } catch (error) {
    console.log("[PRODUCT_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  return authMiddleware(req, async (userId) => {
    return handler(userId, req);
  });
}
