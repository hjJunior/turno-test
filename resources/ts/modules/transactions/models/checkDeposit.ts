import useAmountFormat from "@/hooks/useAmountFormat";
import BaseModel from "@/models/baseModel";
import { useDateFormat } from "@vueuse/core";

interface CheckDeposit {
  id: string;
  amount: number;
  created_at: string;
  description: string;
}

class CheckDeposit extends BaseModel {
  resource() {
    return "check-deposits";
  }

  get amountFormated(): string {
    return useAmountFormat(this.amount).value;
  }

  get dateFormated(): string {
    return useDateFormat(this.created_at, "MM/DD/YYYY HH:mm").value;
  }

  get icon(): string {
    return "icon-[teenyicons--up-outline]";
  }

  get iconBg(): string {
    return "*:!bg-green-200";
  }

  get iconColor(): string {
    return "text-green-600 dark:text-green-400";
  }
}

export default CheckDeposit;
