import { useStorage } from "@vueuse/core";
import api from "@/services/api";

const STORAGE_USER_KEY = "auth_user";

type User = {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  username: string;
  bank_account: {
    id: string;
  };
};

const useAuthUser = () => {
  const user = useStorage<User | null>(STORAGE_USER_KEY, null, localStorage, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v),
    },
  });

  const refreshUser = async () => {
    const { data } = await api.get("/api/auth/me");
    user.value = data;
  };

  return { user, refreshUser };
};

export default useAuthUser;
