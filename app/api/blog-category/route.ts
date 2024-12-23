import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../middleware";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function handler(req: Request) {
   
  try {
    const { name, description } = await req.json();

    const category = await db.blogCategory.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json({
      message: `Blog Category created succesfully`,
      data: category,
    });
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    return authMiddleware(req, async (userId) => {
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
            return NextResponse.json({ message: "Only admin can create blog category" }, { status: 401 });
        }
        return handler(req);
    });
}