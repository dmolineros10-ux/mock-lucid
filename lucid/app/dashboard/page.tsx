"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { user, transactions, alerts } from "../../data/mockData";
import { getFinancialState, getStatus } from "../../data/state";

export default function Dashboard() {
  const [spent, setSpent] = useState(0);
  const [budget, setBudget] = useState(6000);
  const [status, setStatus] = useState("Cargando...");

  // 🔹 Cargar estado financiero
  useEffect(() => {
    const state = getFinancialState();
    setSpent(state.spent);
    setBudget(state.budget);
    setStatus(getStatus());
  }, []);

  const percentage = Math.min((spent / budget) * 100, 100);

  return (
    <main className="min-h-screen bg-[#0b0f14] flex justify-center">
      <div className="w-full max-w-md p-6 space-y-6 text-white">

        {/* Header */}
        <div>
          <p className="text-gray-400">Hola, {user.name}</p>
          <h1 className="text-4xl font-bold">Q {user.balance}</h1>

          {/* Barra dinámica */}
          <div className="mt-3">
            <div className="h-2 bg-white/10 rounded-full">
              <div
                className="h-2 bg-yellow-400 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            <p className="text-yellow-400 mt-2 text-sm">{status}</p>

            <p className="text-gray-400 text-sm mt-1">
              Has gastado Q {spent} de Q {budget}
            </p>
          </div>
        </div>

        {/* Gastos */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <h2 className="mb-3 text-sm text-gray-300">Últimos gastos</h2>

          {transactions.map((t, i) => (
            <div
              key={i}
              className="flex justify-between py-2 border-b border-white/10 last:border-none"
            >
              <span>{t.name}</span>
              <span className="text-gray-300">Q {t.amount}</span>
            </div>
          ))}
        </div>

        {/* Alertas dinámicas */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <h2 className="mb-3 text-sm text-gray-300">Alertas de LUCID</h2>

          {spent > budget * 0.7 && (
            <p className="text-red-400 text-sm mb-1">
              ● Ya estás entrando en zona peligrosa
            </p>
          )}

          {spent > budget && (
            <p className="text-red-500 text-sm mb-1">
              ● Ya superaste tu presupuesto
            </p>
          )}

          {alerts.map((a, i) => (
            <div key={i} className="flex gap-2 mb-2 text-sm">
              <span className="text-yellow-400">●</span>
              <p className="text-gray-300">{a}</p>
            </div>
          ))}
        </div>

        {/* Botón */}
        <Link
          href="/chat"
          className="block text-center bg-green-500 py-3 rounded-xl text-black font-semibold"
        >
          Abrir chat con LUCID
        </Link>

      </div>
    </main>
  );
}