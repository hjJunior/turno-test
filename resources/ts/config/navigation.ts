import router from "@/router";

export type NavigationItem = {
  label: string;
  icon: string;
  to: string;
};

const NavigationItems = Object.freeze<NavigationItem[]>([
  {
    label: "Balance",
    icon: "icon-[material-symbols-light--balance]",
    to: router.resolve({ name: "balance.index" }).fullPath,
  },
  {
    label: "Incomes",
    icon: "icon-[ph--hand-withdraw]",
    to: router.resolve({ name: "incomes.index" }).fullPath,
  },
  {
    label: "Expenses",
    icon: "icon-[ph--hand-deposit]",
    to: router.resolve({ name: "expenses.index" }).fullPath,
  },
  {
    label: "Checks",
    icon: "icon-[la--money-check-alt]",
    to: router.resolve({ name: "check-deposits.index" }).fullPath,
  },
]);

export default NavigationItems;
