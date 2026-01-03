"use client";

import { Download, FileText } from "lucide-react";

type PdfViewerProps = {
  fileUrl: string[]; // Array of file URLs
};

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  if (!fileUrl || fileUrl.length === 0) {
    return <p className="text-gray-500">No PDF files available.</p>;
  }

  return (
    <div className="space-y-6">
      {/* File List */}
      <div className="bg-white  rounded p-4 space-y-2">
        {fileUrl.map((url, index) => {
          const fileName = url.split("/").pop();
          return (
            <div
              key={url}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-2 rounded transition gap-6"
            >
              <div className="flex items-center gap-5">
                <FileText className="text-gray-500 w-5 h-5" />
                <span className="text-blue-600 hover:underline">
                  {fileName && `PDF File${index + 1}.pdf`}
                </span>
              </div>
              <div>
                <a
                  href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF5900] hover:bg-[#FF5900]/90 text-white font-semibold py-1 px-3 rounded flex items-center gap-1 text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
