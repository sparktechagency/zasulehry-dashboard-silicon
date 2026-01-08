import TermsCondition from "@/components/settings/TermsConditions";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function Condition() {
  const res = await myFetch("/disclaimers/terms-and-conditions");
  return (
    <>
      <h1 className="text-lg 2xl:text-2xl font-medium px-4 capitalize">
        Term & Condition
      </h1>

      <TermsCondition data={res?.data?.content} />
    </>
  );
}
