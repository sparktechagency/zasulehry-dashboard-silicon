"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import Button from "@/components/share/Button";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTags";
import { useForm, useFieldArray } from "react-hook-form";

/* =======================
   Types
======================= */

type JobCategory = {
  _id?: string;
  title: string;
  name: string;
  subCategories: string[]; // API shape
};

type SubCategoryEditProps = {
  title?: string;
  trigger: React.ReactNode;
  category?: JobCategory;
};

type SubCategoryFormData = {
  name: string;
  subCategories: { value: string }[]; // RHF field array shape
};

/* =======================
   Component
======================= */

export function SubCategoryEdit({
  title,
  trigger,
  category,
}: SubCategoryEditProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SubCategoryFormData>({
    defaultValues: {
      name: "",
      subCategories: [],
    },
  });

  const { fields, append, remove } = useFieldArray<
    SubCategoryFormData,
    "subCategories"
  >({
    control,
    name: "subCategories",
  });

  /* =======================
     Sync category → form
  ======================= */
  useEffect(() => {
    if (category) {
      reset({
        name: category.name || "",
        subCategories: category.subCategories?.map((s) => ({ value: s })) || [],
      });
    }
  }, [category, reset]);

  /* =======================
     Submit
  ======================= */
  const onSubmit = async (data: SubCategoryFormData) => {
    setLoading(true);
    setError(null);

    const isEdit = Boolean(category?._id);

    const payload = {
      name: data.name,
      subCategories: data.subCategories.map((s) => s.value),
    };

    try {
      const res = await myFetch(
        isEdit ? `/categories/update/${category?._id}` : `/categories/create`,
        {
          method: isEdit ? "PATCH" : "POST",
          body: payload,
        },
      );

      if (!res?.success) {
        toast.error(res?.message || "Operation failed");
      } else {
        toast.success(
          isEdit
            ? "Category updated successfully"
            : "Category created successfully",
        );
        revalidate("categories");
        setOpen(false);
        reset();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     UI
  ======================= */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category name */}
          <div className="grid gap-2">
            <Label className="text-lg">{title}</Label>
            <Input
              className="bg-gray-100"
              {...register("name", {
                required: "Category name is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Sub categories */}
          {title && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Sub Categories</Label>
                <button
                  type="button"
                  onClick={() => append({ value: "" })}
                  className="text-green-600 hover:text-green-700"
                >
                  <Plus />
                </button>
              </div>

              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Input
                      className="flex-1 bg-white"
                      placeholder="Enter sub category"
                      {...register(`subCategories.${index}.value` as const, {
                        required: "Sub category is required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Minus />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          {/* Footer */}
          <DialogFooter>
            <Button
              type="submit"
              className="btn-design w-full"
              // disabled={loading}
            >
              {loading ? "Saving..." : "Publish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
