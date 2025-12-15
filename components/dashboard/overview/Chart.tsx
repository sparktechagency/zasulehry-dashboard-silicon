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
// import { useState } from "react";

// const data = [
//   { name: "01", pv: 10 },
//   { name: "02", pv: 1 },
//   { name: "03", pv: 90 },
//   { name: "04", pv: 11 },
//   { name: "05", pv: 10 },
//   { name: "06", pv: 1 },
//   { name: "07", pv: 1 },
//   { name: "08", pv: 211 },
//   { name: "09", pv: 1 },
//   { name: "10", pv: 1 },
//   { name: "11", pv: 111 },
//   { name: "12", pv: 1 },
//   { name: "13", pv: 100 },
//   { name: "14", pv: 1 },
//   { name: "15", pv: 10 },
//   { name: "16", pv: 12 },
//   { name: "17", pv: 1 },
//   { name: "18", pv: 1 },
//   { name: "19", pv: 114 },
//   { name: "20", pv: 1 },
//   { name: "21", pv: 1 },
//   { name: "22", pv: 1 },
//   { name: "23", pv: 20 },
//   { name: "24", pv: 1 },
//   { name: "25", pv: 1 },
//   { name: "26", pv: 14 },
//   { name: "27", pv: 1 },
//   { name: "28", pv: 1 },
//   { name: "29", pv: 80 },
//   { name: "30", pv: 1 },
//   { name: "31", pv: 18 },
// ];

// const months = [" 2025", " 2026", " 2027", " 2028"];

// const rowData = Math.max(...data.map((item) => item.pv));

// const result = data.map((item) => {
//   return {
//     name: item.name,
//     pv: (item.pv / rowData) * 100,
//   };
// });

// export default function Chart() {
//   const [selectedMonth, setSelectedMonth] = useState("2025");

//   const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedMonth(e.target.value);
//     // Here you can add logic to filter data based on month
//   };

//   return (
//     <section className="shadow-md rounded-lg px-3 text-textGray bg-[#FFFFFF] p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className=" text-xl font-medium">Total Subscriber Monthly</h1>
//         <select
//           value={selectedMonth}
//           onChange={handleMonthChange}
//           className="w-32 h-[33px] border border-[#0A6F77] rounded-md"
//         >
//           {months.map((month) => (
//             <option key={month} value={month}>
//               {month}
//             </option>
//           ))}
//         </select>
//       </div>

//       <ResponsiveContainer width="100%" height={240}>
//         <BarChart
//           data={result}
//           margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis
//             domain={[10, 100]}
//             ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
//             tickFormatter={(v) => `${v}%`}
//           />
//           <Tooltip />
//           <Bar dataKey="pv" fill="#0288A6" radius={[10, 10, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
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
import { useState } from "react";

const data = [
  { name: "01", pv: 10 },
  { name: "02", pv: 1 },
  { name: "03", pv: 90 },
  { name: "04", pv: 11 },
  { name: "05", pv: 10 },
  { name: "06", pv: 1 },
  { name: "07", pv: 90 },
  { name: "08", pv: 100 },
  { name: "09", pv: 20 },
  { name: "10", pv: 20 },
  { name: "11", pv: 111 },
  { name: "12", pv: 1 },
  { name: "13", pv: 100 },
  { name: "14", pv: 90 },
  { name: "15", pv: 10 },
  { name: "16", pv: 12 },
  { name: "17", pv: 1 },
  { name: "18", pv: 1 },
  { name: "19", pv: 114 },
  { name: "20", pv: 20 },
  { name: "21", pv: 30 },
  { name: "22", pv: 70 },
  { name: "23", pv: 20 },
  { name: "24", pv: 60 },
  { name: "25", pv: 50 },
  { name: "26", pv: 14 },
  { name: "27", pv: 30 },
  { name: "28", pv: 20 },
  { name: "29", pv: 80 },
  { name: "30", pv: 100 },
  { name: "31", pv: 80 },
];

const months = ["2025", "2026", "2027", "2028"];

const maxValue = Math.max(...data.map((item) => item.pv));

const normalizedData = data.map((item) => ({
  name: item.name,
  pv: (item.pv / maxValue) * 100,
}));

export default function TotalSubscriberMonthly() {
  const [selectedMonth, setSelectedMonth] = useState("2025");

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
    // Here you can add logic to filter data based on month
  };

  return (
    <section className="shadow-md rounded-lg bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] text-gray-700 font-semibold ps-7">
          Total Subscriber Monthly
        </h1>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="w-32 h-7 border border-[#0A6F77] rounded-md px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A6F77] focus:border-transparent"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-[200px] lg:h-[200px] xl:h-[230px]">
        <ResponsiveContainer width="100%">
          <BarChart
            data={normalizedData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              // stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tickFormatter={(v) => `${v}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [
                `${Number(value).toFixed(1)}%`,
                "Subscribers",
              ]}
              labelFormatter={(label) => `Day ${label}`}
              contentStyle={{
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                // boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              cursor={{ fill: "#ccdee2" }}
            />

            <Bar
              dataKey="pv"
              stroke="#0288A6"
              fill="#056176"
              radius={[4, 4, 0, 0]}
              barSize={25}
              // activeBar={{ fill: "blue", opacity: 0.7 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
