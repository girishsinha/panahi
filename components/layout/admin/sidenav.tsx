"use client";

import { Button } from "@/components/ui/button";
import { Edit, Home, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSidenav() {
  const router = useRouter();

  async function handleLogout() {
    // Implement logout logic or redirect here

    const res = await fetch("/api/admin/login", {
      method: "GET",
    });

    if (res.ok) {
      router.push("/"); // redirect to admin dashboard
    } else {
      alert("Logout failed");
    }
  }

  return (
    <aside className="sm:w-1/5  sm:min-h-screen h-0 border-r-2 border-sidebar-border bg-sidebar  sm:px-4 sm:py-6">
      <nav className=" sm:static hidden sm:flex sm:flex-col flex-row justify-around sm:justify-start gap-4 items-center sm:items-start">
        <Link
          href="/admin"
          className=" flex w-full rounded-md items-center gap-2 px-3 py-2 text-sm font-medium transition hover:bg-muted ring-1 ring-sidebar-ring"
        >
          <Home /> Home
        </Link>
        <Link
          href="/admin/add-product"
          className=" flex w-full rounded-md items-center gap-2 px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          <Plus /> Add Product
        </Link>
        <Link
          href="/admin/edit-product"
          className=" flex w-full rounded-md items-center gap-2 px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          <Edit /> Edit Product
        </Link>
        <Button
          type="button"
          onClick={handleLogout}
          className="w-full flex rounded-md items-center gap-2 px-3 py-2 text-left text-sm font-medium transition hover:bg-muted"
        >
          <LogOut /> Logout
        </Button>
      </nav>

      {/* mobile nav */}
      <nav className=" sm:hidden w-full border-t-2 border-sidebar-border bg-sidebar    p-4 fixed bottom-0 flex flex-row justify-around  gap-4 items-center ">
        <Link
          href="/admin"
          className=" flex  rounded-md text-sm font-medium transition hover:bg-muted"
        >
          <Home />
        </Link>
        <Link
          href="/admin/add-product"
          className=" flex  rounded-md  text-sm font-medium transition hover:bg-muted"
        >
          <Plus />
        </Link>
        <Link
          href="/admin/edit-product"
          className=" flex  rounded-md text-sm font-medium transition hover:bg-muted"
        >
          <Edit />
        </Link>
        <Button
          type="button"
          onClick={handleLogout}
          className=" flex rounded-md text-left text-sm font-medium transition "
        >
          <LogOut />
        </Button>
      </nav>
    </aside>
  );
}
