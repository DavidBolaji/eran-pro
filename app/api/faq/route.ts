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

    try {
        const { question, answer, status } = await req.json();

        if (!question || !status || !answer) {
            return NextResponse.json({ message: "Bad request" }, { status: 400 });
        }

        const faq = await db.faq.create({
            data: {
                question,
                answer,
                status,
                userId
            },
        });

        return NextResponse.json({
            message: `FAQ created succesfully`,
            data: faq,
        });
    } catch (error) {
        console.log("[PRODUCT_GET_SINGLE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

async function updateHandler(req: Request, userId: string) {

    try {
        const { question, answer, faqId, status } = await req.json();

        console.log(question, answer, faqId, status)

        if (!question || !status || !answer || !faqId) {
            return NextResponse.json({ message: "Bad request" }, { status: 400 });
        }

        const faq = await db.faq.update({
            where: {
                id: faqId
            },
            data: {
                question,
                answer,
                status,
                userId
            },
        });

        return NextResponse.json({
            message: `FAQ updated succesfully`,
            data: faq,
        });
    } catch (error) {
        console.log(error);
        
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
        return handler(req, userId);
    });
}


export async function PUT(req: NextRequest) {
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
        return updateHandler(req, userId);
    });
}