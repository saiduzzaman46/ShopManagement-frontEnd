"use client";
import { useState } from "react";
import Link from "next/link";
import ChangePassword from "./ChangePassword";

type ProfileType = {
  fullName: string;
  phone: string;
  email: string;
  storeName?: string;
  storeAddress?: string;
};

export default function Profile({
  initialProfile,
}: {
  initialProfile: ProfileType;
}) {
  const [profile] = useState<ProfileType>(initialProfile);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const prodileData = [
    { label: "Full Name", value: profile.fullName },
    { label: "Phone Number", value: profile.phone },
    { label: "E-mail", value: profile.email },
    { label: "Store Name", value: profile.storeName },
    { label: "Store Address", value: profile.storeAddress },
  ];
  // console.log(Object.entries(data));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-2 gap-6 mb-4">
        {prodileData.map((values) => (
          <div
            key={values.label}
            className="col-span-2 border-b-[1.5px] border-gray-300 pb-1 pr-6  border-gray-300"
          >
            <p className="text-gray-500 text-sm">{values.label}</p>
            <p className="min-h-[1.25rem]">{values.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Link
          href="/seller/profile/edit-profile"
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
