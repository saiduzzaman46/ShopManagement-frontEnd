import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/seller/sidebar";
import Navbar from "@/components/seller/navbar/navbar";
import Footer from "@/components/seller/footer";

export default async function DashboardLayout({
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
    // console.log("Profile data:", profile);
  } catch (error: any) {
    redirect("/signin");
  }

  return (
    <div className="flex h-screen">
      <Sidebar className="w-64" />
      <div className="flex-1 flex flex-col ml-64 h-screen">
        <div className="fixed top-0 left-64 right-0 z-50">
          <Navbar profile={profile} />
        </div>
        <main className="flex-1 mt-16 overflow-auto p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
