"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function ProfileDropdown({
  profile,
}: {
  profile: { fullName: string } | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 focus:outline-none"
      >
        <span role="img" aria-label="user icon" className="text-xl">
          👤
        </span>
        <span className="font-medium hidden sm:inline">
          {getMiddleName(profile?.fullName ?? "") || "User"}
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <Link
            href="/seller/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={toggleDropdown}
          >
            Profile
          </Link>
          <div className="border-t border-gray-200 my-1"></div>
          <button
            // onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function getMiddleName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);

  if (parts[0].toLowerCase() === "md") {
    parts.shift();
  }

  if (parts.length > 2) {
    return parts.slice(1, -1).join(" ");
  } else if (parts.length > 1) {
    return parts[0];
  } else {
    return parts[0];
  }
}
