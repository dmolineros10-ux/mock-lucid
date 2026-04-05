"use client";

export default function Logo({ size = 56 }: { size?: number }) {
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-full bg-green-400 blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute inset-0 rounded-full bg-green-300 blur-md opacity-30"></div>

      <img
        src="/logo.png"
        alt="Lucid Logo"
        className="relative w-full h-full rounded-full bg-white/10 p-1 shadow-2xl border border-white/10"
      />
    </div>
  );
}