import { MaybeRef, computed, toValue } from "vue";
import CheckDeposit from "../models/checkDeposit";
import useApiInfiniteQuery from "@/hooks/useApiInfiniteQuery";

type StateFilter =
  | "App\\States\\CheckDepositStatus\\Pending"
  | "App\\States\\CheckDepositStatus\\Accepted"
  | "App\\States\\CheckDepositStatus\\Rejected";

export const CheckDepositState: Record<string, StateFilter> = {
  pending: "App\\States\\CheckDepositStatus\\Pending",
  accepted: "App\\States\\CheckDepositStatus\\Accepted",
  rejected: "App\\States\\CheckDepositStatus\\Rejected",
};

export type UseCheckDepositsFilter = {
  state: StateFilter;
  page?: number;
};

export const useCheckDepositsCacheKey = (filter?: UseCheckDepositsFilter) => [
  "check-deposits",
  filter,
];

const getCheckDeposits = ({
  state,
  page = 1,
}: UseCheckDepositsFilter): Promise<CheckDeposit[]> => {
  return CheckDeposit.page(page).where("state", state).$get();
};

const useCheckDeposits = (filter: MaybeRef<UseCheckDepositsFilter>) => {
  const queryKey = computed(() => useCheckDepositsCacheKey(toValue(filter)));

  const { all: checkDeposits, ...rest } = useApiInfiniteQuery({
    queryKey,
    queryFn: (page: number) => getCheckDeposits({ ...toValue(filter), page }),
  });

  return {
    checkDeposits,
    ...rest,
  };
};

export default useCheckDeposits;
