"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";
import useResponsiveRadius from "@/components/hooks/useResponsiveRadius";

const COLORS = ["#056176", "#B2D1D8"]; // Primary and secondary segment colors

const data = [
  { name: "Used", value: 20 },
  { name: "Remaining", value: 60 },
];

export default function CircleChart() {
  const radius = useResponsiveRadius();
  const [selectedYear, setSelectedYear] = useState("2025");

  return (
    <div className="h-full p-4 bg-[#FFFFFF] shadow-md rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] text-gray-700 font-semibold">
          Total Employer
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-400 rounded px-2 h-7"
        >
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="relative w-full h-[200px] lg:h-[200px] xl:h-[230px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={radius}
              dataKey="value"
              startAngle={100}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Percentage Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[70px] h-[70px] rounded-full bg-[#B2D1D8] flex items-center justify-center text-center text-sm font-semibold text-black">
            20%
          </div>
        </div>
      </div>
    </div>
  );
}
