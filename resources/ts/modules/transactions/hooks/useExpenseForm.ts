import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as zod from "zod";
import { setFormErrors } from "@/services/forms";
import api from "@/services/api";
import useAuth from "@/modules/auth/hooks/useAuth";
import useRefreshTransactions from "./useRefreshTransactions";

const formSchema = zod.object({
  description: zod
    .string()
    .min(1, "This is required")
    .max(255, "This message is too long"),
  amount: zod
    .any()
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Needs to be a number",
    })
    .refine((value) => parseInt(value, 10) >= 0, {
      message: "Needs to be greater than 0",
    }),
});

const validationSchema = toTypedSchema(formSchema);

export type ExpenseForm = zod.infer<typeof formSchema>;

const useExpenseForm = (onCompleted: () => void) => {
  const refreshTransactions = useRefreshTransactions();
  const { user } = useAuth();
  const { isSubmitting, handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const submitCheckDeposit = async (values: ExpenseForm) => {
    try {
      const bank_account_id = user.value!.bank_account.id;

      await api.post("/api/expenses", { ...values, bank_account_id });
      await refreshTransactions();

      onCompleted();
    } catch (e) {
      setFormErrors(e, setErrors, "amount");
      throw e;
    }
  };

  return {
    onSubmit: handleSubmit(submitCheckDeposit, console.error),
    isSubmitting,
  };
};

export default useExpenseForm;
