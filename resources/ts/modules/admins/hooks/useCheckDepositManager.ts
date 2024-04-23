import { useCheckDepositsCacheKey } from "@/modules/transactions/hooks/useCheckDeposits";
import CheckDeposit from "@/modules/transactions/models/checkDeposit";
import { useQueryClient } from "@tanstack/vue-query";

const useCheckDepositManager = () => {
  const queryClient = useQueryClient();
  const cacheKey = useCheckDepositsCacheKey({
    state: "App\\States\\CheckDepositStatus\\Pending",
  });

  const removeCheckDepositFromCache = (checkDeposit: CheckDeposit) => {
    queryClient.setQueryData(cacheKey, (data: { pages: CheckDeposit[][] }) => {
      return {
        ...data,
        pages: data?.pages.map((deposits) =>
          deposits.filter(({ id }) => id !== checkDeposit.id)
        ),
      };
    });
  };

  const confirmToRun = (callback: Function) => () => {
    if (!confirm("Are you sure?")) {
      return;
    }

    callback();
  };

  return {
    removeCheckDepositFromCache,
    confirmToRun,
  };
};

export default useCheckDepositManager;
