"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AdminOtp from "../dashboard/admin-otp/AdminOtp";

const data: {
  label: string;
  name: "oldPassword" | "newPassword" | "confirmPassword";
  placeholder: string;
}[] = [
  {
    label: "Old Password",
    name: "oldPassword",
    placeholder: "Enter Old Password",
  },
  {
    label: "New Password",
    name: "newPassword",
    placeholder: "Enter New Password",
  },
  {
    label: "Confirm New Password",
    name: "confirmPassword",
    placeholder: "Confirm New Password",
  },
];

export default function ChangePassword() {
  // Track visibility for each password field separately
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Toggle visibility for a specific field
  const toggleVisibility = (name: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className=" flex items-center justify-center bg-[#F6F6F6] px-4 my-5 text-gray-700">
      <div className=" w-[40%] mx-auto bg-white p-8 rounded-md shadow-md space-y-6 ">
        <h2 className="text-center text-2xl font-semibold">Change Password</h2>

        {data.map(({ label, name, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1 2xl:text-lg">
              {label}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={formData[name as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
                className="w-full px-4 py-2 rounded border"
              />
              <button
                type="button"
                onClick={() => toggleVisibility(name)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={`Toggle visibility for ${label}`}
              >
                {showPassword[name] ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Confirm Button */}
        <AdminOtp
          trigger={
            <button className="w-full btn-design font-semibold py-2 rounded cursor-pointer 2xl:text-lg">
              Confirm
            </button>
          }
        />
      </div>
    </div>
  );
}
