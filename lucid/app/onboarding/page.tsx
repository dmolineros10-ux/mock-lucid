"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setUserData, getFinancialState } from "../../data/state";

export default function Onboarding() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  // 🔥 AUTO-SKIP
  useEffect(() => {
    const state = getFinancialState();

    if (state.name && state.budget) {
      router.push("/dashboard");
    }
  }, []);

  // 🔥 CARGAR PROGRESO
  useEffect(() => {
    const saved = localStorage.getItem("lucid_onboarding");

    if (saved) {
      const data = JSON.parse(saved);
      setStep(data.step || 1);
      setName(data.name || "");
      setBudget(data.budget || "");
    }
  }, []);

  // 🔥 GUARDAR PROGRESO
  useEffect(() => {
    localStorage.setItem(
      "lucid_onboarding",
      JSON.stringify({ step, name, budget })
    );
  }, [step, name, budget]);

  const next = () => {
    if (step === 1 && !name) return;
    if (step === 2 && !budget) return;
    setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const finish = () => {
    setUserData(name, Number(budget));

    localStorage.removeItem("lucid_onboarding");

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] flex items-center justify-center text-white px-6">

      <div className="w-full max-w-md space-y-8">

        {/* 🔥 LOGO + HEADER */}
        <div className="text-center">

          {/* LOGO PRO CON GLOW */}
          <img
            src="/logo.png"
            alt="LUCID logo"
            className="w-20 h-20 mx-auto mb-4 object-contain drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]"
          />

          <h1 className="text-2xl font-bold tracking-widest">LUCID</h1>

          {/* PROGRESS BAR */}
          <div className="mt-4 h-1 bg-white/10 rounded-full">
            <div
              className="h-1 bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

        </div>

        {/* CARD */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6 shadow-lg transition-all duration-300">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <p className="text-gray-400 text-sm">
                ¿Cómo quieres que te llame?
              </p>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className="w-full p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-green-500"
              />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <p className="text-gray-400 text-sm">
                ¿Cuál es tu presupuesto mensual?
              </p>

              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ej: 5000"
                className="w-full p-3 rounded-xl bg-white/10 outline-none focus:ring-2 focus:ring-green-500"
              />
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <p className="text-gray-400 text-sm">
                Todo listo, {name}.
              </p>

              <div className="text-center">
                <p className="text-3xl font-bold">
                  Q {budget}
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  será tu punto de control mensual
                </p>
              </div>
            </>
          )}

          {/* BOTONES */}
          <div className="flex justify-between gap-2 pt-2">

            {step > 1 && (
              <button
                onClick={back}
                className="w-1/3 bg-white/10 py-2 rounded-xl text-gray-300"
              >
                Atrás
              </button>
            )}

            {step < 3 && (
              <button
                onClick={next}
                className="flex-1 bg-green-500 py-2 rounded-xl text-black font-semibold hover:opacity-90 transition"
              >
                Continuar
              </button>
            )}

            {step === 3 && (
              <button
                onClick={finish}
                className="flex-1 bg-green-500 py-2 rounded-xl text-black font-semibold hover:opacity-90 transition"
              >
                Entrar
              </button>
            )}

          </div>

        </div>

        {/* COPY */}
        <p className="text-center text-xs text-gray-500">
          LUCID no te juzga… pero sí te muestra la verdad.
        </p>

      </div>

    </main>
  );
}