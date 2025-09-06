import { z } from "zod";

const sellerSchema = z.object({
  fullName: z
    .string()
    .regex(/^[A-Za-z\s]+$/, "Name must contain only alphabets")
    .max(25, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().regex(/^\+?\d{11}$/, "Invalid phone number"),
  nid: z
    .string()
    .regex(/^\d{10}$|^\d{13}$/, "NID must be exactly 10 or 13 numbers"),
  nidImage: z
    .any()
    .refine((files) => files && files.length > 0, "NID image is required")
    .refine(
      (files) =>
        files.every((file: File) =>
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        ),
      "Only JPG, PNG, or WEBP images are allowed"
    )
    .refine(
      (files) => files.every((file: File) => file.size <= 2 * 1024 * 1024),
      "Each file must be less than 2MB"
    ),
  storeName: z.string().optional(),
  storeAddress: z.string().optional(),
});

// Schema for create (use everything)
export const createSellerSchema = sellerSchema;

// Schema for update (omit password, nid, nidImage)
export const updateSellerSchema = sellerSchema.omit({
  password: true,
  nid: true,
  nidImage: true,
});

// export type CreateSellerType = z.infer<typeof createSellerSchema>;
export type UpdateSellerType = z.infer<typeof updateSellerSchema>;
