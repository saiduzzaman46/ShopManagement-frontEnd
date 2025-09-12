import Profile from "./Profile";
import { GET } from "@/app/api/seller/get/route";

export default async function ProfilePage() {
  let profile;
  try {
    profile = await GET("/seller/profile");
  } catch (err) {
    return <p>Unauthorized. Please login.</p>;
  }
  return (
    <div>
      <Profile initialProfile={profile} />
    </div>
  );
}
