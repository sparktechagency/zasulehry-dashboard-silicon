import React from "react";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchBar({
  title,
  options,
  palaceholder,
}: {
  title: string;
  options?: string[];
  palaceholder?: string;
}) {
  return (
    <div className="grid grid-cols-[auto_50%_auto] gap-3 mb-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-700">{title}</h1>
      </div>
      <div>
        <Input
          className="bg-white text-gray-600 w-full placeholder:text-gray-400 h-9 placeholder:capitalize text-[8px]"
          placeholder={palaceholder || "Search"}
        />
      </div>

      <div className="flex justify-end">
        <Select>
          <SelectTrigger className="w-32 !h-8 border-[#0288A6]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options?.map((option: string, index: number) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
