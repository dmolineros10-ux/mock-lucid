type Transaction = {
  name: string;
  amount: number;
  category: string;
  date: number;
};

type FinancialState = {
  name: string;
  budget: number;
  spent: number;
  transactions: Transaction[];
};

const STORAGE_KEY = "lucid_state";

// 🔹 GET STATE
export function getFinancialState(): FinancialState {
  if (typeof window === "undefined") {
    return {
      name: "",
      budget: 0,
      spent: 0,
      transactions: [],
    };
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {
      name: "",
      budget: 0,
      spent: 0,
      transactions: [],
    };
  }

  const parsed = JSON.parse(raw);

  return {
    name: parsed.name || "",
    budget: parsed.budget || 0,
    spent: parsed.spent || 0,
    transactions: parsed.transactions || [],
  };
}

// 🔹 SET USER
export function setUserData(name: string, budget: number) {
  const state = getFinancialState();

  const updated = {
    ...state,
    name,
    budget,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// 🔹 ADD TRANSACTION (🔥 IMPORTANTE)
export function addTransaction(
  name: string,
  amount: number,
  category: string
) {
  const state = getFinancialState();

  const newTransaction: Transaction = {
    name,
    amount,
    category,
    date: Date.now(),
  };

  const updated = {
    ...state,
    spent: state.spent + amount,
    transactions: [newTransaction, ...state.transactions],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

// 🔹 AGRUPAR POR CATEGORÍA (🔥 PARA GRÁFICO)
export function getCategoryTotals() {
  const { transactions } = getFinancialState();

  const totals: Record<string, number> = {};

  transactions.forEach((t) => {
    if (!totals[t.category]) {
      totals[t.category] = 0;
    }
    totals[t.category] += t.amount;
  });

  return totals;
}

// 🔹 STATUS
export function getStatus(): string {
  const { spent, budget } = getFinancialState();

  if (!budget) return "Configura tu presupuesto";

  const p = spent / budget;

  if (p < 0.5) return "Vas bien";
  if (p < 0.8) return "Vas rápido";
  if (p < 1) return "Te estás pasando";
  return "Ya te pasaste";
}

// 🔹 RESET
export function resetState() {
  localStorage.removeItem(STORAGE_KEY);
}
export function getPrediction() {
  const { spent, budget, transactions } = getFinancialState();

  if (transactions.length === 0) return null;

  const daysPassed = Math.max(1, transactions.length);
  const dailyAvg = spent / daysPassed;

  const remaining = budget - spent;

  const daysLeft = Math.floor(remaining / dailyAvg);

  return {
    dailyAvg,
    daysLeft,
  };
}

export function getTopCategory() {
  const { transactions } = getFinancialState();

  const totals: Record<string, number> = {};

  transactions.forEach((t) => {
    if (!totals[t.category]) totals[t.category] = 0;
    totals[t.category] += t.amount;
  });

  const sorted = Object.entries(totals).sort(
    (a, b) => b[1] - a[1]
  );

  return sorted[0]?.[0] || null;
}
export function getInsights() {
  const { spent, budget, transactions } = getFinancialState();

  if (transactions.length === 0) return [];

  const insights: string[] = [];

  const percentage = spent / budget;

  // 🔥 ritmo de gasto
  if (percentage > 0.8) {
    insights.push("Estás muy cerca del límite. Esto ya no es cómodo.");
  } else if (percentage > 0.5) {
    insights.push("Tu ritmo de gasto es alto.");
  }

  // 🔥 categoría dominante
  const totals: Record<string, number> = {};

  transactions.forEach((t) => {
    if (!totals[t.category]) totals[t.category] = 0;
    totals[t.category] += t.amount;
  });

  const sorted = Object.entries(totals).sort(
    (a, b) => b[1] - a[1]
  );

  const topCategory = sorted[0]?.[0];

  if (topCategory === "ocio") {
    insights.push("Estás priorizando placer inmediato.");
  }

  if (transactions.length > 5) {
    insights.push("No es un gasto aislado. Es un patrón.");
  }

  if (insights.length === 0) {
    insights.push("Vas bien, pero no te confíes.");
  }

  return insights;
}