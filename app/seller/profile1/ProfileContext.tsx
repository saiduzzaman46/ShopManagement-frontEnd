"use client";

import React, { createContext, useContext } from "react";

export type ProfileType = {
  fullName: string;
  phone: string;
  email: string;
  storeName?: string;
  storeAddress?: string;
};

const ProfileContext = createContext<ProfileType | null>(null);

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}

export function ProfileProvider({
  profile,
  children,
}: {
  profile: ProfileType;
  children: React.ReactNode;
}) {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}
