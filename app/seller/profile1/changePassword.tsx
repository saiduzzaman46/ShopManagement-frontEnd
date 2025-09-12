import React, { useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  closeModal: () => void;
}

const passwordSchema = z.object({
  oldPassword: z.string().min(8, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
});

const validateField = (name: string, value: any) => {
  const singleFieldSchema =
    passwordSchema.shape[name as keyof typeof passwordSchema.shape];

  if (!singleFieldSchema) return "";

  const result = singleFieldSchema.safeParse(value);
  return result.success ? "" : result.error.issues[0].message;
};

const validateForm = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    nidImage: formData.getAll("nidImage") as File[],
  };

  const result = passwordSchema.safeParse(validationData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function ChangePassword({ closeModal }: Props) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validation = validateForm(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    if (
      validation.data &&
      validation.data.oldPassword === validation.data.newPassword
    ) {
      setErrors({
        ...validation.errors,
        newPassword: "New password must be different from current password",
      });
      return;
    }

    if (
      validation.data &&
      validation.data.newPassword !== validation.data.confirmPassword
    ) {
      setErrors({
        ...validation.errors,
        confirmPassword: "New password and confirm password do not match",
      });
      return;
    }

    try {
      // 1. Update password
      await axios.patch("/api/seller/updatepsaaword", formData);

      // window.location.href = "/signin";
      // // 2. Logout
      // await axios.post("/api/logout");

      // 3. Close modal
      closeModal();

      // 4. Force full page reload (triggers server redirect)
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          setErrors({
            ...errors,
            oldPassword: "Current password is incorrect",
          });
          return;
        }
      }
      console.log("Failed to update password:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-150 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-blue-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-500 text-sm">
              Current Password
            </label>
            <input
              type="password"
              name="oldPassword"
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">{errors.oldPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 text-sm">New Password</label>
            <input
              type="password"
              name="newPassword"
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
