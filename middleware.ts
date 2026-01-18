import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./utils/getToken";
import { myFetch } from "./utils/myFetch";

export async function middleware(request: NextRequest) {
  // redirect to dashboard by default root path
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const token = await getToken();

  // Only allow access if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // check if user role is admin
  const user = await myFetch("/users/profile");

  if (user?.data?.role !== "Admin" && user?.data?.role !== "Super Admin") {
    request.cookies.delete("accessToken");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
