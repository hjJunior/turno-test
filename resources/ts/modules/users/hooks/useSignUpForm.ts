import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as zod from "zod";
import { useRouter } from "vue-router";
import useRegisterUser from "./useRegisterUser";
import useRegisterBankAccount from "./useRegisterBankAccount";
import useAuth from "@/modules/auth/hooks/useAuth";
import { setFormErrors } from "@/services/forms";

const formSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod
    .string()
    .min(1, "This is required")
    .email({ message: "Must be a valid email" }),
  username: zod.string().min(1, "Username is required").toLowerCase(),
  password: zod.string().min(1, "Password is required"),
  password_confirmation: zod.string(),
});

const validationSchema = toTypedSchema(formSchema);

export type SignUpForm = zod.infer<typeof formSchema>;

const useSignUpForm = () => {
  const auth = useAuth();
  const router = useRouter();
  const registerUser = useRegisterUser();
  const registerBankAccount = useRegisterBankAccount();

  const { isSubmitting, handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const signUp = async (form: SignUpForm) => {
    try {
      await registerUser(form);
      await registerBankAccount();
      await auth.login({ email: form.email, password: form.password });

      router.push({ name: "transactions.index" });
    } catch (error) {
      setFormErrors(error, setErrors, "password_confirmation");
    }
  };

  return {
    onSubmit: handleSubmit(signUp),
    isSubmitting,
  };
};

export default useSignUpForm;
