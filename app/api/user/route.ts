import db from "@/db/db";
import { generateTokens, getUserByEmail } from "@/lib/services/user-services";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware";
import { Address } from "@prisma/client";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

async function handler(userId: string) {
  try {
    // Fetch user data based on the userId
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fname: true,
        lname: true,
        pic: true,
        email: true,
        phone: true,
        role: true,
        orders: {
          select: {
            products: {
              select: {
                name: true,
                price: true,
                images: true,
              },
            },
          },
        },
        orderAddress: true,
      },
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

export async function GET(req: NextRequest) {
  return authMiddleware(req, async (userId) => {
    return handler(userId);
  });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await db.user.create({
      data: {
        email,
        password: hash,
      },
    });

    const { accessToken, refreshToken } = await generateTokens(user.id);
    // Prepare the response with cookies for access and refresh tokens
    const response = NextResponse.json({
      message: "User created successfully",
    });

    // Set access token as a cookie
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 1 hour
      path: "/",
      sameSite: "lax",
      secure: process.env.NEXT_PUBLIC_SECURE === "true",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });

    // Set refresh token as a cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: "lax",
      secure: process.env.NEXT_PUBLIC_SECURE === "true",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

async function updateHandler(userId: string, req: NextRequest) {
  try {
    const { fname, lname, phone, pic, address, orderAddress } =
      await req.json();
    const newDefault =
      address?.filter((add: Address) => !add?.id && add.active) ?? [];
    const prev = address?.filter((add: Address) => add.id) ?? [];
    const allNewAddress = address?.filter((add: Address) => !add?.id) ?? [];

    if (prev) {
      await Promise.all(
        prev.map(
          async ({
            id,
            country,
            city,
            state,
            info,
            address,
            active,
          }: Address) => {
            return db.address.update({
              where: {
                id,
              },
              data: {
                address,
                country,
                city,
                state,
                info,
                active,
              },
            });
          }
        )
      );
    }

    if (!orderAddress?.length && address?.length) {
      if (newDefault?.length) {
        await db.address.updateMany({
          where: { userId },
          data: { active: false },
        });
      }

      await db.address.createMany({
        data: address.map((address: Address) => ({
          address: address.address,
          city: address.city,
          state: address.state,
          country: address.country,
          info: address?.info?.length ? address.info : undefined,
          active: address.active,
          userId,
        })),
      });
    }

    if (orderAddress?.length && address?.length) {
      if (newDefault?.length) {
        await db.address.updateMany({
          where: { userId },
          data: { active: false },
        });
      }

      await db.address.createMany({
        data: allNewAddress.map((address: Address) => ({
          address: address.address,
          city: address.city,
          state: address.state,
          country: address.country,
          info: address?.info?.length ? address.info : undefined,
          active: address.active,
          userId,
        })),
      });
    }

    await db.user.update({
      where: {
        id: userId as string,
      },
      data: {
        fname: fname,
        lname,
        phone,
        pic: pic ?? undefined,
      },
    });

    // Prepare the response with cookies for access and refresh tokens
    const response = NextResponse.json({
      message: "User updated successfully",
    });

    // Set access token as a cookie

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  return authMiddleware(req, async (userId) => {
    return updateHandler(userId, req);
  });
}
