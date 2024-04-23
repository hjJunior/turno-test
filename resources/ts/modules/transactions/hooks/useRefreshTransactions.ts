import { useQueryClient } from "@tanstack/vue-query";
import { useTransactionsCacheKey } from "./useTransactions";

const cacheDepositCacheKey = useTransactionsCacheKey({
  type: "App\\Models\\Expense",
});

const allTransactionsCacheKey = useTransactionsCacheKey({
  type: "all",
});

const CASH_KEYS_TO_INVALIDADE = [cacheDepositCacheKey, allTransactionsCacheKey];

const useRefreshTransactions = () => {
  const queryClient = useQueryClient();

  const refresh = async () => {
    const promises = CASH_KEYS_TO_INVALIDADE.map((queryKey) =>
      queryClient.invalidateQueries({ queryKey })
    );

    await Promise.all(promises);
  };

  return refresh;
};

export default useRefreshTransactions;
