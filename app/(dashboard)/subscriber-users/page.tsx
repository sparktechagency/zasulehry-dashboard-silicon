import Users from "@/components/dashboard/SubscriberUsers/Users";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function SubscriberUsers() {
  const res = await myFetch(`/subscriptions/subscribers`);
  return (
    <>
      <Users users={res?.data} />
    </>
  );
}
