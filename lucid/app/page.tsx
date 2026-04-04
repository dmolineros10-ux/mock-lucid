"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center px-6 bg-[#0b0f14] text-white">
      <h1 className="text-4xl font-bold mb-4">LUCID</h1>

      <p className="text-gray-400 mb-10">
        Vamos a ordenar tu dinero, sin drama.
      </p>

      <button
        onClick={() => router.push("/onboarding")}
        className="bg-green-500 px-6 py-3 rounded-xl text-black font-semibold"
      >
        Empezar
      </button>
    </main>
  );
}