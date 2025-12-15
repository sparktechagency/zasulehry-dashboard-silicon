import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

type InvoiceHeaderField = {
  label: string;
  value: string;
};

type InvoiceItem = {
  label: string;
  value: string | number;
};

export default function ViewDetails({ trigger }: { trigger: React.ReactNode }) {
  const invoiceHeader: InvoiceHeaderField[] = [
    { label: "Invoice No:", value: "025463212" },
    { label: "Invoice Date", value: "01.02.2025" },
    { label: "Delivery Date", value: "08.02.2025" },
    { label: "Order No:", value: "150369" },
  ];

  const invoiceItems: InvoiceItem[] = [
    { label: "Pos.", value: 1 },
    { label: "Details", value: "Standard Subscription" },
    { label: "Quantity", value: 12 },
    { label: "Price", value: "$250" },
  ];

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <div>
            <div className="max-w-lg mx-auto p-6 my- text-[#343434]">
              {/* Address and Customer Info */}
              <div className="mb-4 font-medium text-xs text-gray-700">
                <h1 className="text-[14px]">Percenter Germany,2541,House,20</h1>
                <p>Zisan</p>
                <p>
                  Street,House No,{" "}
                  <span className="float-right">Tax No 1234</span>
                </p>
                <p>
                  1234 Dhaka <span className="float-right">DE No 1234</span>
                </p>
                <p>Bangladesh</p>
                <p>Customer ID 24513</p>
              </div>

              {/* Invoice Header */}
              <div className="mb-4">
                <h2 className="text-[#0288A6] font-semibold text- mb-3">
                  Invoice
                </h2>
                <div className="grid grid-cols-4 text-xs text-gray-500  pb-2  ">
                  {invoiceHeader.map(({ label, value }, idx) => (
                    <div
                      key={idx}
                      className={`${
                        idx < invoiceHeader.length - 1
                          ? "border-r-2 text-left space-x-2 mr-2"
                          : ""
                      }`}
                    >
                      <div className="font-semibold text-gray-700">{label}</div>
                      <div>{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table Header */}
              {/* <div className="grid grid-cols-4 text-xs text-gray-500 border-b border-gray-300 py-2">
              <div>Pos.</div>
              <div>Details</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Price</div>
            </div> */}

              {/* Table Rows */}
              <div className="flex text-sm font-medium text-gray-500 ">
                {invoiceItems.map(({ label, value }, idx) => (
                  <div
                    key={idx}
                    className={`${
                      idx < invoiceHeader.length - 1 &&
                      "border-r-2 text-left space-x-6 mr-2  px-1"
                    }`}
                  >
                    <div>{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="mt-8 space-y-1 text-sm text-gray-700 w-40 ml-auto">
                <div className="flex justify-between border-b border-gray-300 pb-1 ">
                  <span>Netto Price</span>
                  <span>250</span>
                </div>
                <div className="flex justify-between border-b border-gray-300 pb-1">
                  <span>Sales Tax 19%</span>
                  <span>60</span>
                </div>
                <div className="flex justify-between  pt-1">
                  <span>Total</span>
                  <span>300$</span>
                </div>
              </div>

              {/* Footer Contact Details */}
            </div>
            <hr className="w-full h-1" />
            <div className="mt-2 text-xs text-gray-600 grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Contact Details</strong>
                </p>
                <strong>Telephone Number : +034398958</strong>
                <br />
                <strong>Email Address : 1Ttjg@example.com</strong>
              </div>
              <div>
                <p>
                  <strong>SCB Bank</strong>
                </p>
                <strong>IBAN DE 12345672556755457</strong>
                <strong>Bic 12345656</strong>
              </div>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
