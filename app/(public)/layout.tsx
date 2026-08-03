"use client";

import Navbar from "@/components/layout/navbar";
import { usePathname, useRouter } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const isAiSearch = pathname.includes("aisearch");

  return (
    <>
      {isAiSearch ? (
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className=" fixed z-50"
        >
          Back
        </button>
      ) : (
        <Navbar />
      )}
      {children}
    </>
  );
}
