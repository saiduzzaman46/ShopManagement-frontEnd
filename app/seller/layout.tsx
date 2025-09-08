import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkAuth = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    return false;
  }

  return true;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar className="w-64" />
      <div className="flex-1 flex flex-col ml-64 h-screen">
        <div className="fixed top-0 left-64 right-0 z-50">
          <Navbar />
        </div>
        <main className="flex-1 mt-16 overflow-auto p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
