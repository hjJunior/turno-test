import { computed, onMounted } from "vue";
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

  onMounted(async () => {
    if (!token.value) return;
    await refreshUser().catch(resetAuthState);
  });

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
