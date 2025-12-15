import AllEmployeeList from "@/components/dashboard/allEmployeeList/AllEmployeeList";
import { myFetch } from "@/utils/myFetch";

import React from "react";

export default async function AllEmployee() {
  const res = await myFetch("/users?role=Employer");
  return (
    <>
      <AllEmployeeList res={res?.data} />
    </>
  );
}
