import JobDetails from "@/components/dashboard/jobSeeker/JobDetails";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;
  const res = await myFetch(`/job-seekers/single/${id}`);

  return (
    <>
      <JobDetails data={res?.data} />
    </>
  );
}
