import CheckDeposit from "@/modules/transactions/models/checkDeposit";
import { useMutation } from "@tanstack/vue-query";
import useCheckDepositManager from "./useCheckDepositManager";

const useRejectCheckDeposit = (checkDeposit: CheckDeposit) => {
  const manager = useCheckDepositManager();
  const { confirmToRun, removeCheckDepositFromCache } = manager;

  const { mutate, isPending } = useMutation({
    mutationFn: checkDeposit.reject.bind(checkDeposit),
    onSuccess: () => removeCheckDepositFromCache(checkDeposit),
    onError: console.error,
  });

  return {
    onRejectClick: confirmToRun(mutate),
    isPending,
  };
};

export default useRejectCheckDeposit;
