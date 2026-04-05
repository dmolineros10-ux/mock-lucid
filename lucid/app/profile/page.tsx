"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getFinancialState } from "../../data/state";

export default function Profile() {
  const router = useRouter();
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const data = getFinancialState();
    setState(data);
  }, []);

  if (!state) return null;

  return (
    <main className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-white">
      <div className="w-full max-w-md p-6 space-y-6">

        <h1 className="text-2xl font-bold">Tu perfil</h1>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Nombre</p>
          <p className="text-lg">{state.name}</p>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">Presupuesto</p>
          <p className="text-lg">Q {state.budget}</p>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-green-500 py-3 rounded-xl text-black font-semibold"
        >
          Ir al Dashboard
        </button>

      </div>
    </main>
  );
}