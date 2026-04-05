"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function SpendingChart({ transactions }: any) {
  const dataMap: any = {};

  transactions.forEach((t: any) => {
    if (!dataMap[t.category]) {
      dataMap[t.category] = 0;
    }
    dataMap[t.category] += t.amount;
  });

  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6", "#a855f7"];

  return (
    <div className="w-full h-52">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry: any, index: number) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}