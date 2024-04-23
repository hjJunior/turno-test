import { computed } from "vue";
import useAuthToken from "./useAuthToken";
import useAuthUser from "./useAuthUser";

const useAuthState = () => {
  const token = useAuthToken();
  const { user, refreshUser } = useAuthUser();

  const onLogged = async (newToken: string) => {
    token.value = newToken;
    await refreshUser();
  };

  const resetAuthState = () => {
    token.value = null;
    user.value = null;
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    user,
    token,
    isAuthenticated,
    refreshUser,
    onLogged,
    resetAuthState,
  };
};

export default useAuthState;
