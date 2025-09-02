import Link from "next/link";

// components/Navbar.tsx
export default function Navbar() {
  return (
    <>
      <header>
        <div>
          <Link href="/dashboard">
            <h1>Shop Management</h1>
          </Link>
        </div>
        <div>
          <span>👤</span>
          <Link href="/dashboard/profile">Profile</Link>
        </div>
      </header>
    </>
  );
}
