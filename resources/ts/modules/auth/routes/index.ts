import { RouteRecordRaw } from "vue-router";

const AuthRoutes: RouteRecordRaw[] = [
  {
    path: "/auth/login",
    name: "auth.login",
    component: () => import("@auth/pages/AuthLogin.vue"),
  },
];

export default AuthRoutes;
