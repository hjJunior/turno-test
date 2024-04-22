import { RouteRecordRaw } from "vue-router";

const TransactionsRoute: RouteRecordRaw[] = [
  {
    path: "/balance",
    name: "balance.index",
    component: () => import("@transactions/pages/Transactions.vue"),
    props: {
      title: "Balance",
      filter: {
        type: "all",
      },
    },
    meta: {
      guard: true,
    },
  },
  {
    path: "/expenses",
    name: "expenses.index",
    component: () => import("@transactions/pages/Transactions.vue"),
    props: {
      title: "Expenses",
      filter: {
        type: "App\\Models\\Expense",
      },
    },
    meta: {
      guard: true,
    },
  },
  {
    path: "/incomes",
    name: "incomes.index",
    component: () => import("@transactions/pages/Transactions.vue"),
    props: {
      title: "Incomes",
      filter: {
        type: "App\\Models\\CheckDeposit",
      },
    },
    meta: {
      guard: true,
    },
  },
];

export default TransactionsRoute;
