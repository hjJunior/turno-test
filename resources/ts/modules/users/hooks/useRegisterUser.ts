import api from "@/services/api";
import { SignUpForm } from "./useSignUpForm";

const useRegisterUser = () => {
  const register = (form: SignUpForm) => api.post("/api/users", form);

  return register;
};

export default useRegisterUser;
