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

    const existingUser = await db.user.findUnique({
      where: { id: id as string },
      select: { fname: true, id: true },
    });

    const prodIdList = orders.map((order: { id: string }) => order.id);

    db.$transaction(async (tx) => {
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
      // Insert products into the order
      await tx.productOrder.createMany({
        data: prodIdList.map((id: string, idx: number) => ({
          orderId: order.id,
          productId: id,
          weight: orders[idx].weight,
        })),
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
