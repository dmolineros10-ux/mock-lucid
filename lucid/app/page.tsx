"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFinancialState } from "../data/state";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const state = getFinancialState();

    if (state.name && state.budget) {
      router.push("/profile");
    } else {
      router.push("/onboarding");
    }
  }, []);

  return null;
}