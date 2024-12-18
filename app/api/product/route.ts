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

  const { name, description, price, qty, stock, unit, categoryId, images, promotion } =
    await req.json();

  try {
    const prod = await db.product.create({
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
  
    const promo = await db.promotion.findUnique({
      where : {
        id: promotion ?? undefined
      }
    })

    if (promo && promo.promotionType === "ITEM") {
       await db.promotion.create({
        data: {
          name: promo.name,
          code: promo.code,
          status: promo.status,
          promotionType: promo.promotionType,
          discount: parseInt(String(promo.discount), 10),
          startDate: promo.startDate,
          endDate: promo.endDate,
          categoryId: null,
          productId: prod.id
        }
      })
    }

    return NextResponse.json({
      message: `Category created succesfully`,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { name, description, price, qty, stock, unit, categoryId, images, productId, promotion } =
    await req.json();
    
  try {

    db.$transaction(async (tx) => {
      // Delete existing images first
      await tx.image.deleteMany({
        where: {
          productId
        }
      });
  
      // Update product with new data
      const prod = await tx.product.update({
        where: {
          id: productId
        },
        data: {
          name,
          description,
          price: +price,
          qty: +qty,
          stock,
          unit: unit.replace(" ", "_"),
          categoryId, // Directly update categoryId
          images: {
            create: images.map((url: string) => ({ url })),
          },
        },
      });

       // 3. Update Promotion Logic
       if (promotion) {
        const promo = await tx.promotion.findFirst({ where: { id: promotion } });

        if (promo) {
          // If the promotion is an ITEM promotion (product-specific promotion)
          if (promo.promotionType === "ITEM") {
            // Check if the product already has a promotion
            const existingPromo = await tx.promotion.findFirst({
              where: { productId: prod.id }
            });

            // If there is an existing product promotion, update or replace it
            if (existingPromo) {
              // Optionally delete or update the existing promotion
              await tx.promotion.update({
                where: { id: existingPromo.id },
                data: {
                  // Update promotion details if needed
                  productId: prod.id, // Ensure it's linked to the correct product
                },
              });
            } else {
              // Create a new product promotion if no promotion exists
              await tx.promotion.create({
                data: {
                  ...promo,
                  productId: prod.id, // Link the promotion to the specific product
                }
              });
            }
          } 
          // If the promotion is a CATEGORY promotion
          else if (promo.promotionType === "CATEGORY") {
            // Ensure the product belongs to the category (optional validation)
            if (prod.categoryId !== categoryId) {
              // You can add validation to check if the product belongs to the selected category
              throw new Error("The promotion's category does not match the product's category.");
            }

          }
        }
      }


    })

    return NextResponse.json({
      message: `Product updated successfully`,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
