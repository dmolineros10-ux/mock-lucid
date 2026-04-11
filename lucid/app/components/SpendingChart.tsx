"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { getCategoryTotals } from "../../data/state";

export default function SpendingChart() {
  const dataObj = getCategoryTotals();

  const data = Object.entries(dataObj).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f97316",
    "#a855f7",
    "#9ca3af",
  ];

  if (data.length === 0) {
    return (
      <div className="bg-white/5 p-4 rounded-2xl text-gray-400 text-sm">
        Aún no hay datos suficientes
      </div>
    );
  }

  return (
    <div className="bg-white/5 p-4 rounded-2xl">
      <h2 className="text-sm text-gray-300 mb-3">
        Distribución de gastos
      </h2>

      <div className="w-full h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda */}
      <div className="mt-4 space-y-1 text-sm">
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex justify-between text-gray-300"
          >
            <span className="capitalize">
              {entry.name}
            </span>
            <span>Q {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}