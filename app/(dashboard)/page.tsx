import Card from "@/components/dashboard/overview/Card";
import Chart from "@/components/dashboard/overview/Chart";
import CircleChart from "@/components/dashboard/overview/CircleChart";
import GreenAreaChart from "@/components/dashboard/overview/RevenueChart";
import React from "react";

export default function Home() {
  return (
    <section className="px-5 text-[#333333]">
      <Card />
      <div>
        <GreenAreaChart />
      </div>
      <section className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-8">
          <Chart />
        </div>
        <div className="col-span-12 md:col-span-4">
          <CircleChart />
        </div>
      </section>
    </section>
  );
}
