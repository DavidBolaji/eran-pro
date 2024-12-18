import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../middleware";


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function handler(req: NextRequest, userId: string) {
  const {id} = await req.json()
  try {
    const exist = await db.user.findMany({
        where: {
            AND: [
                {
                    id: userId
                },
                {
                    role: "ADMIN"
                }
            ]
        }
    })
    if (!exist) {
        return NextResponse.json({ message: "Only admin can deactivate user" }, { status: 401 });
    }
    // Fetch user data based on the userId
    const user = await db.user.update({
      where: { id },
      data: {
        status: "DEACTIVATED"
      }
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return authMiddleware(req, async (userId: string) => {
    return handler(req, userId);
  });
}