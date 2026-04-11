"use client";

import { useState } from "react";
import Logo from "@/app/components/Logo";
import { addTransaction, getFinancialState } from "@/data/state";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const detectAmount = (text: string) => {
    const match = text.match(/\d+/);
    return match ? Number(match[0]) : null;
  };

  const detectCategory = (text: string) => {
    const t = text.toLowerCase();

    if (
      t.includes("comida") ||
      t.includes("almuerzo") ||
      t.includes("cena")
    ) return "comida";

    if (t.includes("uber") || t.includes("taxi"))
      return "transporte";

    if (t.includes("gasolina")) return "gasolina";

    if (
      t.includes("spotify") ||
      t.includes("netflix") ||
      t.includes("fiesta")
    )
      return "ocio";

    return "otros";
  };

  // 🔥 MEMORIA + INTENSIDAD
  const analyzeBehavior = (category: string) => {
    const state = getFinancialState();

    const recent = state.transactions.slice(-5);

    const sameCategoryCount = recent.filter(
      (t) => t.category === category
    ).length;

    const total = state.transactions.length;

    const pressureLevel =
      sameCategoryCount >= 3
        ? 3
        : total > 8
        ? 2
        : 1;

    return {
      sameCategoryCount,
      total,
      pressureLevel,
    };
  };

  // 🔥 RESPUESTA HUMANA
  const generateHumanReply = (text: string, name: string) => {
    const t = text.toLowerCase();

    if (t.includes("hola") || t.includes("hey")) {
      return [
        "hey…",
        `${name}… qué estás evitando hoy?`,
      ];
    }

    if (t.includes("como estas")) {
      return [
        "bien… viendo patrones",
        `y tú, ${name}?`,
      ];
    }

    return [
      "mmm…",
      "eso no suena a dinero.",
    ];
  };

  // 🔥 RESPUESTA CON PRESIÓN PROGRESIVA
  const generateResponse = (category: string, name: string) => {
    const state = getFinancialState();
    const p = state.spent / state.budget;

    const { pressureLevel } = analyzeBehavior(category);

    // 🔥 NIVEL 3 (ALTO)
    if (pressureLevel === 3) {
      return [
        "otra vez…",
        `${name}, esto ya no es casualidad.`,
      ];
    }

    // 🔥 NIVEL 2 (MEDIO)
    if (pressureLevel === 2) {
      return [
        "ok…",
        `${name}, ya sabes qué está pasando.`,
      ];
    }

    // 🔥 NIVEL 1 (BASE)
    if (p > 0.7) {
      return [
        "mmm…",
        `${name}, esto te está acercando al límite.`,
      ];
    }

    if (category === "ocio") {
      return [
        "ya veo…",
        `${name}, esto no es necesidad.`,
      ];
    }

    if (category === "comida") {
      return [
        "ok…",
        `${name}, esto ya es costumbre.`,
      ];
    }

    return [
      "ok…",
      `${name}, decisión tuya.`,
    ];
  };

  const sendMessage = async () => {
    if (!input) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    const state = getFinancialState();
    const name = state.name || "usuario";

    const amount = detectAmount(userText);
    const category = detectCategory(userText);

    let responses;

    if (amount) {
      addTransaction(userText, amount, category);
      responses = generateResponse(category, name);
    } else {
      responses = generateHumanReply(userText, name);
    }

    // 🔥 FASE 1
    setTyping(true);

    await new Promise((res) =>
      setTimeout(res, 500 + Math.random() * 500)
    );

    setTyping(false);

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: responses[0] },
    ]);

    // 🔥 FASE 2
    setTyping(true);

    await new Promise((res) =>
      setTimeout(res, 700 + Math.random() * 800)
    );

    setTyping(false);

    setMessages((prev) => [
      ...prev,
      { role: "bot", text: responses[1] },
    ]);
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#111827] border-b border-white/10">
        <Logo size={40} />
        <div>
          <p className="font-semibold">Lucid</p>
          <p className="text-xs text-green-400">en línea</p>
        </div>
      </div>

      {/* MENSAJES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm max-w-[75%] ${
                m.role === "user"
                  ? "bg-green-500 text-black rounded-br-none"
                  : "bg-white/10 text-white rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-white/10 text-sm text-gray-400 flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce delay-100">•</span>
              <span className="animate-bounce delay-200">•</span>
            </div>
          </div>
        )}

      </div>

      {/* INPUT */}
      <div className="p-3 bg-[#111827] border-t border-white/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-white/10 px-4 py-2 rounded-full text-sm outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center text-black"
        >
          ➤
        </button>
      </div>

    </main>
  );
}