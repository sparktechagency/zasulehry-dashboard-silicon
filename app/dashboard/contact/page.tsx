import React from "react";
import InfoContact from "./InfoContact";
import { myFetch } from "@/utils/myFetch";

export default async function page() {
  const res = await myFetch("/contact");

  return (
    <div className="mt-40">
      <InfoContact data={res?.data} />
    </div>
  );
}
