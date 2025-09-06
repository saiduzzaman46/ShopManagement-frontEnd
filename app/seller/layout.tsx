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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await checkAuth();

  if (!isAuth) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-60" />
      <div className="flex-1 flex flex-col ml-60">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-100">{children}</main>
        <Footer className="ml-64" />
      </div>
    </div>
  );
}
