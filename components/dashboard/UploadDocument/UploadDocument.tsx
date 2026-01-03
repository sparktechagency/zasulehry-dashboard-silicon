"use client";

import { Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import UploadDocument from "../document-upload/page";
import TablePagination from "@/components/share/Pagination";
import PdfUploadEdit from "../document-upload/PdfUploader";

export default function UploadDocumentPage({ data }: any) {
  const pdfRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleRepeat = () => {
    if (pdfRef.current) {
      pdfRef.current.click();
    }
  };

  return (
    <div className="px-20">
      <div className="flex justify-between my-5 px-2">
        <h1 className="text-[#333333] text-xl font-medium">Upload Documents</h1>
        <PdfUploadEdit
          trigger={
            <button className="btn-design py-2 px-5 flex gap-2 cursor-pointer">
              <Upload /> <span className="">Upload New</span>
            </button>
          }
        />
      </div>

      <div>
        <input
          ref={pdfRef}
          className="hidden"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </div>

      {/* upload details */}
      <UploadDocument data={data} />
      <TablePagination />
    </div>
  );
}
