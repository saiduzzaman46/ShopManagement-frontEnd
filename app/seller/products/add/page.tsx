"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";

type ProductFormValues = {
  title: string;
  description?: string;
  price: number;
  costPrice: number;
  quantity: number;
  categoryId?: number;
  brandId?: number;
  images: File[];
  tags?: string;
};

type OptionBrand = {
  brandId: number;
  name: string;
};
type OptionCategory = {
  categoryId: number;
  name: string;
};

export default function AddProductForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      costPrice: 0,
      quantity: 0,
      categoryId: undefined,
      brandId: undefined,
      images: [],
      tags: "",
    },
  });

  const [categories, setCategories] = useState<OptionCategory[]>([]);
  const [brands, setBrands] = useState<OptionBrand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/getcategories`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/getbrands`),
        ]);

        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();

      // Fields
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("price", data.price.toString());
      formData.append("costPrice", data.costPrice.toString());
      formData.append("quantity", data.quantity.toString());
      if (data.categoryId)
        formData.append("categoryId", data.categoryId.toString());
      if (data.brandId) formData.append("brandId", data.brandId.toString());
      if (data.tags) formData.append("tags", data.tags);

      data.images.forEach((file) => formData.append("images", file));

      const res = await axios.post("/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
        willClose: () => {
          router.push("/seller/products/manage");
        },
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Failed to add product",
      });
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-auto rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Top Section: Title & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: true, maxLength: 100 })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", { maxLength: 500 })}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Middle Section: Pricing & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true, min: 0 })}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("costPrice", { required: true, min: 0 })}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register("quantity", { required: true, min: 0 })}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              {...register("tags")}
              placeholder="Comma separated"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              {...register("categoryId")}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              {...register("brandId")}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.brandId} value={brand.brandId}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <Controller
          name="images"
          control={control}
          rules={{
            required: "At least one image is required",
            validate: (files: File[]) =>
              files.length > 0 || "At least one image is required",
          }}
          render={({ field }) => (
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                field.onChange(e.target.files ? Array.from(e.target.files) : [])
              }
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
