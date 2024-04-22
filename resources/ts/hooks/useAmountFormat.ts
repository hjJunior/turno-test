import { MaybeRef, computed, toValue } from "vue";

const useAmountFormat = (amount: MaybeRef<number>) => {
  const floatNumber = computed(() => toValue(amount) / 100);

  return computed(() =>
    floatNumber.value.toLocaleString("en", {
      style: "currency",
      currency: "USD",
    })
  );
};

export default useAmountFormat;
