import Inbox from "@/components/dashboard/inbox/Inbox";
import React from "react";

export default async function inbox({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const { id = "" } = await searchParams;

  return (
    <>
      <Inbox userId={id} />
    </>
  );
}
