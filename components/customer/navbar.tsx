"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const route = useRouter();
  const pathname = usePathname();
  const [customer, setCustomer] = useState<{ fullName: string } | null>(null);

  // fetch logged-in profile
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("/api/customer/profile");
        setCustomer(res.data.customer);
      } catch {
        setCustomer(null);
      }
    };
    fetchCustomer();
  }, []);

  // logout handler
  const handleLogout = async () => {
    try {
      await axios.post("/api/customer/logout");
      setCustomer(null);
      route.push("/customer");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left side (Logo) */}
      <Link href="/customer" className="text-xl font-bold text-blue-600">
        ShopManagement
      </Link>

      {/* Center (Search Box - only when not on signin/register) */}
      {pathname !== "/signin" && pathname !== "/register" && (
        <div className="flex-1 flex justify-center px-4">
          <input
            type="text"
            placeholder="Search here..."
            className="w-1/2 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      {/* Right side (Login/Register OR Profile/Logout) */}
      {!customer ? (
        <div className="flex items-center space-x-4">
          <Link
            href="/signin"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            👤 Login
          </Link>
          <Link
            href="/register"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            📜 Register
          </Link>
          <Link
            href="/customer/addcart"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            🛍️ Cart
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link
            href="/customer/profile"
            className="font-medium text-gray-700 hover:text-blue-600 transition"
          >
            👤 {customer.fullName}
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
