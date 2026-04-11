"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Logo from "@/app/components/Logo";
import BottomNav from "@/app/components/BottomNav";
import SpendingChart from "@/app/components/SpendingChart";

import {
  getFinancialState,
  getStatus,
  getPrediction,
  getInsights,
} from "@/data/state";

export default function Dashboard() {
  const [state, setState] = useState<any>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    setState(getFinancialState());
    setPrediction(getPrediction());
    setInsights(getInsights());
  }, []);

  if (!state) return null;

  const percentage = Math.min(
    (state.spent / state.budget) * 100,
    100
  );

  const remaining = state.budget - state.spent;

  return (
    <main className="min-h-screen bg-[#0b0f14] flex justify-center text-white pb-24">
      <div className="w-full max-w-md p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <Logo size={50} />
          <div>
            <p className="text-gray-400 text-sm">
              Hola, {state.name}
            </p>
            <h1 className="text-3xl font-bold">
              Q {remaining}
            </h1>
          </div>
        </div>

        {/* PROGRESS */}
        <div>
          <div className="h-2 bg-white/10 rounded-full">
            <div
              className={`h-2 rounded-full ${
                percentage > 80
                  ? "bg-red-500"
                  : percentage > 50
                  ? "bg-yellow-400"
                  : "bg-green-400"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-green-400">
            {getStatus()}
          </p>

          <p className="text-gray-400 text-sm">
            Has gastado Q {state.spent} de Q {state.budget}
          </p>
        </div>

        {/* 🔥 PREDICCIÓN */}
        {prediction && (
          <div className="bg-white/5 p-4 rounded-2xl">
            <p className="text-sm text-yellow-400 mb-1">
              ⚠️ A este ritmo:
            </p>

            <p className="text-sm">
              Te quedas sin dinero en{" "}
              <span className="font-bold">
                {prediction.daysLeft} días
              </span>
            </p>
          </div>
        )}

        {/* 🔥 INSIGHTS */}
        <div className="bg-white/5 p-4 rounded-2xl space-y-2">
          <h2 className="text-sm text-gray-300">
            Insights de LUCID
          </h2>

          {insights.map((insight, i) => (
            <p
              key={i}
              className="text-sm text-white"
            >
              ● {insight}
            </p>
          ))}
        </div>

        {/* GRÁFICO */}
        <SpendingChart />

        {/* BOTÓN */}
        <Link
          href="/chat"
          className="block text-center bg-green-500 py-3 rounded-xl text-black font-semibold"
        >
          Abrir chat con LUCID
        </Link>

      </div>

      <BottomNav />
    </main>
  );
}