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
            <Link href="/dashboard">🏠 Home</Link>
          </li>
          <li>
            <button onClick={() => setIsOpenProduct(!isOpenProduct)}>
              📦 Products
              <span>{isOpenProduct ? " -" : " +"}</span>
            </button>
            {isOpenProduct && (
              <ul className="submenu">
                <li>
                  <Link href="/dashboard/products/add">➕ Add Product</Link>
                </li>
                <li>
                  <Link href="/dashboard/products/manage">
                    🛠️ Manage Products
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link href="/dashboard/orders">🛒 Orders</Link>
          </li>
          <li>
            <Link href="/dashboard/notifications">🔔 Notifications</Link>
          </li>
          <li>
            <Link href="/dashboard/settings">⚙️ Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
