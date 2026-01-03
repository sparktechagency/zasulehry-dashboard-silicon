"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useResponsiveRadius from "@/components/hooks/useResponsiveRadius";
import SelectBar from "@/app/(dashboard)/verify-request/SelectBar";

const COLORS = ["#056176", "#B2D1D8"];
const YEARS = [
  { label: "All", value: "All" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
];

interface Props {
  revenue?: {
    growthPercentage?: number; // 0–100
  };
}

export default function CircleChart({ revenue }: Props) {
  const radius = useResponsiveRadius();

  const used = Math.min(Math.max(revenue?.growthPercentage ?? 0, 0), 100);
  const remaining = 100 - used;

  const data = [
    { name: "Used", value: used },
    { name: "Remaining", value: remaining },
  ];

  return (
    <div className="h-full p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] text-gray-700 font-semibold">
          Total User Growth
        </h2>
        <SelectBar options={YEARS} />
      </div>

      <div className="relative w-full h-[200px] xl:h-[230px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={radius}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[70px] h-[70px] rounded-full bg-[#B2D1D8] flex items-center justify-center text-sm font-semibold">
            {used}%
          </div>
        </div>
      </div>
    </div>
  );
}
