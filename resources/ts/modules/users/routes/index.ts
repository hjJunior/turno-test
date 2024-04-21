import { RouteRecordRaw } from "vue-router";

const UsersRoute: RouteRecordRaw[] = [
  {
    path: "/users/new",
    name: "users.create",
    component: () => import("@users/pages/UserRegistration.vue"),
  },
];

export default UsersRoute;
