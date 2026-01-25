"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  reason: "duplicate" | "fraudulent" | "requested_by_customer";
};

const cancelReasons = [
  { label: "Duplicate", value: "duplicate" },
  { label: "Fraudulent", value: "fraudulent" },
  { label: "Requested by customer", value: "requested_by_customer" },
] as const;

export default function RefundModal({
  details,
  id,
  trigger,
}: {
  details: any;
  id: string;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      reason: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await myFetch("/invoices/refund", {
        method: "POST",
        body: {
          invoiceId: id,
          reason: data.reason,
        },
      });

      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        reset();
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Refund failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-2xl font-semibold text-center">Refund</h1>

          <div className="flex gap-3 font-medium">
            <p>Name : </p>
            <p>{details?.subscription?.package?.name}</p>
          </div>
          <div className="flex gap-3 font-medium">
            <p>Price : </p>
            <p>{details?.subscription?.price}</p>
          </div>
          <div className="flex gap-3 font-medium">
            <p>Status : </p>
            <p>{details?.status}</p>
          </div>

          <div className="space-y-1">
            <Label>Reason</Label>

            <Controller
              name="reason"
              control={control}
              rules={{ required: "Reason is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>

                    <SelectContent>
                      {cancelReasons.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {details?.status === "paid" && (
            <Button type="submit" className="w-full btn-design">
              Submit
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
