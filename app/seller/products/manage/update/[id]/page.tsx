"use client";

import { updateProductSchema } from "@/schemas/productSchema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { use } from "react";

type OptionBrand = {
  brandId: number;
  name: string;
};
type OptionCategory = {
  categoryId: number;
  name: string;
};

const validateForm = (formData: FormData) => {
  const validationData = {
    ...Object.fromEntries(formData.entries()),
    images: formData.getAll("images") as File[],
  };

  const result = updateProductSchema.safeParse(validationData);

  if (!result.success) {
    const formattedErrors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      formattedErrors[err.path[0] as string] = err.message;
    });
    return { success: false, errors: formattedErrors };
  }
  return { success: true, data: result.data, errors: {} };
};

export default function UpdateProduct({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = use(params);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<OptionCategory[]>([]);
  const [brands, setBrands] = useState<OptionBrand[]>([]);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Fetch product & options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes, prodRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/getcategories`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/getbrands`),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/product/getproduct/${id}`
          ),
        ]);

        setCategories(catRes.data);
        setBrands(brandRes.data);
        setProductData(prodRes.data);

        setSelectedCategory(prodRes.data.categoryId?.toString() || "");
        setSelectedBrand(prodRes.data.brandId?.toString() || "");
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    if (id) fetchData();
  }, [id]);
  // console.log(productData);

  categories.forEach((cat) => {
    if (cat.name === productData?.categoryName) {
      if (selectedCategory !== cat.categoryId.toString())
        setSelectedCategory(cat.categoryId.toString());
    }
  });
  brands.forEach((brand) => {
    if (brand.name === productData?.brandName) {
      if (selectedBrand !== brand.brandId.toString())
        setSelectedBrand(brand.brandId.toString());
    }
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    const formData = new FormData(e.currentTarget);
    const validation = validateForm(formData);

    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    // console.log("FormData entries:");
    // for (const pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    setErrors({});
    setLoading(true);

    try {
      const res = await axios.patch(`/api/products/updateData/${id}`, formData);

      await Swal.fire({
        icon: "success",
        title: "Product Updated!",
        text: res.data.message,
        timer: 1500,
        showConfirmButton: false,
        willClose: () => router.push("/seller/products/manage"),
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Failed to update product",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!productData) return <p className="p-6">Loading product data...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Update Product</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Title & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              defaultValue={productData.title}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={productData.description || ""}
              className="w-full border rounded-md px-3 py-2 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Price, Cost, Quantity, Tags */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price *</label>
            <input
              type="number"
              step="0.01"
              name="price"
              defaultValue={productData.price}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Cost Price *
            </label>
            <input
              type="number"
              step="0.01"
              name="costPrice"
              defaultValue={productData.costPrice}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.costPrice && (
              <p className="text-red-500 text-sm">{errors.costPrice}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quantity *</label>
            <input
              type="number"
              name="quantity"
              defaultValue={productData.quantity}
              className="w-full border rounded-md px-3 py-2"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              defaultValue={productData.tags || ""}
              placeholder="Comma separated"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="categoryId"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
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
            <label className="block text-sm font-medium mb-1">Brand</label>
            <select
              name="brandId"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
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

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-3 px-6 rounded-md transition`}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
