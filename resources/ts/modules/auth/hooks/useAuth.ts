import api from "@/services/api";
import useAuthState from "./useAuthState";

type LoginForm = {
  email: string;
  password: string;
};

const useAuth = () => {
  const { token, onLogged, user, resetAuthState } = useAuthState();

  const login = async (form: LoginForm) => {
    const { data } = await api.post("/api/auth/login", form);

    token.value = data.access_token;
    onLogged(token.value);
  };

  const logout = async () => {
    await api.post("/api/auth/logout").catch();
    resetAuthState();
  };

  return {
    login,
    user,
    logout,
  };
};

export default useAuth;
