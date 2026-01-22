import Invoices from "./Invoices";
import Header from "./Header";
import TablePagination from "@/components/share/Pagination";

export default async function PaymentsInvoices({ res }: any) {
  return (
    <div className="p-5">
      <Header />
      <Invoices invoices={res?.data} />

      <TablePagination totalPages={res?.pagination?.totalPage} />
    </div>
  );
}
