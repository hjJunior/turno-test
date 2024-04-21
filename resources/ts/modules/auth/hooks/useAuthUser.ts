import { useStorage } from "@vueuse/core";
import api from "@/services/api";

const STORAGE_USER_KEY = "auth_user";

const useAuthUser = () => {
  const user = useStorage(STORAGE_USER_KEY, null, localStorage, {
    serializer: {
      read: (v: any) => (v ? JSON.parse(v) : null),
      write: (v: any) => JSON.stringify(v),
    },
  });

  const refreshUser = async () => {
    const { data } = await api.get("/api/user");
    user.value = data;
  };

  return { user, refreshUser };
};

export default useAuthUser;
