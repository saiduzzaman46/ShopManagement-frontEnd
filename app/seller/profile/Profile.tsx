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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="border-b-[1.5px] border-gray-300 pb-1 pr-6  border-gray-300">
          <p className="text-gray-500 text-sm">Full Name</p>
          <p className="">{profile.fullName}</p>
        </div>
        <div className="border-b-[1.5px] border-gray-300 pb-1 pr-6  border-gray-300">
          <p className="text-gray-500 text-sm">Phone Number</p>
          <p>{profile.phone}</p>
        </div>
        <div className="col-span-2 border-b-[1.5px] border-gray-300 pb-1 pr-6  border-gray-300">
          <p className="text-gray-500 text-sm">E-mail</p>
          <p>{profile.email}</p>
        </div>
        <div className="col-span-2 border-b-[1.5px] border-gray-300 pb-1 pr-6  border-gray-300">
          <p className="text-gray-500 text-sm">Store Name</p>
          <p> {profile.storeName ? profile.storeName : "Null"}</p>
        </div>
        <div className="col-span-2 border-b-[1.5px] border-gray-300 pb-1 pr-6  border-gray-300">
          <p className="text-gray-500 text-sm">Store Address</p>
          <p>{profile.storeAddress ? profile.storeAddress : "Null"}</p>
        </div>
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
