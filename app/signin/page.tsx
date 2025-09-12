"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setErrors({ message: "Email and Password are required" });
      return;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setErrors({ message: "Please enter a valid email address" });
      return;
    }

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        data: formData,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }).then((res) => res.data);

      // await ClientApiRequest<{
      //   message: string;
      //   role: string;
      // }>("/auth/signin", "POST", formData);

      // console.log("Login successful:", response);

      if (response.role === "seller") {
        router.push("/seller");
      } else if (response.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/signin");
      }
    } catch (error: any) {
      // console.log("Login error:", error);
      const message = error.response?.data?.message || "Something went wrong";
      // console.log(message);
      if (message) {
        setErrors({ message });
      }
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col mb-3">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* General error */}
          <div className="h-3">
            {errors.message && (
              <p className="text-red-500 text-sm text-center">
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </main>
  );
}
