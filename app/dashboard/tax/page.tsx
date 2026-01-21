"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { myFetch } from "@/utils/myFetch";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [tax, setTax] = useState("");

  // Fetch existing tax percentage
  useEffect(() => {
    const fetchPolicy = async () => {
      const res = await myFetch("/policy");
      if (res?.success) {
        setTax(res?.data?.taxPercentage?.toString() || "");
      }
    };

    fetchPolicy();
  }, []);

  const handleUpdateTax = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await myFetch("/policy", {
        method: "POST",
        body: { taxPercentage: Number(tax) },
      });

      if (res.success) {
        toast.success("Tax percentage updated successfully!");
      } else {
        toast.error(res?.error || "Failed to update tax percentage.");
      }
    } catch {
      toast.error("An error occurred while updating tax percentage.");
    }
  };

  return (
    <div className=" flex items-center justify-center mt-72">
      <form
        onSubmit={handleUpdateTax}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md"
      >
        <h1 className="text-lg font-semibold mb-4 text-center">
          Tax Calculator
        </h1>

        <Input
          type="number"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          placeholder="Enter tax percentage"
          className="mb-4 bg-white placeholder:text-black"
        />

        <Button
          type="submit"
          className="w-full btn-design text-white py-2 rounded-lg font-medium"
        >
          Update Tax
        </Button>
      </form>
    </div>
  );
}
