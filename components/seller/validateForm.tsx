import { ZodSchema } from "zod";

export const validateForm = <T extends ZodSchema>(
  schema: T,
  formData: FormData,
  extraFields: Record<string, any> = {}
) => {
  const data = {
    ...Object.fromEntries(formData.entries()),
    ...extraFields, // for files or additional fields
  };

  const result = schema.safeParse(data);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }

  return { success: true, data: result.data, errors: {} };
};
