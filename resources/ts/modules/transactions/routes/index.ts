import { RouteRecordRaw } from "vue-router";

const TransactionsRoute: RouteRecordRaw[] = [
  {
    path: "/transactions",
    name: "transactions.index",
    component: () => import("@transactions/pages/Transactions.vue"),
    meta: {
      guard: true,
    },
  },
];

export default TransactionsRoute;
