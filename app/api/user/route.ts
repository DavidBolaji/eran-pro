import db from "@/db/db";
import { getUserByEmail } from "@/lib/services/user-services";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: Request) {
  try {
    // Retrieve the userId from the request headers
    const userId = req.headers.get("user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User ID not found" },
        { status: 401 }
      );
    }

    // Fetch user data based on the userId
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          include: {
            products: true,
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

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
      { expiresIn: "5m" } // Access token expiration time
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.NEXT_PUBLIC_NEXTAUTH_SECRET_TWO!,
      { expiresIn: "7d" } // Refresh token expiration time
    );

    // Prepare the response with cookies for access and refresh tokens
    const response = NextResponse.json({
      message: "User created successfully",
    });

    // Set access token as a cookie
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      maxAge: 5 * 60, // 5 minutes
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_SECURE === "true",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });

    // Set refresh token as a cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_SECURE === "true",
      domain: process.env.NEXT_PUBLIC_DOMAIN,
    });

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const userId = req.headers.get("user-id");

    const { fname, lname, phone, pic } = await req.json();
    await db.user.update({
      where: {
        id: userId as string,
      },
      data: {
        fname,
        lname,
        phone,
        pic,
      },
    });

    // Prepare the response with cookies for access and refresh tokens
    const response = NextResponse.json(
      {
        message: "User updated successfully",
      },
      { status: 204 }
    );

    // Set access token as a cookie

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
