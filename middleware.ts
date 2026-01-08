import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./utils/getToken";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const token = await getToken(); // read cookies/headers
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  // Only allow access if token exists AND role is Super Admin
  if (!token || role !== "Super Admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
