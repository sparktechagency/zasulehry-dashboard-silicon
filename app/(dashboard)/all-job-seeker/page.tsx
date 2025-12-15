import AllJobSeeker from "@/components/dashboard/jobSeeker/JobSeeker";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function JobSeeker() {
  const res = await myFetch("/users");
  return (
    <>
      <AllJobSeeker data={res.data} />
    </>
  );
}
