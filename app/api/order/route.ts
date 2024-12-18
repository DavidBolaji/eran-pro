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

async function handler(req: NextRequest, userId: string) {
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
        return NextResponse.json({ message: "Only admin can update order" }, { status: 401 });
    }

    const { id, status, balance } =
        await req.json();

    if (!id || !status) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    try {
        // Update order with new data
        await db.order.update({
            where: {
                id
            },
            data: {
                status,
                price: {
                    increment: balance ?? 0
                }
            },
        });

        return NextResponse.json({
            message: `Order updated successfully`,
        });
    } catch (error) {
        console.error("Error updating Order:", error);
        return new NextResponse(`Internal error: ${(error as Error).message}`, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    return authMiddleware(req, async (userId) => {
        return handler(req, userId);
    });
}