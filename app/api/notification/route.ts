
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

async function handler(req: Request, userId: string) {

    const { subscription } =
        await req.json();

    const existing = await db.notifications.findMany({
        where: {
            userId
        }
    })

    if (existing.length) {
        return NextResponse.json({
            message: `Notification created succesfully`,
        });
    }

    try {
        await db.notifications.create({
            data: {
                notification: JSON.stringify(subscription),
                userId: userId
            }
        })

        return NextResponse.json({
            message: `Notification created succesfully`,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    return authMiddleware(req, async (userId) => {
        return handler(req, userId);
    });
}