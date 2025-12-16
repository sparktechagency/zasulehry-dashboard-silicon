import AllJobSeeker from "@/components/dashboard/jobSeeker/JobSeeker";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function JobSeeker({ searchParams }: any) {
  const name = (await searchParams)?.name || "";
  const status = (await searchParams)?.status || "";

  const params = new URLSearchParams();
  if (name) params.append("searchTerm", name);
  if (status) params.append("status", status);

  const queryString = params.toString();
  const url = `/users${queryString ? `?${queryString}` : ""}`;

  const res = await myFetch(url);

  return (
    <>
      <AllJobSeeker data={res?.data || []} />
    </>
  );
}
