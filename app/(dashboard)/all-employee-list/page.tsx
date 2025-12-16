import AllEmployeeList from "@/components/dashboard/allEmployeeList/AllEmployeeList";
import { myFetch } from "@/utils/myFetch";

import React from "react";

export default async function AllEmployee({ searchParams }: any) {
  const name = (await searchParams)?.name || "";
  const status = (await searchParams)?.status || "";

  // Build URL conditionally to avoid empty query params
  const params = new URLSearchParams({ role: "Employer" });
  if (name) params.append("searchTerm", name);
  if (status) params.append("status", status);

  const url = `/users?${params.toString()}`;

  const res = await myFetch(url);

  return (
    <>
      <AllEmployeeList res={res?.data || []} />
    </>
  );
}
