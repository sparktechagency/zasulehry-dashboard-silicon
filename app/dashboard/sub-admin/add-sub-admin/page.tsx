/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { sidebarMenu } from "@/sidebar/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function CreateAdmin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // ✅ MULTI SELECT STATE
  const [selectedMenus, setSelectedMenus] = useState<string[]>([]);
  const router = useRouter();

  /* ======================
     Select handlers
  ====================== */
  const handleSelect = (value: string) => {
    setSelectedMenus((prev) =>
      prev.includes(value) ? prev : [...prev, value]
    );
  };

  const removeMenu = (value: string) => {
    setSelectedMenus((prev) => prev.filter((v) => v !== value));
  };

  /* ======================
     Submit
  ====================== */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      ...data,
      adminPermissions: selectedMenus,
    };

    try {
      const res = await myFetch("/users/create-admin", {
        method: "POST",
        body: payload,
      });

      if (res.success) {
        toast.success(res?.message || "Sub Admin created successfully");
        reset();
        setSelectedMenus([]);
        router.push("/dashboard/sub-admin");
      } else {
        toast.error(res.message || "Failed to create Sub Admin");
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-[60%] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <Link href="/sub-admin">
          <div className="flex items-center gap-2 mb-4 text-black">
            <ArrowLeft className="w-5 h-5" />
            <h1 className="text-xl font-medium">Create Sub Admin</h1>
          </div>
        </Link>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <label className="text-[#333333] font-medium">User Name</label>
            <Input
              placeholder="Enter Sub Admin Name"
              className="placeholder:text-black mt-1 bg-white"
              {...register("name", {
                required: "User name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-[#333333] font-medium">Email</label>
            <Input
              type="email"
              placeholder="Enter Email"
              className="placeholder:text-black mt-1 bg-white"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-[#333333] font-medium">Password</label>
            <Input
              type="password"
              placeholder="Enter Password"
              className="placeholder:text-black mt-1 bg-white"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Select */}
          <div className="mt-7">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full !h-11">
                <SelectValue placeholder="Select menu" />
              </SelectTrigger>

              <SelectContent>
                {sidebarMenu.map((item: any) => (
                  <SelectItem
                    key={item.path}
                    value={item.path}
                    disabled={selectedMenus.includes(item.path)}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Selected Items */}
            {selectedMenus.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedMenus.map((menu) => {
                  const label =
                    sidebarMenu.find((i: any) => i.path === menu)?.label ||
                    menu;

                  return (
                    <span
                      key={menu}
                      className="flex items-center gap-1
                                 bg-[#0288A6] text-white
                                 px-3 py-1 rounded-full text-sm"
                    >
                      {label}
                      <button
                        type="button"
                        onClick={() => removeMenu(menu)}
                        className="ml-1 hover:text-red-200"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button className="btn-design py-3 w-80 mt-6 lg:text-xl" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
}
