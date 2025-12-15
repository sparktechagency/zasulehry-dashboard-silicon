"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Your Radix Dialog wrapper components

export default function SubscriptionInfoModal({
  header,
  trigger,
}: {
  header?: string;
  trigger: React.ReactNode;
}) {
  const [, setOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Your submit logic here
    setOpen(false); // Close modal after submit
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-scroll bg-white rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-3">
            {header ? "Add Subscriber" : "Subscription Information  "}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <p className="text-justify text-[12px] 2xl:text-[16px] text-gray-600">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur architecto autem maxime voluptas. Sit veniam, amet,
              repellendus dolor veritatis dolores maxime reprehenderit placeat
              harum quia quas quaerat molestias iure dolorum quidem vel non id
              autem expedita eaque neque nisi minus in deserunt? Velit
              repudiandae odio soluta ab ducimus sit aspernatur, cupiditate
              officiis? Aperiam, nostrum nulla. Adipisci voluptatum maxime
              aliquam quia illo. Nam recusandae optio fugit porro. Fugiat
              perspiciatis consequatur molestias suscipit a temporibus inventore
              voluptas nemo officiis deleniti quis quia quisquam quasi ullam,
              incidunt tempora repellat totam? Delectus ratione nobis
              dignissimos, praesentium possimus, blanditiis numquam ipsa magni
              odio magnam culpa?
            </p>
          </div>

          {/* Submit */}
          {/* <Button
            type="submit"
            className="w-full btn-design text-lg font-semibold rounded-md  duration-200"
          >
            Submit
          </Button> */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
