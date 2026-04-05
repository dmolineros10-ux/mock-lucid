"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFinancialState, getStatus } from "../../data/state";
import BottomNav from "../components/BottomNav";
import SpendingChart from "../components/SpendingChart";

export default function Dashboard() {
  const [name, setName] = useState("Usuario");
  const [spent, setSpent] = useState(0);
  const [budget, setBudget] = useState(6000);
  const [status, setStatus] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const loadData = () => {
    const state = getFinancialState();

    setName(state.name);
    setSpent(state.spent);
    setBudget(state.budget);
    setTransactions(state.transactions || []);
    setStatus(getStatus());
  };

  useEffect(() => {
    loadData();

    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  const percentage = Math.min((spent / budget) * 100, 100);
  const remaining = budget - spent;

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter((t) => t.category === activeTab);

  const getIcon = (category: string) => {
    switch (category) {
      case "food":
        return "🍔";
      case "transport":
        return "🚗";
      case "leisure":
        return "🎉";
      case "subscriptions":
        return "📺";
      default:
        return "💸";
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] flex justify-center">
      <div className="w-full max-w-md p-6 pb-24 space-y-6 text-white">

        {/* HEADER */}
        <div className="text-center relative">
          <div className="absolute right-0 top-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs">
            ⚙️
          </div>

          <h1 className="text-2xl font-bold tracking-widest">LUCID</h1>

          <p className="text-xs text-gray-400 mt-1">
            Ve tu dinero como es.
          </p>
        </div>

        {/* BALANCE */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-4 rounded-2xl text-center">
          <p className="text-gray-400 text-sm">Hola, {name}</p>

          <h1 className="text-4xl font-bold mt-1">Q {remaining}</h1>

          <div className="mt-3">
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

            <p
              className={`mt-2 text-sm ${
                percentage > 80
                  ? "text-red-400"
                  : percentage > 50
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {status}
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Has gastado Q {spent} de Q {budget}
            </p>
          </div>
        </div>

        {/* GRÁFICO */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-4 rounded-2xl">
          <h2 className="text-sm text-gray-400 mb-2">
            Distribución de gastos
          </h2>

          <SpendingChart transactions={transactions} />
        </div>

        {/* TABS */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: "all", label: "Todos" },
            { key: "food", label: "Comida" },
            { key: "transport", label: "Transporte" },
            { key: "leisure", label: "Ocio" },
            { key: "subscriptions", label: "Subs" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-green-500 text-black"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GASTOS */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-4 rounded-2xl">
          <h2 className="mb-3 text-sm text-gray-400 tracking-wide">
            Últimos gastos
          </h2>

          {filteredTransactions.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No hay gastos en esta categoría.
            </p>
          ) : (
            filteredTransactions.slice(0, 5).map((t, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-white/10 last:border-none"
              >
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg">
                    {getIcon(t.category)}
                  </div>

                  <div>
                    <p className="text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {t.category}
                    </p>
                  </div>

                </div>

                <span className="text-sm text-gray-300 font-medium">
                  Q {t.amount}
                </span>
              </div>
            ))
          )}
        </div>

        {/* ALERTAS */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg p-4 rounded-2xl">
          <h2 className="mb-3 text-sm text-gray-400 tracking-wide">
            Alertas de LUCID
          </h2>

          {spent > budget * 0.7 && (
            <p className="text-yellow-400 text-sm mb-1">
              ● Estás entrando en zona de riesgo
            </p>
          )}

          {spent > budget && (
            <p className="text-red-500 text-sm mb-1">
              ● Ya superaste tu presupuesto
            </p>
          )}

          <p className="text-gray-300 text-sm">
            ● Tus decisiones están definiendo tu mes
          </p>
        </div>

        {/* BOTÓN */}
        <Link
          href="/chat"
          className="block text-center bg-green-500 py-3 rounded-xl text-black font-semibold shadow-lg"
        >
          Abrir chat con LUCID
        </Link>

      </div>

      {/* NAVBAR */}
      <BottomNav />
    </main>
  );
}