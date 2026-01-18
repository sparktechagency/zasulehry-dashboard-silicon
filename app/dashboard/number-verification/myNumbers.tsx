"use client";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Inputs = {
  whatsApp: string;
};

export default function MyNumber({ res }: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { whatsApp: res?.whatsApp || "" },
  });

  useEffect(() => {
    reset({ whatsApp: res?.whatsApp });
  }, [res?.whatsApp, reset]);

  console.log("res", res);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await myFetch(`/contact`, {
        method: "POST",
        body: data,
      });

      if (res.success) {
        toast.success("Number is updated Successfully");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="rounded w-[50%] mx-auto mt-[10%]">
      <h1 className="text-xl">WhatsApp</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-3">
          <Input
            {...register("whatsApp", {
              required: "Whatsapp number is required",
            })}
            type="tel"
            placeholder="Enter Whatsapp Number Here"
            className="border bg-white placeholder:text-gray-400"
          />
          {errors.whatsApp && (
            <p className="text-red-500 text-sm">{errors.whatsApp.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Button className="btn-design h-12 text-xl mt-3">Add</Button>
        </div>
      </form>
    </div>
  );
}
