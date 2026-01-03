// "use client";

// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// import SubscriberSelect from "@/components/overviewSelectStatus/SubscriberStatus";

// // const months = ["2025", "2026", "2027", "2028"];

// // const maxValue = Math.max(...data.map((item) => item.pv));

// // const normalizedData = data.map((item) => ({
// //   name: item.name,
// //   pv: (item.pv / maxValue) * 100,
// // }));

// const years = [
//   { label: "All", value: "All" },
//   { label: "2025", value: "2025" },
//   { label: "2026", value: "2026" },
//   { label: "2027", value: "2027" },
//   { label: "2028", value: "2028" },
// ];

// export default function TotalSubscriberMonthly({ subscribers }: any) {
//   const monmonthlyStats = subscribers?.monthlyStats?.map((item: any) => ({
//     name: item?.month,
//     uv: item?.count || 10,
//   }));

//   return (
//     <section className="shadow-md rounded-lg bg-white p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-[18px] text-gray-700 font-semibold ps-7">
//           Total Subscriber Monthly
//         </h1>
//         <SubscriberSelect options={years} />
//       </div>
//       <div className="w-full h-[200px] lg:h-[200px] xl:h-[230px]">
//         <ResponsiveContainer width="100%">
//           <BarChart
//             data={monmonthlyStats}
//             margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
//           >
//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//               // stroke="#f0f0f0"
//             />
//             <XAxis
//               dataKey="name"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12 }}
//             />
//             <YAxis
//               domain={[0, 100]}
//               ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
//               tickFormatter={(v) => `${v}%`}
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 12 }}
//             />
//             <Tooltip
//               formatter={(value) => [
//                 `${Number(value).toFixed(1)}%`,
//                 "Subscribers",
//               ]}
//               labelFormatter={(label) => `Day ${label}`}
//               contentStyle={{
//                 borderRadius: "6px",
//                 border: "1px solid #e2e8f0",
//                 // boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//               }}
//               cursor={{ fill: "#ccdee2" }}
//             />

//             <Bar
//               dataKey="pv"
//               stroke="#0288A6"
//               fill="#056176"
//               radius={[4, 4, 0, 0]}
//               barSize={25}
//               // activeBar={{ fill: "blue", opacity: 0.7 }}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   );
// }

"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SubscriberSelect from "@/components/overviewSelectStatus/SubscriberStatus";

const YEARS = [
  { label: "All", value: "All" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
];

interface MonthlyStat {
  month: string;
  count: number;
}

interface Props {
  subscribers?: {
    monthlyStats?: MonthlyStat[];
  };
}

export default function TotalSubscriberMonthly({ subscribers }: Props) {
  const monthlyStatsRaw = subscribers?.monthlyStats ?? [];

  const maxValue = Math.max(1, ...monthlyStatsRaw.map((item) => item.count));
  const monthlyStats = subscribers?.monthlyStats?.map((item) => ({
    name: item.month,
    uv: (item.count / maxValue) * 100,
  }));

  return (
    <section className="shadow-md rounded-lg bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] text-gray-700 font-semibold ps-7">
          Total Subscriber Monthly
        </h1>
        <SubscriberSelect options={YEARS} />
      </div>

      <div className="w-full h-[200px] xl:h-[230px]">
        <ResponsiveContainer width="100%">
          <BarChart
            data={monthlyStats}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />

            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />

            <Tooltip
              formatter={(value) => [value, "Subscribers"]}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
              }}
              cursor={{ fill: "#ccdee2" }}
            />

            <Bar
              dataKey="uv"
              fill="#056176"
              radius={[4, 4, 0, 0]}
              barSize={25}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
