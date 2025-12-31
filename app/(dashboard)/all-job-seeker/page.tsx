import AllJobSeeker from "@/components/dashboard/jobSeeker/JobSeeker";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function JobSeeker({ searchParams }: any) {
  const name = (await searchParams)?.name || "";
  const status = (await searchParams)?.status || "";

  const params = new URLSearchParams();
  params.append("role", "Job Seeker");
  if (name) params.append("searchTerm", name);
  if (status) params.append("status", status);

  let data: any[] = [];

  try {
    const res = await myFetch(`/users?${params.toString()}`, {
      tags: ["job-seeker"],
    });

    if (res?.success) {
      data = res.data ?? [];
    } else {
      console.error("Failed to fetch job seekers:", res?.message);
    }
  } catch (err) {
    console.error(
      "Error fetching job seekers:",
      err instanceof Error ? err.message : err
    );
  }

  return (
    <>
      <AllJobSeeker data={data} />
    </>
  );
}
