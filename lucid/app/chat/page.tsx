"use client";
import { useState, useEffect } from "react";
import { updateSpent, getStatus, getFinancialState } from "../../data/state";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  // 🔹 Cargar historial
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

  // 🔹 Guardar historial
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("lucid_chat", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input) return;

    const text = input.toLowerCase();

    // 🔹 Estado financiero
    const status = getStatus();
    const { budget, spent } = getFinancialState();
    const remaining = budget - spent;

    // 🔹 Historial reciente
    const recentMessages = messages.slice(-6);
    const userMessages = recentMessages.filter((m) => m.role === "user");

    const spendingMentions = userMessages.filter((m) =>
      m.text.match(/\d+/)
    ).length;

    const impulseMentions = userMessages.filter((m) =>
      m.text.toLowerCase().includes("comprar") ||
      m.text.toLowerCase().includes("salir")
    ).length;

    // 🔹 Detectar monto
    const amountMatch = text.match(/\d+/);
    const amount = amountMatch ? parseInt(amountMatch[0]) : null;

    // 🔹 Guardar gasto
    if (amount) {
      updateSpent(amount);
    }

    let reply = "";

    // 🔥 PRIORIDAD: estado financiero + contexto real
    if (status === "Te estás pasando") {
      reply = `Ya te estás pasando… te quedan Q ${remaining}. Esto ya no es buena idea.`;
    } 
    else if (status === "Vas un poco rápido") {
      reply = `Vas acelerando… te quedan Q ${remaining}. Esto suma más de lo que creés.`;
    }

    // 🔹 comportamiento
    else if (spendingMentions >= 3) {
      reply = "Estás gastando seguido… ¿te diste cuenta?";
    } 
    else if (impulseMentions >= 2) {
      reply = "Últimamente todo suena a impulso.";
    } 

    // 🔹 monto
    else if (amount) {
      if (amount < 100) reply = "No es mucho… pero tampoco es necesario.";
      else if (amount < 300) reply = "Podés. Pero ya empieza a sumar.";
      else if (amount < 600) reply = "Podés… pero mañana lo vas a sentir.";
      else reply = "Esto ya no es un gasto chico. Pensalo bien.";
    } 

    // 🔹 intención
    else if (text.includes("salir")) {
      reply = "Salir siempre suena bien… hasta que ves tu cuenta mañana.";
    } 
    else if (text.includes("comprar")) {
      reply = "¿Lo querés o lo necesitás?";
    } 
    else if (text.includes("puedo")) {
      reply = "Podés. La pregunta es si deberías.";
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