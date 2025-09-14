import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./profileDropdown";

type ProfileType = {
  fullName: string;
};

export default function Navbar({ profile }: { profile: ProfileType | null }) {
  return (
    <nav className="bg-white h-16 flex items-center shadow-md px-5 justify-between sticky top-0 z-50">
      <div>{/* Logo or title */}</div>

      <div className="flex justify-end items-center">
        <NotificationBell />
        <div className="relative ml-4">
          <ProfileDropdown profile={profile} />
        </div>
      </div>
    </nav>
  );
}
