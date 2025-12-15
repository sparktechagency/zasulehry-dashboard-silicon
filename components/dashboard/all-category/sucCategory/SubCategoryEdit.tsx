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

type JobCategory = {
  _id: string;
  title: string;
  name: string;
  subCategories: string[];
};

type SubCategoryEditProps = {
  title?: string;
  trigger: React.ReactNode;
  category: JobCategory;
};

export function SubCategoryEdit({
  title,
  trigger,
  category,
}: SubCategoryEditProps) {
  const [inputFields, setInputFields] = useState<JobCategory>(category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("category", category);

  // keep state in sync if category changes
  useEffect(() => {
    setInputFields(category);
  }, [category]);

  const handleAddInput = () => {
    setInputFields((prev) => ({
      ...prev,
      subCategories: [...prev.subCategories, ""],
    }));
  };

  const handleRemoveInput = (index: number) => {
    setInputFields((prev) => ({
      ...prev,
      subCategories: prev.subCategories.filter((_, i) => i !== index),
    }));
  };

  const handleInputValueChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setInputFields((prev) => {
      const updated = [...prev.subCategories];
      updated[index] = value;
      return { ...prev, subCategories: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await myFetch(`/categories/update/${category._id}`, {
        method: "PATCH",
        body: {
          name: inputFields?.name,
          subCategories: inputFields.subCategories,
        },
      });

      if (!res?.success) {
        throw new Error(res?.message || "Update failed");
      } else {
        toast.success("Category updated successfully");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category title */}
          <div className="grid gap-2">
            <Label className="text-lg">{title}</Label>
            <Input value={inputFields.name} disabled className="bg-gray-100" />
          </div>

          {/* Sub categories */}
          {title && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Sub Categories</Label>
                <button
                  type="button"
                  onClick={handleAddInput}
                  className="text-green-600 hover:text-green-700"
                  aria-label="Add sub category"
                >
                  <Plus />
                </button>
              </div>

              <div className="space-y-2">
                {inputFields?.subCategories?.map((sub, index) => (
                  <div key={`${index}`} className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={sub}
                      onChange={(e) => handleInputValueChange(index, e)}
                      className="flex-1 bg-white"
                      placeholder="Enter sub category"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveInput(index)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Remove ${sub}`}
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
              disabled={loading}
            >
              {loading ? "Saving..." : "Publish"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
