"use client";
import React, { Suspense, useEffect } from "react";
import { ArrowLeft, CheckCircle2, MinusCircle, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Button from "@/components/share/Button";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { revalidate } from "@/utils/revalidateTags";

type FormData = {
  name: string;
  dailyPrice: number;
  intervalCount: number;
  benefits: { value: string }[];
  description: string;
  newOffer: string;
};

function SubscriptionIdSuscription() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const { register, control, handleSubmit, watch, setValue, reset } =
    useForm<FormData>({
      defaultValues: {
        name: "",
        description: "",
        dailyPrice: 0,
        intervalCount: 0,
        benefits: [],
        newOffer: "",
      },
    });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await myFetch(`/packages/${id}`);
        const data = res?.data;
        if (!data) return;

        reset({
          name: data.name ?? "",
          description: data?.description ?? "",
          dailyPrice: Number(data.dailyPrice) || 0,
          intervalCount: data.intervalCount ?? 0,
          benefits: data.benefits?.map((b: string) => ({ value: b })) ?? [],
          newOffer: "",
        });
      } catch (error) {
        console.error("Failed to fetch package", error);
      }
    };

    fetchData();
  }, [id, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
  });

  const newOfferValue = watch("newOffer");

  const addOffer = () => {
    if (!newOfferValue.trim()) return;
    append({ value: newOfferValue.trim() });
    setValue("newOffer", "");
  };

  const onSubmit = async (data: FormData) => {
    const update = {
      name: data.name,
      description: data.description,
      benefits: data.benefits.map((b) => b.value),
    };

    try {
      const res = await myFetch(`/packages/update/${id}`, {
        method: "PATCH",
        body: update,
      });

      if (res?.success) {
        toast.success(res?.message);
        revalidate("package");
        router.push("/subscription");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="w-[50%] mx-auto">
      <div>
        <Link href="/subscription">
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
              disabled
            />
          </div>
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium mb-1">
            Month
          </label>
          <Input
            {...register("intervalCount", { valueAsNumber: true })}
            id="month"
            type="number"
            className="w-full bg-white"
            min={0}
            max={31}
            disabled
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
            {fields.length === 0 && (
              <p className="text-sm text-gray-500">No offers added yet.</p>
            )}
            {fields.map((field, i) => (
              <div
                key={field.id}
                className="flex justify-between items-center space-x-2"
              >
                <div className="flex items-center space-x-2 text-gray-800">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <span>{field.value}</span>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-red-500 hover:text-red-700"
                  aria-label={`Remove offer ${field.value}`}
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
          className="w-full btn-design text-lg font-semibold rounded-md duration-200 mb-5"
        >
          Submit
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
