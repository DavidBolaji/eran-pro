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

      await db.productOrder.createMany({
        data: prodIdList.map((id: string, idx: number) => ({
          orderId: order.id,
          productId: id,
          weight: orders[idx].weight,
        })),
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
      await db.productOrder.createMany({
        data: prodIdList.map((id: string, idx: number) => ({
          orderId: order.id,
          productId: id,
          weight: orders[idx].weight,
        })),
      });
    }

    return NextResponse.json({
      message: `Order created Succesfully`,
    });
  } catch (error) {
    console.log("[PRODUCT_GET_SINGLE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
