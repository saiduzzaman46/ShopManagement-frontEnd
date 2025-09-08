import { ZodObject, ZodTypeAny } from "zod";

export const validateField = <T extends ZodObject<Record<string, ZodTypeAny>>>(
  schema: T,
  name: string,
  value: any
) => {
  const fieldSchema = schema.shape[name];
  if (!fieldSchema) return "";

  const result = fieldSchema.safeParse(value);
  return result.success ? "" : result.error.issues[0].message;
};
