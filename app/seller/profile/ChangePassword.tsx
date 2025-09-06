import React, { useState } from "react";

interface Props {
  closeModal: () => void;
}

export default function ChangePassword({ closeModal }: Props) {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Change Password:", passwords);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-500 text-sm">
              Current Password
            </label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm">New Password</label>
            <input
              type="password"
              name="new"
              value={passwords.new}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-sm">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handleChange}
              className="w-full border-b border-gray-300 focus:outline-none py-1"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
