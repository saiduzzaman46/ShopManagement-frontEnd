import React, { useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";

interface Props {
  closeModal: () => void;
}

const passwordSchema = z.object({
  current: z.string().min(8, "Current password is required"),
  new: z.string().min(8, "New password must be at least 6 characters"),
  confirm: z.string().min(8, "Confirm password is required"),
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const errorMessage = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const validation = validateForm(formData);

    console.log(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    closeModal();
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
              name="current"
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
            {errors.current && (
              <p className="text-red-500 text-xs">{errors.current}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-500 text-sm">New Password</label>
            <input
              type="password"
              name="new"
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
            {errors.new && <p className="text-red-500 text-xs">{errors.new}</p>}
          </div>

          <div>
            <label className="block text-gray-500 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm"
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
            {errors.confirm && (
              <p className="text-red-500 text-xs">{errors.confirm}</p>
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
