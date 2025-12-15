import SupportUser from "@/components/dashboard/supportUser/SupportUser";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function Support() {
  const res = await myFetch("/supports");
  console.log("res", res);

  return (
    <>
      <SupportUser data={res?.data} />
    </>
  );
}
