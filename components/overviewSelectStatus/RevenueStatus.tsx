"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function RevenueSelect({
  options,
}: {
  options: { label: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === "All") {
      params.delete("revenue"); // 👈 remove from URL
    } else {
      params.set("revenue", status);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-[auto_50%_auto] gap-3">
      <div className="flex justify-end">
        <Select
          onValueChange={handleStatus}
          value={searchParams.get("revenue") || ""}
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
