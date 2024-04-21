import api from "@/services/api";

const useRegisterBankAccount = () => {
  const register = () => api.post("/api/bank-accounts");

  return register;
};

export default useRegisterBankAccount;
