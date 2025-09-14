"use client";

import { useState, useEffect } from "react";
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

export default function EditProfile() {
  const router = useRouter();
  const [form, setForm] = useState<UpdateSellerType>({
    fullName: "",
    email: "",
    phone: "",
    storeName: "",
    storeAddress: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Fetch seller profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/seller/profile");
        const data = res.data;

        setForm({
          fullName: data.fullName || data.seller?.fullName || "",
          email: data.email || "",
          phone: data.phone || data.seller?.phone || "",
          storeName: data.storeName || "",
          storeAddress: data.storeAddress || "",
        });
      } catch (err) {
        console.error("Failed to fetch seller profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      await axios.patch("/api/seller/update", formData);
      router.push("/seller/profile");
    } catch (error: any) {
      console.error("Update failed:", error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrors({ email: "Email already exists" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <Link
        href="/seller/profile"
        className="text-blue-600 hover:underline mb-6 inline-flex items-center gap-1"
      >
        <ArrowLeft size={15} /> Back
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-500 text-sm">Full Name</label>
          <input
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-1"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-500 text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-500 text-sm">Phone</label>
          <input
            name="phone"
            type="text"
            value={form.phone}
            placeholder="+8801XXXXXXXXX"
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-1"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Store Name */}
        <div>
          <label className="block text-gray-500 text-sm">Store Name</label>
          <input
            name="storeName"
            type="text"
            value={form.storeName}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-1"
          />
          {errors.storeName && (
            <p className="text-red-500 text-sm">{errors.storeName}</p>
          )}
        </div>

        {/* Store Address */}
        <div>
          <label className="block text-gray-500 text-sm">Store Address</label>
          <input
            name="storeAddress"
            type="text"
            value={form.storeAddress}
            onChange={handleChange}
            className="w-full border-b border-gray-300 focus:outline-none py-1"
          />
          {errors.storeAddress && (
            <p className="text-red-500 text-sm">{errors.storeAddress}</p>
          )}
        </div>

        {/* Submit */}
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
