import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";
import React, { useState } from "react";
import { toast } from "sonner";

type SupportItem = {
  _id: string;
  status: string;
};

export default function SupportStatusChange({
  trigger,
  item,
}: {
  trigger: React.ReactNode;
  item: SupportItem;
}) {
  const [open, setOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await myFetch(`/supports/update/${item._id}`, {
        method: "PATCH",
        body: { status: "Resolved" },
      });

      if (res.success) {
        toast.success(res.message || "Support marked as resolved!");
        await revalidate("support");
      } else {
        toast.error((res as any)?.error?.[0]?.message || "Failed to update");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Mark Support as Resolved</h2>
            {/* <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to mark this support request as resolved?
            </p> */}
          </div>

          {item.status === "Pending" && (
            <DialogFooter className=" gap-2">
              <Button
                type="submit"
                className="bg-green-600 w-full hover:bg-green-700 cursor-pointer"
              >
                Mark as Resolved
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
