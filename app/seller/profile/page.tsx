import { serverApiRequest } from "@/api/serverApiRequest";
import Profile from "./Profile";

export default async function ProfilePage() {
  let profile;
  try {
    const response = await serverApiRequest<any>("/seller/profile");
    profile = response;
  } catch (err) {
    return <p>Unauthorized. Please login.</p>;
  }
  return (
    <div>
      <Profile initialProfile={profile} />
    </div>
  );
}
