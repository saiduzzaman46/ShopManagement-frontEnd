"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link href="/seller">🏠 Home</Link>
          </li>
          <li>
            <button onClick={() => setIsOpenProduct(!isOpenProduct)}>
              📦 Products
              <span>{isOpenProduct ? " -" : " +"}</span>
            </button>
            {isOpenProduct && (
              <ul className="submenu">
                <li>
                  <Link href="/seller/products/add">➕ Add Product</Link>
                </li>
                <li>
                  <Link href="/seller/products/manage">🛠️ Manage Products</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/seller/orders">🛒 Orders</Link>
          </li>
          <li>
            <Link href="/seller/notifications">🔔 Notifications</Link>
          </li>
          <li>
            <Link href="/seller/settings">⚙️ Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
