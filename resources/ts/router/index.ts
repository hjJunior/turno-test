import useAuthState from "@/modules/auth/hooks/useAuthState";
import AuthRoutes from "@/modules/auth/routes";
import TransactionsRoute from "@/modules/transactions/routes";
import UsersRoute from "@/modules/users/routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [...AuthRoutes, ...TransactionsRoute, ...UsersRoute],
});

router.beforeEach(async (to, from) => {
  const { isAuthenticated } = useAuthState();
  const requiresLogin = to.meta.guard;

  if (!requiresLogin) return;

  if (!isAuthenticated.value && to.name !== "auth.login") {
    // redirect the user to the login page
    return { name: "auth.login" };
  }
});

export default router;
