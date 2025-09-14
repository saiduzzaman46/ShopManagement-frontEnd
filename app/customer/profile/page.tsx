"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { User, Phone, Mail, MapPin, Edit, Lock } from "lucide-react";

interface Profile {
  email: string;
  customer: {
    fullName: string;
    gender: string;
    phone: string;
    address: string | null;
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/customer/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold shadow-md">
          {profile.customer.fullName.charAt(0)}
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {profile.customer.fullName}
        </h2>
        <p className="text-gray-500 text-sm">Customer</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
          <User className="text-blue-500" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="font-medium text-gray-800 capitalize">
              {profile.customer.gender}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
          <Phone className="text-green-500" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium text-gray-800">
              {profile.customer.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
          <MapPin className="text-red-500" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <p className="font-medium text-gray-800">
              {profile.customer.address || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
          <Mail className="text-purple-500" size={20} />
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium text-gray-800">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/customer/profile/update"
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Edit size={18} className="mr-2" />
          Edit Profile
        </Link>
        <Link
          href="/customer/profile/passwordupdate"
          className="flex items-center px-5 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          <Lock size={18} className="mr-2" />
          Update Password
        </Link>
      </div>
    </div>
  );
}
