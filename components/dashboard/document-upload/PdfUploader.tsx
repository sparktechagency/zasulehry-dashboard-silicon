"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";
import { Pencil } from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  item?: {
    _id?: string;
    pdfUrl?: string;
    name?: string;
  };
  trigger: React.ReactNode;
}

interface FormData {
  name: string;
  doc: FileList | null;
}

export default function PdfUploadEdit({ item, trigger }: Props) {
  const pdfRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: item?.name || "",
    },
  });

  const openFileDialog = () => {
    pdfRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // get the first selected file
    if (file) {
      setSelectedFile(file); // set it to state
    }
  };
  const onSubmit = async (data: FormData) => {
    console.log("data", data);

    if (!selectedFile && !item?._id) {
      toast.error("Please select a PDF file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);

      if (selectedFile) {
        formData.append("doc", selectedFile);
      }

      const method = item?._id ? "PATCH" : "POST";
      const url = item?._id ? `/drives/rename/${item._id}` : "/drives/upload";

      const res = await myFetch(url, {
        method: method,
        body: formData,
      });

      if (res.success) {
        toast.success(
          item?._id ? "PDF updated successfully" : "PDF uploaded successfully"
        );
        revalidate("drive");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md w-full rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {item?._id ? "Edit PDF" : "Add PDF"}
          </h2>
        </div>

        <div>
          {/* PDF Name Input */}
          <Input
            placeholder="PDF Name"
            className="bg-white border"
            {...register("name", {
              required: "PDF name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          {/* File Upload */}
          <div
            className="mt-4 flex justify-center w-full border border-[#0288A6] px-6 py-3 rounded-md cursor-pointer"
            onClick={openFileDialog}
          >
            {selectedFile ? (
              <span className="text-sm truncate">{selectedFile.name}</span>
            ) : (
              <div className="flex items-center gap-2 font-medium">
                <Pencil className="w-4 h-4" />
                <span>{item?._id ? "Upload New PDF" : "Upload PDF"}</span>
              </div>
            )}
          </div>

          <input
            ref={pdfRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleUpload}
          />
          {errors.doc && (
            <p className="text-red-500 text-sm mt-1">{errors.doc.message}</p>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="btn-design py-2 text-lg mt-4 w-full disabled:opacity-50"
          >
            {isSubmitting
              ? item?._id
                ? "Updating..."
                : "Uploading..."
              : "Submit"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
