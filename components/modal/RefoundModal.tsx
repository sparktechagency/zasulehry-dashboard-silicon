"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function RefoundModal({
  id,
  trigger,
}: {
  id: string;
  trigger: React.ReactNode;
}) {
  const [refound, setRefound] = useState("");
  const [open, setOpen] = useState(false);

  const handleUpdateTax = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await myFetch("/invoices/refund", {
        method: "POST",
        body: {
          invoiceId: id,
          reason: refound,
        },
      });

      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(
          (res as any)?.error[0].message || "Failed to update tax percentage.",
        );
      }
    } catch {
      toast.error("An error occurred while updating tax percentage.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleUpdateTax} className="w-full ">
          <h1 className="text-lg font-semibold mb-4 text-center">Refound</h1>

          <Input
            type="text"
            value={refound}
            onChange={(e) => setRefound(e.target.value)}
            placeholder="Enter refound"
            className="mb-4 bg-white placeholder:text-black"
          />

          <Button
            type="submit"
            className="w-full btn-design text-white py-2 rounded-lg font-medium"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
