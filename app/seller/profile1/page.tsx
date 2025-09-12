"use client";

import Link from "next/link";
import { useProfile } from "./ProfileContext";
import ChangePassword from "./changePassword";
import { useState } from "react";

export default function Profile() {
  const profile = useProfile();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const profileData = [
    { label: "Full Name", value: profile.fullName },
    { label: "Phone Number", value: profile.phone },
    { label: "E-mail", value: profile.email },
    { label: "Store Name", value: profile.storeName },
    { label: "Store Address", value: profile.storeAddress },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-2 gap-6 mb-4">
        {profileData.map((values) => (
          <div
            key={values.label}
            className="col-span-2 border-b border-gray-300 pb-1 pr-6"
          >
            <p className="text-gray-500 text-sm">{values.label}</p>
            <p className="min-h-[1.25rem]">{values.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-6">
        <Link
          href="/seller/profile1/edit-profile"
          className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded"
        >
          Edit Profile
        </Link>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded"
        >
          Change Password
        </button>
      </div>
      {showPasswordModal && (
        <ChangePassword closeModal={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}
