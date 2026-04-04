export const getFinancialState = () => {
  const saved = localStorage.getItem("lucid_state");

  if (saved) {
    const parsed = JSON.parse(saved);

    return {
      name: parsed.name || "Usuario",
      budget: parsed.budget || 6000,
      spent: parsed.spent || 0,
      transactions: parsed.transactions || [], // 🔥 FIX clave
    };
  }

  return {
    name: "Usuario",
    budget: 6000,
    spent: 0,
    transactions: [],
  };
};

export const setUserData = (name: string, budget: number) => {
  const state = getFinancialState();

  state.name = name;
  state.budget = budget;

  localStorage.setItem("lucid_state", JSON.stringify(state));
};

export const addTransaction = (name: string, amount: number) => {
  const state = getFinancialState();

  // 🔥 asegurarse que siempre exista
  if (!state.transactions) {
    state.transactions = [];
  }

  state.transactions.unshift({ name, amount });
  state.spent += amount;

  localStorage.setItem("lucid_state", JSON.stringify(state));
};

export const getStatus = () => {
  const { budget, spent } = getFinancialState();

  const ratio = spent / budget;

  if (ratio < 0.4) return "Vas bien";
  if (ratio < 0.7) return "Vas un poco rápido";
  return "Te estás pasando";
};