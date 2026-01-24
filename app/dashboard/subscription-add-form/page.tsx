"use client";
import React, { Suspense, useState } from "react";
import { ArrowLeft, CheckCircle2, MinusCircle, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { revalidate } from "@/utils/revalidateTags";
import { Button } from "@/components/ui/button";

type FormData = {
  name: string;
  dailyPrice: number;
  intervalCount: number;
  benefits: string[];
  description: string;
  newOffer: string;
};

function SubscriptionIdSuscription() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      dailyPrice: 0,
      intervalCount: 0,
      benefits: [],
      newOffer: "",
    },
  });

  const benefits = watch("benefits");
  const newOffer = watch("newOffer"); // Add this line

  const addOffer = () => {
    if (!newOffer.trim()) return;
    setValue("benefits", [...benefits, newOffer.trim()]);
    setValue("newOffer", "");
  };

  const removeOffer = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    setValue("benefits", newBenefits);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const add = {
      name: data.name,
      interval: "month",
      dailyPrice: Number(data.dailyPrice),
      intervalCount: data.intervalCount,
      description: data.description,
      benefits: data.benefits,
    };

    try {
      const res = await myFetch(`/packages/create`, {
        method: "POST",
        body: add,
      });

      console.log("res", res);

      if (res?.success) {
        toast.success(res?.message);
        revalidate("package");
        router.push("/dashboard/subscription");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] mx-auto">
      <div>
        <Link href="/dashboard/subscription">
          <div className="flex items-center gap-2 mb-4 text-black">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xl font-semibold">
              {id ? "Edit Subscriber" : "Add Subscriber"}
            </span>
          </div>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label htmlFor="planName" className="block text-sm font-medium mb-1">
            Plan Name
          </label>
          <Input
            {...register("name")}
            className="bg-white placeholder-black"
            placeholder="Title"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Per Day Price
          </label>
          <div>
            <Input
              {...register("dailyPrice")}
              className="bg-white placeholder-black"
              placeholder="Price"
              type="number"
              step="0.01"
            />
          </div>
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium mb-1">
            Days
          </label>
          <Input
            {...register("intervalCount", { valueAsNumber: true })}
            id="month"
            type="number"
            className="w-full bg-white"
            min={0}
          />
        </div>
        {/* description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <Textarea {...register("description")} className="w-full bg-white" />
        </div>

        {/* Offers */}
        <div>
          <label className="block text-sm font-medium">Package Offers</label>

          <div className="mt-4 flex space-x-2 mb-2">
            <input
              {...register("newOffer")}
              type="text"
              placeholder="Add new offer"
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

          <div className="border border-gray-300 rounded-md p-3 space-y-3 bg-gray-50">
            {benefits.length === 0 && (
              <p className="text-sm text-gray-500">No offers added yet.</p>
            )}
            {benefits?.map((offer, i) => (
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
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className={`w-full  text-lg font-semibold rounded-md duration-200 mb-5 bg-gradient-to-r from-[#083E4B] to-[#0288A6] ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Submiting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default function SubscriptionForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionIdSuscription />
    </Suspense>
  );
}
