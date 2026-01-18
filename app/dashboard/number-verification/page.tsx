import React from "react";
import MyNumber from "./myNumbers";
import { myFetch } from "@/utils/myFetch";

export default async function page() {
  const res = await myFetch("/contact");
  return (
    <>
      <MyNumber res={res?.data} />
    </>
  );
}
