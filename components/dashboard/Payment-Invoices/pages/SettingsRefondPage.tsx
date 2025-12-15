"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import YourAddress from "../YourAddress";
import OldAddress from "../OldAddress";
import AddMoreModal from "../AddMoreModal";
import Link from "next/link";

const formFields1 = [
  { id: "company-name", placeholder: "Enter Customer Id" },
  { id: "street-name", placeholder: "1234" },
  { id: "street-name", placeholder: "1234" },
];
const formFields2 = [
  { id: "refund-number", placeholder: "Refund number(automatically genaret)" },
  // { id: "refund-number", placeholder: "Refund Number" },
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

export function SettingsRefondPage() {
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

  // kk
  return (
    <div className="w-[50%] mx-auto">
      <h1 className="text-xl font-medium text-gray-700">
        <Link href="/payment-invoices" className="flex items-center">
          <IoIosArrowBack size={24} />
          <span>Create Invoice/Refund</span>
        </Link>
      </h1>
      <form>
        <div className="">
          <div>
            {/* Your Address Section */}
            <div className="flex items-center border border-gray-300 rounded-md px-4  py-1 mt-3">
              <span className="flex-grow text-[#343434] font-medium text-sm 2xl:text-lg">
                Your Address
              </span>
              <div
                className="mr-3 cursor-pointer"
                onClick={handleShowYourAddress}
              >
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
              <span className="flex-grow text-[#343434] font-medium text-sm 2xl:text-lg">
                Customer Address
              </span>
              <div
                className="mr-3 cursor-pointer"
                onClick={handleShowCustomerAddress}
              >
                <IoIosArrowDown />
              </div>
              <YourAddress
                title="Customer Address"
                trigger={
                  <div className="border border-gray-300 rounded-full p-1 hover:bg-gray-100 transition cursor-pointer">
                    <Plus />
                  </div>
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
          <div className="w-full mt-3">
            {formFields1.map((field) => {
              const defaultValue = field.id === "street-name";
              return (
                <div key={field.id}>
                  <Input
                    disabled={defaultValue}
                    className="bg-white placeholder:text-[#343434] mb-2 font-medium h-10 2xl:text-sm"
                    id={field.id}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            })}

            {/* refond */}
            <div className="">
              <select
                name="cars"
                id="cars"
                className="w-full mt-2 h-10 bg-white border border-gray-300 rounded-md px-2 mb-2 text-[12px] font-semibold text-gray-700 2xl:text-sm"
              >
                <div className="mt-3">
                  <option value="saab">Refund</option>
                  <option value="volvo">Invoice</option>
                  <option value="mercedes">Cancellation</option>
                </div>
              </select>
            </div>

            {formFields2.map((field) => {
              const defaultValue = field.id === "street-name";
              return (
                <div key={field.id}>
                  <Input
                    disabled={defaultValue}
                    className="bg-white placeholder:text-[#343434] mb-2 font-medium h-10 2xl:text-sm"
                    id={field.id}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            })}

            <div className="w-full p-2 border border-[#0288A6] rounded-md mb-3">
              {enteriesData.map((field, index) => (
                <div key={field.id} className="flex">
                  <Input
                    className="bg-white placeholder:text-[#343434] mb-2 font-medium h-9 2xl:text-sm"
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
                  <span className="btn-design py-2 px-5 mt-5 ">Add More</span>
                }
              />
            </div>

            {/* enteries   */}

            {/* sales */}
            <div className="mt-2">
              <select
                name="cars"
                id="cars"
                className="w-full mt-2 h-10 border border-gray-300 rounded-md px-2"
              >
                <option value="saab">Sales Tax 19% </option>
                <option value="volvo">Sales Tax 7%</option>
                <option value="mercedes">Sales Tax 0%</option>
                <option value="Umsatzsteuerfrei nach § 19 Abs. 1 UStG">
                  Umsatzsteuerfrei nach § 19 Abs. 1 UStG
                </option>
              </select>
            </div>

            {/*  textarea*/}
            <div className="mt-2 w-full ">
              <Textarea placeholder="Type Here" className="w-full  break-all" />
            </div>

            <button className="capitalize btn-design py-2 2xl:text-lg w-full mt-4">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
