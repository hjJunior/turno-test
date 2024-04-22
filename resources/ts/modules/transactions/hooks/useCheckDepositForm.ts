import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as zod from "zod";
import { setFormErrors } from "@/services/forms";
import api from "@/services/api";
import useAuthUser from "@auth/hooks/useAuthUser";
import { useQueryClient } from "@tanstack/vue-query";
import { useCheckDepositsCacheKey } from "./useCheckDeposits";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  picture: zod
    .instanceof(File, { message: "Required" })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only jpg, jpeg, png and webp are supported formats"
    ),
});

const validationSchema = toTypedSchema(formSchema);

export type CheckDepositForm = zod.infer<typeof formSchema>;

const useCheckDepositForm = (onCompleted: () => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuthUser();
  const { isSubmitting, handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const cacheDepositCacheKey = useCheckDepositsCacheKey({
    state: "App\\States\\CheckDepositStatus\\Pending",
  });

  const submitCheckDeposit = async (values: CheckDepositForm) => {
    const bankAccountId = user.value.bank_account.id;

    try {
      await api.post(
        "/api/check-deposits",
        {
          ...values,
          bank_account_id: bankAccountId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await queryClient.invalidateQueries({ queryKey: cacheDepositCacheKey });
    } catch (e) {
      setFormErrors(e, setErrors, "picture");
      throw e;
    }

    onCompleted();
  };

  return {
    onSubmit: handleSubmit(submitCheckDeposit, console.error),
    isSubmitting,
  };
};

export default useCheckDepositForm;
