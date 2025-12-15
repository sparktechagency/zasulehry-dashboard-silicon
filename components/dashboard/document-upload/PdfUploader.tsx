"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Pencil } from "lucide-react";
import React, { useRef, useState } from "react";

export default function PdfUploadEdit() {
  const pdfRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    // Add additional logic here if needed (upload, preview, etc.)
  };

  const openFileDialog = () => {
    pdfRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-[#0288A6] hover:text-[#026d85] transition-colors duration-200 cursor-pointer"
          title="Edit PDF"
        >
          <Pencil className="w-5 h-5" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Edit PDF
          </h2>
          <p className="text-sm text-gray-500">
            You can upload a new PDF document to replace the existing one.
          </p>
        </div>

        <div
          className="flex justify-center w-full border border-[#0288A6] px-6 py-2 rounded-md cursor-pointer"
          onClick={openFileDialog}
        >
          {selectedFile ? (
            <h1 className="font-medium text-lg">{selectedFile?.name}</h1>
          ) : (
            <button className="flex items-center gap-2  cursor-pointer font-medium">
              <Pencil className="w-4 h-4" />
              <span>Upload New PDF</span>
            </button>
          )}
        </div>

        <input
          ref={pdfRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <button className="btn-design py-2 text-lg mt-4">Submit </button>
      </DialogContent>
    </Dialog>
  );
}
