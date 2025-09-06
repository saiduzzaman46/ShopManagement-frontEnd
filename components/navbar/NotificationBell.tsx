"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [count, setCount] = useState<number>(0);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const res = await fetch("/api/notifications");
  //       const data = await res.json();
  //       setCount(data.count || 0);
  //     } catch {}
  //   };

  //   fetchNotifications();
  //   const interval = setInterval(fetchNotifications, 10000); // every 10s

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <button className="relative pt-1 text-gray-600 hover:text-purple-600 transition-colors duration-300">
      <Bell className="w-6 h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
          {count}
        </span>
      )}
    </button>
  );
}
