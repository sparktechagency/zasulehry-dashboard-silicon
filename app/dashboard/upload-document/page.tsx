import UploadDocumentPage from "@/components/dashboard/UploadDocument/UploadDocument";
import TablePagination from "@/components/share/Pagination";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function DocumentPage() {
  const res = await myFetch("/drives/my-drives", {
    tags: ["drive"],
  });
  return (
    <>
      <UploadDocumentPage data={res?.data} />
      {/* pagination */}
      <TablePagination totalPages={res?.pagination?.totalPage} />
    </>
  );
}
