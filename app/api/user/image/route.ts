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

export async function PATCH(req: Request) {
  try {
    const userId = req.headers.get("user-id");
    const { img } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User ID not found" },
        { status: 401 }
      );
    }

    const user = await db.user.update({
      where: { id: userId },
      data: {
        pic: img,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
