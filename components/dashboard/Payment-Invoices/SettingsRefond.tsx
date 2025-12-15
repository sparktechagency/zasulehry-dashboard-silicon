"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IoIosArrowDown } from "react-icons/io";
import YourAddress from "./YourAddress";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import OldAddress from "./OldAddress";
import AddMoreModal from "./AddMoreModal";

const formFields = [
  { id: "company-name", placeholder: "Enter Customer Id" },
  { id: "street-name", placeholder: "1234" },
  { id: "street-name", placeholder: "1234" },
  { id: "city", placeholder: "refund number(automatically genaret)" },
  { id: "customer-id", placeholder: "Enter Customer ID" },
  { id: "refund-number", placeholder: "Refund Number" },
  { id: "invoice-number", placeholder: "Invoice Number" },
];

const enteries = [
  { id: "position", placeholder: "Enter Position" },
  { id: "details", placeholder: "Enter Details" },
  { id: "quantity", placeholder: "Enter Quantity" },
  { id: "net-price", placeholder: "Enter Net Price" },
];

type FormFields = {
  id: string;
  placeholder: string;
};

export function SettingsRefond({ trigger }: { trigger: React.ReactNode }) {
  const [enteriesData] = useState<FormFields[]>(enteries);
  const [showYourAddress, setShowYourAddress] = useState(false);
  const [showCustomerAddress, setShowCustomerAddress] = useState(false);
  const yourAddressRef = useRef(null);
  const customerAddressRef = useRef(null);

  const handleShowYourAddress = () => {
    setShowYourAddress((prev) => !prev);
  };

  const handleShowCustomerAddress = () => {
    setShowCustomerAddress((prev) => !prev);
  };

  // const handleMore = () => {
  //   setEnteriesData((prev: any) => [...prev, ""]);
  // };

  // const handleDelete = (index: number) => {
  //   const filter = enteriesData.filter((_, i) => i !== index);
  //   setEnteriesData(filter);
  //   // setEnteriesData((prev: any) => prev.filter(prev !== index));
  // };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="h-[70vh] overflow-y-scroll">
          <div>
            {/* Your Address Section */}
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-1 mt-10">
              <span className="flex-grow text-[#343434] font-medium">
                Your Address
              </span>
              <button
                className="mr-3 cursor-pointer"
                onClick={handleShowYourAddress}
              >
                <IoIosArrowDown />
              </button>
              <YourAddress
                title="Your Address"
                trigger={
                  <button className="border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition cursor-pointer">
                    <Plus />
                  </button>
                }
              />
            </div>

            {showYourAddress && (
              <div
                ref={yourAddressRef}
                className="bg-[#E6E6E6] rounded-md p-1 mt-2"
              >
                <OldAddress />
              </div>
            )}

            {/* Customer Address Section */}
            <div className="flex items-center border border-gray-300 rounded-md px-4 py-1 mt-3">
              <span className="flex-grow text-[#343434] font-medium">
                Customer Address
              </span>
              <button
                className="mr-3 cursor-pointer"
                onClick={handleShowCustomerAddress}
              >
                <IoIosArrowDown />
              </button>
              <YourAddress
                title="Customer Address"
                trigger={
                  <button className="border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition cursor-pointer">
                    <Plus />
                  </button>
                }
              />
            </div>

            {showCustomerAddress && (
              <div
                ref={customerAddressRef}
                className="bg-[#E6E6E6] rounded-md p-1 mt-3"
              >
                <OldAddress />
              </div>
            )}
          </div>
          <div className="w-full p-2 ">
            {formFields.map((field) => {
              const defaultValue = field.id === "street-name";
              return (
                <div key={field.id}>
                  <Input
                    disabled={defaultValue}
                    className="bg-white placeholder:text-[#343434] mb-2 font-medium h-11"
                    id={field.id}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            })}

            <div className="w-full p-2 border border-[#0288A6] rounded-md">
              {enteriesData.map((field, index) => (
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
            </div>

            <div className="flex justify-end mb-4">
              <AddMoreModal
                trigger={
                  <button className="btn-design py-1 text-lg px-5 mt-4">
                    Add More
                  </button>
                }
              />
            </div>

            {/* enteries   */}

            {/* refond */}
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Refund" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Invoice</SelectItem>
                    <SelectItem value="banana">Refund</SelectItem>
                    <SelectItem value="blueberry">Cancellation</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* sales */}
            <div className="mt-2">
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

            {/*  textarea*/}
            <div className="mt-2">
              <Textarea placeholder="Type Here" className="w-[430px]" />
            </div>

            <button className="capitalize btn-design py-2 text-lg w-full mt-4">
              Submit
            </button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
