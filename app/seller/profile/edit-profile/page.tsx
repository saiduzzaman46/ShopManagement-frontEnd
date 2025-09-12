import EditProfileForm from "./editProfileForm";
import { GET } from "@/app/api/seller/get/route";

export default async function EditProfilePage() {
  const profile = await GET("/seller/profile");

  return <EditProfileForm initialData={profile} />;
}
