import { z } from "zod";

const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  price: z.coerce.number().min(0, "Price must be >= 0"),
  costPrice: z.coerce.number().min(0, "Cost Price must be >= 0"),
  quantity: z.coerce.number().min(0, "Quantity must be >= 0"),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  tags: z.string().optional(),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
});

export const createProductSchema = productSchema;
export const updateProductSchema = productSchema.omit({
  images: true,
});

export type ProductFormData = z.infer<typeof productSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
