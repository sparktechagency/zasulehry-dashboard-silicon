import AllJobSeeker from "@/components/dashboard/jobSeeker/JobSeeker";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function JobSeeker({ searchParams }: any) {
  const name = (await searchParams)?.name || "";
  const status = (await searchParams)?.status || "";
  const page = (await searchParams)?.page || "";

  const params = new URLSearchParams();
  params.append("role", "Job Seeker");
  if (name) params.append("searchTerm", name);
  if (status) params.append("status", status);
  if (page) params.append("page", page);

  const res = await myFetch(`/users?${params.toString()}`, {
    tags: ["job-seeker"],
  });

  return (
    <>
      <AllJobSeeker data={res} />
    </>
  );
}
