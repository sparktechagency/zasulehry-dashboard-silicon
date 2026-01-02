import Card from "@/components/dashboard/overview/Card";
import Chart from "@/components/dashboard/overview/Chart";
import CircleChart from "@/components/dashboard/overview/CircleChart";
import GreenAreaChart from "@/components/dashboard/overview/RevenueChart";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function Home() {
  const card = await myFetch("/analytics/overview");

  const userGrowth = await myFetch(`/analytics/user-growth?year=2026`);
  const subscribers = await myFetch(`/analytics/subscribers-growth?year=2025`);

  const circle = await myFetch(`/analytics/revenue-growth?year=2025`);
  return (
    <section className="px-5 text-[#333333]">
      <Card card={card?.data} />
      <div>
        <GreenAreaChart chart={userGrowth?.data} />
      </div>
      <section className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-8">
          <Chart subscribers={subscribers?.data} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <CircleChart revenue={circle?.data} />
        </div>
      </section>
    </section>
  );
}
