import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function YourAddress({
  title,
  trigger,
}: {
  title: string;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent>
        <Label>{title}</Label>
        <div>
          <Input
            className="bg-white my-1 placeholder:text-black"
            placeholder="Company name"
          />
          <div className="grid grid-cols-[60%_auto] gap-2">
            <Input
              className="bg-white my-1 placeholder:text-black"
              placeholder="enter street name"
            />
            <Input
              className="bg-white my-1 placeholder:text-black"
              placeholder="House Number"
            />
          </div>
          <Input
            className="bg-white my-1 placeholder:text-black"
            placeholder="Postal Code"
          />
          <Input
            className="bg-white my-1 placeholder:text-black"
            placeholder="City"
          />
          <Input
            className="bg-white my-1 placeholder:text-black"
            placeholder="Country"
          />
        </div>

        <button className="btn-design py-3">Submit</button>
      </DialogContent>
    </Dialog>
  );
}
