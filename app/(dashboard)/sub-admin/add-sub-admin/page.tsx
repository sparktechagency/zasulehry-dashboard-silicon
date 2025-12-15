"use client";

import { Input } from "@/components/ui/input";
import { ArrowLeft, Check } from "lucide-react";

import { useState } from "react";
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
  MessageCircleMore,
  CreditCard,
  PanelBottom,
  FileTerminal,
  Users,
} from "lucide-react";
import Link from "next/link";

const radio = [
  { id: 1, label: "Overview", icon: LayoutGrid, path: "/" },
  { id: 2, label: "All Job Seeker", icon: User, path: "/all-job-seeker" },
  {
    id: 3,
    label: "All Employer List",
    icon: Users,
    path: "/all-employee-list",
  },
  { id: 4, label: "Category System", icon: List, path: "/all-category" },
  {
    id: 5,
    label: "Subscription Plan",
    icon: SquarePlus,
    path: "/subscription",
  },
  {
    id: 6,
    label: "Subscribed  Users",
    icon: UserPlus,
    path: "/subscriber-users",
  },
  {
    id: 20,
    label: "Payment/Invoices",
    icon: CreditCard,
    path: "/payment-invoices",
  },
  { id: 7, label: "Upload Document", icon: Plus, path: "/upload-document" },

  { id: 9, label: "Support Request", icon: Phone, path: "/support" },
  {
    id: 10,
    label: "Verify Request",
    icon: CheckCheck,
    path: "/verify-request",
  },
  { id: 11, label: "Privacy Policy", icon: Shield, path: "/privacy-policy" },
  {
    id: 12,
    label: "Terms & Condition",
    icon: FileTerminal,
    path: "/terms-condition",
  },
  { id: 14, label: "Impressum", icon: PanelBottom, path: "/impressum" },
  { id: 13, label: "Create Sub Admin", icon: UserStar, path: "/sub-admin" },
  { id: 15, label: "Inbox", icon: MessageCircleMore, path: "/inbox" },
  // { id: 8, label: "My Profile", icon: UserPen, path: "/my-profile" },
  // { id: 16, label: "Log Out", icon: LogOut, path: "/login" },
];

export default function CreateAdmin() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    repaidPassword: "",
    selectedMethod: "",
    selectedOptions: [],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function toggleItem(name: string) {
    setSelectedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  }

  return (
    <div className="w-[60%] mx-auto">
      <form>
        <Link href="/sub-admin">
          <div className="flex items-center gap-2 mb-4 text-black">
            <ArrowLeft className="w-5 h-5" />
            <h1 className="text-xl font-medium">Create Sub Admin</h1>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <label className="text-[#333333] font-medium mb-">User Name</label>
            <Input
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter Sub Admin Name"
              className="bg-white mt-1"
            />
          </div>
          <div>
            <label className="text-[#333333] font-medium mb-1">
              Email (Optional)
            </label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
              className="bg-white mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[#333333] font-medium mb-1">Password</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter New Password"
              className="bg-white mt-1"
            />
          </div>
          <div>
            <label className="text-[#333333] font-medium mb-1">
              Repaid Password
            </label>
            <Input
              type="password"
              name="repaidPassword"
              value={formData.repaidPassword}
              onChange={handleInputChange}
              placeholder="Enter Repaid Password"
              className="bg-white mt-1"
            />
          </div>
        </div>

        {/* select radio */}
        {/* <div>
              <label className="text-[#0288A6] font-medium mb-1 text-xl">
                Select Method
              </label>
              <RadioGroup
                defaultValue=""
                className="border border-[#0288A6] rounded-lg p-3 mt-4"
              >
                <div className="grid grid-cols-3 gap-3">
                  {radio.map((item) => (
                    <div className="flex gap-2" key={item.name}>
                      <RadioGroupItem value={item.name} id={item.name} />
                      <Label htmlFor="r1">{item.name}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div> */}

        <div>
          <label className="text-color font-medium mb-1 text-xl">
            Select Method
          </label>
          {/* import { Check } from "lucide-react"; // ✅ for white check icon */}

          <div className="border border-[#0288A6]  p-3 mt-4">
            <div className="grid grid-cols-2  xl:grid-cols-3 gap-3">
              {radio.map((item) => {
                const isChecked = selectedItems.includes(item.label);
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex gap-2 items-center cursor-pointer text-[#343434]"
                    onClick={() => toggleItem(item.label)}
                  >
                    <div
                      className={`
                            w-5 h-5 flex items-center justify-center rounded-full
                            border border-[#0288A6]
                            ${isChecked ? "bg-[#0288A6]" : "bg-white"}
                          `}
                    >
                      {isChecked && <Check size={14} className="text-white" />}
                    </div>
                    <Icon className="w-5 h-5 shrink-0 text-[#343434]" />
                    <label className="cursor-pointer font-medium">
                      {item.label}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <button className="btn-design py-3 w-80 mt-6 lg:text-xl" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}
