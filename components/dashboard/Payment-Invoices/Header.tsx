import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import React from "react";
import { Filter } from "./Filter";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-[24%]">
        <div className="relative">
          <Input
            placeholder="Search here"
            className="py-5 bg-white placeholder:text-black pl-9"
          />
        </div>
        <div className="absolute -mt-8 ml-2">
          <Search />
        </div>
      </div>
      <div>
        <Filter
          trigger={
            <button className="btn-design rounded-full h-10 w-10  cursor-pointer flex items-center justify-center">
              <SlidersHorizontal className="size-4 xl:size-5" />
            </button>
          }
        />
      </div>

      <div>
        <Link href="/settings-refund">
          {" "}
          <button className="capitalize border border-[#0288A6] rounded-2xl px-3 py-1.5 text-[#0288A6] font-medium cursor-pointer">
            create invoice/refund
          </button>
        </Link>
      </div>

      <div>
        <Link href="/settings-page">
          <button className="btn-design py-1.5 px-6 cursor-pointer text-lg">
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
}
