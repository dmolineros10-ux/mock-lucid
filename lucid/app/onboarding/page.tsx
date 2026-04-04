"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Onboarding() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const options = [
    {
      title: "Control",
      desc: "Tener todo en claro.",
    },
    {
      title: "Ahorro",
      desc: "Guardar más para el futuro.",
    },
    {
      title: "Gastar mejor",
      desc: "Dejar de gastar en impulsos.",
    },
  ];

  return (
    <main className="p-6 flex flex-col justify-between h-screen bg-[#0b0f14] text-white">
      <div>
        <h2 className="text-xl mb-6">¿Qué querés mejorar?</h2>

        <div className="space-y-4">
          {options.map((opt) => (
            <div
              key={opt.title}
              onClick={() => setSelected(opt.title)}
              className={`p-4 rounded-xl cursor-pointer transition ${
                selected === opt.title
                  ? "border border-green-400 bg-white/5"
                  : "bg-white/5"
              }`}
            >
              <h3 className="font-semibold">{opt.title}</h3>
              <p className="text-gray-400 text-sm">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-green-500 py-3 rounded-xl text-black font-semibold mt-6"
      >
        Siguiente
      </button>
    </main>
  );
}