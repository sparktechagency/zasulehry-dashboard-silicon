import TermsCondition from "@/components/settings/TermsConditions";
import React from "react";

export default function Condition() {
  return (
    <div>
      <h1 className="text-lg 2xl:text-2xl font-medium px-4 capitalize">
        term & condition
      </h1>

      <TermsCondition />
    </div>
  );
}
