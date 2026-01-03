import Card from "@/components/dashboard/overview/Card";
import Chart from "@/components/dashboard/overview/Chart";
import CircleChart from "@/components/dashboard/overview/CircleChart";
import GreenAreaChart from "@/components/dashboard/overview/RevenueChart";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { subscriber?: string; revenue?: string; status: string };
}) {
  const revenue = (await searchParams)?.revenue ?? "2026";
  const subscriber = (await searchParams)?.subscriber;
  const circle = (await searchParams)?.status;

  const card = await myFetch("/analytics/overview");

  const circleData = await myFetch(`/analytics/user-growth?year=${circle}`);

  const subscribers = await myFetch(
    `/analytics/subscribers-growth?year=${subscriber}`
  );

  const revenueChart = await myFetch(
    `/analytics/revenue-growth?year=${revenue}`
  );

  console.log("subscribers", subscribers);

  return (
    <section className="px-5 text-[#333333]">
      <Card card={card?.data} />

      <div>
        <GreenAreaChart chart={revenueChart?.data} />
      </div>

      <section className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-8">
          <Chart subscribers={subscribers?.data} />
        </div>

        <div className="col-span-12 md:col-span-4">
          <CircleChart revenue={circleData?.data} />
        </div>
      </section>
    </section>
  );
}
