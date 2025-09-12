import { GET } from "@/app/api/seller/get/route";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileProvider } from "./ProfileContext";
import axios from "axios";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) redirect("/signin");

  let profile = null;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    profile = res.data;
  } catch (error: any) {
    redirect("/signin");
  }

  return (
    <div className="p-6">
      <ProfileProvider profile={profile}>{children}</ProfileProvider>
    </div>
  );
}
