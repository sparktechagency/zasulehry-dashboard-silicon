import PaymentsInvoices from "@/components/dashboard/Payment-Invoices/PaymentsInvoices";
import { myFetch } from "@/utils/myFetch";

export default async function PaymentInvoices({
  searchParams,
}: {
  searchParams: { page?: string; search: string };
}) {
  const page = (await searchParams)?.page;
  const search = (await searchParams)?.search;

  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (search) params.append("invoiceNumber", search);

  const res = await myFetch(
    `/invoices${params.toString() ? `?${params.toString()}` : ""}`,
  );

  return <PaymentsInvoices res={res} />;
}
