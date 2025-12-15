"use client";

import Button from "@/components/share/Button";
// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type InputField = {
  value: string;
};

export function AddCategory({
  trigger,
}: {
  title?: string;
  trigger: React.ReactNode;
}) {
  const [inputFields, setInputFields] = useState<InputField[]>([{ value: "" }]);

  const handleAddInput = () => {
    const newInput = [...inputFields];
    setInputFields([...newInput, { value: "" }]);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputValues = [...inputFields];
    newInputValues[index].value = event.target.value;
    setInputFields(newInputValues);
  };

  const removeInput = (index: number) => {
    const filteredFields = inputFields.filter((_, i) => i !== index);
    setInputFields(filteredFields);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {/* <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader> */}
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Category Name</Label>
              <Input
                name="name"
                className="bg-white placeholder:text-black"
                placeholder="Category Name"
              />
            </div>

            <div className="grid gap-3">
              <section className="flex justify-between">
                <Label htmlFor="name-1">Sub Category </Label>
                <span onClick={handleAddInput}>
                  <Plus />
                </span>
              </section>
              <section className="flex flex-col gap-2">
                {inputFields.map((field, index) => (
                  <section className="flex items-center gap-2" key={index}>
                    {/* Minus icon on the left */}

                    {/* Input on the right */}
                    <Input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleInputChange(index, e)}
                      className="flex-1 bg-white"
                    />

                    <span
                      onClick={() => removeInput(index)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    >
                      <Minus />
                    </span>
                  </section>
                ))}
              </section>
            </div>
          </div>

          <section className=" mt-6">
            <DialogFooter className="mt-1">
              <Button className="btn-design px-6 w-full" type="submit">
                Publish
              </Button>
            </DialogFooter>
          </section>
        </DialogContent>
      </form>
    </Dialog>
  );
}
