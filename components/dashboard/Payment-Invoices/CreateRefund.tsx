"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import YourAddress from "./YourAddress";
import { useRef, useState } from "react";
import OldAddress from "./OldAddress";

export function CreateRefund({ trigger }: { trigger: React.ReactNode }) {
  const [oldAddress, setOldAddress] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleShow = () => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
    setOldAddress((prev) => !prev); // Just toggle state
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px] ">
          {/* your address */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-1 mt-10">
            <span className="flex-grow text-gray-700 font-medium">
              Your Address
            </span>
            <button className="mr-3 cursor-pointer" onClick={handleShow}>
              <IoIosArrowDown />
            </button>
            <YourAddress
              title="Your Address"
              trigger={
                <button className="border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition">
                  <Plus />
                </button>
              }
            />
          </div>
          {/* old address show here */}
          {oldAddress && (
            <div ref={ref} className="bg-[#E6E6E6] rounded-md p-1">
              <OldAddress />
            </div>
          )}

          {/* tax info */}
          <div>
            <Label>Tax Info</Label>
            <div className="m">
              <div>
                <Input
                  placeholder="Tax No"
                  className="bg-white placeholder:text-black"
                />
              </div>
              <div className="my-2">
                <Input
                  placeholder="De No"
                  className="bg-white placeholder:text-black"
                />
              </div>

              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sales Tax 19%" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Sales Tax 19% </SelectItem>
                      <SelectItem value="banana">Sales Tax 7%</SelectItem>
                      <SelectItem value="blueberry">Sales Tax 0%</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* your address */}
          <div>
            <Label>Contact Info</Label>
            <Input
              className="bg-white my-1 placeholder:text-black"
              placeholder="Contact Number"
            />
            <Input
              className="bg-white my-1 placeholder:text-black"
              placeholder="Email Address"
            />
          </div>
          {/* account number */}
          <div>
            <Label>Account Number</Label>
            <Input
              className="bg-white my-1 placeholder:text-black"
              placeholder="Bank Name"
            />
            <Input
              className="bg-white my-1 placeholder:text-black"
              placeholder="IBAN Number"
            />
            <Input
              className="bg-white my-1 placeholder:text-black"
              placeholder="Bic Number"
            />
          </div>
          <button className="capitalize btn-design py-2 text-lg">
            save changes
          </button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
