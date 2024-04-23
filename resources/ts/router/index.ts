import AdminsRoute from "@/modules/admins/routes";
import useAuthUser from "@/modules/auth/hooks/useAuthUser";
import AuthRoutes from "@/modules/auth/routes";
import TransactionsRoute from "@/modules/transactions/routes";
import UsersRoute from "@/modules/users/routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AuthRoutes,
    ...TransactionsRoute,
    ...UsersRoute,
    ...AdminsRoute,
    {
      path: "/",
      redirect: "/auth/login",
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { user, refreshUser } = useAuthUser();
  const isAuthenticated = user.value !== null;
  const { guard: requiresLogin, onlyCustomers, onlyAdmins } = to.meta;

  if (!requiresLogin) return;

  if (isAuthenticated) {
    await refreshUser();
  }

  const { is_admin: isAdmin } = user.value!;

  if (!isAuthenticated && to.name !== "auth.login") {
    return { name: "auth.login" };
  }

  if (onlyCustomers && isAdmin) {
    return { name: "admin.check-deposits.index" };
  }

  if (onlyAdmins && !isAdmin) {
    return { name: "balance.index" };
  }
});

export default router;
