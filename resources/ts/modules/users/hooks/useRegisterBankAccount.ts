import useAuthState from "@/modules/auth/hooks/useAuthState";
import api from "@/services/api";

const useRegisterBankAccount = () => {
  const { refreshUser } = useAuthState();

  const register = async () => {
    await api.post("/api/bank-accounts");
    await refreshUser();
  };

  return register;
};

export default useRegisterBankAccount;
