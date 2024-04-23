import { RouteRecordRaw } from "vue-router";

const AdminsRoute: RouteRecordRaw[] = [
  {
    path: "/admin/check-deposits",
    name: "admin.check-deposits.index",
    component: () => import("@admins/pages/CheckDeposits.vue"),
    meta: {
      guard: true,
      onlyAdmins: true,
    },
  },
];

export default AdminsRoute;
