// "use client";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import RevenueSelect from "@/components/overviewSelectStatus/RevenueStatus";

// // Custom Tooltip Function
// const renderCustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     const { uv } = payload[0].payload; // Access the specific data point
//     return (
//       <div
//         style={{
//           backgroundColor: "white",
//           color: "rgba(0, 0, 0, 0.7)",
//           padding: "10px",
//           borderRadius: "5px",
//           fontSize: "14px",
//           width: "100px",
//           maxWidth: "200px",
//           boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
//         }}
//       >
//         <p className="font-semibold">$ {uv.toFixed(2)}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const years = [
//   { label: "All", value: "All" },
//   { label: "2025", value: "2025" },
//   { label: "2026", value: "2026" },
//   { label: "2027", value: "2027" },
//   { label: "2028", value: "2028" },
// ];

// export default function GreenAreaChart({ chart }: any) {
//   const monmonthlyStats = chart?.monthlyStats?.map((item: any) => ({
//     name: item?.month,
//     uv: item?.count,
//   }));

//   return (
//     <section className="my-2 bg-white rounded-md text-gray-700">
//       <div className="flex justify-between pt-4 px-8">
//         <h3 className="mb-4 text-[18px] font-semibold text-gray-700">
//           Total Revenue Monthly
//         </h3>{" "}
//         <div>
//           <RevenueSelect options={years} />{" "}
//         </div>
//       </div>
//       <div className="w-full h-[200px] lg:h-[220px] xl:h-[260px]">
//         <ResponsiveContainer>
//           <AreaChart
//             data={monmonthlyStats}
//             margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
//           >
//             <defs>
//               <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="40%" stopColor="#065D70" stopOpacity={5} />
//                 <stop offset="100%" stopColor="#FFFFFF" stopOpacity={3} />
//               </linearGradient>
//             </defs>

//             <CartesianGrid strokeDasharray="3 3" stroke="" />
//             <XAxis
//               dataKey="name"
//               tick={{ fontSize: 12 }}
//               tickLine={false}
//               axisLine={false}
//               tickMargin={10}
//             />
//             <YAxis
//               domain={[10, 100]}
//               ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
//               tickFormatter={(v) => `${v}%`}
//               tick={{ fontSize: 12 }}
//               tickLine={false}
//               axisLine={false}
//               tickMargin={12}
//             />
//             {/* <Tooltip /> */}
//             <Tooltip content={renderCustomTooltip} />
//             <Area
//               type="monotone"
//               dataKey="uv"
//               stroke="#065D70"
//               fill="url(#colorGreen)"
//               strokeWidth={2}
//               activeDot={{ r: 6 }}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// }
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import RevenueSelect from "@/components/overviewSelectStatus/RevenueStatus";

interface MonthlyStat {
  month: string;
  count: number;
}

interface Props {
  chart?: {
    monthlyStats?: MonthlyStat[];
  };
}

const renderCustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (active && payload?.length) {
    const value = payload[0].value;
    return (
      <div className="bg-white p-2 rounded-md shadow text-sm">
        <p className="font-semibold">${value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const YEARS = [
  { label: "All", value: "All" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
];

export default function GreenAreaChart({ chart }: Props) {
  const monthlyStats =
    chart?.monthlyStats?.map((item) => ({
      name: item.month,
      uv: item.count,
    })) ?? [];

  return (
    <section className="my-2 bg-white rounded-md text-gray-700">
      <div className="flex justify-between pt-4 px-8">
        <h3 className="text-[18px] font-semibold">Total Revenue Monthly</h3>
        <RevenueSelect options={YEARS} />
      </div>

      <div className="w-full h-[200px] lg:h-[220px] xl:h-[260px]">
        <ResponsiveContainer>
          <AreaChart
            data={monthlyStats}
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="40%" stopColor="#065D70" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v / 100}%`}
            />

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
