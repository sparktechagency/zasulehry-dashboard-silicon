"use client";

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
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

import { useRef, useState } from "react";
import YourAddress from "../YourAddress";
import OldAddress from "../OldAddress";
import Link from "next/link";

export function Settings() {
  const [oldAddress, setOldAddress] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleShow = () => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
    setOldAddress((prev) => !prev); // Just toggle state
  };

  return (
    <section className="w-[50%] mx-auto">
      <h1 className="text-xl font-medium text-gray-700">
        <Link href="/payment-invoices" className="flex items-center">
          <IoIosArrowBack size={24} />
          <span>Settings</span>
        </Link>
      </h1>
      <form>
        {/* your address */}
        <div className="flex items-center border border-gray-300 rounded-md px-4 py-1 mt-3">
          <span className="flex-grow text-gray-700 font-medium 2xl:text-lg">
            Your Address
          </span>
          <div className="mr-3 cursor-pointer" onClick={handleShow}>
            <IoIosArrowDown />
          </div>
          <YourAddress
            title="Your Address"
            trigger={
              <div className="border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition cursor-pointer">
                <Plus />
              </div>
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
                className="bg-white placeholder:text-gray-700 2xl:text-sm"
              />
            </div>
            <div className="my-2">
              <Input
                placeholder="De No"
                className="bg-white placeholder:text-gray-700 2xl:text-sm"
              />
            </div>

            <div>
              <Select>
                <SelectTrigger className="w-full xl:!h-11">
                  <SelectValue placeholder="Sales Tax 19%" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Sales Tax 19% </SelectItem>
                    <SelectItem value="banana">Sales Tax 7%</SelectItem>
                    <SelectItem value="blueberry">Sales Tax 0%</SelectItem>
                    <SelectItem value="Umsatzsteuerfrei nach § 19 Abs. 1 UStG">
                      Umsatzsteuerfrei nach § 19 Abs. 1 UStG
                    </SelectItem>
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
            className="bg-white my-1 placeholder:text-gray-700 "
            placeholder="Contact Number"
          />
          <Input
            className="bg-white my-1 placeholder:text-gray-700"
            placeholder="Email Address"
          />
        </div>
        {/* account number */}
        <div>
          <Label>Account Number</Label>
          <Input
            className="bg-white my-1 placeholder:text-gray-700"
            placeholder="Bank Name"
          />
          <Input
            className="bg-white my-1 placeholder:text-gray-700"
            placeholder="IBAN Number"
          />
          <Input
            className="bg-white my-1 placeholder:text-gray-700"
            placeholder="Bic Number"
          />
        </div>
        <button className="capitalize btn-design py-2 text-lg w-full my-4">
          save changes
        </button>
      </form>
    </section>
  );
}
