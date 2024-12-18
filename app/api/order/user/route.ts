import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}


export async function PUT(req: NextRequest) {
    const { id, status, balance } =
        await req.json();

    if (!id || !status) {
        return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    console.log({ id, status, balance })

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