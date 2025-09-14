interface SidebarProps {
  className?: string;
}

export default function Footer({ className }: SidebarProps) {
  return (
    <footer
      className={`bg-white p-4 text-center text-gray-600 shadow-md ${className}`}
    >
      <p>
        &copy; {new Date().getFullYear()} Shop Management. All rights reserved.
      </p>
    </footer>
  );
}
