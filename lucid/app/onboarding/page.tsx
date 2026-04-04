"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setUserData } from "../../data/state";

export default function Onboarding() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const handleContinue = () => {
    if (!name || !budget) return;

    setUserData(name, Number(budget));
    router.push("/dashboard");
  };

  return (
    <main className="p-6 flex flex-col justify-between h-screen bg-[#0b0f14] text-white">
      <div>
        <h2 className="text-xl mb-6">Configura tu perfil</h2>

        <input
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-white/10 outline-none"
        />

        <input
          placeholder="Presupuesto mensual (Q)"
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 outline-none"
        />
      </div>

      <button
        onClick={handleContinue}
        className="bg-green-500 py-3 rounded-xl text-black font-semibold"
      >
        Empezar
      </button>
    </main>
  );
}