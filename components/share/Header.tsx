"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { myFetch } from "@/utils/myFetch";
import CustomImage from "@/share/CustomImage";

const auth = [
  { path: "/login" },
  { path: "/forgot-password" },
  { path: "/new-password" },
  { path: "/verify-otp" },
];

// const path = [
//   // { path: "/", label: "Dashboard" },
//   // { path: "/all-employe-list", label: "All Employer" },
//   // { path: "/all-worker", label: "All Worker" },
//   // { path: "/all-category", label: "All Category" },
//   // { path: "/home-page", label: "Home Page" },
//   // { path: "/about-us", label: "About Us" },
//   // { path: "/contact-us", label: "Contact Us" },
//   // { path: "/credit-list", label: "Credit List" },
//   // { path: "/change-password", label: "Change Password" },
//   // { path: "/terms-condition", label: "Terms & Condition" },
//   // { path: "/our-clients", label: "Our Cllients" },
//   // { path: "/support", label: "Support" },
//   // { path: "/faq", label: "FAQ" },
//   // { path: "/verify-request", label: "Verify Request" },
//   { path: "/profile", label: "Profile" },
//   { path: "/notification", label: "Notification" },
// ];

export default function Header() {
  const pathname = usePathname();
  const isAuthPage = auth.some((item) => item.path === pathname);
  // const activePath = path.find((item) => item.path === pathname);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/users/profile");
      setData(res?.data);
    };
    fetchData();
  }, []);

  return (
    <header className="h-14 overflow-hidden bg-white px-10 w-full">
      {!isAuthPage && (
        <div className="h-full flex items-center justify-end text-gray-700">
          <div className="flex items-center gap-4">
            <div className="relative bg-gray-100 p-1.5 rounded-full">
              <Link href="/dashboard/notification">
                <Bell className="w-4 h-4 text-gray-700" />
                {/* <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold"></span> */}
              </Link>
            </div>

            <Link href="/dashboard/my-profile">
              <div className="flex items-center gap-2">
                <CustomImage
                  src={data?.image}
                  width={40}
                  height={40}
                  title="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="leading-tight ">
                  <p className="font-semibold text-sm text-gray-700">
                    {data?.name}
                  </p>
                  <p className=" text-[12px] text-gray-700">{data?.role}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
