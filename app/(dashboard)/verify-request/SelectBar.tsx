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

export default function SelectBar({
  options,
}: {
  options: { label: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

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
    <div className="grid grid-cols-[auto_50%_auto] gap-3">
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
