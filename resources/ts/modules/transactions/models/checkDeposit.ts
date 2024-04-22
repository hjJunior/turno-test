import BaseModel from "@/models/baseModel";

class CheckDeposit extends BaseModel {
  resource() {
    return "check-deposits";
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
