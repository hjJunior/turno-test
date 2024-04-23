import CheckDeposit from "@/modules/transactions/models/checkDeposit";
import { useMutation } from "@tanstack/vue-query";
import useCheckDepositManager from "./useCheckDepositManager";

const useApproveCheckDeposit = (checkDeposit: CheckDeposit) => {
  const manager = useCheckDepositManager();
  const { confirmToRun, removeCheckDepositFromCache } = manager;

  const { mutate, isPending } = useMutation({
    mutationFn: checkDeposit.accept.bind(checkDeposit),
    onSuccess: () => removeCheckDepositFromCache(checkDeposit),
  });

  return {
    onApproveClick: confirmToRun(mutate),
    isPending,
  };
};

export default useApproveCheckDeposit;
