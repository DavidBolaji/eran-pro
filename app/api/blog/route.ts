import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../middleware";
import { BLOGSTATUS } from "@prisma/client";

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
        const { title, img, text, description, categoryId, status } = await req.json();

        if (!title || !status || !img || !text || !description || !categoryId) {
            return NextResponse.json({ message: "Bad request" }, { status: 400 });
        }

        const blog = await db.blog.create({
            data: {
                title,
                description,
                img,
                text,
                blogCategoryId: categoryId,
                status: status as BLOGSTATUS,
                userId
            },
        });

        return NextResponse.json({
            message: `Blog created succesfully`,
            data: blog,
        });
    } catch (error) {
        console.log("[PRODUCT_GET_SINGLE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

async function updateHandler(req: Request, userId: string) {

    try {
        const { title, img, text, description, categoryId, status, blogId } = await req.json();

        if (!title || !status || !img || !text || !description || !categoryId || !blogId) {
            return NextResponse.json({ message: "Bad request" }, { status: 400 });
        }

        const blog = await db.blog.update({
            where: {
                id: blogId
            },
            data: {
                title,
                description,
                img,
                text,
                blogCategoryId: categoryId,
                status: status as BLOGSTATUS,
                userId
            },
        });

        return NextResponse.json({
            message: `Blog updated succesfully`,
            data: blog,
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