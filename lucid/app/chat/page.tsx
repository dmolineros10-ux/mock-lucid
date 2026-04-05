"use client";

import { useState } from "react";
import Logo from "../components/Logo";
import { addTransaction } from "../../data/state";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;

    const newMessages = [...messages, { text: input, sender: "user" }];

    // detectar gasto
    const match = input.match(/\d+/);
    if (match) {
      const amount = Number(match[0]);
      addTransaction(input, amount, "Otros");

      newMessages.push({
        text: "Lo registré. Ojo con ese gasto.",
        sender: "bot",
      });
    } else {
      newMessages.push({
        text: "Contame mejor qué estás pensando gastar.",
        sender: "bot",
      });
    }

    setMessages(newMessages);
    setInput("");
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] flex flex-col text-white">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <Logo size={40} />
        <p className="font-semibold">Lucid</p>
      </div>

      {/* MENSAJES */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[70%] p-3 rounded-xl ${
              m.sender === "user"
                ? "bg-green-500 text-black ml-auto"
                : "bg-white/10"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 flex gap-2 border-t border-white/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-xl bg-white/10 outline-none"
          placeholder="Escribe un mensaje..."
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 rounded-xl text-black font-semibold"
        >
          ➤
        </button>
      </div>

    </main>
  );
}