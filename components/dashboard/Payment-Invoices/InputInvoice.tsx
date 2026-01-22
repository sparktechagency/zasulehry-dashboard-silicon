"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InputInvoice() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleParams = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
      <Input
        placeholder="Search here"
        className="py-5 bg-white placeholder:text-black pl-9"
        onChange={(e) => handleParams(e.target.value)}
      />
    </div>
  );
}
