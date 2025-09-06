"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Package,
  PlusCircle,
  Wrench,
  ShoppingCart,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Sidebar({ className }: { className?: string }) {
  const [isOpenProduct, setIsOpenProduct] = useState(false);

  return (
    <aside
      className={`${className} bg-white shadow-md flex flex-col h-screen fixed top-0 left-0 `}
    >
      {/* Shop name */}
      <div className="h-16 flex items-center justify-center border-b">
        <Link href="/seller" className="text-xl font-bold text-indigo-600">
          Shop<span className="text-gray-800">Management</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {/* Home */}
          <li>
            <Link
              href="/seller"
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </li>
          {/* Products submenu */}
          <li>
            <button
              onClick={() => setIsOpenProduct(!isOpenProduct)}
              className="flex w-full items-center justify-between p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <span className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                Products
              </span>
              {isOpenProduct ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {isOpenProduct && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    href="/seller/products/add"
                    className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Product
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seller/products/manage"
                    className="flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Wrench className="w-4 h-4" />
                    Manage Products
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Orders */}
          <li>
            <Link
              href="/seller/orders"
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Orders</span>
            </Link>
          </li>

          {/* Notifications */}
          <li>
            <Link
              href="/seller/notifications"
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </Link>
          </li>

          {/* Settings */}
          <li>
            <Link
              href="/seller/settings"
              className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
