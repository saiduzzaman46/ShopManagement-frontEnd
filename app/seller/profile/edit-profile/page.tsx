import { serverApiRequest } from "@/api/serverApiRequest";
import EditProfileForm from "./editProfileForm";

export default async function EditProfilePage() {
  const profile = await serverApiRequest("/seller/profile");

  return <EditProfileForm initialData={profile} />;
}
