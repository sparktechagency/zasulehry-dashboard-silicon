import PrivacyPolicy from "@/components/settings/PrivacyPolicy";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function Policy() {
  const res = await myFetch("/disclaimers/privacy-policy");

  return (
    <>
      <h1 className="text-lg 2xl:text-2xl font-medium px-4">Privacy Policy</h1>
      <PrivacyPolicy data={res?.data?.content} />
    </>
  );
}
