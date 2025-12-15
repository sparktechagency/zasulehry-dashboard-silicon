import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";

const enteries = [
  { id: "position", placeholder: "Enter Position" },
  { id: "details", placeholder: "Enter Details" },
  { id: "quantity", placeholder: "Enter Quantity" },
  { id: "net-price", placeholder: "Enter Net Price" },
];

export default function AddMoreModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <section className="mt-10">
          {enteries.map((field, index) => (
            <div key={field.id} className="flex">
              <Input
                className="bg-white placeholder:text-[#343434] mb-2 font-medium h-11"
                id={index.toString()}
                placeholder={field.placeholder}
              />
              {/* <button onClick={() => handleDelete(index)}>
                    <Minus />
                  </button> */}
            </div>
          ))}
          <button className="btn-design py-2 w-full mt-2 text-lg">
            Confirm
          </button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
