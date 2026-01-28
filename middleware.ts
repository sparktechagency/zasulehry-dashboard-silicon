import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./utils/getToken";
import { myFetch } from "./utils/myFetch";
import { serverSidebarItem } from "./helper/sidebar";

const allowdPaths = [
  "/login",
  "/dashboard/my-profile",
  "/dashboard/inbox",
  "/dashboard/notification",
];
export async function middleware(request: NextRequest) {
  // redirect to dashboard by default root path
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const pathname = request.nextUrl.pathname;

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

  const res = await myFetch("/users?role=Admin");

  // Access the first admin object in the array
  const urls = serverSidebarItem
    ?.filter((item) => res?.data?.[0]?.adminPermissions?.includes(item?.path))
    ?.map((item) => item.path);

  if (
    !urls?.some((item) => item.startsWith(pathname)) &&
    !allowdPaths.includes(pathname) &&
    user?.data?.role != "Super Admin"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path((?!employee-details/).*)"],
};
