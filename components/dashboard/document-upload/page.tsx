import { Eye } from "lucide-react";
import React from "react";
import PdfUploadEdit from "./PdfUploader";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";

export default function UploadDocument({ selectedFile }: any) {
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want be  delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <section>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between bg-white p-3 rounded-md my-5"
        >
          {selectedFile ? (
            <h1 className="font-medium text-xl">{selectedFile?.name}</h1>
          ) : (
            <p>No Pdf</p>
          )}
          <div className="flex gap-4">
            <div>
              <PdfUploadEdit />
            </div>
            <div>
              <a href="/link.pdf" target="_blank" rel="noopener noreferrer">
                <button className="text-[#0288A6] cursor-pointer">
                  <Eye />
                </button>
              </a>
            </div>
            {/* detete button */}
            {/* <Delete /> */}
            <div>
              <button
                onClick={handleDelete}
                className="cursor-pointer  rounded-md"
              >
                <RiDeleteBinLine className="text-[#D21D1D] " size={22} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
