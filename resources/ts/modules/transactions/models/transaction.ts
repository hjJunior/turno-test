import BaseModel from "@/models/baseModel";
import CheckDeposit from "./checkDeposit";
import Expense from "./expense";
import useAmountFormat from "@/hooks/useAmountFormat";
import { useDateFormat } from "@vueuse/core";

export type TransactionableType =
  | "App\\Models\\Expense"
  | "App\\Models\\CheckDeposit";

export type Transactionable = CheckDeposit | Expense;

interface Transaction {
  id: string;
  description: string;
  amount: number;
  created_at: string;
  transactionable_type: TransactionableType;
  transactionable: Transactionable;
}

class Transaction extends BaseModel {
  resource() {
    return "transactions";
  }

  get amountFormated(): string {
    return useAmountFormat(this.amount).value;
  }

  get dateFormated(): string {
    return useDateFormat(this.created_at, "MM/DD/YYYY HH:mm").value;
  }

  getTransactionable(): Transactionable {
    const data = this.transactionable;

    switch (this.transactionable_type) {
      case "App\\Models\\Expense":
        return new Expense(data);
      case "App\\Models\\CheckDeposit":
        return new CheckDeposit(data);
    }
  }
}

export default Transaction;
