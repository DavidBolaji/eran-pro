import db from "@/db/db";
import { getUserByEmail } from "@/lib/services/user-services";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
    const { identifier, firstName, lastName, imageUrl } = await req.json();

    // Check if the user already exists
    const existingUser = await getUserByEmail(identifier);
    let user = existingUser;

    // Create a new user if none exists
    if (!user) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      user = await db.user.create({
        data: {
          email: identifier,
          fname: firstName,
          lname: lastName,
          pic: imageUrl,
        },
      });
    }

    // Generate an access token with no expiration
    const accessToken = jwt.sign(
      { id: user?.id },
      process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
      { expiresIn: "9999 years" } // Setting to a very long expiration time
    );

    // Prepare the response with cookies for access and refresh tokens
    const response = NextResponse.json({
      message: existingUser ? "User found" : "User created successfully",
      user,
    });

    // Set access token as a cookie with a long duration
    response.cookies.set("token", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365 * 9999, // Close to "never" expiration
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
