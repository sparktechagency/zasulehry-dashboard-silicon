"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

import Image from "next/image";
import { deleteCookie } from "cookies-next/client";
import { LogOut } from "lucide-react";
import { sidebarMenu } from "@/helper/sidebar";
import { useEffect, useMemo, useState } from "react";
import { myFetch } from "@/utils/myFetch";

interface AdminUser {
  adminPermissions?: string[] | undefined;
  [key: string]: any;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await myFetch("/users/profile");
      setCurrentUser(res?.data);
    };
    fetch();
  }, []);

  // Filter sidebar items based on user role
  const filteredSidebarMenu = useMemo(() => {
    // Super Admin sees all menu items
    if (currentUser?.role === "Super Admin") {
      return sidebarMenu;
    }

    // Sub Admin sees only permitted items
    if (currentUser?.role === "Admin" && currentUser?.adminPermissions) {
      return sidebarMenu.filter((item) =>
        (currentUser.adminPermissions ?? []).includes(item.path),
      );
    }

    // Default: no items if user not loaded or unauthorized
    return [];
  }, [currentUser]);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Log Out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCookie("accessToken");
        deleteCookie("role");
        router.push("/login");

        Swal.fire({
          title: "Logged Out",
          text: "Your have been Log Out.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-white">
      <div className="ml-16 py-2">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Zasulehry"
            width={24}
            height={24}
            className="w-24"
            sizes="100vh"
          />
        </Link>
      </div>
      <div
        className="overflow-y-auto scroll-smooth py-4 space-y-2 hide-scrollbar"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <div className="px-4 space-y-1 text-sm overflow-y-auto">
          {filteredSidebarMenu?.map((item) => {
            const isEmployerListActive =
              item.path === "/dashboard/all-employee-list" &&
              (pathname === "/dashboard/all-employee-list" ||
                pathname.startsWith("/dashboard/employee-details"));

            const isActiveInvoice =
              item.path === "/dashboard/payment-invoices" &&
              (pathname === "/dashboard/settings-refund" ||
                pathname === "/dashboard/settings-page");

            const jobSeekerListActive =
              item.path === "/dashboard/all-job-seeker" &&
              (pathname === "/dashboard/all-job-seeker" ||
                pathname.startsWith("/dashboard/job-seeker-details"));

            const isActive = pathname === item.path;

            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 my-2 py-1.5 cursor-pointer font-medium text-[12px] 2xl:text-[15px] ${
                    item?.label === "Log Out"
                      ? "text-red-600"
                      : isActive ||
                          isEmployerListActive ||
                          isActiveInvoice ||
                          jobSeekerListActive
                        ? "active-link"
                        : "text-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div
          onClick={handleDelete}
          className={`flex items-center gap-3 px-4 cursor-pointer font-medium text-[12px] 2xl:text-[15px] text-red-600 ml-4`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="truncate">Log Out</span>
        </div>
      </div>
    </div>
  );
}
