"use client";
import { useState, useEffect } from "react";
import { addTransaction, getStatus, getFinancialState } from "../../data/state";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lucid_chat");

    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          role: "assistant",
          text: "Decime, ¿en qué estás pensando gastar?",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("lucid_chat", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input) return;

    const text = input.toLowerCase();

    const { budget, spent } = getFinancialState();
    const remaining = budget - spent;
    const status = getStatus();

    // 🔹 Detectar monto
    const amountMatch = text.match(/\d+/);
    const amount = amountMatch ? parseInt(amountMatch[0]) : null;

    // 🔹 Detectar categoría simple
    let category = "Gasto";

    if (text.includes("comida")) category = "Comida";
    else if (text.includes("uber") || text.includes("transporte")) category = "Transporte";
    else if (text.includes("spotify") || text.includes("netflix")) category = "Suscripciones";
    else if (text.includes("fiesta") || text.includes("salir")) category = "Ocio";

    // 🔥 GUARDAR TRANSACCIÓN
    if (amount) {
      addTransaction(category, amount);
    }

    let reply = "";

    // 🔥 PRIORIDAD: estado financiero
    if (status === "Te estás pasando") {
      reply = `Ya te estás pasando… te quedan Q ${remaining}. Esto ya no es buena idea.`;
    } 
    else if (status === "Vas un poco rápido") {
      reply = `Vas acelerando… te quedan Q ${remaining}. Esto suma más de lo que creés.`;
    } 
    else if (amount) {
      reply = `Ok. Registré Q ${amount} en ${category}.`;
    } 
    else {
      reply = "No es la primera vez que pensás esto.";
    }

    const newMessages = [
      ...messages,
      { role: "user", text: input },
      { role: "assistant", text: reply },
    ];

    setMessages(newMessages);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] flex justify-center">
      <div className="w-full max-w-md flex flex-col h-screen p-4 text-white">

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[75%] p-3 rounded-2xl ${
                m.role === "user"
                  ? "bg-white/10 self-end ml-auto"
                  : "bg-green-500 text-black"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2 mt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-3 rounded-xl bg-white/10 outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 px-4 rounded-xl text-black font-bold"
          >
            ➤
          </button>
        </div>

      </div>
    </main>
  );
}