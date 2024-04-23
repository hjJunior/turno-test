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
      onlyCustomers: true,
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
      onlyCustomers: true,
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
      onlyCustomers: true,
    },
  },
  {
    path: "/check-deposits",
    name: "check-deposits.index",
    component: () => import("@transactions/pages/CheckDeposits.vue"),
    meta: {
      guard: true,
      onlyCustomers: true,
    },
  },
];

export default TransactionsRoute;
