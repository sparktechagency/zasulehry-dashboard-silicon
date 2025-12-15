import React from "react";
import Invoices from "./Invoices";
import Header from "./Header";

export default function PaymentsInvoices() {
  return (
    <div className="p-5">
      <Header />
      <Invoices />
    </div>
  );
}
