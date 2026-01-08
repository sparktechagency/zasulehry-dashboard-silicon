import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./utils/getToken";

export async function middleware(request: NextRequest) {
  const token = await getToken(); // make sure it reads cookies/headers

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
