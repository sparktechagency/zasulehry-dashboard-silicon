import UploadDocumentPage from "@/components/dashboard/UploadDocument/UploadDocument";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function DocumentPage() {
  const res = await myFetch("/drives/my-drives", {
    tags: ["drive"],
  });
  return (
    <>
      <UploadDocumentPage data={res?.data} />
    </>
  );
}
