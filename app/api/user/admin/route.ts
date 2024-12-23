import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

import { Address } from "@prisma/client";
import { authMiddleware } from "../../middleware";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}


async function updateHandler(userId: string, req: NextRequest) {
  try {
    const exist = await db.user.findMany({
      where: {
        AND: [
          { id: userId },
          { role: "ADMIN" },
        ],
      },
    });

    if (!exist) {
      return NextResponse.json(
        { message: "Only admin can update user" },
        { status: 401 }
      );
    }

    const { id, fname, lname, phone, pic, address, 
      // orderAddress 
    } = await req.json();

    // Fetch existing addresses from the database
    const existingAddresses = await db.address.findMany({
      where: { userId: id },
    });

    // Determine addresses to delete
    const updatedAddressIds = address.map((addr: Address) => addr.id).filter(Boolean);
    const addressesToDelete = existingAddresses.filter(
      (addr) => !updatedAddressIds.includes(addr.id)
    );

    // Delete removed addresses from the database
    if (addressesToDelete.length) {
      await Promise.all(
        addressesToDelete.map((addr) =>
          db.address.delete({
            where: { id: addr.id },
          })
        )
      );
    }

    // Check if any new address is marked as active
    const hasActiveAddress = address.some((addr: Address) => addr.active);

    if (hasActiveAddress) {
      // Deactivate all existing addresses for the user
      await db.address.updateMany({
        where: { userId: id },
        data: { active: false },
      });
    }

    // Update existing addresses
    const prev = address?.filter((add: Address) => add.id) ?? [];
    if (prev.length) {
      await Promise.all(
        prev.map(
          async ({ id, country, city, state, info, address, active }: Address) => {
            return db.address.update({
              where: { id },
              data: {
                address,
                country,
                city,
                state,
                info,
                active: active || false, // Ensure it is only set true if explicitly passed
              },
            });
          }
        )
      );
    }

    // Create new addresses
    const allNewAddress = address?.filter((add: Address) => !add?.id) ?? [];
    if (allNewAddress.length) {
      await db.address.createMany({
        data: allNewAddress.map((addr: Address) => ({
          address: addr.address,
          city: addr.city,
          state: addr.state,
          country: addr.country,
          info: addr?.info?.length ? addr.info : undefined,
          active: addr.active || false, // Ensure it is only set true if explicitly passed
          userId: id,
        })),
      });
    }

    // Update user details
    await db.user.update({
      where: { id: id as string },
      data: { fname, lname, phone, pic: pic ?? undefined },
    });

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  return authMiddleware(req, async (userId: string) => {
    return updateHandler(userId, req);
  });
}