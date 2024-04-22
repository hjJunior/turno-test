import useAmountFormat from "@/hooks/useAmountFormat";
import BaseModel from "@/models/baseModel";
import { useDateFormat } from "@vueuse/core";

interface Expense {
  id: string;
  amount: number;
  created_at: string;
  description: string;
}

class Expense extends BaseModel {
  resource() {
    return "expenses";
  }

  get amountFormated(): string {
    return useAmountFormat(this.amount).value;
  }

  get dateFormated(): string {
    return useDateFormat(new Date(this.created_at), "MM/DD/YYYY HH:mm").value;
  }

  get icon(): string {
    return "icon-[teenyicons--down-outline]";
  }

  get iconBg(): string {
    return "*:!bg-yellow-200";
  }

  get iconColor(): string {
    return "text-yellow-600 dark:text-yellow-400";
  }
}

export default Expense;
