import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Middleware to verify token based on specified paths and methods
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Define paths and allowed methods for the middleware
  const pathMethodMapping: Record<string, string[]> = {
    "/api/user": ["GET", "PATCH", "DELETE"],
    "/api/orders": ["GET"],
    "/api/product": ["PUT"],
  };

  // Check if the path requires a token based on HTTP method
  const path = req.nextUrl.pathname;
  const allowedMethods = pathMethodMapping[path];

  if (allowedMethods && allowedMethods.includes(req.method)) {
    if (!token) {
      return NextResponse.json({ message: "Unauthorized: Token is missing" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!);
      const userId = (decoded as { id: string }).id;

      // Attach userId to the request headers so it can be accessed in route handlers
      req.headers.set("user-id", userId);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: (error as Error).message }, { status: 401 });
    }
  }

  // Allow requests that don't match the specified paths and methods
  return NextResponse.next();
}

// Apply middleware to the specified routes using matcher
export const config = {
  matcher: ["/api/user/:path*", "/api/orders/:path*", "/api/product/:path*"],
};
