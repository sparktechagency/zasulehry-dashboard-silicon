import { Eye, Pencil } from "lucide-react";
import React from "react";
import PdfUploadEdit from "./PdfUploader";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTags";

export default function UploadDocument({ data }: any) {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want be  delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await myFetch(`/drives/${id}`, {
          method: "DELETE",
        });

        await revalidate("drive");
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
      {data?.map((item: any) => (
        <div
          key={item?._id}
          className="flex justify-between bg-white p-3 rounded-md my-5"
        >
          <h1 className="font-medium text-xl">{item?.name}</h1>
          <div className="flex gap-4">
            <div>
              <PdfUploadEdit
                item={item}
                trigger={
                  <button
                    className="text-[#0288A6] hover:text-[#026d85] transition-colors duration-200 cursor-pointer"
                    title="Edit PDF"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                }
              />
            </div>
            <div>
              <a
                href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="text-[#0288A6] cursor-pointer">
                  <Eye />
                </button>
              </a>
            </div>
            {/* detete button */}
            {/* <Delete /> */}
            <div>
              <button
                onClick={() => handleDelete(item?._id)}
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
