import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function middleware(req: NextRequest) {
  try {
    console.log('middle ware req came');
    console.log('🚀 MIDDLEWARE HIT!');
    console.log('📍 Path:', req.nextUrl.pathname);
    console.log('🌐 Full URL:', req.url);
    
    const token =
      req.cookies.get("custom-token")?.value || // from website stored in cookie
      req.headers.get("Authorization")?.replace("Bearer ", ""); // Or from mobile API header

    // ❌ No custom token → block access
    if (!token) {
      console.log('❌ No token found');
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // ✅ Verify only your custom token using jose + JWT_SECRET
    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log('✅ Token verified for user:', payload.email);

    // Attach user info for APIs (optional)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.id as string);
    requestHeaders.set("x-user-email", payload.email as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // ✅ Type assertion for JWT errors
    const jwtError = error as { code?: string; message?: string };
    console.error("JWT verification failed:", jwtError.message || error);
    
    // ✅ If token is expired, clear the cookie
    if (jwtError.code === 'ERR_JWT_EXPIRED') {
      console.log('🕐 Token expired, clearing cookie and redirecting');
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("custom-token");  // Clear expired cookie
      return response;
    }
    
    // ✅ For other JWT errors, also clear cookie
    if (jwtError.code?.startsWith('ERR_JWT')) {
      console.log('🚫 JWT error, clearing cookie:', jwtError.code);
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("custom-token");
      return response;
    }
    
    // ✅ General error handling
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/courses/:path*",
    "/home",
    "/vdo/:path*",
    "/bounty",
    "/dashboard/:path*",
    "/api/((?!auth).)*",  // This matches /api/* but excludes /api/auth/*
    "/protect/:path*",
  ],
};