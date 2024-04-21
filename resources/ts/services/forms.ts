export const setFormErrors = (
  error: any,
  setErrors: (fields: Record<string, string | string[]>) => void,
  defaultField: string
): void => {
  if ("name" in error && error.name != "AxiosError") {
    throw error;
  }
  const response = error.response.data;

  if ("errors" in response) {
    setErrors(response.errors);
    return;
  }

  const generalMessage = response.message ?? response.error;
  setErrors({ [defaultField]: generalMessage });
};
