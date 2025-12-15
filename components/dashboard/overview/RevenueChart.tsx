"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import YearDropdown from "./YearDropDown";

const data = [
  { name: "Jan", uv: 4500 },
  { name: "Feb", uv: 4000 },
  { name: "Mar", uv: 5000 },
  { name: "Apr", uv: 5500 },
  { name: "May", uv: 5500 },
  { name: "Jun", uv: 4000 },
  { name: "Jul", uv: 6000 },
  { name: "Aug", uv: 5200 },
  { name: "Sep", uv: 5000 },
  { name: "Oct", uv: 6000 },
  { name: "Nov", uv: 4000 },
  { name: "Dec", uv: 6000 },
];

const dataRow = Math.max(...data.map((data) => data.uv));

const result = data.map((item) => {
  return {
    name: item.name,
    uv: (item.uv / dataRow) * 100,
  };
});

// Custom Tooltip Function
const renderCustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { uv } = payload[0].payload; // Access the specific data point
    return (
      <div
        style={{
          backgroundColor: "white",
          color: "rgba(0, 0, 0, 0.7)",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "14px",
          width: "100px",
          maxWidth: "200px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
        }}
      >
        <p className="font-semibold">$ {uv.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export default function GreenAreaChart() {
  const [year, setYear] = useState("");
  return (
    <section className="my-2 bg-white rounded-md text-gray-700">
      <div className="flex justify-between pt-4 px-8">
        <h3 className="mb-4 text-[18px] font-semibold text-gray-700">
          Total Revenue Monthly
        </h3>{" "}
        <div>
          <YearDropdown selectedYear={year} onChange={setYear} />{" "}
        </div>
      </div>
      <div className="w-full h-[200px] lg:h-[220px] xl:h-[260px]">
        <ResponsiveContainer>
          <AreaChart
            data={result}
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="40%" stopColor="#065D70" stopOpacity={5} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={3} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              domain={[10, 100]}
              ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickMargin={12}
            />
            {/* <Tooltip /> */}
            <Tooltip content={renderCustomTooltip} />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#065D70"
              fill="url(#colorGreen)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
