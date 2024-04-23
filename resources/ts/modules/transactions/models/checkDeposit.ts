import useAmountFormat from "@/hooks/useAmountFormat";
import BaseModel from "@/models/baseModel";
import api from "@/services/api";
import { useDateFormat } from "@vueuse/core";

interface CheckDeposit {
  id: string;
  amount: number;
  created_at: string;
  description: string;
  picture: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

class CheckDeposit extends BaseModel {
  resource() {
    return "check-deposits";
  }

  async reject() {
    return api.post(`/api/check-deposits/${this.id}/reject`);
  }

  async accept() {
    return api.post(`/api/check-deposits/${this.id}/accept`);
  }

  get amountFormated(): string {
    return useAmountFormat(this.amount).value;
  }

  get dateFormated(): string {
    return useDateFormat(new Date(this.created_at), "MM/DD/YYYY HH:mm").value;
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
