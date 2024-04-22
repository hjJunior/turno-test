import { MaybeRef, computed, toValue } from "vue";
import Transaction, { TransactionableType } from "../models/transaction";
import useApiInfiniteQuery from "@/hooks/useApiInfiniteQuery";

type TypeFilter = "all" | TransactionableType;

export type UseTransactionsFilter = {
  type: TypeFilter;
  page?: number;
};

const useTransactionsCacheKey = (filter?: UseTransactionsFilter) => [
  "transactions",
  filter,
];

const getTransactions = ({
  type,
  page = 1,
}: UseTransactionsFilter): Promise<Transaction[]> => {
  return Transaction.page(page)
    .when(type !== "all", (query) => query.where("type", type))
    .$get();
};

const useTransactions = (filter: MaybeRef<UseTransactionsFilter>) => {
  const queryKey = computed(() => useTransactionsCacheKey(toValue(filter)));

  const { all: transactions, ...rest } = useApiInfiniteQuery({
    queryKey,
    queryFn: (page: number) => getTransactions({ ...toValue(filter), page }),
  });

  return {
    transactions,
    ...rest,
  };
};

export default useTransactions;
