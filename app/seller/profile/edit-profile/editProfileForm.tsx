"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSellerSchema, UpdateSellerType } from "@/schemas/sellerSchema";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const validateField = (name: string, value: any) => {
  const singleFieldSchema =
    updateSellerSchema.shape[name as keyof typeof updateSellerSchema.shape];

  if (!singleFieldSchema) return "";

  const result = singleFieldSchema.safeParse(value);
  return result.success ? "" : result.error.issues[0].message;
};

const validateForm = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    nidImage: formData.getAll("nidImage") as File[],
  };

  const result = updateSellerSchema.safeParse(validationData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function EditProfile({
  initialData,
}: {
  initialData: UpdateSellerType;
}) {
  const router = useRouter();
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validation = validateForm(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    try {
      // const res = await serverApiRequest("/seller/profile/update", "PATCH", formData);
      await axios.patch("/api/updateSeller", formData);
      router.refresh();
    } catch (error: any) {
      // console.log("Update failed:", error);
      let message;
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || "Something went wrong";
      }
      if (error.status === 409) {
        setErrors({ email: message });
      }
      return;
    }

    router.push("/seller/profile");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <Link
        href="/seller/profile"
        className="text-blue-600 hover:underline mb-6 inline-flex items-center gap-1"
      >
        <ArrowLeft size={15} /> Back
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Full Name", name: "fullName", type: "text" },
          { label: "Email", name: "email", type: "email" },
          {
            label: "Phone",
            name: "phone",
            type: "text",
            placeholder: "+8801XXXXXXXXX",
          },
          { label: "Store Name", name: "storeName", type: "text" },
          { label: "Store Address", name: "storeAddress", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-500 text-sm">{label}</label>
            <input
              name={name}
              type={type}
              placeholder=" "
              value={form[name as keyof typeof form] || ""}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />

            {errors[name] && (
              <p className="absolute text-red-500 text-sm">{errors[name]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
