import { getUserByEmail } from "@/lib/services/user-services";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
    try {
      const { email, password } = await req.json();
  
      // Check if the user already exists
      const existingUser = await getUserByEmail(email) as User;
      if (!existingUser) {
        return NextResponse.json(
          { message: "Wrong email or password" },
          { status: 404 }
        );
      }
  
      // Hash the password
      const passMatch = bcrypt.compare(password, existingUser.password as string)
      if (!passMatch) {
        return NextResponse.json(
            { message: "Wrong email or password" },
            { status: 404 }
          );
      }
  
      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { id: existingUser.id },
        process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
        { expiresIn: "5m" } // Access token expiration time
      );
  
      const refreshToken = jwt.sign(
        { id: existingUser.id },
        process.env.NEXT_PUBLIC_NEXTAUTH_SECRET_TWO!,
        { expiresIn: "7d" } // Refresh token expiration time
      );
  
      // Prepare the response with cookies for access and refresh tokens
      const response = NextResponse.json({
        message: "User created successfully",
      }, {status: 200});
  
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