export const getFinancialState = () => {
  const saved = localStorage.getItem("lucid_state");

  if (saved) return JSON.parse(saved);

  return {
    name: "Usuario",
    budget: 6000,
    spent: 0,
    transactions: [], // 🔥 NUEVO
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

  state.transactions.unshift({ name, amount }); // 🔥 guarda al inicio
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