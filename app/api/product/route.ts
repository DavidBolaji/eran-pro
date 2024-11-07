import db from "@/db/db";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    console.log('here')
  const { name, description, price, qty, stock, unit, categoryId, images } =
    await req.json();

  try {
     await db.product.create({
      data: {
        name,
        description,
        price: +price,
        qty: +qty,
        stock,
        unit: unit.replace(" ", "_"),
        category: {
          connect: { id: categoryId }, // Linking to an existing Category by ID
        },
        images: {
          create: images.map((url: string) => ({ url })), // Creating related Image records
        },
      },
    });

    return NextResponse.json({
      message: `Category created succesfully`,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
