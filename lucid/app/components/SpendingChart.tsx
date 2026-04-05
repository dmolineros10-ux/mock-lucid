"use client";

import { getCategoryTotals } from "../../data/state";

export default function SpendingChart() {
  const data = getCategoryTotals();
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  if (total === 0) {
    return (
      <div className="bg-white/5 p-4 rounded-2xl text-gray-400 text-sm">
        Aún no hay datos suficientes
      </div>
    );
  }

  const colors: Record<string, string> = {
    comida: "#22c55e",
    transporte: "#3b82f6",
    gasolina: "#f97316",
    ocio: "#a855f7",
    otros: "#9ca3af",
  };

  return (
    <div className="bg-white/5 p-4 rounded-2xl">
      <h2 className="text-sm text-gray-300 mb-3">
        Distribución de gastos
      </h2>

      <div className="space-y-2">
        {Object.entries(data).map(([cat, amount]) => {
          const percentage = (amount / total) * 100;

          return (
            <div key={cat}>
              <div className="flex justify-between text-xs mb-1">
                <span className="capitalize">{cat}</span>
                <span>Q {amount}</span>
              </div>

              <div className="h-2 bg-white/10 rounded-full">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: colors[cat] || "#9ca3af",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}