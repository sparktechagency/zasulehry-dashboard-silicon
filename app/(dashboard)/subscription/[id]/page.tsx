"use client";
import React, { Suspense, useState } from "react";
import { ArrowLeft, CheckCircle2, MinusCircle, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Button from "@/components/share/Button";

import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SubscriptionIdSuscription() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [, setOpen] = useState(false);
  const [days, setDays] = useState(0);
  const [month, setMonth] = useState(0);
  const [percent, setPercent] = useState("");
  const [offers, setOffers] = useState([
    "120 day permission to use",
    "Free training tutorial",
    "Free journal",
    "Free consultations",
    "20 Community post",
  ]);
  const [newOffer, setNewOffer] = useState("");

  const [priceToggle, setPriceToggle] = useState("");

  function addOffer() {
    if (newOffer.trim() === "") return;
    setOffers([...offers, newOffer.trim()]);
    setNewOffer("");
  }

  function removeOffer(index: number) {
    setOffers(offers.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Your submit logic here
    setOpen(false); // Close modal after submit
  }

  return (
    <div className="w-[50%] mx-auto">
      <div>
        <Link href="/subscription">
          <div className="flex items-center  gap-2 mb-4 text-black">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xl font-semibold ">
              {type === "new" ? "Add Subscriber" : "Edit Subscriber"}
            </span>
          </div>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Plan Name
          </label>
          <Input className="bg-white placeholder-black" placeholder="Title" />
        </div>
        <div>
          <div className="">
            <button
              className={`${
                priceToggle === "one" && "btn-design "
              } px-3 h-10 rounded-md ml-2 border border-[#0288A6] cursor-pointer`}
              onClick={() => setPriceToggle("one")}
            >
              Price(Per Day)
            </button>
            <button
              className={`${
                priceToggle === "two" && "btn-design"
              } px-3 h-10 rounded-md ml-2 border border-[#0288A6] cursor-pointer`}
              onClick={() => setPriceToggle("two")}
            >
              Price(Per Month)
            </button>
          </div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price
          </label>
          {/* Price */}
          <div>
            <Input className="bg-white placeholder-black" placeholder="Price" />
            {/* <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="day">Per Day</SelectItem>
                    <SelectItem value="month">Per Month</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}
          </div>
        </div>
        <div>
          <label htmlFor="days" className="block text-sm font-medium mb-1">
            Days
          </label>
          <Input
            id="days"
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full bg-white"
            min={0}
            max={31}
          />
        </div>
        {/* <div>
          <label htmlFor="percent" className="block text-sm font-medium mb-1">
            Percenter Choice
          </label>
          <Input
            id="percent"
            type="text"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="w-full bg-white"
            min={0}
            max={31}
          />
        </div> */}
        <div>
          <label htmlFor="month" className="block text-sm font-medium mb-1">
            Month
          </label>
          <Input
            id="month"
            type="number"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full bg-white"
            min={0}
            max={31}
          />
        </div>

        {/* Offers */}
        <div>
          <label className="block text-sm font-medium">Package Offers</label>

          <div className="mt-4 flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Add new offer"
              value={newOffer}
              onChange={(e) => setNewOffer(e.target.value)}
              className="flex-grow rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#0288A6]"
            />
            <button
              type="button"
              onClick={addOffer}
              className="inline-flex items-center px-4 py-2 btn-design rounded-md cursor-pointer"
              aria-label="Add offer"
            >
              <PlusCircle size={20} />
            </button>
          </div>

          <div className=" border border-gray-300 rounded-md p-3 space-y-3 bg-gray-50">
            {offers.length === 0 && (
              <p className="text-sm text-gray-500">No offers added yet.</p>
            )}
            {offers.map((offer, i) => (
              <div
                key={i}
                className="flex justify-between items-center space-x-2"
              >
                <div className="flex items-center space-x-2 text-gray-800">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span>{offer}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeOffer(i)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove offer ${offer}`}
                >
                  <MinusCircle size={18} />
                </button>
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="days" className="block text-sm font-medium mb-1">
              Information
            </label>
            <Textarea id="info" className=" bg-white min-h-[100px] break-all" />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full btn-design text-lg font-semibold rounded-md  duration-200 mb-5"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default function SubscriptionId() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionIdSuscription />
    </Suspense>
  );
}
