"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", href: "/dashboard", icon: "🏠" },
    { name: "Gastos", href: "/dashboard", icon: "💳" },
    { name: "Chat", href: "/chat", icon: "💬" },
    { name: "Perfil", href: "/onboarding", icon: "👤" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <div className="w-full max-w-md bg-[#0b0f14] border-t border-white/10 backdrop-blur-xl flex justify-around py-3">

        {navItems.map((item, i) => {
          const active = pathname === item.href;

          return (
            <Link
              key={i}
              href={item.href}
              className={`flex flex-col items-center text-xs ${
                active ? "text-green-400" : "text-gray-500"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}

      </div>
    </div>
  );
}