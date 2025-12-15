import PrivacyPolicy from "@/components/settings/PrivacyPolicy";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="text-lg 2xl:text-2xl font-medium px-4">Impressum</h1>
      <PrivacyPolicy />
    </div>
  );
}
