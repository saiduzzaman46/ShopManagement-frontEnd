"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClientApiRequest } from "@/api/clientApiRequest";
import { createSellerSchema } from "@/schemas/sellerSchema";

const fields = [
  { label: "Full Name", name: "fullName", type: "text" },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    placeholder: "+8801XXXXXXXXX",
  },
  { label: "Email", name: "email", type: "email" },
  { label: "Password", name: "password", type: "password" },
  { label: "Store Name", name: "storeName", type: "text" },
  { label: "Store Address", name: "storeAddress", type: "text" },
  {
    label: "NID Number",
    name: "nid",
    type: "text",
    placeholder: "10 or 13 digits",
  },
];

const validateField = (name: string, value: any) => {
  const singleFieldSchema =
    createSellerSchema.shape[name as keyof typeof createSellerSchema.shape];

  if (!singleFieldSchema) return "";

  const result = singleFieldSchema.safeParse(value);
  return result.success ? "" : result.error.issues[0].message;
};

const validateForm = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    nidImage: formData.getAll("nidImage") as File[],
  };

  const result = createSellerSchema.safeParse(validationData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function CreateSellerForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileValidateField = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "nidImage" || name === "storeName" || name === "storeAddress")
      return;

    const errorMessage = validateField(name, value);
    // if (value.trim() !== "") {
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    // } else {
    //   setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    // }
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
      await ClientApiRequest<{ message: string }>(
        "/seller/signup",
        "POST",
        formData,
        {
          "Content-Type": "multipart/form-data",
        },
        false
      );
      router.push("/signin");
    } catch (error: any) {
      const message = error.message || "Something went wrong";

      if (message.toLowerCase().includes("email")) {
        setErrors({ email: message });
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Seller Account
        </h1>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="mb-1 font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                onChange={handleFileValidateField}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Reserve space for errors (fixed height) */}
              <div className="h-3">
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            </div>
          ))}

          {/* File input */}
          <div className="flex flex-col">
            <label
              htmlFor="nidImage"
              className="mb-1 font-medium text-gray-700"
            >
              NID Image(s) (max 2 files)
            </label>
            <input
              type="file"
              id="nidImage"
              name="nidImage"
              multiple
              accept="image/jpeg,image/png,image/jpg"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="h-5">
              {errors.nidImage && (
                <p className="text-red-500 text-sm">{errors.nidImage}</p>
              )}
            </div>
          </div>

          {/* Submit button full width */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
