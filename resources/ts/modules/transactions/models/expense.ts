import BaseModel from "@/models/baseModel";

class Expense extends BaseModel {
  resource() {
    return "expenses";
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
