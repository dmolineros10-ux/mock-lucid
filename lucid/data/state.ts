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