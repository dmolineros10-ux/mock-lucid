"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import BottomNav from "../components/BottomNav";
import { getFinancialState, getStatus } from "../../data/state";

export default function Dashboard() {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    setState(getFinancialState());
  }, []);

  if (!state) return null;

  const percentage = Math.min((state.spent / state.budget) * 100, 100);
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

        {/* GASTOS */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <h2 className="text-sm text-gray-300 mb-3">
            Últimos gastos
          </h2>

          {state.transactions.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No hay gastos aún.
            </p>
          ) : (
            state.transactions.slice(0, 5).map((t: any, i: number) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-white/10 last:border-none"
              >
                <div>
                  <p>{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.category}
                  </p>
                </div>
                <p>Q {t.amount}</p>
              </div>
            ))
          )}
        </div>

        {/* ALERTAS */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <p className="text-green-400 text-sm">
            ● {getStatus()}
          </p>
          <p className="text-gray-400 text-sm">
            Tus decisiones hoy definen tu fin de mes.
          </p>
        </div>

        {/* BOTÓN CHAT */}
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