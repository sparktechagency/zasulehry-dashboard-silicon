"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({
  title,
  options,
  palaceholder,
}: {
  title: string;
  options: { label: string; value: string }[];
  palaceholder?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [nameValue, setNameValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (nameValue.trim()) {
        params.set("name", nameValue);
      } else {
        params.delete("name");
      }

      router.replace(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [nameValue, searchParams, router]);

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "All") {
      params.delete("status"); // 👈 remove from URL
    } else {
      params.set("status", status);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-[auto_50%_auto] gap-3 mb-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">{title}</h1>
      </div>
      <div>
        <Input
          className="bg-white text-gray-600 w-full placeholder:text-gray-400 h-9 placeholder:capitalize text-[8px]"
          placeholder={palaceholder || "Search"}
          onChange={(e) => setNameValue(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Select
          onValueChange={handleStatus}
          value={searchParams.get("status") || ""}
        >
          <SelectTrigger className="w-32 !h-10 border-[#0288A6]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options?.map((option, index: number) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
