"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import { setUserData } from "../../data/state";

export default function Onboarding() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  // guardar progreso automático
  useEffect(() => {
    const saved = localStorage.getItem("onboarding_progress");
    if (saved) {
      const data = JSON.parse(saved);
      setStep(data.step || 1);
      setName(data.name || "");
      setBudget(data.budget || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "onboarding_progress",
      JSON.stringify({ step, name, budget })
    );
  }, [step, name, budget]);

  const handleFinish = () => {
    setUserData(name, Number(budget));
    localStorage.removeItem("onboarding_progress");
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] flex justify-center items-center text-white">
      <div className="w-full max-w-md p-6 space-y-6">

        {/* LOGO */}
        <div className="flex flex-col items-center gap-4">
          <Logo size={80} />
          <h1 className="text-2xl font-bold">LUCID</h1>
          <p className="text-gray-400 text-sm">
            Ve tu dinero como es.
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ¿Cómo te llamas?
            </h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full p-3 rounded-xl bg-white/10 outline-none"
            />

            <button
              onClick={() => setStep(2)}
              className="w-full bg-green-500 py-3 rounded-xl text-black font-semibold"
            >
              Siguiente
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              ¿Cuál es tu presupuesto mensual?
            </h2>

            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Ej: 5000"
              type="number"
              className="w-full p-3 rounded-xl bg-white/10 outline-none"
            />

            <button
              onClick={handleFinish}
              className="w-full bg-green-500 py-3 rounded-xl text-black font-semibold"
            >
              Empezar
            </button>
          </div>
        )}

      </div>
    </main>
  );
}