import useAuth from "./useAuth";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as zod from "zod";
import { useRouter } from "vue-router";
import { setFormErrors } from "@/services/forms";

const formSchema = zod.object({
  email: zod
    .string()
    .min(1, "This is required")
    .email({ message: "Must be a valid email" }),
  password: zod.string().min(1, "This is required"),
});

const validationSchema = toTypedSchema(formSchema);

export type LoginForm = zod.infer<typeof formSchema>;

const useLoginForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const { isSubmitting, handleSubmit, setErrors } = useForm({
    validationSchema,
  });

  const login = async (form: LoginForm) => {
    await auth.login(form).catch((error: any) => {
      setFormErrors(error, setErrors, "password");
    });

    router.push({ name: "transactions.index" });
  };

  return {
    onSubmit: handleSubmit(login),
    isSubmitting,
  };
};

export default useLoginForm;
