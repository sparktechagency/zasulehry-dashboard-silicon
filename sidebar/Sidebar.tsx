"use client";

import {
  LayoutGrid,
  User,
  List,
  SquarePlus,
  UserPlus,
  Plus,
  Phone,
  CheckCheck,
  Shield,
  UserStar,
  LogOut,
  UserPen,
  CreditCard,
  PanelBottom,
  FileTerminal,
  Users,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const sidebarMenu = [
  { id: 1, label: "Overview", icon: LayoutGrid, path: "/dashboard" },
  {
    id: 2,
    label: "All Job Seeker",
    icon: User,
    path: "/dashboard/all-job-seeker",
  },
  {
    id: 3,
    label: "All Employer List",
    icon: Users,
    path: "/dashboard/all-employee-list",
  },
  {
    id: 4,
    label: "Category System",
    icon: List,
    path: "/dashboard/all-category",
  },
  {
    id: 5,
    label: "Subscription Plan",
    icon: SquarePlus,
    path: "/dashboard/subscription",
  },
  {
    id: 6,
    label: "Subscribed  Users",
    icon: UserPlus,
    path: "/dashboard/subscriber-users",
  },
  {
    id: 20,
    label: "Payment/Invoices",
    icon: CreditCard,
    path: "/dashboard/payment-invoices",
  },
  {
    id: 7,
    label: "Upload Documents",
    icon: Plus,
    path: "/dashboard/upload-document",
  },

  { id: 9, label: "Support Request", icon: Phone, path: "/dashboard/support" },
  {
    id: 10,
    label: "Verify Request",
    icon: CheckCheck,
    path: "/dashboard/verify-request",
  },

  {
    id: 11,
    label: "Privacy Policy",
    icon: Shield,
    path: "/dashboard/privacy-policy",
  },
  {
    id: 12,
    label: "Terms & Condition",
    icon: FileTerminal,
    path: "/dashboard/terms-condition",
  },
  {
    id: 14,
    label: "Impressum",
    icon: PanelBottom,
    path: "/dashboard/impressum",
  },
  {
    id: 13,
    label: "Create Sub Admin",
    icon: UserStar,
    path: "/dashboard/sub-admin",
  },
  { id: 8, label: "My Profile", icon: UserPen, path: "/dashboard/my-profile" },
  // {
  //   id: 21,
  //   label: "My Number",
  //   icon: Phone,
  //   path: "/dashboard/number-verification",
  // },
  // {
  //   id: 22,
  //   label: "Tax Calculator",
  //   icon: Calculator,
  //   path: "/dashboard/tax",
  // },
  {
    id: 23,
    label: "Manage Contact Info",
    icon: Phone,
    path: "/dashboard/contact",
  },
];

import Image from "next/image";
import { deleteCookie } from "cookies-next/client";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

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
        <div className="px-4 space-y-1 text-sm overflow-y-auto ">
          {sidebarMenu.map((item) => {
            const isEmployerListActive =
              item.path === "/all-employee-list" &&
              (pathname === "/all-employee-list" ||
                pathname.startsWith("/employee-details"));

            const isActiveInvoice =
              item.path === "/payment-invoices" &&
              (pathname === "/settings-refund" ||
                pathname === "/settings-page");

            const jobSeekerListActive =
              item.path === "/all-job-seeker" &&
              (pathname === "/all-job-seeker" ||
                pathname.startsWith("/job-seeker-details"));

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
