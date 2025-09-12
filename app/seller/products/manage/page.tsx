"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const tableHeaders = [
  "Image",
  "Title",
  "Description",
  "Price",
  "Cost Price",
  "Quantity",
  "Category",
  "Brand",
  "Tags",
  "Actions",
];

export class ProductResponse {
  productId!: string;
  title!: string;
  description?: string;
  price!: number;
  costPrice!: number;
  quantity!: number;
  images?: string[];
  brandName!: string | null;
  categoryName!: string | null;
  tags?: string;
}

export default function ManageProduct() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  // filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<ProductResponse[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/product/getallproducts`
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // filter logic
  useEffect(() => {
    let temp = [...products];

    // search filter
    if (searchQuery.trim()) {
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description?.toLowerCase() ?? "").includes(
            searchQuery.toLowerCase()
          )
      );
    }

    // category filter
    if (selectedCategory) {
      temp = temp.filter((p) => p.categoryName === selectedCategory);
    }

    // brand filter
    if (selectedBrand) {
      temp = temp.filter((p) => p.brandName === selectedBrand);
    }

    // price filter
    if (minPrice !== "") {
      temp = temp.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== "") {
      temp = temp.filter((p) => p.price <= Number(maxPrice));
    }

    setFilteredProducts(temp);
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    minPrice,
    maxPrice,
    products,
  ]);

  // unique categories & brands for dropdowns
  const categories = Array.from(
    new Set(products.map((p) => p.categoryName).filter(Boolean))
  );
  const brands = Array.from(
    new Set(products.map((p) => p.brandName).filter(Boolean))
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Products
      </h2>

      {/* 🔹 Filters & Search */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-md w-full"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md w-full"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat!} value={cat!}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="px-3 py-2 border rounded-md w-full"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand!} value={brand!}>
              {brand}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) =>
            setMinPrice(e.target.value ? Number(e.target.value) : "")
          }
          className="px-3 py-2 border rounded-md w-full"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value ? Number(e.target.value) : "")
          }
          className="px-3 py-2 border rounded-md w-full"
        />
      </div>

      {/* 🔹 Product Table */}
      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full max-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <ProductRow key={product.productId} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductRow({ product }: { product: ProductResponse }) {
  const imageUrl =
    product.images && product.images.length > 0
      ? `http://localhost:3000/product/getimage/${product.images[0]}`
      : "";
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.images && product.images.length > 0 ? (
          <div className="w-16 h-16 relative">
            <Image
              src={imageUrl}
              alt={product.title}
              sizes="64px"
              fill
              className="object-cover rounded-md border"
            />
          </div>
        ) : (
          <span className="text-gray-400">No Image</span>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.title}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">
        <span title={product.description}>{product.description}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        ${product.price}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        ${product.costPrice}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.quantity}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.categoryName ?? "-"}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.brandName ?? "-"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {product.tags ?? "-"}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <ActionButtons productId={product.productId} />
      </td>
    </tr>
  );
}

function ActionButtons({ productId }: { productId: string }) {
  return (
    <div className="flex justify-center gap-2">
      <Link
        href={`/seller/products/manage/update/${productId}`}
        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Edit
      </Link>
      <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
        Delete
      </button>
    </div>
  );
}
