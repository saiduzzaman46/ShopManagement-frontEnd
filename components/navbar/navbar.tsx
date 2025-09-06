"use client";

import { useEffect, useState } from "react";
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./profileDropdown";
import axios from "axios";

export default function Navbar() {
  const [profile, setProfile] = useState<{ fullName: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/getProfile");

        setProfile({ fullName: res.data.fullName || "User" });
      } catch {
        setProfile(null);
      }
    };
    fetchProfile();
  }, []);

  return (
    <nav className="bg-white h-16 flex items-center shadow-md px-5 justify-between sticky top-0 z-50">
      <div>
        {/* <Link href="/" className="text-lg font-bold text-indigo-600">
          Shop<span className="text-gray-800">Management</span>
        </Link> */}
      </div>

      <div className="flex justify-end items-center">
        <NotificationBell />
        <div className="relative ml-4">
          <ProfileDropdown profile={profile} />
        </div>
      </div>
    </nav>
  );
}
