import React from "react";
import Invoices from "./Invoices";
import Header from "./Header";
import { myFetch } from "@/utils/myFetch";
import TablePagination from "@/components/share/Pagination";

export default async function PaymentsInvoices() {
  const res = await myFetch("/invoices");
  return (
    <div className="p-5">
      <Header />
      <Invoices invoices={res?.data} />

      <TablePagination totalPages={res?.pagination?.totalPage} />
    </div>
  );
}
