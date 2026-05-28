"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSidenav() {
  const router = useRouter();

  function handleLogout() {
    // Implement logout logic or redirect here
    router.push("/login");
  }

  return (
    <aside className="min-h-screen border-r z-50 px-4 py-6">
      <nav className="space-y-3">
        <Link
          href="/admin"
          className="block rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Home
        </Link>
        <Link
          href="/admin/add-product"
          className="block rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Add Product
        </Link>
        <Link
          href="/admin/edit-product"
          className="block rounded-md px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Edit Product
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-md px-3 py-2 text-left text-sm font-medium transition hover:bg-muted"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
